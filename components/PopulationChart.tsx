"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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
  population: string;
}

interface PopulationChartProps {
  cities: CityData[];
}

export default function PopulationChart({ cities }: PopulationChartProps) {
  const data = {
    labels: cities.map((city) => city.city),
    datasets: [
      {
        label: "Population",
        data: cities.map((city) =>
          parseInt(city.population.replace(/[^\d]/g, ""))
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="w-full max-w-5xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Population</h2>
      <Bar data={data} />
    </div>
  );
}
