import { Hono } from "hono";
import leaderboard from "../db/leaderboard.json";

import{serveStatic }from "hono/serve-static.module"
import presidents from "../db/presidents.json"
import teams from "../db/teams.json"
import goals from "../db/goals.json";
import mvp from "../db/mvp.json"
import assists from "../db/assists.json"
import playersTwelve from "../db/players_twelve.json"

const app = new Hono();

app.get("/", (c) => {
  return c.json([
    { endpoint: "/leaderboard", description: "Returns the kings league leaderboard " },
    { endpoint: "/teams", description: "Returns the kings league teams " },
    { endpoint: "/teams/:id", description: "Returns a team by its id " },
    { endpoint: "/presidents", description: "Returns the kings league presidents " },
    { endpoint: "/presidents/:id", description: "Returns a president by its id " },
    { endpoint: "/goals", description: "Returns the goals scored by each player in the kings league" },
    { endpoint: "/mvp", description: "Returns the mvps won scored by each player in the kings league" },
    { endpoint: "/assists", description: "Returns the assists achieved by each player in the kings league" },
    { endpoint: "/playersTwelve", description: "Returns the star player of all teams in the kings league" },
    
  ]);
});

app.get("/leaderboard\\/?", (c) => {
  return c.json(leaderboard);
});
app.get("/teams\\/?", (c) => {
  return c.json(teams);
});
app.get("/teams/:id", (c) => {
  const foundTeam = teams.find(team=>team.id === c.req.param('id'))
  return foundTeam ? c.json(foundTeam): c.json({message:'team not found'},404) ;
});
app.get("/presidents\\/?", (c) => {
  return c.json(presidents);
});
app.get("/presidents/:id", (c) => {
  let president = presidents.find((president) => president.id === c.req.param('id') )
  return president ? c.json(president) : c.json({message:'president not found'}, 404);
});
app.get("/goals", (c) => {
  return c.json(goals);
});
app.get("/mvp", (c) => {
  return c.json(mvp);
});
app.get("/assists", (c) => {
  return c.json(assists);
});
app.get("/playersTwelve", (c) => {
  return c.json(playersTwelve);
});


app.get("/static/*",serveStatic({root:"./"}))

export default app;
