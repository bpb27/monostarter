import { useCallback, useMemo, useState } from "react";
import * as v from "valibot";
import type { AnyObjectSchema } from "./generic-types";

export const useForm = <TSchema extends AnyObjectSchema, TInitial extends v.InferInput<TSchema>>(
  schema: TSchema,
  initialValues: TInitial,
) => {
  const [formData, setFormData] = useState<TInitial>(initialValues);
  const [touched, setTouched] = useState({} as Record<keyof TInitial, boolean>);
  const [submitted, setSubmitted] = useState(false);

  const validation = useMemo(() => v.safeParse(schema, formData), [schema, formData]);

  const issues = useMemo(
    () => (validation.issues ? v.flatten<TSchema>(validation.issues).nested : undefined),
    [validation.issues],
  );

  const update = useCallback(<T extends keyof TInitial>(key: T, value: TInitial[T]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const onSubmit = useCallback(
    (callback: (data: TInitial) => void) => (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      if (validation.success) callback(formData);
    },
    [formData, validation],
  );

  const errors = useMemo(
    () =>
      Object.keys(initialValues).reduce(
        (acc, key) => {
          const typedKey = key as keyof TInitial;
          acc[typedKey] =
            issues && typedKey in issues && (touched[typedKey] || submitted) ? issues[typedKey]?.[0] : undefined;
          return acc;
        },
        {} as Record<keyof TInitial, string | undefined>,
      ),
    [initialValues, issues, touched, submitted],
  );

  const fields = useMemo(() => {
    const fieldMap = {} as {
      [K in keyof TInitial]: {
        name: K;
        value: TInitial[K];
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
      };
    };

    for (const key of Object.keys(initialValues)) {
      const typedKey = key as keyof TInitial;
      fieldMap[typedKey] = {
        name: typedKey,
        value: formData[typedKey],
        onChange: (e) => update(typedKey, e.target.value as TInitial[typeof typedKey]),
        onBlur: () => setTouched((prev) => (!prev[typedKey] ? { ...prev, [typedKey]: true } : prev)),
      };
    }

    return fieldMap;
  }, [formData, initialValues, update]);

  return { fields, data: formData, isValid: validation.success, errors, onSubmit };
};

export type Form<
  TSchema extends AnyObjectSchema,
  TInitial extends v.InferInput<TSchema> = v.InferInput<TSchema>,
> = ReturnType<typeof useForm<TSchema, TInitial>>;
