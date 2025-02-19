import { promises as fs } from "node:fs";
import * as path from "node:path";
import { FileMigrationProvider, Migrator } from "kysely";
import { db } from "../index";

async function migrate(direction: "migrateToLatest" | "migrateUp" | "migrateDown") {
	const migrationFolder = path.join(__dirname, "../migrations");
	const migrator = new Migrator({
		db,
		provider: new FileMigrationProvider({ fs, path, migrationFolder }),
	});

	const { error, results } = await migrator[direction]();

	if (error) {
		console.error(`failed to ${direction}`);
		console.error(error);
		process.exit(1);
	} else if (results) {
		for (const result of results) {
			if (result.status === "Success") {
				console.log(`migration "${result.migrationName}" was executed successfully`);
			} else if (result.status === "Error") {
				console.error(`failed to execute migration "${result.migrationName}"`);
			}
		}
	} else {
		console.error("did not migrate anything");
	}

	await db.destroy();
}

const direction = process.argv.find((arg) => arg.startsWith("direction="))?.split("=")[1];

if (direction === "migrateToLatest" || direction === "migrateUp" || direction === "migrateDown") {
	migrate(direction);
} else {
	throw new Error("migration direction must be migrateToLatest, migrateUp, or migrateDown");
}
