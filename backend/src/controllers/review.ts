import express, { Request, Response } from "express";
import Review from "../models/Review";
import User from "../models/User";
import { DatabaseUserInterface } from "src/Interfaces/DatabaseInterfaces";

export default {
  createReview: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { message, rating } = req.body;
      let review = await Review.find({ user: userId });
      if (!review) {
        const createdReview = await Review.create({
          user: userId,
          message,
          rating,
        });
        res.status(200).json(createdReview);
      } else {
        console.log("You have already made a review for this player");
        res
          .status(200)
          .json({ message: "You have already made a review for this player" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Couldn't create review" });
    }
  },
  deleteReview: async (req: Request, res: Response) => {},
  like: async (req: Request, res: Response) => {},
  getReviews: async (req: Request, res: Response) => {},
};
