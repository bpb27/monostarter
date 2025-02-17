import { initTRPC } from "@trpc/server";
import * as v from "valibot";

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
	hello: publicProcedure
		.input(validator(v.object({ name: v.string() })))
		.output(validator(v.object({ greeting: v.string() })))
		.query(({ input }) => {
			return {
				greeting: `${input.name}, welcome!`,
			};
		}),
});

export type AppRouter = typeof appRouter;
