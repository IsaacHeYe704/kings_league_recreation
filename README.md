"# kings_league_recreation following https://www.twitch.tv/midudev tutorial " 

##API:
#Technologies:
    -Node: api run time
    -Hono: api rest library
    -Cherio: web scraping library
    -cloudflare workers: serverless deployment enviroment, edge storage. 
#scripts:
    npm run dev:api : runs a local instance of the appi in a cloud flare enviroment for development purposes. 
    npm run publish:api : deploys the api in a cloud flare enviroment.
    npm run scrape:leaderboard : run the weeb scraping algorithm to get the leaderboard info of the kings league.
/**
 * this project uses Cloudflare Workers! 
 *
 * - Run `npm run dev:api` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run publish:api` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


