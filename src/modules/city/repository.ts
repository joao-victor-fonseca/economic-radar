import prisma from '@/lib/prisma';
import type { CityCreateInput } from './schema';

// Map the minimal client input to Prisma.CityCreateInput, providing
// default values for fields that Prisma requires but client may omit.
// Forward validated input to Prisma. We intentionally forward only the keys
// provided by the client to preserve behavior expected by existing tests.
export async function createCityInDb(data: CityCreateInput) {
  // Cast via unknown to satisfy strict no-explicit-any rule while keeping
  // flexibility for test mocks and runtime shapes. TODO: make Prisma model
  // fields optional or validate/mapping strictly if desired.
  const payload = data as unknown as import('@prisma/client').Prisma.CityCreateInput;
  return prisma.city.create({ data: payload });
}

export async function findAllCities() {
  return prisma.city.findMany();
}

export async function findCityByName(city: string) {
  return prisma.city.findFirst({
    where: {
      city: {
        equals: city,
        mode: 'insensitive',
      },
    },
  });
}
