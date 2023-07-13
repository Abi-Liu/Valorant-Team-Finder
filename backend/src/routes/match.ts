import express from "express";
import matchController from "../controllers/match";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/:id", auth.ensureAuth, matchController.getMatches);
router.post("/createMatches", auth.ensureAuth, matchController.createMatches);

export default router;
