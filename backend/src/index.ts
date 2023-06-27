import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import passport from "passport";
import passportLocal from "passport-local";
import cookieParser from "cookie-parser";
import session from "express-session";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import authRoutes from "./routes/auth";
import connectDB from "./config/database";
import User from "./models/User";
import { DatabaseUserInterface } from "./Interfaces/UserInterface";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
connectDB();
app.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Passport
const LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy((email: string, password: string, done) => {
    User.findOne({ email: email }, (err: any, user: DatabaseUserInterface) => {
      if (err) throw err;
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, result: boolean) => {
        if (err) throw err;
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  })
);

app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
