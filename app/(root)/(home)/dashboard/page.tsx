"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, Search } from "lucide-react";
import Image from "next/image";

interface CityData {
  city: string;
}

const Dashboard = () => {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedCities = JSON.parse(localStorage.getItem("cities") || "[]");
    console.log("Cidades no Dashboard:", storedCities);
    setCities(storedCities);
    setLoading(false); // Indica que o carregamento está completo
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (city) {
      const encodedCity = encodeURIComponent(city.trim());
      router.push(`/dashboard/${encodedCity}`);
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

  return (
    <section className="flex-1 flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-2xl md:text-3xl mb-8 font-bold text-center">
        Enter here which city you want to invest in
      </h1>
      <form onSubmit={handleSearch} className="relative w-full max-w-md mb-8">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter the name of the city"
          className="w-full py-3 px-6 bg-dark-3 border border-dark-2 rounded-full text-center focus:outline-none"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-6 transform -translate-y-1/2"
        >
          <Search className="h-6 w-6 text-gray-400" />
        </button>
      </form>

      {cities.length > 0 ? (
        <ul className="w-full max-w-4xl">
          {cities.map((city) => (
            <li key={city.city} className="mb-4">
              <Link
                href={`/dashboard/${encodeURIComponent(city.city)}`}
                className="block p-4 bg-dark-3 rounded-lg hover:bg-gray-700 text-center md:text-left"
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
    </section>
  );
};

export default Dashboard;
