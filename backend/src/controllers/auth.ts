import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import User from "../models/User";
import bcrypt from "bcrypt";
import { DatabaseUserInterface } from "src/Interfaces/UserInterface";

const CLIENT_URL = "http://localhost:5173/";

export default {
  register: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const { username, password, ign, email } = req.body;
      console.log(username);
      const user = await User.findOne({
        username: username,
        ign: ign,
        email: email,
      });
      console.log(user);
      if (user) {
        res.send("User already exists");
      }
      let hashedPassword;
      if (!user) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            hashedPassword = hash;
          });
        });
        const newUser = await User.create({
          username: username,
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
