import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method); // Adicionando log para verificar o método

  if (req.method === "POST") {
    const data = req.body;

    console.log(data); // Adicionando log para verificar os dados

    data.city = data.city.trim().toLowerCase();
    try {
      const city = await prisma.city.create({ data });
      res.status(201).json(city);
    } catch (error) {
      console.error(error); // Log do erro
      res.status(500).json({ error: "Erro ao salvar a cidade" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
