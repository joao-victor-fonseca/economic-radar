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
  pib: string;
}

interface PibChartProps {
  cities: CityData[];
}

export default function PibChart({ cities }: PibChartProps) {
  const formatGDP = (value: string) => {
    const num = parseFloat(value.replace(/[^\d,-]/g, "").replace(",", "."));
    return num / 1_000_000_000; // converter para bilhões
  };

  const data = {
    labels: cities.map((city) => city.city),
    datasets: [
      {
        label: "PIB (Bilhões)",
        data: cities.map((city) => parseFloat(formatGDP(city.pib).toFixed(2))),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div className="w-full max-w-5xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">PIB</h2>
      <Bar data={data} />
    </div>
  );
}
