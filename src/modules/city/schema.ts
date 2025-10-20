import { z } from 'zod';

// Schema accepts only a minimal subset from the client, and optional fields
// that map to the Prisma model. Fields that Prisma requires but are not
// provided by the client will receive sane defaults in the repository layer.
export const CityCreateSchema = z.object({
  city: z
    .string()
    .min(1)
    .transform((s) => s.trim().toLowerCase()),
  name: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  // Optional fields (map to Prisma model properties)
  pib: z.string().optional(),
  uf: z.string().optional(),
  mayor: z.string().optional(),
  population: z.string().optional(),
  areas: z.array(z.string()).optional(),
  idh: z.string().optional(),
  benefits: z.string().optional(),
  logistics: z.string().optional(),
  location: z.string().optional(),
  economicFreedom: z.string().optional(),
  sector: z.string().optional(),
  qualification: z.string().optional(),
  environmentalLicense: z.string().optional(),
});

export type CityCreateInput = z.infer<typeof CityCreateSchema>;
