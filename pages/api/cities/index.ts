// pages/api/cities.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sector } = req.query;

  try {
    const cities = await prisma.city.findMany({
      where: sector ? { sector: sector as string } : {},
    });
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cidades." });
  }
}
