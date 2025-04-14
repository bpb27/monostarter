import { describe, expect, test } from "vitest";
import { is } from "../is.js";
import { transform } from "../transform.js";

describe("transform", () => {
  test("stringToString", () => {
    const valid = ["hello", "world"];
    expect(valid.map(transform.stringToString)).toEqual(["hello", "world"]);

    const invalid = [null, undefined].map(transform.stringToString);
    expect(invalid.every(is.undefined)).toEqual(true);
  });

  test("integerToString", () => {
    const valid = [123, 0, -123];
    expect(valid.map(transform.integerToString)).toEqual(["123", "0", "-123"]);

    const invalid = [Number.NaN, Number.POSITIVE_INFINITY, null, undefined].map(transform.integerToString);
    expect(invalid.every(is.undefined)).toEqual(true);
  });

  test("stringToInteger", () => {
    const valid = ["123", "0", "-123"];
    expect(valid.map(transform.stringToInteger)).toEqual([123, 0, -123]);

    const invalid = ["a123", "NaN", null, undefined].map(transform.stringToInteger);
    expect(invalid.every(is.undefined)).toEqual(true);
  });

  test("booleanToString", () => {
    const valid = [true, false];
    expect(valid.map(transform.booleanToString)).toEqual(["true", "false"]);

    const invalid = [null, undefined].map(transform.booleanToString);
    expect(invalid.every(is.undefined)).toEqual(true);
  });

  test("stringToBoolean", () => {
    const valid = ["true", "false"];
    expect(valid.map(transform.stringToBoolean)).toEqual([true, false]);

    const invalid = ["1", null, undefined].map(transform.stringToBoolean);
    expect(invalid.every(is.undefined)).toEqual(true);
  });

  test("enumToString", () => {
    const values = ["hello", "world"];

    const valid = ["hello", "world"];
    expect(valid.every(is.enum(values))).toEqual(true);

    const invalid = ["ello", "worl", 123, true, null, undefined, {}, []];
    expect(invalid.some(is.enum(values))).toEqual(false);
  });

  test("stringToEnum", () => {
    const values = ["hello", "world"];

    const valid = ["hello", "world"];
    expect(valid.map(transform.stringToEnum(values))).toEqual(["hello", "world"]);

    const invalid = ["whoa", null, undefined];
    expect(invalid.map(transform.stringToEnum(values)).every(is.undefined)).toEqual(true);
  });
});
