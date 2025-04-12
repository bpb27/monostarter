import { Static, TObject } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { useCallback, useMemo, useState } from "react";

export const useForm = <TSchema extends TObject, TInitial extends Static<TSchema>>(
  schema: TSchema,
  initialValues: TInitial,
) => {
  const [formData, setFormData] = useState<TInitial>(initialValues);
  const [touched, setTouched] = useState({} as Record<keyof TInitial, boolean>);
  const [submitted, setSubmitted] = useState(false);

  const isValid = useMemo(() => Value.Check(schema, formData), [schema, formData]);

  const update = useCallback(<T extends keyof TInitial>(key: T, value: TInitial[T]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  }, []);

  const onSubmit = useCallback(
    (callback: (data: TInitial) => void) => (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      if (isValid) callback(formData);
    },
    [formData, isValid],
  );

  const errors = useMemo(() => {
    return Array.from(Value.Errors(schema, formData)).reduce(
      (acc, issue) => {
        const key = issue.path.substring(1) as keyof TInitial;
        if (!touched[key] && !submitted) return acc;
        acc[key] = issue.schema.description || issue.message;
        return acc;
      },
      {} as Record<keyof TInitial, string>,
    );
  }, [formData, schema, touched, submitted]);

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
        onChange: e => update(typedKey, e.target.value as TInitial[typeof typedKey]),
        onBlur: () => setTouched(prev => (!prev[typedKey] ? { ...prev, [typedKey]: true } : prev)),
      };
    }

    return fieldMap;
  }, [formData, initialValues, update]);

  return { fields, data: formData, isValid, errors, onSubmit };
};

export type Form<TSchema extends TObject, TInitial extends Static<TSchema> = Static<TSchema>> = ReturnType<
  typeof useForm<TSchema, TInitial>
>;
