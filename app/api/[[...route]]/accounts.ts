import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";
import { getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";

const app = new Hono().get(
  "/",
  async (ctx) => {
    const auth = getAuth(ctx);

    if (!auth?.userId) {
      throw new HTTPException(401, {
        res: ctx.json({ error: "Unauthorized" }),
      });
    }
  },
  async (ctx) => {
    const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts);

    return ctx.json({ data });
  }
);

export default app;
