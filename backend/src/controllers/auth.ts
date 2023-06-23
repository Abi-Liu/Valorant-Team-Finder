import express, { Request, Response } from "express";
import User from "../models/User";
import bcrypt, { hash } from "bcrypt";
import { DatabaseUserInterface } from "src/Interfaces/UserInterface";

const CLIENT_URL = "http://localhost:8000/";

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
};
