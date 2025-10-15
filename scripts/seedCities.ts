import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type RawCity = {
  city: string;
  pib?: number;
  uf?: string;
  mayor?: string;
  population?: number;
  areas?: string[];
  idh?: number;
  benefits?: number;
  logistics?: number;
  location?: string;
  economicFreedom?: number;
  sector?: string;
  qualification?: number;
  environmentalLicense?: number;
};

async function main() {
  const __dirname = path.dirname(new URL(import.meta.url).pathname.replace(/^\/(.:)/, "$1"));
  const file = path.join(__dirname, "..", "data", "sample-cities.json");
  const raw = fs.readFileSync(file, "utf-8");
  const cities: RawCity[] = JSON.parse(raw);

  for (const c of cities) {
    console.log(`Upserting ${c.city}`);
    await prisma.city.upsert({
      where: { city: c.city },
      update: {
        pib: String(c.pib ?? ""),
        uf: c.uf ?? "",
        mayor: c.mayor ?? "",
        population: String(c.population ?? ""),
        areas: c.areas ?? [],
        idh: String(c.idh ?? ""),
        benefits: String(c.benefits ?? ""),
        logistics: String(c.logistics ?? ""),
        location: c.location ?? "",
        economicFreedom: String(c.economicFreedom ?? ""),
        sector: c.sector ?? "",
        qualification: String(c.qualification ?? ""),
        environmentalLicense: String(c.environmentalLicense ?? ""),
      },
      create: {
        city: c.city,
        pib: String(c.pib ?? ""),
        uf: c.uf ?? "",
        mayor: c.mayor ?? "",
        population: String(c.population ?? ""),
        areas: c.areas ?? [],
        idh: String(c.idh ?? ""),
        benefits: String(c.benefits ?? ""),
        logistics: String(c.logistics ?? ""),
        location: c.location ?? "",
        economicFreedom: String(c.economicFreedom ?? ""),
        sector: c.sector ?? "",
        qualification: String(c.qualification ?? ""),
        environmentalLicense: String(c.environmentalLicense ?? ""),
      },
    });
  }

  console.log("Seeding complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
