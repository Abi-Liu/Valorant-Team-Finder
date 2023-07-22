import express from "express";
import reviewController from "../controllers/review";
import auth from "../middleware/auth";

const router = express.Router();

router.post(
  "/createReview/:userId",
  auth.ensureAuth,
  reviewController.createReview
);
router.delete(
  "/deleteReview/:reviewId",
  auth.ensureAuth,
  reviewController.deleteReview
);
router.put("/likeReview/:reviewId", auth.ensureAuth, reviewController.like);
router.put(
  "/dislikeReview/:reviewId",
  auth.ensureAuth,
  reviewController.dislike
);
router.get("/getReviews/:userId", auth.ensureAuth, reviewController.getReviews);

export default router;
