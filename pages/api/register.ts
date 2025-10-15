import type { NextApiHandler } from "next";
import { withHandler } from "../../src/lib/api/withHandler";
import { createCitySchema } from "../../src/modules/city/validators/createCity.validator";
import { CityService } from "../../src/modules/city/services/city.service";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const parsed = createCitySchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.format() });

    try {
      const city = await CityService.createCity(parsed.data);
      return res.status(201).json(city);
    } catch (err: any) {
      if (err.status === 409) return res.status(409).json({ error: err.message });
      return res.status(500).json({ error: "Erro ao salvar a cidade" });
    }
  }

  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
};

export default withHandler(handler, ["POST"]);
