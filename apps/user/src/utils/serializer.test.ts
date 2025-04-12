import { describe, expect, test } from "vitest";
import { createSerializer, fieldTypes, is, transform } from "./serializer";

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

describe("fieldTypes", () => {
  test("boolean", () => {
    const { encode, decode } = fieldTypes.boolean();

    expect(encode(true)).toEqual("true");
    expect(encode(false)).toEqual("false");
    expect(encode(null)).toBeUndefined();

    expect(decode("true")).toEqual(true);
    expect(decode("false")).toEqual(false);
    expect(decode(null)).toBeUndefined();
  });

  test("string", () => {
    const { encode, decode } = fieldTypes.string();

    expect(encode("hello")).toEqual("hello");
    expect(encode(null)).toBeUndefined();

    expect(decode("hello")).toEqual("hello");
    expect(decode(null)).toBeUndefined();
  });

  test("integer", () => {
    const { encode, decode } = fieldTypes.integer();

    expect(encode(123)).toEqual("123");
    expect(encode(null)).toBeUndefined();

    expect(decode("123")).toEqual(123);
    expect(decode(null)).toBeUndefined();
  });

  test("enum", () => {
    const values = ["hello", "world"];

    const { encode, decode } = fieldTypes.enum(values);

    expect(encode("hello")).toEqual("hello");
    expect(encode("world")).toEqual("world");
    expect(encode(null)).toBeUndefined();

    expect(decode("hello")).toEqual("hello");
    expect(decode("world")).toEqual("world");
    expect(decode(null)).toBeUndefined();
  });

  test("strings", () => {
    const { encode, decode } = fieldTypes.strings();

    expect(encode(["hello", "world"])).toEqual("hello,world");
    expect(encode(null)).toBeUndefined();

    expect(decode("hello,world")).toEqual(["hello", "world"]);
    expect(decode(null)).toEqual([]);
  });

  test("integers", () => {
    const { encode, decode } = fieldTypes.integers();

    expect(encode([123, 456])).toEqual("123,456");
    expect(encode(null)).toBeUndefined();

    expect(decode("123,456")).toEqual([123, 456]);
    expect(decode(null)).toEqual([]);
  });

  test("enums", () => {
    const values = ["hello", "world"];

    const { encode, decode } = fieldTypes.enums(values);

    expect(encode(["hello", "world"])).toEqual("hello,world");
    expect(encode(null)).toBeUndefined();

    expect(decode("hello,world")).toEqual(["hello", "world"]);
    expect(decode(null)).toEqual([]);
  });
});

describe("createSerializer", () => {
  const schema = {
    isOn: fieldTypes.boolean(),
    name: fieldTypes.string(),
    count: fieldTypes.integer(),
    greeting: fieldTypes.enum(["hello", "world"]),
    names: fieldTypes.strings(),
    counts: fieldTypes.integers(),
    permissions: fieldTypes.enums(["read", "write"]),
    empty: fieldTypes.enum([]),
  };

  const { encode, decode } = createSerializer(schema);

  const decoded = {
    isOn: true,
    name: "hello",
    count: 123,
    greeting: "hello" as const,
    names: ["hello", "world"],
    counts: [123, 456],
    permissions: ["read" as const, "write" as const],
    empty: undefined,
  };

  const encoded = {
    isOn: "true",
    name: "hello",
    count: "123",
    greeting: "hello",
    names: "hello,world",
    counts: "123,456",
    permissions: "read,write",
    empty: undefined,
  };

  test("encodes", () => {
    const result = encode(decoded);
    expect(result).toEqual(encoded);
  });

  test("decodes", () => {
    const result = decode(encoded);
    expect(result).toEqual(decoded);
  });
});
