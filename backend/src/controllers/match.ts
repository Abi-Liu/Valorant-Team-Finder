import express, { Request, Response } from "express";
import Match from "../models/Match";
import ValorantClient from "unofficial-valorant-api";
import {
  DatabaseUserInterface,
  MatchDBInterface,
} from "src/Interfaces/DatabaseInterfaces";
import MatchRootObject from "../Interfaces/MatchResponseInterface";
import { updateMatchData } from "../Service/UpdateUserData";

const VAPI = new ValorantClient();

export default {
  createMatches: async (req: Request, res: Response) => {
    try {
      const user = req.user as DatabaseUserInterface;
      const { puuid, region } = req.body;
      const matchArr = await updateMatchData(user, puuid, region);
      console.log(matchArr);
      const matches = await Match.create(matchArr);
      res.status(200).json(matches);
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
