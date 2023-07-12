import express, { Request, Response } from "express";
import Team from "../models/Team";
import User from "../models/User";
import { DatabaseUserInterface } from "src/Interfaces/UserInterface";

export default {
  create: async (req: Request, res: Response) => {
    try {
      const { teamName } = req.body;
      const user = req.user as DatabaseUserInterface;
      if (!teamName) {
        console.log("team name can not be blank");
        return res.status(400).json({ message: "Team name cannot be blank" });
      }
      if (!user.team) {
        const team = await Team.create({
          name: teamName,
          teammates: [user.ign],
        });
        await User.findByIdAndUpdate(user._id, { team: team._id });
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
      const { id } = req.params;
      const user = req.user as DatabaseUserInterface;
      //if user is in a team they can't join another
      if (user.team) {
        console.log("user is already in a team");
        return res.status(500).json({
          message: "You are already in a team! Please leave to join another",
        });
      } else {
        //update team and user documents if user is currently not in a team
        const team = await Team.findByIdAndUpdate(
          id,
          {
            $push: { teammates: user.ign },
          },
          { new: true }
        );
        console.log(team);

        if (!team) {
          return res.status(404).json({ message: "Team not found" });
        }

        await User.findByIdAndUpdate(user._id, { team: id });
        console.log("joined successfully");
        return res.status(200).json(team);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error });
    }
  },
  leave: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = req.user as DatabaseUserInterface;
      //checks to make sure user is currently in the team
      if (user.team === id) {
        // if so remove the team from the user document and pull the user out of the team document
        await User.findByIdAndUpdate(user._id, {
          team: "",
        });
        const team = await Team.findByIdAndUpdate(
          id,
          {
            $pull: { teammates: user.ign },
          },
          { new: true }
        );

        //if there are no users in the team after, delete the team document
        if (team?.teammates.length === 0) {
          await Team.findByIdAndDelete(id);
          console.log("Team disbanded");
          res.status(200).json({ message: "Team disbanded" });
        } else {
          console.log("Successfully left");
          res.status(200).json(team);
        }
      } else {
        console.log("user not in this team");
        return res
          .status(400)
          .json({ message: "You are not a part of this team" });
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
