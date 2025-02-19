import type { Kysely } from "kysely";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type MigrationDbState = Kysely<any>;
