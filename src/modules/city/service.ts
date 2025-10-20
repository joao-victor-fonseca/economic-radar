import { CityCreateSchema, type CityCreateInput } from './schema';
import * as repo from './repository';

export async function createCity(raw: unknown) {
  const parsed = CityCreateSchema.parse(raw) as CityCreateInput;

  // forward validated payload to repository
  return repo.createCityInDb(parsed);
}

export async function listCities() {
  return repo.findAllCities();
}

export async function getCity(cityParam: string) {
  const decoded = decodeURIComponent(cityParam);
  const formatted = decoded
    .replace(/-/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return repo.findCityByName(formatted);
}
