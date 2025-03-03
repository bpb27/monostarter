import { initTRPC } from "@trpc/server";
import * as v from "valibot";
import { db } from "../database/database.js";
import { matchesPassword } from "../database/utils/hash_password.js";

const t = initTRPC.context().create({
	errorFormatter(opts) {
		const { code, message, cause } = opts.error;
		const validation = cause instanceof v.ValiError ? cause.issues : null;
		return { code, message, data: { validation } };
	},
});

const publicProcedure = t.procedure;
const router = t.router;

const validator =
	<T extends v.GenericSchema>(schema: T) =>
	(input: unknown) =>
		v.parse(schema, input);

export const appRouter = router({
	users: router({
		getById: publicProcedure.input(validator(v.object({ id: v.string() }))).query(({ input }) => {
			return db.selectFrom("users").selectAll().where("id", "=", input.id).executeTakeFirstOrThrow();
		}),
	}),
	login: publicProcedure
		.input(validator(v.object({ email: v.string(), password: v.string() })))
		.mutation(async ({ input }) => {
			const user = await db
				.selectFrom("users")
				.select(["id", "passwordHash", "email"])
				.where("email", "=", input.email)
				.executeTakeFirst();
			if (!user) throw new Error("User not found");
			const passwordValid = await matchesPassword(input.password, user.passwordHash);
			if (!passwordValid) throw new Error("Invalid password");
			return { id: user.id, email: user.email, isRad: false };
		}),
});

export type AppRouter = typeof appRouter;
