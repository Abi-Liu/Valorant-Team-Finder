import express, { Request, Response } from "express";
import Team from "../models/Team";
import User from "../models/User";
import { DatabaseUserInterface } from "src/Interfaces/UserInterface";

export default {
  create: async (req: Request, res: Response) => {
    try {
      const { teamName } = req.body;
      const user = req.user as DatabaseUserInterface;

      if (!user.team) {
        const team = await Team.create({
          name: teamName,
          teammates: [user.ign],
        });

        console.log("team successfully created");
        res.status(200).json(team);
      } else {
        console.log("user already in a team. Cannot form new team.");
        res.status(500).json({
          message:
            "You are currently in a team. Please leave before making a new team",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  },
  join: async (req: Request, res: Response) => {
    try {
      const { teamId } = req.body;
      const user = req.user as DatabaseUserInterface;

      //if user is in a team they can't join another
      if (user.team) {
        console.log("user is already in a team");
        res.status(500).json({
          message: "You are already in a team! Please leave to join another",
        });
      } else {
        //update team and user documents if user is currently not in a team
        const team = await Team.findByIdAndUpdate(teamId, {
          $push: { teammates: user.ign },
        });
        await User.findByIdAndUpdate(user._id, { team: teamId });
        console.log("joined successfully");
        res.status(200).json(team);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  },
  leave: async (req: Request, res: Response) => {
    try {
      const { userId, teamId } = req.body;
      const user = await User.findByIdAndUpdate(userId, { team: "" });
      //checks to make sure user is not null
      if (user) {
        const team = await Team.findByIdAndUpdate(teamId, {
          $pull: { teammates: user.ign },
        });
        if (team?.teammates.length === 0) {
          await Team.findByIdAndDelete(teamId);
          console.log("Team disbanded");
        }
        console.log("Successfully left");
        res.status(200).json(team);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  },
  getTeams: async (req: Request, res: Response) => {
    try {
      //returns a list of all teams in the collection
      const teams = await Team.find().lean(); //lean just gives POJO which improves performance makes it less memory intensive.
      res.status(200).json(teams);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
};
