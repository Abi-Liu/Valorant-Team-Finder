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
        //array used to store necessary properties of the response object
        const matches = new Array();
        //loop through the response data and add the desired properties to the temp array
        for (const match of response.data) {
          const matchData = await Match.create({
            user: uid,
            redPlayers: match.players.red,
            bluePlayers: match.players.blue,
            redWon: match.teams.red,
            blueWon: match.teams.blue,
          });
          matches.push(matchData);
        }

        // tempArr.push({

        // });

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
