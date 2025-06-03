"use client";

import { Bar } from "react-chartjs-2";
import React from "react";

interface CityData {
  id: number;
  city: string;
  pib: string;
  population: string;
  idh: string;
  hasFavorablePolicy: boolean;
  hasEnvironmentalLicense: boolean;
  economicFreedomLevel: number;
  numberOfBranches: number;
  sector: string;
  qualificationLevel: number;
}

interface Props {
  cities: CityData[];
}

const InvestmentScoreChart = ({ cities }: Props) => {
  const calculateScore = (city: CityData) => {
    let score = 0;

    const pib =
      parseFloat(city.pib.replace(/[^\d,-]/g, "").replace(",", ".")) || 0;
    const idh = parseFloat(city.idh.replace(",", ".")) || 0;

    if (pib > 50000) score += 18;
    if (city.hasFavorablePolicy) score += 25;
    if (idh > 0.7) score += 36;
    if (city.hasEnvironmentalLicense) score += 47;
    if (city.economicFreedomLevel > 5) score += 58;
    if (city.numberOfBranches > 3) score += 69;
    if (
      ["restaurante", "turismo", "tecnologia"].includes(
        city.sector.toLowerCase()
      )
    )
      score += 79;
    if (city.qualificationLevel > 7) score += 88;

    return score;
  };

  const chartData = {
    labels: cities.map((city) => city.city),
    datasets: [
      {
        label: "Investment Score",
        data: cities.map(calculateScore),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-5xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Investment Attractiveness Score
      </h2>
      <Bar data={chartData} />
    </div>
  );
};

export default InvestmentScoreChart;
