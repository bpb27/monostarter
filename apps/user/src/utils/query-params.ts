import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import * as v from "valibot";
import type { AnyObjectSchema } from "./generic-types";

const isNumberArray = (values: unknown[]): values is number[] => values.every((v) => typeof v === "number");

export const qpSchema = {
  number: v.pipe(
    v.optional(v.string()),
    v.transform((value) => {
      if (!value) return undefined;
      const parsed = Number(value);
      return Number.isNaN(parsed) ? undefined : parsed;
    }),
  ),
  numberList: v.pipe(
    v.optional(v.string()),
    v.transform((value) =>
      value
        ? value
            .split(",")
            .map((v) => Number(v))
            .filter((n) => !Number.isNaN(n))
        : [],
    ),
  ),
  string: v.pipe(
    v.optional(v.string()),
    v.transform((value) => (value ? value.trim() : undefined)),
  ),
  stringList: v.pipe(
    v.optional(v.string()),
    v.transform((value) => (value ? value.split(",").map((v) => v.trim()) : [])),
  ),
  boolean: v.pipe(
    v.optional(v.string()),
    v.transform((value) => (value === "true" || value === "false" ? value === "true" : undefined)),
  ),
  enum: <T extends string | number>(values: T[]) =>
    v.pipe(
      v.optional(v.string()),
      v.transform((value) => {
        if (!value) return undefined;
        if (isNumberArray(values)) {
          return values.includes(Number(value)) ? (Number(value) as T) : undefined;
        }
        return values.includes(value as T) ? (value as T) : undefined;
      }),
    ),
  enumList: <T extends string | number>(values: T[]) =>
    v.pipe(
      v.optional(v.string()),
      v.transform((value) => {
        if (!value) return [];
        if (isNumberArray(values)) {
          return value
            .split(",")
            .map((v) => Number(v))
            .filter((n) => values.includes(n)) as T[];
        }
        return value
          .split(",")
          .map((v) => v.trim())
          .filter((v) => values.includes(v as T)) as T[];
      }),
    ),
};

export const parseQueryParams = <TSchema extends AnyObjectSchema>({
  params,
  schema,
}: {
  params: URLSearchParams;
  schema: TSchema;
}) => {
  const result: Record<string, unknown> = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return v.parse(schema, result);
};

export const setQueryParams = <TSchema extends AnyObjectSchema>({
  params,
  newParams,
}: {
  params: URLSearchParams;
  schema: TSchema;
  newParams: v.InferOutput<TSchema>;
}) => {
  const newSearchParams = new URLSearchParams(params);
  for (const [key, value] of Object.entries(newParams)) {
    newSearchParams.set(key, value);
  }
  return newSearchParams;
};

export const useQueryParams = <TSchema extends AnyObjectSchema>(schema: TSchema) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const qps = useMemo(() => parseQueryParams({ params: searchParams, schema }), [searchParams, schema]);
  const setQps = useCallback(
    (params: v.InferOutput<TSchema>) => {
      const newSearchParams = setQueryParams({ params: searchParams, newParams: params, schema });
      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams, schema],
  );
  return [qps, setQps] as const;
};
