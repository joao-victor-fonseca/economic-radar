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
  idh: string;
}

interface IdhChartProps {
  cities: CityData[];
}

export default function IdhChart({ cities }: IdhChartProps) {
  const formatIDH = (value: string) => {
    const num = parseFloat(value.replace(",", "."));
    return num;
  };

  const data = {
    labels: cities.map((city) => city.city),
    datasets: [
      {
        label: "IDH",
        data: cities.map((city) => formatIDH(city.idh)),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
      },
    ],
  };

  return (
    <div className="w-full max-w-5xl mt-10 mb-20">
      <h2 className="text-2xl font-bold mb-4 text-center">IDH</h2>
      <Bar data={data} />
    </div>
  );
}
