import type { ObjectSchema } from "valibot";

// biome-ignore lint/suspicious/noExplicitAny: used for a generic
export type AnyObjectSchema = ObjectSchema<Record<string, any>, undefined>;
