import { Hono } from "hono";
import leaderboard from "../db/leaderboard.json";

import{serveStatic }from "hono/serve-static.module"
import presidents from "../db/presidents.json"
import teams from "../db/teams.json"

const app = new Hono();

app.get("/", (c) => {
  return c.json([
    { endpoint: "/leaderboard", description: "Returns the kings league leaderboard " },
    { endpoint: "/teams", description: "Returns the kings league teams " },
    { endpoint: "/teams/:id", description: "Returns a team by its id " },
    { endpoint: "/presidents", description: "Returns the kings league presidents " },
    { endpoint: "/presidents/:id", description: "Returns a president by its id " },

  ]);
});

app.get("/leaderboard", (c) => {
  return c.json(leaderboard);
});
app.get("/teams", (c) => {
  return c.json(teams);
});
app.get("/teams/:id", (c) => {
  const foundTeam = teams.find(team=>team.id === c.req.param('id'))
  return foundTeam ? c.json(foundTeam): c.json({message:'team not found'},404) ;
});
app.get("/presidents", (c) => {
  return c.json(presidents);
});
app.get("/presidents/:id", (c) => {
  let president = presidents.find((president) => president.id === c.req.param('id') )
  return president ? c.json(president) : c.json({message:'president not found'}, 404);
});
app.get("/static/*",serveStatic({root:"./"}))

export default app;
