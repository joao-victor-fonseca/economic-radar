import { z } from "zod";

export const createCitySchema = z.object({
  city: z.string().min(2),
  uf: z.string().length(2),
  population: z.preprocess((v) => (v === undefined ? undefined : Number(v)), z.number().optional()),
  pib: z.preprocess((v) => (v === undefined ? undefined : Number(v)), z.number().optional()),
  mayor: z.string().optional(),
  areas: z.array(z.string()).optional(),
});

export type CreateCityDTO = z.infer<typeof createCitySchema>;
