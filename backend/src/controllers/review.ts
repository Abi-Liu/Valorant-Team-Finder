import express, { Request, Response } from "express";
import Review from "../models/Review";
import User from "../models/User";
import Profile from "../models/Profile";
import { DatabaseUserInterface } from "src/Interfaces/DatabaseInterfaces";

export default {
  createReview: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { message, rating } = req.body;
      const user = req.user as DatabaseUserInterface;
      let review = await Review.findOne({ user: userId });
      if (!review) {
        const profile = await Profile.findOne({ user: user._id });
        if (profile) {
          const createdReview = await Review.create({
            user: userId,
            ign: user.ign,
            profilePicture: profile.cardSmall,
            creatingUser: user._id,
            message,
            rating,
          });
          res.status(200).json(createdReview);
        }
      } else {
        console.log("You have already made a review for this player");
        res
          .status(400)
          .json({ message: "You have already made a review for this player" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Couldn't create review" });
    }
  },
  deleteReview: async (req: Request, res: Response) => {
    try {
      const { reviewId } = req.params;
      const response = await Review.findByIdAndDelete(reviewId);
      res.status(200).json({ message: "review successfully deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error when deleting review" });
    }
  },
  like: async (req: Request, res: Response) => {
    try {
      const { reviewId } = req.params;
      const user = req.user as DatabaseUserInterface;
      const review = await Review.findById(reviewId);
      if (review) {
        if (!review.likes.includes(user._id)) {
          const likeReview = await Review.findByIdAndUpdate(
            reviewId,
            {
              $push: { likes: user._id },
            },
            { new: true }
          );
          console.log("like added");
          res.status(200).json(likeReview);
        } else {
          const removeLikeReview = await Review.findByIdAndUpdate(
            reviewId,
            {
              $pull: { likes: user._id },
            },
            { new: true }
          );
          console.log("like removed");
          res.status(200).json(removeLikeReview);
        }
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error when liking/removing like from review" });
    }
  },
  dislike: async (req: Request, res: Response) => {
    try {
      const { reviewId } = req.params;
      const user = req.user as DatabaseUserInterface;
      const review = await Review.findById(reviewId);
      if (review) {
        if (!review.dislikes.includes(user._id)) {
          const dislikeReview = await Review.findByIdAndUpdate(
            reviewId,
            {
              $push: { dislikes: user._id },
            },
            { new: true }
          );
          console.log("dislike added");
          res.status(200).json(dislikeReview);
        } else {
          const removeDislikeReview = await Review.findByIdAndUpdate(
            reviewId,
            {
              $pull: { dislikes: user._id },
            },
            { new: true }
          );
          console.log("dislike removed");
          res.status(200).json(removeDislikeReview);
        }
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error when disliking/removing dislike from review" });
    }
  },
  getReviews: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const reviews = await Review.find({ user: userId }).lean(); //get POJO for efficiency
      if (reviews) {
        res.status(200).json(reviews);
      } else {
        res.status(200).json({ message: "no reviews found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error when getting reviews" });
    }
  },
};
