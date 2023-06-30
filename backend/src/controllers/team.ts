import express, { Request, Response } from "express";
import Team from "../models/Team";

export default {
  create: async (req: Request, res: Response) => {
    try {
      const { teamName, id } = req.body;
      const team = await Team.create({ name: teamName });
      const updatedTeam = await Team.findByIdAndUpdate(team._id, {
        $push: { teammates: id },
      });
      res.status(200).json(updatedTeam);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  },
  join: async (req: Request, res: Response) => {},
  leave: async (req: Request, res: Response) => {},
  getTeams: async (req: Request, res: Response) => {},
};
