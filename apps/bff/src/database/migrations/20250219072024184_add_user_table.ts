import { sql } from "kysely";
import type { MigrationDbState } from "../scripts/migration-types.js";

export async function up(db: MigrationDbState): Promise<void> {
  await db.schema
    .createTable("users")
    .addColumn("id", "varchar(40)", col => col.primaryKey().defaultTo(sql`concat('usr_', gen_random_uuid())`))
    .addColumn("email", "varchar(255)", col => col.unique().notNull())
    .addColumn("first_name", "varchar(100)", col => col.notNull())
    .addColumn("last_name", "varchar(100)", col => col.notNull())
    .addColumn("password_hash", "varchar(255)", col => col.notNull())
    .addColumn("created_at", "timestamptz", col => col.notNull().defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamptz", col => col.notNull().defaultTo(sql`now()`))
    .execute();
}

export async function down(db: MigrationDbState): Promise<void> {
  await db.schema.dropTable("users").execute();
}
