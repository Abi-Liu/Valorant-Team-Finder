import express, { Request, Response } from "express";
import Profile from "../models/Profile";
import User from "../models/User";
import ValorantClient from "unofficial-valorant-api";
import {
  ProfileRootObject,
  RankRootObject,
} from "src/Interfaces/ResponseInterface";
import { DatabaseUserInterface } from "src/Interfaces/DatabaseInterfaces";
import { Region } from "src/Interfaces/Types";

const VAPI = new ValorantClient();

export default {
  createUserProfile: async (req: Request, res: Response) => {
    try {
      const user = req.user as DatabaseUserInterface;

      //splits the name and tag to be used in the API call
      const nameArr = user.ign.split("#");

      //response for general profile data i.e puuid region etc.
      const response = (await VAPI.getAccount({
        name: nameArr[0],
        tag: nameArr[1],
      })) as ProfileRootObject;

      console.log(response);

      //makes sure response is valid
      if (response.status === 200) {
        //getting rank information
        const rankResponse = (await VAPI.getMMRByPUUID({
          version: "v1",
          region: response.data.region as Region,
          puuid: response.data.puuid,
        })) as RankRootObject;

        //makes sure rank response is valid
        if (rankResponse.status === 200) {
          //create user profile and link it to their user id
          const profile = await Profile.create({
            puuid: response.data.puuid,
            region: response.data.region,
            cardSmall: response.data.card.small,
            cardLarge: response.data.card.large,
            rank: rankResponse.data.currenttierpatched,
            rankImage: rankResponse.data.images.small,
            user: user._id,
          });
          return res.status(200).json(profile);
        }
      } else {
        return res.status(400).json({ message: "Incorrect IGN provided" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err });
    }
  },
  getUserProfile: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const profile = await Profile.findById(id);
      //makes sure profile exists
      if (profile) {
        const ign = await User.findById(profile.user).select("ign");
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
