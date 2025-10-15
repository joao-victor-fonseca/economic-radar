import prisma from "../../../../lib/prisma";
import type { CreateCityDTO } from "../validators/createCity.validator";
import type { Prisma } from "@prisma/client";

export const CityRepository = {
  create: (data: CreateCityDTO) => {
    // Prisma schema currently requires many string fields. Provide safe defaults
    // to avoid breaking the client while we migrate the schema to more suitable types.
    const createData: Prisma.CityCreateInput = {
      city: data.city,
      uf: data.uf,
      pib: data.pib !== undefined ? String(data.pib) : "",
      mayor: data.mayor ?? "",
      population: data.population !== undefined ? String(data.population) : "",
      areas: data.areas ?? [],
      idh: "",
      benefits: "",
      logistics: "",
      location: "",
      economicFreedom: "",
      sector: "",
      qualification: "",
      environmentalLicense: "",
    } as Prisma.CityCreateInput;

    return prisma.city.create({ data: createData });
  },
  findAll: () => prisma.city.findMany(),
  findByName: (city: string) => prisma.city.findUnique({ where: { city } }),
};
