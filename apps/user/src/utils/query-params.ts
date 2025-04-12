import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import { AnySerializerSchema, Decoded, Encoded, createSerializer } from "./serializer";

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

  /** Toggles a value in a list*/
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
