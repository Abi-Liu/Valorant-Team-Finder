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
        if (!user.team) {
          const updatedTeam = await Team.findByIdAndUpdate(team._id, {
            $push: { teammates: user.ign },
          });

          res.status(200).json(updatedTeam);
        } else {
          console.log("user already in a team. Cannot form new team.");
          res.status(500).json({
            message:
              "You are currently in a team. Please leave before making a new team",
          });
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  },
  join: async (req: Request, res: Response) => {
    try {
      const { userId, teamId } = req.body;
      const user = await User.findById(userId);
      //makes sure that user exists
      if (user) {
        if (user.team) {
          console.log("user is already in a team");
          res.status(500).json({
            message: "You are already in a team! Please leave to join another",
          });
        } else {
          const team = await Team.findByIdAndUpdate(teamId, {
            $push: { teammates: user.ign },
          });
          await User.findByIdAndUpdate(userId, { team: teamId });
          console.log("joined successfully");
          res.status(200).json(team);
        }
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
      console.log(req.user);
      console.log(req.isAuthenticated());
      res.status(200).json(teams);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
};
