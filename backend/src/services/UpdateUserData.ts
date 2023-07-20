import { DatabaseUserInterface } from "../Interfaces/DatabaseInterfaces";
import MatchRootObject from "../Interfaces/MatchResponseInterface";
import {
  ProfileRootObject,
  RankRootObject,
} from "../Interfaces/ResponseInterface";
import { Region } from "../Interfaces/Types";
import ValorantClient from "unofficial-valorant-api";

const VAPI = new ValorantClient();

export const updateMatchData = async (
  id: string,
  puuid: string,
  region: Region
) => {
  try {
    const response = (await VAPI.getMatchesByPUUID({
      region: region,
      puuid: puuid,
      filter: "competitive",
      size: 5,
    })) as MatchRootObject;
    if (response.status === 200 && response.data) {
      //array used to store the match data
      const matchesArr = new Array();

      //loop through the response data create a new document in the DB with only the desired properties
      for (const match of response.data) {
        //filter through all players to find only the user's data
        const filter = match.players.all_players.filter(
          (x) => x.puuid === puuid
        );
        const player = filter[0];

        //total damage done divided by rounds played rounded to nearest tenth
        const adr =
          Math.round(
            (player.damage_made /
              (match.teams.red.rounds_lost + match.teams.red.rounds_won)) *
              10
          ) / 10;

        //adding match data to db
        const matchData = {
          adr,
          playerStats: player.stats,
          character: player.character,
          team: player.team,
          redWon: match.teams.red,
          blueWon: match.teams.blue,
          // redPlayers: match.players.red,
          // bluePlayers: match.players.blue,
        };
        matchesArr.push(matchData);
      }
      const updatedData = { matches: matchesArr, user: id };
      return updatedData;
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateProfileData = async (user: DatabaseUserInterface) => {
  //splits the name and tag to be used in the API call
  const nameArr = user.ign.split("#");

  //response for general profile data i.e puuid region etc.
  const response = (await VAPI.getAccount({
    name: nameArr[0],
    tag: nameArr[1],
  })) as ProfileRootObject;

  //makes sure response is valid
  if (response.status === 200) {
    //getting rank information
    const rankResponse = (await VAPI.getMMRByPUUID({
      version: "v1",
      region: response.data.region as Region,
      puuid: response.data.puuid,
    })) as RankRootObject;

    //makes sure rank response is valid
    if (rankResponse.status === 200) {
      //create user profile and link it to their user id
      const updatedProfile = {
        puuid: response.data.puuid,
        region: response.data.region,
        cardSmall: response.data.card.small,
        cardLarge: response.data.card.large,
        rank: rankResponse.data.currenttierpatched,
        rankImage: rankResponse.data.images.small,
        user: user._id,
      };
      return updatedProfile;
    }
  }
};
