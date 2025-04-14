import { describe, expect, test } from "vitest";
import { ROUTES } from "../routes";

describe("ROUTES", () => {
  test("all routes are unique", () => {
    const paths = Object.values(ROUTES);
    expect(paths.length).toEqual(new Set(paths).size);
  });
});
