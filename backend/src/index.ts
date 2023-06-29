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
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email: string, password: string, done) => {
      try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
          return done(null, false, { message: `Email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            message:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        bcrypt.compare(password, user.password, (err, result: boolean) => {
          if (err) return done(err);
          if (result) {
            return done(null, user);
          }
          return done(null, false, { message: "Invalid email or password." });
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);
passport.serializeUser((user: DatabaseUserInterface, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
