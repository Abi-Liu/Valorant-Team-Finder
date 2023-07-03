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
    const user = await User.findById(userId);
    if (user.team) {
      console.log("user is already in a team");
      res
        .status(500)
        .json({
          message: "You are already in a team! Please leave to join another",
        });
    } else {
      const team = await Team.findByIdAndUpdate(teamId, {
        $push: { teammates: user?.ign },
      });
      await User.findByIdAndUpdate(userId, { team: teamId });
    }
  },
  leave: async (req: Request, res: Response) => {},
  getTeams: async (req: Request, res: Response) => {},
};
