import { createMocks } from "node-mocks-http";

import handler from "./index";
import prisma from "../../../lib/prisma";

jest.mock("../../../lib/prisma", () => {
  return {
    city: {
      findMany: jest.fn(),
    },
  };
});

describe("GET /api/cities", () => {
  it("should return all cities", async () => {
    (prisma.city.findMany as jest.Mock).mockResolvedValue([
      {
        id: 1,
        name: "Cidade Exemplo",
        city: "Cidade Exemplo",
      },
    ]);

    const { req, res } = createMocks({
      method: "GET",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual(
      JSON.stringify([
        {
          id: 1,
          name: "Cidade Exemplo",
          city: "Cidade Exemplo",
        },
      ])
    );

    expect(prisma.city.findMany).toHaveBeenCalled();
  });
});
