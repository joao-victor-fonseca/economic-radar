import { createMocks } from "node-mocks-http";
import handler from "@/pages/api/cities/[city]/index";
import prisma from "@/lib/prisma";
jest.mock("@/lib/prisma", () => ({
  city: {
    findFirst: jest.fn(),
  },
}));

describe("API Handler - City", () => {
  it("should return 200 and city data if city is found", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: { city: "test-city" },
    });

    const mockCityData = { id: 1, city: "test-city", population: 1000 };
    (prisma.city.findFirst as jest.Mock).mockResolvedValue(mockCityData);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(mockCityData);
  });

  it("should return 404 if city is not found", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: { city: "unknown-city" },
    });

    (prisma.city.findFirst as jest.Mock).mockResolvedValue(null);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData()).toEqual({ error: "City not found" });
  });

  it("should return 500 on internal server error", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: { city: "test-city" },
    });

    (prisma.city.findFirst as jest.Mock).mockRejectedValue(
      new Error("Internal server error")
    );

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toEqual({
      error: "An error occurred while fetching the city data",
    });
  });
});
