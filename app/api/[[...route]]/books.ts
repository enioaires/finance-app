// books.ts
import { Hono } from "hono";
import { getAuth } from "@hono/clerk-auth";

type latestComments = {
  id: string;
  text: string;
  timestamp: string;
};

export type Comment = {
  latestComments: latestComments[];
  url: string;
};

const app = new Hono();

app.get("/", (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    return c.json("Unauthorized", 401);
  }
  return c.json("list books");
});
app.post("/", (c) => c.json("create a book", 201));
app.get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

export default app;
