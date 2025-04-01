import * as v from "valibot";
import { describe, expect, it } from "vitest";
import { parseQueryParams, qpSchema, setQueryParams } from "./query-params";

describe("qpSchema", () => {
  describe("number", () => {
    it("should parse a number", () => {
      const result = v.parse(qpSchema.number, "1");
      expect(result).toEqual(1);
      expect(result === 1).toEqual(true); // verify type
      // @ts-expect-error - This comparison is intentional to ensure proper typing
      expect(result === "1").toEqual(false); // verify type
    });

    it("should return undefined for undefined", () => {
      const result = v.parse(qpSchema.number, undefined);
      expect(result).toBeUndefined();
    });

    it("should return undefined for invalid values", () => {
      const result = v.parse(qpSchema.number, "abc");
      expect(result).toBeUndefined();
    });
  });

  describe("numberList", () => {
    it("should parse a comma separated list of numbers", () => {
      const result = v.parse(qpSchema.numberList, "1,2,3");
      expect(result).toEqual([1, 2, 3]);
      expect(result.includes(1)).toEqual(true); // verify type
      // @ts-expect-error - This comparison is intentional to ensure proper typing
      expect(result.includes("1")).toEqual(false); // verify type
    });

    it("should return an empty array for undefined", () => {
      const result = v.parse(qpSchema.numberList, undefined);
      expect(result).toEqual([]);
    });

    it("should return an empty array for invalid values", () => {
      const result = v.parse(qpSchema.numberList, "abc");
      expect(result).toEqual([]);
    });

    it("should filter out non-numeric values", () => {
      const result = v.parse(qpSchema.numberList, "1,2,3,abc");
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe("string", () => {
    it("should parse a string", () => {
      const result = v.parse(qpSchema.string, "a");
      expect(result).toEqual("a");
      expect(result === "a").toEqual(true); // verify type
      // @ts-expect-error - This comparison is intentional to ensure proper typing
      expect(result === 1).toEqual(false); // verify type
    });

    it("should return undefined for undefined", () => {
      const result = v.parse(qpSchema.string, undefined);
      expect(result).toBeUndefined();
    });
  });

  describe("stringList", () => {
    it("should parse a comma separated list of strings", () => {
      const result = v.parse(qpSchema.stringList, "a,b,c");
      expect(result).toEqual(["a", "b", "c"]);
      expect(result.includes("a")).toEqual(true); // verify type
      // @ts-expect-error - This comparison is intentional to ensure proper typing
      expect(result.includes(1)).toEqual(false); // verify type
    });

    it("should return an empty array for undefined", () => {
      const result = v.parse(qpSchema.stringList, undefined);
      expect(result).toEqual([]);
    });
  });

  describe("boolean", () => {
    it("should parse a boolean", () => {
      const result = v.parse(qpSchema.boolean, "true");
      expect(result).toEqual(true);
      expect(result === true).toEqual(true); // verify type
      // @ts-expect-error - This comparison is intentional to ensure proper typing
      expect(result === 1).toEqual(false); // verify type
      const result2 = v.parse(qpSchema.boolean, "false");
      expect(result2).toEqual(false);
      expect(result2 === false).toEqual(true); // verify type
      // @ts-expect-error - This comparison is intentional to ensure proper typing
      expect(result2 === 1).toEqual(false); // verify type
    });

    it("should return undefined for undefined", () => {
      const result = v.parse(qpSchema.boolean, undefined);
      expect(result).toBeUndefined();
    });

    it("should return undefined for invalid values", () => {
      const result = v.parse(qpSchema.boolean, "abc");
      expect(result).toBeUndefined();
    });
  });

  describe("enum", () => {
    it("should parse an enum value", () => {
      const result = v.parse(qpSchema.enum(["a", "b", "c"]), "a");
      expect(result).toEqual("a");
      expect(result === "a").toEqual(true); // verify type
      // @ts-expect-error - This comparison is intentional to ensure proper typing
      expect(result === "d").toEqual(false); // verify type
      const result2 = v.parse(qpSchema.enum([1, 2, 3]), "1");
      expect(result2).toEqual(1);
      expect(result2 === 1).toEqual(true); // verify type
      // @ts-expect-error - This comparison is intentional to ensure proper typing
      expect(result2 === 4).toEqual(false); // verify type
    });

    it("should return undefined for undefined", () => {
      const result = v.parse(qpSchema.enum(["a", "b", "c"]), undefined);
      expect(result).toBeUndefined();
    });

    it("should return undefined for invalid values", () => {
      const result = v.parse(qpSchema.enum(["a", "b", "c"]), "d");
      expect(result).toBeUndefined();
      const result2 = v.parse(qpSchema.enum([1, 2, 3]), "4");
      expect(result2).toBeUndefined();
    });
  });

  describe("enumList", () => {
    it("should parse a comma separated list of enum values", () => {
      const result = v.parse(qpSchema.enumList(["a", "b", "c"]), "a,b,c");
      expect(result).toEqual(["a", "b", "c"]);
      expect(result.includes("a")).toEqual(true); // verify type
      // @ts-expect-error - This comparison is intentional to ensure proper typing
      expect(result.includes("d")).toEqual(false); // verify type
      const result2 = v.parse(qpSchema.enumList([1, 2, 3]), "1,2,3");
      expect(result2).toEqual([1, 2, 3]);
      expect(result2.includes(1)).toEqual(true); // verify type
      // @ts-expect-error - This comparison is intentional to ensure proper typing
      expect(result2.includes(4)).toEqual(false); // verify type
    });

    it("should return an empty array for undefined", () => {
      const result = v.parse(qpSchema.enumList(["a", "b", "c"]), undefined);
      expect(result).toEqual([]);
      const result2 = v.parse(qpSchema.enumList([1, 2, 3]), undefined);
      expect(result2).toEqual([]);
    });

    it("should filter out invalid values", () => {
      const result = v.parse(qpSchema.enumList(["a", "b", "c"]), "a,b,c,d");
      expect(result).toEqual(["a", "b", "c"]);
      const result2 = v.parse(qpSchema.enumList([1, 2, 3]), "1,2,3,4");
      expect(result2).toEqual([1, 2, 3]);
    });
  });
});

describe("setQueryParams", () => {
  it("should set query params", () => {
    const schema = v.object({ show: qpSchema.boolean });
    const params = new URLSearchParams();
    params.set("status", "active"); // existing param outside of schema
    const newParams = { show: true };
    const newSearchParams = setQueryParams({ params, newParams, schema });
    expect(newSearchParams.get("show")).toEqual("true");
    expect(newSearchParams.get("status")).toEqual("active"); // preserves existing param outside of schema
  });
});

describe("parseQueryParams", () => {
  it("should parse query params", () => {
    const schema = v.object({ show: qpSchema.boolean });
    const params = new URLSearchParams();
    params.set("show", "true");
    const result = parseQueryParams({ params, schema });
    expect(result.show).toEqual(true);
  });
});
