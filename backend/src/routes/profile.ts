import express from "express";
import profileController from "../controllers/profile";

const router = express.Router();

router.get("/:id", profileController.getUserProfile);

export default router;
