import express, { Request, Response } from "express";
import Match from "../models/Match";
import ValorantClient from "unofficial-valorant-api";
import { DatabaseUserInterface } from "src/Interfaces/UserInterface";

const VAPI = new ValorantClient();

export default {
  createMatches: async (req: Request, res: Response) => {
    try {
      const user = req.user as DatabaseUserInterface;
      const { puuid, region } = req.body;
      const response = await VAPI.getMatchesByPUUID({
        region,
        puuid,
        filter: "competitive",
        size: 5,
      });
      if (response.status === 200) {
        const matches = Match.create({
          user: user._id,
          matches: response.data,
        });
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
