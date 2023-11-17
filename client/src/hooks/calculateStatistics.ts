import { Match } from "../interfaces/MatchResponse";

export function calculateStatistics(matches: Match[]) {
  //Overall headshot %, K/D ratio, Winrate calculations
  // const matches = user.matches as Match[];
  let kills = 0;
  let deaths = 0;
  let wins = 0;
  let headshots = 0;
  let total = 0;
  let damage = 0;
  matches.forEach((match) => {
    headshots += match.playerStats.headshots;
    total +=
      match.playerStats.headshots +
      match.playerStats.legshots +
      match.playerStats.bodyshots;
    kills += match.playerStats.kills;
    deaths += match.playerStats.deaths;
    if (
      (match.blueWon.has_won && match.team === "Blue") ||
      (match.redWon.has_won && match.team === "Red")
    ) {
      wins += 1;
    }
    damage += match.adr;
  });
  //rounds to nearest hundredth place and puts it in percent form
  const headshotPercentTotal = Math.round(1000 * (headshots / total)) / 10;
  const kd = Math.round((kills / deaths) * 100) / 100;

  //rounding these to nearest tenths
  const winrate = Math.round((wins / 5) * 10) * 10;
  const adr = Math.round((damage / 5) * 10) / 10;
  return [
    { name: "Damage/Round", value: adr },
    { name: "Headshot %", value: headshotPercentTotal },
    { name: "K/D Ratio", value: kd },
    { name: "Win %", value: winrate },
  ];
}
