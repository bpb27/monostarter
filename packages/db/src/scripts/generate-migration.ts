import fs from "node:fs";
import path from "node:path";

const name = process.argv[2];
if (typeof name !== "string") {
	console.error("Provide a migration name, e.g.");
	console.log("pnpm migration adding_alt_id_column_to_users_table");
	process.exit(1);
}

const contents = `
import type { MigrationDbState } from "../scripts/migration-types";

export async function up(db: MigrationDbState): Promise<void> {
  await db.insertInto("fake").values([]).execute();
}

export async function down(db: MigrationDbState): Promise<void> {
  // undo the changes in "up" if relevant, or leave empty
  // await db.deleteFrom('fake').execute();
}
`;

const filePath = path.join(__dirname, "../migrations", `${new Date().toISOString().replace(/[\D]/g, "")}_${name}.ts`);
fs.writeFileSync(filePath, contents);
