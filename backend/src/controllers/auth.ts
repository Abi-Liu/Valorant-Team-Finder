import express, { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { DatabaseUserInterface } from "src/Interfaces/UserInterface";

const CLIENT_URL = "http://localhost:8000/";

export default {
  register: async (req: Request, res: Response) => {
    try {
      const { username, password, ign, email } = req.body;
      const user = await User.findOne({
        username: username,
      });
      if (user) {
        res.send("User already exists");
      }
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
          username: username,
          ign: ign,
          email: email,
          password: hashedPassword,
        });
        res.status(200).json(user);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },
};
