import { initTRPC } from "@trpc/server";
import * as v from "valibot";

const t = initTRPC.create();
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
        greeting: `hello ${input.name}`,
      };
    }),
});

export type AppRouter = typeof appRouter;
