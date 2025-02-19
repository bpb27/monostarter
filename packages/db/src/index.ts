import { CamelCasePlugin, Kysely, ParseJSONResultsPlugin, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { DB } from "./generated-db-schema";

const plugins = [new CamelCasePlugin(), new ParseJSONResultsPlugin()];

export const createDbPool = () =>
	new Kysely<DB>({
		dialect: new PostgresDialect({
			pool: new Pool({
				connectionString: "postgresql://localhost:5432/monostarter",
				max: 10,
			}),
		}),
		log: ["query"],
		plugins,
	});

export const db = createDbPool();
