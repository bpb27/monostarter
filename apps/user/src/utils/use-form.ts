import { useState } from "react";
import * as v from "valibot";

// biome-ignore lint/suspicious/noExplicitAny: used for a generic
type AnyObjectSchema = v.ObjectSchema<Record<string, any>, undefined>;

export const useForm = <TSchema extends AnyObjectSchema, TInitial extends v.InferInput<TSchema>>(
  schema: TSchema,
  initialValues: TInitial,
) => {
  const [formData, setFormData] = useState<TInitial>(initialValues);

  const update = <T extends keyof TInitial>(key: T, value: TInitial[T]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const result = v.safeParse(schema, formData);
  const issues = result.issues ? v.flatten<TSchema>(result.issues).nested : undefined;

  const fields = Object.keys(initialValues).reduce(
    (acc, key) => {
      const typedKey = key as keyof TInitial;
      acc[typedKey] = {
        error: issues && typedKey in issues ? issues[typedKey]?.[0] : undefined,
        name: typedKey,
        value: formData[typedKey],
        onChange: (e) => update(typedKey, e.target.value as TInitial[typeof typedKey]),
      };
      return acc;
    },
    {} as {
      [K in keyof TInitial]: {
        error: string | undefined;
        name: K;
        value: TInitial[K];
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      };
    },
  );

  return { fields, data: formData, isValid: result.success };
};

export type Form<
  TSchema extends AnyObjectSchema,
  TInitial extends v.InferInput<TSchema> = v.InferInput<TSchema>,
> = ReturnType<typeof useForm<TSchema, TInitial>>;
