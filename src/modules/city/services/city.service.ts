import { CityRepository } from "../repositories/city.repository";
import type { CreateCityDTO } from "../validators/createCity.validator";

export const CityService = {
  async createCity(dto: CreateCityDTO) {
    const normalized = { ...dto, city: dto.city.trim().toLowerCase() } as CreateCityDTO;
    const existing = await CityRepository.findByName(normalized.city);
    if (existing) throw { status: 409, message: "City already exists" };
    return CityRepository.create(normalized as any);
  },
  listCities: () => CityRepository.findAll(),
};
