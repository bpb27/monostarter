import { serve } from "@hono/node-server";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "@repo/api";
import { Hono } from "hono";

const app = new Hono();

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
