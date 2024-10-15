import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;
    data.city = data.city.trim().toLowerCase();
    try {
      const city = await prisma.city.create({ data });
      res.status(201).json(city);
    } catch (error) {
      res.status(500).json({ error: "Erro ao salvar a cidade" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
