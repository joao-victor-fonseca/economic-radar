import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city } = req.query;

  if (typeof city !== "string") {
    res.status(400).json({ error: "Invalid city parameter" });
    return;
  }

  try {
    const cityName = decodeURIComponent(
      city.replace(/-/g, " ").trim().toLowerCase()
    );
    const cityData = await prisma.city.findFirst({
      where: { city: cityName },
    });

    if (!cityData) {
      res.status(404).json({ error: "City not found" });
      return;
    }

    res.status(200).json(cityData);
  } catch (error) {
    console.error("Erro ao buscar a cidade:", error); // Log do erro
    res
      .status(500)
      .json({ error: "An error occurred while fetching the city data" });
  }
}
