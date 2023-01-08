import * as cheerio from "cheerio";
import TEAMS from "../db/teams.json" assert { type: "json" };
import PRESIDENTS from "../db/presidents.json" assert { type: "json" };
import { writeDBfile } from "../db/index.js";


const URLS = {
  leaderBoard: "https://kingsleague.pro/",
};
async function scrape(url) {
  const res = await fetch(url);
  const html = await res.text(res);
  return cheerio.load(html);
}
async function getLeaderBoard() {
  const $ = await scrape(URLS.leaderBoard);

  const LEADERBOARD_SELECTORS = {
    team: { type: "string", selector: ".fs-table-text_3" },
    wins: { type: "number", selector: ".fs-table-text_4" },
    loses: { type: "number", selector: ".fs-table-text_5" },
    scoredGoals: { type: "number", selector: ".fs-table-text_6" },
    concededGoal: { type: "number", selector: ".fs-table-text_7" },
    cardsYellow: { type: "number", selector: ".fs-table-text_8" },
    cardsRed: { type: "number", selector: ".fs-table-text_9" },
  };
  const getTeamFromName = ({ name }) =>{
    //find the team
    let team = TEAMS.find((team) => team.name === name)
    // if the team is not found just return undefined,this way if there is a team we can find its president
    if(!team){
      return undefined;
    }
    //this is like a sql join, but doing it manually
    let {presidentId, ...restofTeam} = team;
    let president = PRESIDENTS.find(president => president.id === presidentId)
    return {
     ...restofTeam,
     president,
    }
  }

  const LEADERBOARD_ENTRIES = Object.entries(LEADERBOARD_SELECTORS);

  const $rows = $("table tbody tr");
  const result = [];
  $rows.each((index, element) => {
    const $el = $(element);

    const leaderBoardEntries = LEADERBOARD_ENTRIES.map(
      ([key, { type, selector }]) => {
        const rawValue = $el.find(selector).text().trim();
        const number = type === "number" ? Number(rawValue) : rawValue;
        return [key, number];
      }
    );
    const { team: teamName, ...leaderBoardForTeam } =
      Object.fromEntries(leaderBoardEntries);
    const team = getTeamFromName({ name: teamName });
    
    // insert team only if scraping was successful
    if (team !== undefined) {
      result.push({
        ...leaderBoardForTeam,
        team,
      });
    }
  });

  return result;
}

const leaderBoard = await getLeaderBoard();

await writeDBfile('leaderboard',leaderBoard)
