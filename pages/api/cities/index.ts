import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const cities = await prisma.city.findMany();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cities" });
  }
}
