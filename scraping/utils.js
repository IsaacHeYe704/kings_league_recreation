import * as cheerio from "cheerio";
import { getLeaderBoard } from "./leaderboard.js";
import { getMvpBoard } from "./mvp.js";
import { writeDBfile } from "../db/index.js";
import { logError, logInfo, logSuccess } from "./log.js";

export const SCRAPPINGS = {
  leaderBoard: {
    url: "https://kingsleague.pro/",
    scraper: getLeaderBoard,
  },
  mvp: {
    url: "https://kingsleague.pro/estadisticas/mvp/",
    scraper: getMvpBoard,
  },
};
export async function scrape(url) {
  const res = await fetch(url);
  const html = await res.text(res);
  return cheerio.load(html);
}

export async function scrapeAndSave(name){
  const start = performance.now()
  try{
    const {scraper,url} = SCRAPPINGS[name]
    logInfo(`scraping [${name}] `)
    const info = await (scraper(url))
    logInfo(`done scraping [${name}]`)

    logInfo(`writing [${name}]`)
    await writeDBfile(`${name}`,info)
    logSuccess(`done writing [${name}] json`)

  }
  catch(err){
    logError(`error scraping [${name}] ${err}`);
  }finally{
    const end = performance.now()
    logInfo(`scraping [${name}] took ${(end - start)/1000} s`)
  }
  
}






