import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city } = req.query;

  if (typeof city !== "string") {
    return res.status(400).json({ error: "Invalid city parameter" });
  }

  try {
    const decodedCity = decodeURIComponent(city);
    const formattedCity = decodedCity
      .replace(/-/g, " ")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const cityData = await prisma.city.findFirst({
      where: {
        city: {
          equals: formattedCity,
          mode: "insensitive", // Para garantir a busca sem diferenciar maiúsculas/minúsculas
        },
      },
    });

    if (!cityData) {
      return res.status(404).json({ error: "City not found" });
    }
    return res.status(200).json(cityData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "An error occurred while fetching the city data",
    });
  }
}
