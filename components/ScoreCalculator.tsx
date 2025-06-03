"use client";

import React from "react";

interface CityData {
  pib: number;
  hasFavorablePolicy: boolean;
  idh: number;
  hasEnvironmentalLicense: boolean;
  economicFreedomLevel: number;
  numberOfBranches: number;
  sector: string;
  qualificationLevel: number;
}

const WEIGHTS = {
  pib: 18,
  favorablePolicy: 25,
  idh: 36,
  environmentalLicense: 47,
  economicFreedomLevel: 58,
  numberOfBranches: 69,
  sector: 79,
  qualificationLevel: 88,
};

export default function ScoreCalculator({ city }: { city: CityData }) {
  let score = 0;

  if (city.pib > 50000) score += WEIGHTS.pib;
  if (city.hasFavorablePolicy) score += WEIGHTS.favorablePolicy;
  if (city.idh > 0.7) score += WEIGHTS.idh;
  if (city.hasEnvironmentalLicense) score += WEIGHTS.environmentalLicense;
  if (city.economicFreedomLevel > 5) score += WEIGHTS.economicFreedomLevel;
  if (city.numberOfBranches > 3) score += WEIGHTS.numberOfBranches;
  if (
    ["restaurante", "turismo", "tecnologia"].includes(city.sector.toLowerCase())
  )
    score += WEIGHTS.sector;
  if (city.qualificationLevel > 7) score += WEIGHTS.qualificationLevel;

  return (
    <div className="bg-blue-800 p-4 rounded-md shadow-md text-white max-w-sm mx-auto">
      <h3 className="text-xl font-bold mb-2 text-center">
        Investment Attractiveness Score
      </h3>
      <p className="text-4xl font-extrabold text-center">{score}</p>
    </div>
  );
}
