import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import User from "../models/User";
import bcrypt from "bcrypt";
import { DatabaseUserInterface } from "src/Interfaces/UserInterface";

const CLIENT_URL = "http://localhost:5173/";

export default {
  register: async (req: Request, res: Response) => {
    try {
      const { password, ign, email } = req.body;
      const user = await User.findOne({
        $or: [{ email: email }, { ign: ign }],
      });
      if (user) {
        res.send("User already exists");
      }
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
          ign: ign,
          email: email,
          password: hashedPassword,
        });
        res.status(200).json(newUser);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },
  login: (req: Request, res: Response) => {
    res.json({ message: "success" });
  },
  logout: (req: Request, res: Response, next: NextFunction) => {
    req.logout(function (err) {
      if (err) return next(err);
      res.redirect(CLIENT_URL);
    });
  },
};
