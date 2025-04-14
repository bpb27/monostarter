import { is } from "./is.js";
import { Prettify, Result, ResultSuccess, result } from "./utility-types.js";

const regExps = {
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

type Email = string & { _brand: "email" };
const isEmail = (value: string): value is Email => regExps.email.test(value);

const errors = {
  minLength: (min: number) => ({
    key: "minLength" as const,
    message: `Must be at least ${min} characters long`,
  }),
  maxLength: (max: number) => ({
    key: "maxLength" as const,
    message: `Must be at most ${max} characters long`,
  }),
  min: (min: number) => ({
    key: "min" as const,
    message: `Must be at least ${min}`,
  }),
  max: (max: number) => ({
    key: "max" as const,
    message: `Must be at most ${max}`,
  }),
  required: () => ({
    key: "required" as const,
    message: "Field is required",
  }),
};

type ErrorMessage = ReturnType<(typeof errors)[keyof typeof errors]>;

// TODO: pattern, separate optionals
const fields = {
  integer: (conditions: { optional?: boolean; min?: number; max?: number } = {}) => {
    return (value: unknown): Result<number, ErrorMessage> => {
      if (conditions.optional && is.undefined(value)) {
        return result.success(0); // TODO
      } else if (!is.integer(value)) {
        return result.error(errors.required());
      } else if (conditions.min && value < conditions.min) {
        return result.error(errors.minLength(conditions.min));
      } else if (conditions.max && value > conditions.max) {
        return result.error(errors.maxLength(conditions.max));
      }
      return result.success(value);
    };
  },
  string: (conditions: { minLength?: number; maxLength?: number; optional?: boolean } = {}) => {
    return (value: unknown): Result<string, ErrorMessage> => {
      if (conditions.optional && is.undefined(value)) {
        return result.success(""); // TODO
      } else if (!is.string(value)) {
        return result.error(errors.required());
      } else if (conditions.minLength && value.length < conditions.minLength) {
        return result.error(errors.minLength(conditions.minLength));
      } else if (conditions.maxLength && value.length > conditions.maxLength) {
        return result.error(errors.maxLength(conditions.maxLength));
      }
      return result.success(value);
    };
  },
};

type AnyField = (value: unknown) => Result<unknown, ErrorMessage>;

type AnySchemaObject = {
  [key: string]: AnyField | AnySchemaObject;
};

type FieldValue<T extends AnyField> = ResultSuccess<ReturnType<T>>;

type SchemaValue<T> = Prettify<{
  [K in keyof T]: T[K] extends AnyField ? FieldValue<T[K]> : T[K] extends AnySchemaObject ? SchemaValue<T[K]> : never;
}>;

const myGuy = {
  id: fields.integer(),
  firstName: fields.string(),
};

type MyGuy = SchemaValue<typeof myGuy>;

// Example with nested object
const myNestedGuy = {
  id: fields.integer(),
  firstName: fields.string(),
  address: {
    street: fields.string(),
    city: fields.string(),
    zip: fields.integer(),
    account: {
      id: fields.integer(),
    },
  },
};

type MyNestedGuy = SchemaValue<typeof myNestedGuy>;

// TODO: fields.objects
// TODO: error response from validate should mirror the structure of the schema
// const validate = <T extends AnySchemaObject>(schema: T) => (data: unknown): Result<SchemaValue<T>, string> => {

// };
