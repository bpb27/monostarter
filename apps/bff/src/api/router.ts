import { TRPCError, initTRPC } from "@trpc/server";
import * as v from "valibot";
import { db } from "../database/database.js";
import { matchesPassword } from "../database/utils/hash_password.js";

// TODO: something off here
const t = initTRPC.context().create({
  errorFormatter({ shape, error }) {
    if (error?.cause instanceof v.ValiError) {
      const flattened = v.flatten(error.cause.issues).nested;
      return { ...shape, data: { ...shape.data, validation: flattened } };
    } else {
      return { ...shape, data: { ...shape.data, cause: error.cause } };
    }
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
      const user = db.selectFrom("users").selectAll().where("id", "=", input.id).executeTakeFirst();
      if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      return user;
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
      if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      const passwordValid = await matchesPassword(input.password, user.passwordHash);
      if (!passwordValid) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid email or password" });
      return { id: user.id, email: user.email };
    }),
});

export type AppRouter = typeof appRouter;
