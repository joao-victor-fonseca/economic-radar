"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface CityData {
  city: string;
}

const Dashboard = () => {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<CityData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedCities = JSON.parse(localStorage.getItem("cities") || "[]");
    console.log("Cidades no Dashboard:", storedCities);
    setCities(storedCities);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (city) {
      const encodedCity = encodeURIComponent(city.trim());
      router.push(`/dashboard/${encodedCity}`);
    }
  };

  return (
    <section className="flex-1 flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-3xl mb-8 font-bold">
        Enter here which city you want to invest in
      </h1>
      <form onSubmit={handleSearch} className="relative w-96 mb-8">
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>

      <ul className="w-full max-w-4xl">
        {cities.length > 0 ? (
          cities.map((city) => (
            <li key={city.city} className="mb-4">
              <Link
                href={`/dashboard/${encodeURIComponent(city.city)}`}
                className="block p-4 bg-dark-3 rounded-lg hover:bg-gray-700"
              >
                {city.city}
              </Link>
            </li>
          ))
        ) : (
          <li>No city registered.</li>
        )}
      </ul>
    </section>
  );
};

export default Dashboard;
