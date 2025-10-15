import { createMocks } from "node-mocks-http"; // Para simular os objetos req e res do Next.js
import handler from "./register";
import prisma from "../../lib/prisma";

jest.mock("../../lib/prisma", () => {
  return {
    city: {
      create: jest.fn(),
      findUnique: jest.fn().mockResolvedValue(null),
    },
  };
});

describe("POST /api/register", () => {
  it("should create a new city and return status 201", async () => {
    (prisma.city.create as jest.Mock).mockResolvedValue({ id: 1, city: "cidade exemplo", uf: "SP" });

    const { req, res } = createMocks({
      method: "POST",
      body: {
        city: "Cidade Exemplo",
        uf: "SP",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(res._getData()).toEqual(JSON.stringify({ id: 1, city: "cidade exemplo", uf: "SP" }));

  expect(prisma.city.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ city: "cidade exemplo", uf: "SP" }) }));
  });

  it("should return error 500 when creation fails", async () => {
    (prisma.city.create as jest.Mock).mockRejectedValue(new Error("Erro"));

    const { req, res } = createMocks({
      method: "POST",
      body: {
        city: "Cidade Exemplo",
        uf: "SP",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getData()).toEqual(JSON.stringify({ error: "Erro ao salvar a cidade" }));
  });

  it("should return error 405 for disallowed methods", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getData()).toContain("Method GET Not Allowed");
  });
});
