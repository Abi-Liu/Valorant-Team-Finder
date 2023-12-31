import { Request, Response } from "express";
import Match from "../models/Match";
import ValorantClient from "unofficial-valorant-api";
import { DatabaseUserInterface } from "src/Interfaces/DatabaseInterfaces";
import { updateMatchData } from "../services/UpdateUserData";
import Profile from "../models/Profile";
import { Region } from "../Interfaces/Types";
import calculateNewExpiryTime from "../services/CalculateNewExpiryTime";

const VAPI = new ValorantClient();

export default {
  createMatches: async (req: Request, res: Response) => {
    try {
      const user = req.user as DatabaseUserInterface;
      const { puuid, region } = req.body;
      const matchArr = await updateMatchData(user._id, puuid, region);
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
      const currentTime = new Date();
      if (matches) {
        if (currentTime < matches.expiryTime) {
          return res.status(200).json(matches);
        } else {
          return res.status(200).json({ message: "Match data update needed" });
        }
      } else {
        res.status(404).json({ message: "User data not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
  updateMatches: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const profile = await Profile.findOne({ user: id });
      const expiryTime = calculateNewExpiryTime(1);
      if (profile && profile.puuid) {
        const matchArr = await updateMatchData(
          id,
          profile.puuid,
          profile.region as Region
        );

        const matches = await Match.findOneAndUpdate(
          { user: id },
          { matches: matchArr?.matches, expiryTime },
          { new: true }
        );
        res.status(200).json(matches);
      } else {
        res.status(404).json({ message: "User data not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
};
