import express, { Request, Response } from "express";
import User from "../models/User";
import Profile from "../models/Profile";
import { DatabaseUserInterface } from "src/Interfaces/DatabaseInterfaces";

export default {
  search: async (req: Request, res: Response) => {
    try {
      const { searchTerm } = req.params;
      const users = await User.find({
        ign: { $regex: searchTerm, $options: "i" },
      });
      console.log(users);
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  },
};
