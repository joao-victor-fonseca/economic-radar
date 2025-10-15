import type { NextApiRequest, NextApiResponse } from "next";
import { computeScore } from "../../src/modules/score/score.service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const metrics = req.body;
  try {
    const result = computeScore(metrics);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error computing score" });
  }
}
