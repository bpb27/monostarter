import { serve } from "@hono/node-server";
import { trpcServer } from "@hono/trpc-server";
import { initTRPC } from "@trpc/server";
import { Hono } from "hono";
import * as v from "valibot";

const app = new Hono();

const t = initTRPC.create();
const publicProcedure = t.procedure;
const router = t.router;
const validator =
	<T extends v.GenericSchema>(schema: T) =>
	(input: unknown) =>
		v.parse(schema, input);

const appRouter = router({
	hello: publicProcedure
		.input(validator(v.object({ name: v.string() })))
		.output(validator(v.object({ greeting: v.string() })))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.name}`,
			};
		}),
});

export type AppRouter = typeof appRouter;

app.get("/", (c) => {
	return c.text("What is up big dog?");
});

app.use("/trpc/*", trpcServer({ router: appRouter }));

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
	fetch: app.fetch,
	port,
});
