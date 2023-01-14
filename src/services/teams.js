export async function  getAllTeams()
{
    const response = await fetch(
        "https://kingsleague-api.herrerayepesisaac.workers.dev/teams"
      )
    const teams = await response.json()
    return teams
}