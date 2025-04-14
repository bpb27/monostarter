import { is } from "./is.js";
import { transform } from "./transform.js";
import { Maybe, Prettify } from "./utility-types.js";

const fieldTypesList = <T, U>({
  encode,
  decode,
  typeGuard,
}: {
  encode: (v: Maybe<T>) => string | undefined;
  decode: (v: Maybe<string>) => U | undefined;
  typeGuard: (v: unknown) => v is U;
}) => ({
  encode: (v: Maybe<T[]>) => v?.map(encode).filter(is.string).join(","),
  decode: (v: Maybe<string>) => (v ? v.split(",").map(decode).filter(typeGuard) : []),
});

export const fieldTypes = {
  boolean: () => ({
    encode: transform.booleanToString,
    decode: transform.stringToBoolean,
  }),
  string: () => ({
    encode: transform.stringToString,
    decode: transform.stringToString,
  }),
  integer: () => ({
    encode: transform.integerToString,
    decode: transform.stringToInteger,
  }),
  enum: <T extends string>(values: T[]) => ({
    encode: transform.enumToString(values),
    decode: transform.stringToEnum(values),
  }),
  strings: () =>
    fieldTypesList({
      encode: transform.stringToString,
      decode: transform.stringToString,
      typeGuard: is.string,
    }),
  integers: () =>
    fieldTypesList({
      encode: transform.integerToString,
      decode: transform.stringToInteger,
      typeGuard: is.integer,
    }),
  enums: <T extends string>(values: T[]) =>
    fieldTypesList({
      encode: transform.enumToString(values),
      decode: transform.stringToEnum(values),
      typeGuard: is.enum(values),
    }),
};

export type AnySerializerSchema = Record<
  string,
  {
    // biome-ignore lint/suspicious/noExplicitAny: generic
    encode: (v: any) => string | undefined;
    decode: (v: Maybe<string>) => unknown;
  }
>;

export type Decoded<T extends AnySerializerSchema> = Prettify<{
  [K in keyof T]: ReturnType<T[K]["decode"]>;
}>;

export type Encoded<T extends AnySerializerSchema> = Prettify<{
  [K in keyof T]: ReturnType<T[K]["encode"]>;
}>;

export const createSerializer = <T extends AnySerializerSchema>(schema: T) => {
  return {
    encode: (params: Partial<Decoded<T>>) => {
      const result: Record<string, string | undefined> = {};
      for (const key of Object.keys(schema)) {
        if (schema[key] && params[key] !== undefined) {
          result[key] = schema[key].encode(params[key]);
        }
      }
      return result as Encoded<T>;
    },
    decode: (params: Encoded<T>) => {
      const result: Record<string, unknown> = {};
      for (const key of Object.keys(schema)) {
        if (schema[key]) {
          result[key] = schema[key].decode(params[key]);
        }
      }
      return result as Decoded<T>;
    },
  };
};
