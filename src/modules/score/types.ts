export type CityMetrics = {
  city: string;
  pib?: number; // Produto Interno Bruto
  population?: number;
  idh?: number; // Índice de Desenvolvimento Humano (0-1)
  benefits?: number; // score 0-100
  logistics?: number; // score 0-100
  economicFreedom?: number; // score 0-100
  qualification?: number; // score 0-100
  environmentalLicense?: number; // 0/1 or score
};

export type WeightConfig = Partial<Record<keyof CityMetrics, number>> & {
  // default weights applied when not provided
  default?: number;
};
