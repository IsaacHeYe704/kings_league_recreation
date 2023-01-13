import { scrape } from "./utils.js";
import TEAMS  from "../db/teams.json" assert {type:'json'}


const getImageFromTeamName = ({ name }) =>{
    //find the team
    let {image} = TEAMS.find((team) => team.name === name)
    // if the team is not found just return undefined,this way if there is a team we can find its president
    return {
        image
    }
  }

export async function getGoalsBoard(url) {
  const $ = await scrape(url);

  const GOALS_SELECTORS = {
    team: { type: "string", selector: ".fs-table-text_3" },
    name: { type: "string", selector: ".fs-table-text_4" },
    played_games: { type: "number", selector: ".fs-table-text_5" },
    scored_goals: { type: "number", selector: ".fs-table-text_6" },
    
  };

  const GOALS_ENTRIES = Object.entries(GOALS_SELECTORS);

  const $rows = $("table tbody tr");
  const result = [];
  $rows.each((index, element) => {
    const $el = $(element);

    const goalsEntries = GOALS_ENTRIES.map(
      ([key, { type, selector }]) => {
        const rawValue = $el.find(selector).text().trim();
        const number = type === "number" ? Number(rawValue) : rawValue;
        return [key, number];
      }
    );
    const { team: teamName, ...goalsBoardForTeam } =
      Object.fromEntries(goalsEntries);
    const team = getImageFromTeamName({ name: teamName });
    
    // insert team only if scraping was successful
   
      result.push({
        rank: index+1,
        ...goalsBoardForTeam,
        team,
      });


  });

  return (result);;
}
