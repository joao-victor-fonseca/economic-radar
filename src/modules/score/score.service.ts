import type { CityMetrics, WeightConfig } from "./types";

function clamp01(v: number) {
  if (Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(1, v));
}

function normalizePib(pib?: number) {
  if (pib === undefined) return 0;
  // simple log-scale normalization (safe for wide ranges)
  return clamp01(Math.log10(pib + 1) / 10);
}

function normalizePopulation(pop?: number) {
  if (!pop) return 0;
  return clamp01(Math.log10(pop + 1) / 6); // heuristic
}

function normalizeIdh(idh?: number) {
  if (!idh) return 0;
  return clamp01(idh); // assuming 0..1
}

export function computeScore(metrics: CityMetrics, weights?: WeightConfig) {
  const wDefault = weights?.default ?? 1;

  const w = {
    pib: weights?.pib ?? wDefault,
    population: weights?.population ?? wDefault,
    idh: weights?.idh ?? wDefault,
    benefits: weights?.benefits ?? wDefault,
    logistics: weights?.logistics ?? wDefault,
    economicFreedom: weights?.economicFreedom ?? wDefault,
    qualification: weights?.qualification ?? wDefault,
    environmentalLicense: weights?.environmentalLicense ?? wDefault,
  } as Record<string, number>;

  const components = {
    pib: normalizePib(metrics.pib) * w.pib,
    population: normalizePopulation(metrics.population) * w.population,
    idh: normalizeIdh(metrics.idh) * w.idh,
    benefits: (metrics.benefits ? clamp01(metrics.benefits / 100) : 0) * w.benefits,
    logistics: (metrics.logistics ? clamp01(metrics.logistics / 100) : 0) * w.logistics,
    economicFreedom: (metrics.economicFreedom ? clamp01(metrics.economicFreedom / 100) : 0) * w.economicFreedom,
    qualification: (metrics.qualification ? clamp01(metrics.qualification / 100) : 0) * w.qualification,
    environmentalLicense: (metrics.environmentalLicense ? clamp01(metrics.environmentalLicense) : 0) * w.environmentalLicense,
  };

  const weightSum = Object.values(w).reduce((s, n) => s + n, 0) || 1;

  const raw = Object.values(components).reduce((s, n) => s + n, 0) / weightSum;
  const score = clamp01(raw);

  return {
    score,
    components,
  };
}

export default { computeScore };
