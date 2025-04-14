export type Maybe<T> = T | undefined | null;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Brand<T, TBrand> = T & { _brand: TBrand };

export type Result<TData, TError> = { success: true; data: TData } | { success: false; error: TError };
export type ResultSuccess<TResult extends Result<unknown, unknown>> = Extract<TResult, { success: true }>["data"];
export type ResultError<TResult extends Result<unknown, unknown>> = Extract<TResult, { success: false }>["error"];

export const result = {
  success: <TData>(data: TData): Result<TData, never> => ({ success: true, data }),
  error: <TError>(error: TError): Result<never, TError> => ({ success: false, error }),
};
