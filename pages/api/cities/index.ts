import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler } from '../_withHandler';
import { listCities } from '@/src/modules/city/service';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cities = await listCities();
    return res.status(200).json(cities);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching cities' });
  }
}

export default withHandler(['GET'], handler);
