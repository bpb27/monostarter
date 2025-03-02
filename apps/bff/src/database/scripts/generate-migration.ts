import fs from "node:fs";
import path from "node:path";

const name = process.argv[2];
if (typeof name !== "string") {
	console.error("Please provide a name for the migration");
	console.error("db:generate:migration add_fun_column_to_table");
	process.exit(1);
}

const contents = `
import type { MigrationDbState } from "../scripts/migration-types.js";

export async function up(db: MigrationDbState): Promise<void> {
  await db.insertInto("fake").values([]).execute();
}

export async function down(db: MigrationDbState): Promise<void> {
  // undo the changes in "up" if relevant, or leave empty
  // await db.deleteFrom('fake').execute();
}
`;

const filePath = path.join(
	path.dirname(new URL(import.meta.url).pathname),
	"../migrations",
	`${new Date().toISOString().replace(/[\D]/g, "")}_${name.replace(/-/g, "_")}.ts`,
);
fs.writeFileSync(filePath, contents);
