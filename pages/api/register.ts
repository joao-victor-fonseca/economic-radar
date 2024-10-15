import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;

    // Verifique se os campos necessários estão presentes
    if (
      !data.city ||
      !data.pib ||
      !data.uf ||
      !data.mayor ||
      !data.population
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    // Normalize o nome da cidade
    data.city = data.city.trim().toLowerCase();

    try {
      const city = await prisma.city.create({ data });
      res.status(201).json(city);
    } catch (error) {
      console.error("Erro ao salvar a cidade:", error);
      res.status(500).json({ error: "Erro ao salvar a cidade." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
