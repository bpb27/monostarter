import { describe, expect, test } from "vitest";
import { Decoded, Encoded, createSerializer, fieldTypes } from "../serialize.js";

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

  test("empty decode provides all fields", () => {
    const result = decode({} as Encoded<typeof schema>);
    expect(result).toEqual({
      isOn: undefined,
      name: undefined,
      count: undefined,
      greeting: undefined,
      empty: undefined,
      names: [],
      counts: [],
      permissions: [],
    });
  });

  test("empty encode returns an empty object", () => {
    const result = encode({} as Decoded<typeof schema>);
    expect(result).toEqual({});
  });
});
