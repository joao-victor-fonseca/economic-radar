import { computeScore } from "./score.service";

describe("computeScore", () => {
  it("computes 0 score for empty metrics", () => {
    const res = computeScore({ city: "x" });
    expect(res.score).toBeGreaterThanOrEqual(0);
    expect(res.score).toBeLessThanOrEqual(1);
  });

  it("gives higher score for higher idh and pib", () => {
    const low = computeScore({ city: "low", idh: 0.5, pib: 1000 });
    const high = computeScore({ city: "high", idh: 0.9, pib: 1000000 });
    expect(high.score).toBeGreaterThan(low.score);
  });
});
