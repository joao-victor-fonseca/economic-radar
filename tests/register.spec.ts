import { createMocks } from "node-mocks-http";
import handler from "../pages/api/register";

jest.mock("../lib/prisma", () => ({
  city: {
    create: jest.fn().mockResolvedValue({ id: 1, city: "test", uf: "SP" }),
    findUnique: jest.fn().mockResolvedValue(null),
  },
}));

describe("POST /api/register", () => {
  it("creates a city and returns 201", async () => {
    const { req, res } = createMocks({ method: "POST", body: { city: "Test", uf: "SP" } });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(201);
    const json = JSON.parse(res._getData() as string);
    expect(json.city).toBe("test");
  });
});
