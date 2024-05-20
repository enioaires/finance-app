import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { zValidator } from "@hono/zod-validator";
import { accounts, insertAccountSchema } from "@/db/schema";
import { getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
import { uuidv7 } from "uuidv7";

const app = new Hono()
  .get("/", async (ctx) => {
    const auth = getAuth(ctx);

    if (!auth?.userId) {
      return ctx.json({ error: "Unauthorized" }, 401);
    }

    const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts)
      .where(eq(accounts.userId, auth.userId));

    return ctx.json({ data });
  })
  .post(
    "/",
    zValidator(
      "json",
      insertAccountSchema.pick({
        name: true,
      })
    ),
    async (ctx) => {
      const auth = getAuth(ctx);
      const { name } = ctx.req.valid("json");

      if (!auth?.userId) {
        return ctx.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .insert(accounts)
        .values({
          id: uuidv7(),
          userId: auth.userId,
          name,
        })
        .returning();

      return ctx.json({ data });
    }
  );

export default app;
