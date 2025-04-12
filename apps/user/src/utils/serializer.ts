import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

type Maybe<T> = T | undefined | null;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export const is = {
  string: (v: unknown): v is string => typeof v === "string",
  boolean: (v: unknown): v is boolean => typeof v === "boolean",
  undefined: (v: unknown): v is undefined => typeof v === "undefined",
  null: (v: unknown): v is null => v === null,
  integer: (v: unknown): v is number => typeof v === "number" && Number.isInteger(v),
  enum:
    <T>(values: T[]) =>
    (v: unknown): v is T =>
      values.includes(v as T),
};

export const transform = {
  stringToString: (v: Maybe<string>): string | undefined => {
    if (is.string(v)) return v;
    return undefined;
  },
  integerToString: (v: Maybe<number>): string | undefined => {
    if (is.integer(v)) return String(v);
    return undefined;
  },
  stringToInteger: (v: Maybe<string>): number | undefined => {
    if (is.string(v) && is.integer(Number(v))) return Number(v);
    return undefined;
  },
  booleanToString: (v: Maybe<boolean>): string | undefined => {
    if (v === true) return "true";
    if (v === false) return "false";
    return undefined;
  },
  stringToBoolean: (v: Maybe<string>): boolean | undefined => {
    if (v === "true") return true;
    if (v === "false") return false;
    return undefined;
  },
  enumToString:
    <T extends string>(values: T[]) =>
    (v: Maybe<T>): string | undefined => {
      if (is.enum(values)(v)) return String(v);
      return undefined;
    },
  stringToEnum:
    <T extends string>(values: T[]) =>
    (v: Maybe<string>): T | undefined => {
      if (is.string(v) && is.enum(values)(v)) return v;
      return undefined;
    },
};

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

type ToggleArg<T> = {
  [K in keyof T]: T[K] extends Array<infer U> ? { [Key in K]: U } : never;
}[keyof T];

const toggleListItem = <T>(list: T[], item: T): T[] => {
  const exists = list.includes(item);
  return exists ? list.filter(v => v !== item) : [...list, item];
};

export const useQueryParams = <T extends AnySerializerSchema>({ schema }: { schema: T }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { encode, decode } = useMemo(() => createSerializer(schema), [schema]);

  const values = useMemo(() => {
    return decode(Object.fromEntries(searchParams.entries()) as Encoded<T>);
  }, [searchParams, decode]);

  const setValues = useCallback(
    (newValues: Partial<Decoded<T>>) => {
      const newSearchParams = new URLSearchParams(searchParams);
      for (const [key, value] of Object.entries(encode(newValues))) {
        newSearchParams.set(key, value);
      }
      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams, encode],
  );

  const toggle = useCallback(
    (params: ToggleArg<Decoded<T>>) => {
      const updates: Partial<Decoded<T>> = {};
      for (const [key, value] of Object.entries(params)) {
        // @ts-ignore - complex
        updates[key] = toggleListItem(values[key], value);
      }
      setValues(updates);
    },
    [values, setValues],
  );

  return [values, setValues, toggle] as const;
};
