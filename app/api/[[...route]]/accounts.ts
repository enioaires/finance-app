import { Hono } from "hono";

const app = new Hono().get("/", (ctx) => {
  return ctx.json({ accounts: [] });
});

export default app;
