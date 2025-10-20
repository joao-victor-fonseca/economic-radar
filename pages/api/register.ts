import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler } from './_withHandler';
import { createCity } from '@/src/modules/city/service';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const payload: unknown = req.body;

  try {
    const city = await createCity(payload);
    return res.status(201).json(city);
  } catch (err) {
    const error = err as Error;
    if (error.message?.includes("'city'")) {
      return res.status(400).json({ error: error.message });
    }
    console.error(error);
    return res.status(500).json({ error: 'Erro ao salvar a cidade' });
  }
}

export default withHandler(['POST'], handler);
