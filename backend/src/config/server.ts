import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import connectDB from "./database";
import passport from "passport";
import authRoutes from "../routes/auth";
import teamRoutes from "../routes/team";

export default function createServer() {
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

  app.use("/auth", authRoutes);
  app.use("/team", teamRoutes);

  return app;
}
