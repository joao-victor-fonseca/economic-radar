import { NextApiRequest, NextApiResponse } from 'next';

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;

export function withHandler(allowedMethods: string[], handler: Handler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (!allowedMethods.includes(req.method || '')) {
      res.setHeader('Allow', allowedMethods.join(', '));
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    try {
      // Basic normalization for JSON body strings
      if (req.body && typeof req.body === 'string') {
        try {
          req.body = JSON.parse(req.body);
        } catch {
          // leave as-is if it's not JSON
        }
      }

      await handler(req, res);
    } catch (err) {
      console.error('API handler error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}
