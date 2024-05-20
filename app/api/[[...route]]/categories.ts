import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { zValidator } from "@hono/zod-validator";
import { categories, insertCategoriesSchema } from "@/db/schema";
import { getAuth } from "@hono/clerk-auth";
import { and, eq, inArray } from "drizzle-orm";
import { uuidv7 } from "uuidv7";
import { z } from "zod";

const app = new Hono()
  .get("/", async (ctx) => {
    const auth = getAuth(ctx);

    if (!auth?.userId) {
      return ctx.json({ error: "Unauthorized" }, 401);
    }

    const data = await db
      .select({
        id: categories.id,
        name: categories.name,
      })
      .from(categories)
      .where(eq(categories.userId, auth.userId));

    return ctx.json({ data });
  })
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    async (ctx) => {
      const auth = getAuth(ctx);
      const { id } = ctx.req.valid("param");

      if (!auth?.userId) {
        return ctx.json({ error: "Unauthorized" }, 401);
      }

      if (!id) return ctx.json({ error: "Id is required" }, 400);

      const [data] = await db
        .select({
          id: categories.id,
          name: categories.name,
        })
        .from(categories)
        .where(and(eq(categories.userId, auth.userId), eq(categories.id, id)));

      if (!data) return ctx.json({ error: "Not found" }, 404);

      return ctx.json({ data });
    }
  )
  .post(
    "/",
    zValidator(
      "json",
      insertCategoriesSchema.pick({
        name: true,
      })
    ),
    async (ctx) => {
      const auth = getAuth(ctx);
      const { name } = ctx.req.valid("json");

      if (!auth?.userId) {
        return ctx.json({ error: "Unauthorized" }, 401);
      }

      if (!name) return ctx.json({ error: "Name is required" }, 400);

      const [data] = await db
        .insert(categories)
        .values({
          id: uuidv7(),
          userId: auth.userId,
          name,
        })
        .returning();

      return ctx.json({ data });
    }
  )
  .post(
    "/bulk-delete",
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (ctx) => {
      const auth = getAuth(ctx);
      const values = ctx.req.valid("json");

      if (!auth?.userId) {
        return ctx.json({ error: "Unauthorized" }, 401);
      }

      if (!values.ids.length)
        return ctx.json({ error: "Ids are required" }, 400);

      const data = await db
        .delete(categories)
        .where(
          and(
            eq(categories.userId, auth.userId),
            inArray(categories.id, values.ids)
          )
        )
        .returning({
          id: categories.id,
        });

      return ctx.json({ data });
    }
  )
  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    zValidator(
      "json",
      insertCategoriesSchema.pick({
        name: true,
      })
    ),
    async (ctx) => {
      const auth = getAuth(ctx);
      const { id } = ctx.req.valid("param");
      const values = ctx.req.valid("json");

      if (!auth?.userId) {
        return ctx.json({ error: "Unauthorized" }, 401);
      }

      if (!id || !values.name)
        return ctx.json({ error: "Missing fields" }, 400);

      const [data] = await db
        .update(categories)
        .set(values)
        .where(and(eq(categories.userId, auth.userId), eq(categories.id, id)))
        .returning();

      if (!data) return ctx.json({ error: "Not found" }, 404);

      return ctx.json({ data });
    }
  )
  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    async (ctx) => {
      const auth = getAuth(ctx);
      const { id } = ctx.req.valid("param");

      if (!auth?.userId) {
        return ctx.json({ error: "Unauthorized" }, 401);
      }

      if (!id) return ctx.json({ error: "Id is required" }, 400);

      const [data] = await db
        .delete(categories)
        .where(and(eq(categories.userId, auth.userId), eq(categories.id, id)))
        .returning({
          id: categories.id,
        });

      if (!data) return ctx.json({ error: "Not found" }, 404);

      return ctx.json({ data });
    }
  );

export default app;
