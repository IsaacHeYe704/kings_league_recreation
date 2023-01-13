import { scrape } from "./utils.js";
import TEAMS  from "../db/teams.json" assert {type:'json'}


const getImageFromTeamName = ({ name }) =>{
    //find the team
    let {image} = TEAMS.find((team) => team.name === name)
    // if the team is not found just return undefined,this way if there is a team we can find its president
    return {
        name,
        image
    }
  }

export async function getAssistsBoard(url) {
  const $ = await scrape(url);

  const ASSISTS_SELECTORS = {
    team: { type: "string", selector: ".fs-table-text_3" },
    name: { type: "string", selector: ".fs-table-text_4" },
    played_games: { type: "number", selector: ".fs-table-text_5" },
    scored_goals: { type: "number", selector: ".fs-table-text_6" },
    
  };

  const ASSITS_ENTRIES = Object.entries(ASSISTS_SELECTORS);

  const $rows = $("table tbody tr");
  const result = [];
  $rows.each((index, element) => {
    const $el = $(element);

    const assistsEntries = ASSITS_ENTRIES.map(
      ([key, { type, selector }]) => {
        const rawValue = $el.find(selector).text().trim();
        const number = type === "number" ? Number(rawValue) : rawValue;
        return [key, number];
      }
    );
    const { team: teamName, ...goalsBoardForTeam } =
      Object.fromEntries(assistsEntries);
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
