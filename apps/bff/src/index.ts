import { appRouter } from "@repo/api";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.get("/hello", (_req, res) => {
	res.json({ greeting: "Hello World!" });
});
app.use("/trpc", trpcExpress.createExpressMiddleware({ router: appRouter }));

const server = app.listen(3000, () => {
	console.log("Server started on port 3000");
});

// Handle cleanup
process.on("SIGTERM", () => {
	console.log("SIGTERM received, shutting down...");
	server.close(() => {
		process.exit(0);
	});
});

process.on("SIGINT", () => {
	console.log("SIGINT received, shutting down...");
	server.close(() => {
		process.exit(0);
	});
});
