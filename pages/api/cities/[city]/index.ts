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
    const cityData = await prisma.city.findFirst({
      where: { city },
    });

    if (!cityData) {
      return res.status(404).json({ error: "City not found" });
    }

    return res.status(200).json(cityData);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while fetching the city data",
    });
  }
}
