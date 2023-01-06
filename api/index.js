import { Hono } from "hono";
import leaderboard from "../db/leaderboard.json";

import{serveStatic }from "hono/serve-static.module"

const app = new Hono();

app.get("/", (c) => {
  return c.json([
    { endpoint: "/leaderboard", description: "Returns the leaderboard " },
  ]);
});

app.get("/leaderboard", (c) => {
  return c.json(leaderboard);
});

app.get("/static/*",serveStatic({root:"./"}))

export default app;