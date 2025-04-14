import { is } from "./is.js";
import { Maybe } from "./utility-types.js";

export const transform = {
  stringToString: (value: Maybe<string>): string | undefined => {
    if (is.string(value)) return value;
    return undefined;
  },
  integerToString: (value: Maybe<number>): string | undefined => {
    if (is.integer(value)) return String(value);
    return undefined;
  },
  stringToInteger: (value: Maybe<string>): number | undefined => {
    if (is.string(value) && is.integer(Number(value))) return Number(value);
    return undefined;
  },
  booleanToString: (value: Maybe<boolean>): string | undefined => {
    if (value === true) return "true";
    if (value === false) return "false";
    return undefined;
  },
  stringToBoolean: (value: Maybe<string>): boolean | undefined => {
    if (value === "true") return true;
    if (value === "false") return false;
    return undefined;
  },
  enumToString:
    <T extends string>(values: T[]) =>
    (value: Maybe<T>): string | undefined => {
      if (is.enum(values)(value)) return String(value);
      return undefined;
    },
  stringToEnum:
    <T extends string>(values: T[]) =>
    (value: Maybe<string>): T | undefined => {
      if (is.string(value) && is.enum(values)(value)) return value;
      return undefined;
    },
};
