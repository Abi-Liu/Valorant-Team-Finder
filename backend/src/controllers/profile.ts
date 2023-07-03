import express, { Request, Response } from "express";
import Profile from "../models/Profile";
import User from "../models/User";

export default {
  getUserProfile: async (req: Request, res: Response) => {
    try {
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  },
};
