import { describe, expect, test } from "vitest";
import { is } from "../is.js";

describe("is", () => {
  test("string", () => {
    const valid = ["hello", "", `${1} year`];
    const invalid = [123, true, null, undefined, {}, []];
    expect(valid.every(is.string)).toEqual(true);
    expect(invalid.some(is.string)).toEqual(false);
  });

  test("integer", () => {
    const valid = [123, 0, -1];
    const invalid = [0.5, Number.NaN, "hello", true, null, undefined, {}, []];
    expect(valid.every(is.integer)).toEqual(true);
    expect(invalid.some(is.integer)).toEqual(false);
  });

  test("boolean", () => {
    const valid = [true, false];
    const invalid = [123, "hello", null, undefined, {}, []];
    expect(valid.every(is.boolean)).toEqual(true);
    expect(invalid.some(is.boolean)).toEqual(false);
  });

  test("undefined", () => {
    const valid = [undefined];
    const invalid = [123, "hello", false, null, {}, []];
    expect(valid.every(is.undefined)).toEqual(true);
    expect(invalid.some(is.undefined)).toEqual(false);
  });

  test("null", () => {
    const valid = [null];
    const invalid = [123, "hello", false, undefined, {}, []];
    expect(valid.every(is.null)).toEqual(true);
    expect(invalid.some(is.null)).toEqual(false);
  });

  test("enum", () => {
    const values = ["hello", "world"];
    const valid = ["hello", "world"];
    const invalid = ["whoa", 123, true, null, undefined, {}, []];
    expect(valid.every(is.enum(values))).toEqual(true);
    expect(invalid.some(is.enum(values))).toEqual(false);
  });
});
