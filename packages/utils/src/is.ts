import { Brand } from "./utility-types.js";

const patterns = {
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

type Email = Brand<string, "email">;
type Url = Brand<string, "url">;

const primitives = {
  string: (value: unknown): value is string => {
    return typeof value === "string";
  },
  boolean: (value: unknown): value is boolean => {
    return typeof value === "boolean";
  },
  undefined: (value: unknown): value is undefined => {
    return typeof value === "undefined";
  },
  null: (value: unknown): value is null => {
    return value === null;
  },
  integer: (value: unknown): value is number => {
    return typeof value === "number" && Number.isInteger(value);
  },
  empty: (value: unknown): value is undefined | null => {
    return value === undefined || value === null;
  },
};

const composite = {
  enum:
    <T>(values: T[]) =>
    (value: unknown): value is T => {
      return values.includes(value as T);
    },
  email: (value: unknown): value is Email => {
    return primitives.string(value) && patterns.email.test(value);
  },
  url: (value: unknown): value is Url => {
    if (!primitives.string(value)) return false;
    try {
      // new URL(value.trim()); // TODO
      return true;
    } catch {
      return false;
    }
  },
};

export const is = {
  ...primitives,
  ...composite,
};
