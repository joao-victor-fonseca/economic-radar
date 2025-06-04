"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PopulationChart from "@/components/PopulationChart";
import PibChart from "@/components/PibChart";
import IdhChart from "@/components/IdhChart";

interface CityData {
  id: number;
  city: string;
  pib: string;
  population: string;
  idh: string;
  sector: string;
}

interface CityScore extends CityData {
  score: number;
  scorePercent: number;
  pibNum: number;
  populationNum: number;
  idhNum: number;
}

function parseNumber(value: string) {
  if (!value) return 0;
  return parseFloat(value.replace(/[^\d,-]/g, "").replace(",", ".")) || 0;
}

export default function Dashboard() {
  const [citiesRaw, setCitiesRaw] = useState<CityData[]>([]);
  const [cities, setCities] = useState<CityScore[]>([]);
  const [search, setSearch] = useState("");

  const [weights, setWeights] = useState({
    pib: 1,
    population: 1,
    idh: 1,
  });

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get<CityData[]>("/api/cities");
      setCitiesRaw(res.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (citiesRaw.length === 0) return;

    const parsed = citiesRaw.map((city) => ({
      ...city,
      pibNum: parseNumber(city.pib),
      populationNum: parseInt(city.population.replace(/[^\d]/g, "")) || 0,
      idhNum: parseFloat(city.idh.replace(",", ".")) || 0,
    }));

    const pibMedia =
      parsed.reduce((acc, cur) => acc + cur.pibNum, 0) / parsed.length;
    const popMedia =
      parsed.reduce((acc, cur) => acc + cur.populationNum, 0) / parsed.length;
    const idhMedia =
      parsed.reduce((acc, cur) => acc + cur.idhNum, 0) / parsed.length;

    const withScores = parsed.map((city) => {
      const pibScore = city.pibNum >= pibMedia ? weights.pib : 0;
      const popScore = city.populationNum >= popMedia ? weights.population : 0;
      const idhScore = city.idhNum >= idhMedia ? weights.idh : 0;

      const totalScore = pibScore + popScore + idhScore;

      return {
        ...city,
        score: totalScore,
        scorePercent: 0, // temporário
      };
    });

    const maxScore = Math.max(...withScores.map((c) => c.score));
    const normalized = withScores.map((c) => ({
      ...c,
      scorePercent: maxScore > 0 ? (c.score / maxScore) * 100 : 0,
    }));

    setCities(normalized);
  }, [citiesRaw, weights]);

  const filtered = cities
    .filter((c) => c.city.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.scorePercent - a.scorePercent);

  function handlePesoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const num = parseFloat(value);
    if (isNaN(num) || num < 0) return;
    setWeights((prev) => ({ ...prev, [name]: num }));
  }

  return (
    <div className="min-h-screen text-neutral-100 px-6 py-10 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-white">
        Economic Development Dashboard
      </h1>

      {/* Pesos */}
      <div className="flex flex-wrap justify-center gap-10 mb-10">
        {["pib", "population", "idh"].map((key) => (
          <div key={key} className="flex flex-col items-center">
            <label className="mb-2 font-semibold uppercase text-neutral-300">
              Peso {key.toUpperCase()}
            </label>
            <input
              type="number"
              name={key}
              min={0}
              step={1}
              value={(weights as any)[key]}
              onChange={handlePesoChange}
              className="w-24 px-4 py-2 rounded-md border border-neutral-700 bg-neutral-800 text-center text-lg font-mono text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        ))}
      </div>

      {/* Pesquisa */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="Pesquisar cidade..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl px-5 py-3 rounded-lg border border-neutral-700 bg-neutral-800 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
        />
      </div>

      {/* Lista */}
      <ul className="max-w-4xl mx-auto mb-16 space-y-5">
        {filtered.map((city) => (
          <li
            key={city.id}
            className="flex items-center gap-6 p-5 rounded-lg border border-neutral-700 bg-neutral-800 hover:shadow-xl transition"
          >
            <span className="font-mono text-indigo-400 text-3xl w-24 text-center font-bold">
              {city.scorePercent.toFixed(0)}%
            </span>
            <div>
              <a
                href={`/dashboard/${encodeURIComponent(
                  city.city.toLowerCase().replace(/ /g, "-")
                )}`}
                className="text-xl font-semibold text-white hover:underline"
              >
                {city.city}
              </a>
              <p className="text-sm text-neutral-400">
                Setor: {city.sector} | PIB: {city.pib} | População:{" "}
                {city.population} | IDH: {city.idh}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Gráficos */}
      <div className="max-w-5xl mx-auto space-y-14">
        <div className="p-6 border border-neutral-700 rounded-lg shadow-md bg-neutral-800">
          <h2 className="mb-4 text-2xl font-semibold text-center text-white">
            População
          </h2>
          <PopulationChart cities={filtered} />
        </div>
        <div className="p-6 border border-neutral-700 rounded-lg shadow-md bg-neutral-800">
          <h2 className="mb-4 text-2xl font-semibold text-center text-white">
            PIB
          </h2>
          <PibChart cities={filtered} />
        </div>
        <div className="p-6 border border-neutral-700 rounded-lg shadow-md bg-neutral-800">
          <h2 className="mb-4 text-2xl font-semibold text-center text-white">
            IDH
          </h2>
          <IdhChart cities={filtered} />
        </div>
      </div>
    </div>
  );
}
