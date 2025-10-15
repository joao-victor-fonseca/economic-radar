import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

type Methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export function withHandler(handler: NextApiHandler, methods: Methods[] = ["GET"]) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (!methods.includes(req.method as Methods)) {
      res.setHeader("Allow", methods.join(", "));
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    try {
      return await handler(req, res);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
