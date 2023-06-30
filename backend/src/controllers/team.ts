import express, { Request, Response } from "express";
import Team from "../models/Team";
import User from "../models/User";

export default {
  create: async (req: Request, res: Response) => {
    try {
      const { teamName, id } = req.body;
      const team = await Team.create({ name: teamName });
      const user = await User.findById(id);
      //makes sure that user isn't null
      if (user) {
        const updatedTeam = await Team.findByIdAndUpdate(team._id, {
          $push: { teammates: user.ign },
        });
        res.status(200).json(updatedTeam);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  },
  join: async (req: Request, res: Response) => {
    const { userId, teamId } = req.body;
  },
  leave: async (req: Request, res: Response) => {},
  getTeams: async (req: Request, res: Response) => {},
};
