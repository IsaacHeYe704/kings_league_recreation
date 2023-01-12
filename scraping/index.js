import { scrapeAndSave, SCRAPPINGS } from "./utils.js";

for( let nameOfScraper of Object.keys(SCRAPPINGS)){
    await scrapeAndSave(nameOfScraper)
}