import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import User from "../models/User";
import bcrypt from "bcrypt";
import validator from "validator";

const CLIENT_URL = "http://localhost:5173/";

export default {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, ign, confirmPassword } = req.body;
      let { email } = req.body;
      if (
        !validator.isEmail(email) ||
        !validator.isLength(password, { min: 6 }) ||
        password !== confirmPassword
      ) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      email = validator.normalizeEmail(email, {
        gmail_remove_dots: false,
      });

      const user = await User.findOne({
        $or: [{ email: email }, { ign: ign }],
      });
      if (user) {
        return res.send("User already exists");
      }
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
          ign: ign,
          email: email,
          password: hashedPassword,
        });
        req.logIn(newUser, (err) => {
          if (err) {
            return next(err);
          }
          return res.status(200).json(newUser);
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },
  login: (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    let { email } = req.body;
    if (!validator.isEmail(email) || !validator.isEmpty(password)) {
      console.log("invalid email/password");
      return res.status(400).json({ message: "Invalid email or password" });
    }
    email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({ message: "No user found", info });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json(user);
      });
    })(req, res, next);
  },
  logout: (req: Request, res: Response, next: NextFunction) => {
    req.logout(function (err) {
      if (err) return next(err);
      res.redirect(CLIENT_URL);
    });
  },
};
