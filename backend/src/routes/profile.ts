import express from "express";
import profileController from "../controllers/profile";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/:id", auth.ensureAuth, profileController.getUserProfile);
router.put("/:id", auth.ensureAuth, profileController.updateProfile);
router.post(
  "/createProfile",
  auth.ensureAuth,
  profileController.createUserProfile
);

export default router;
