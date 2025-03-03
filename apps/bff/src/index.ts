import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { type AppRouter, appRouter } from "./api/router.js";
export type { AppRouter };

const app = express();

app.use(cors());

app.get("/hello", (_req, res) => {
	res.json({ greeting: "Hello World!" });
});

app.use("/trpc", trpcExpress.createExpressMiddleware({ router: appRouter }));

const server = app.listen(3000, () => {
	console.log("Server started on port 3000");
});

const exit = (reason: "SIGTERM" | "SIGINT") => {
	console.log(`Exiting because of ${reason}`);
	server.close(() => {
		process.exit(0);
	});
};

// properly close on nodemon restart
process.on("SIGTERM", () => exit("SIGTERM"));
process.on("SIGINT", () => exit("SIGINT"));
