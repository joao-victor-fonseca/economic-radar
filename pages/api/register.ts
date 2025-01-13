import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;

    if (data.city) {
      data.city = data.city.trim().toLowerCase();
    } else {
      res.status(400).json({ error: "O campo 'city' é obrigatório" });
      return;
    }

    try {
      const city = await prisma.city.create({ data });
      res.status(201).json(city);
    } catch (error) {
      res.status(500).json({ error: "Erro ao salvar a cidade" });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
