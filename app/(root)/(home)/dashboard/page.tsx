"use client";

import { useEffect, useState, ChangeEvent } from "react";
import Link from "next/link";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Image from "next/image";
import { AlertCircle } from "lucide-react";
import prisma from "@/lib/prisma";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CityData {
  id: number;
  city: string;
  pib: string;
  population: string;
  idh: string;
}

const Dashboard = () => {
  const [cities, setCities] = useState<CityData[]>([]);
  const [filteredCities, setFilteredCities] = useState<CityData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Buscar os dados diretamente no cliente
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("/api/cities"); // Aqui você pode alterar para o seu endpoint correto
        setCities(response.data);
        setFilteredCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === "") {
      setFilteredCities(cities);
    } else {
      setFilteredCities(
        cities.filter((city) =>
          city.city.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Image
          src="/icons/loading-circle.svg"
          alt="Loading..."
          width={80}
          height={80}
        />
      </div>
    );
  }

  const formatGDP = (value: string) => {
    const num = parseFloat(value.replace(/[^\d,-]/g, "").replace(",", "."));
    const formattedNum = num / 1_000_000_000; // Dividir por 1 bilhão para obter a escala correta
    return formattedNum.toFixed(2);
  };

  const formatIDH = (value: string) => {
    const num = parseFloat(value.replace(",", "."));
    return num.toFixed(3);
  };

  const populationData = {
    labels: filteredCities.map((city) => city.city),
    datasets: [
      {
        label: "Population",
        data: filteredCities.map((city) =>
          parseInt(city.population.replace(/[^\d]/g, ""))
        ),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pibData = {
    labels: filteredCities.map((city) => city.city),
    datasets: [
      {
        label: "PIB (Em bilhões)",
        data: filteredCities.map((city) => {
          const formattedValue = parseFloat(formatGDP(city.pib));
          return formattedValue;
        }),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const idhData = {
    labels: filteredCities.map((city) => city.city),
    datasets: [
      {
        label: "IDH (Escala que vai de 0 a 1)",
        data: filteredCities.map((city) => {
          const formattedValue = parseFloat(formatIDH(city.idh));
          return formattedValue;
        }),
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="flex-1 flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-2xl md:text-3xl mb-8 font-bold text-center">
        Enter here which city you want to invest in
      </h1>
      <div className="w-full max-w-4xl mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a city..."
          className="w-full p-4 bg-dark-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      {filteredCities.length > 0 ? (
        <ul className="w-full max-w-4xl">
          {filteredCities.map((city) => (
            <li key={city.id} className="mb-4">
              <Link
                href={`/dashboard/${encodeURIComponent(
                  city.city.replace(/ /g, "-")
                )}`}
                className="block p-4 bg-dark-1 rounded-lg hover:bg-gray-700 text-center md:text-left"
              >
                {city.city}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center flex-col mt-8">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          <p className="text-center">No city registered yet</p>
        </div>
      )}
      <div className="w-full max-w-4xl mt-8">
        <h2 className="text-xl md:text-2xl mb-4 font-bold">Population</h2>
        <Bar data={populationData} />
      </div>
      <div className="w-full max-w-4xl mt-8">
        <h2 className="text-xl md:text-2xl mb-4 font-bold">PIB</h2>
        <Bar data={pibData} />
      </div>
      <div className="w-full max-w-4xl mt-8">
        <h2 className="text-xl md:text-2xl mb-4 font-bold">IDH</h2>
        <Bar data={idhData} />
      </div>
    </section>
  );
};

export default Dashboard;
