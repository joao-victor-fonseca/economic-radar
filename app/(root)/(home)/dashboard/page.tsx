"use client";

import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import Link from "next/link";
import PopulationChart from "@/components/PopulationChart";
import PibChart from "@/components/PIBChart";
import IdhChart from "@/components/IDHChart";

interface CityData {
  id: number;
  city: string;
  pib: string;
  population: string;
  idh: string;
}

interface CityScore extends CityData {
  score: number;
}

// 🎯 Pesos definidos conforme exemplo do artigo
const weights = {
  pibAboveAverage: 18,
  hasFavorablePolicy: 25, // Placeholder — pode ser um campo futuro
  idhAboveAverage: 36,
  populationAboveAverage: 47,
};

export default function Dashboard() {
  const [cities, setCities] = useState<CityScore[]>([]);
  const [filteredCities, setFilteredCities] = useState<CityScore[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      const res = await axios.get("/api/cities");
      const rawCities: CityData[] = res.data;

      // Calcular médias
      const pibAverage = calcularMedia(rawCities, "pib");
      const idhAverage = calcularMedia(rawCities, "idh");
      const populationAverage = calcularMedia(rawCities, "population");

      // Calcular scores
      const scoredCities: CityScore[] = rawCities.map((city) => {
        const pib =
          parseFloat(city.pib.replace(/[^\d,-]/g, "").replace(",", ".")) || 0;
        const population = parseInt(city.population.replace(/[^\d]/g, "")) || 0;
        const idh = parseFloat(city.idh.replace(",", ".")) || 0;

        let score = 0;

        if (pib > pibAverage) score += weights.pibAboveAverage;
        if (idh > idhAverage) score += weights.idhAboveAverage;
        if (population > populationAverage)
          score += weights.populationAboveAverage;

        // 🚩 Adicionar política pública favorável manualmente (placeholder)
        const hasFavorablePolicy = true; // Futuramente você pode tornar isso dinâmico
        if (hasFavorablePolicy) score += weights.hasFavorablePolicy;

        return { ...city, score };
      });

      setCities(scoredCities);
      setFilteredCities(scoredCities);
    };
    fetchCities();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredCities(
      cities.filter((city) =>
        city.city.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Economic Radar Dashboard
      </h1>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search city..."
        className="w-full max-w-md p-3 rounded-md bg-dark-3 text-white mb-6"
      />

      {filteredCities.length === 0 ? (
        <p>No cities found</p>
      ) : (
        <ul className="w-full max-w-2xl">
          {filteredCities
            .sort((a, b) => b.score - a.score)
            .map((city) => (
              <li key={city.id} className="mb-2">
                <Link
                  href={`/dashboard/${encodeURIComponent(
                    city.city.replace(/ /g, "-")
                  )}`}
                  className="block bg-dark-1 p-3 rounded-md hover:bg-gray-700 text-center"
                >
                  <div className="flex justify-between items-center text-white">
                    <span>{city.city}</span>
                    <span className="font-mono text-yellow-1">
                      Score: {city.score}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      )}

      {/* Gráficos */}
      <PopulationChart cities={filteredCities} />
      <PibChart cities={filteredCities} />
      <IdhChart cities={filteredCities} />
    </div>
  );
}

// 🔥 Função para calcular média
function calcularMedia(cities: CityData[], campo: keyof CityData): number {
  const valores = cities.map((city) => {
    const valor = String(city[campo]); // 🔥 Força para string

    if (campo === "pib") {
      return parseFloat(valor.replace(/[^\d,-]/g, "").replace(",", ".")) || 0;
    } else if (campo === "idh") {
      return parseFloat(valor.replace(",", ".")) || 0;
    } else if (campo === "population") {
      return parseInt(valor.replace(/[^\d]/g, "")) || 0;
    }

    return 0;
  });

  const total = valores.reduce((acc, curr) => acc + curr, 0);
  return valores.length > 0 ? total / valores.length : 0;
}
