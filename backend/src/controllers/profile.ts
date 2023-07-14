import { Request, Response } from "express";
import Profile from "../models/Profile";
import User from "../models/User";
import ValorantClient from "unofficial-valorant-api";
import { DatabaseUserInterface } from "../Interfaces/DatabaseInterfaces";
import { updateProfileData } from "../services/UpdateUserData";

const VAPI = new ValorantClient();

export default {
  createUserProfile: async (req: Request, res: Response) => {
    try {
      const user = req.user as DatabaseUserInterface;

      const profileData = await updateProfileData(user);
      const profile = await Profile.create(profileData);

      return res.status(200).json(profile);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err });
    }
  },
  getUserProfile: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const profile = await Profile.findOne({ user: id });
      //makes sure profile exists
      if (profile) {
        const ign = await User.findById(id).select("ign");
        return res.status(200).json({ profile: profile, ign: ign });
      } else {
        return res.status(404).json({ message: "Page not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
};
