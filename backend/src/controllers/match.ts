import express, { Request, Response } from "express";
import Match from "../models/Match";
import ValorantClient from "unofficial-valorant-api";
import {
  DatabaseUserInterface,
  MatchDBInterface,
} from "src/Interfaces/DatabaseInterfaces";
import MatchRootObject from "../Interfaces/MatchResponseInterface";

const VAPI = new ValorantClient();

export default {
  createMatches: async (req: Request, res: Response) => {
    try {
      const user = req.user as DatabaseUserInterface;
      const uid = user._id;
      const { puuid, region } = req.body;
      const response = (await VAPI.getMatchesByPUUID({
        region,
        puuid,
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

          //total damage done divided by rounds played
          const adr =
            player.damage_made / match.teams.red.rounds_lost +
            match.teams.red.rounds_won;

          //adding match data to db
          const matchData = {
            user: uid,
            adr,
            playerStats: player.stats,
            character: player.character,
            redWon: match.teams.red,
            blueWon: match.teams.blue,
            // redPlayers: match.players.red,
            // bluePlayers: match.players.blue,
          };
          matchesArr.push(matchData);
        }

        const matches = await Match.create({ matches: matchesArr });

        return res.status(200).json(matches);
      } else {
        return res.status(400).json({ message: "user not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
  getMatches: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const matches = await Match.findOne({ user: id });
      if (matches) {
        return res.status(200).json(matches);
      } else {
        return res.status(404).json({ message: "user not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
};
