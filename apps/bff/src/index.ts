import { appRouter } from "@repo/api";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.use("/trpc", trpcExpress.createExpressMiddleware({ router: appRouter }));
app.listen(3000);
