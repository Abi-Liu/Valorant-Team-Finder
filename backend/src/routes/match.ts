import express from "express";
import matchController from "../controllers/match";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/:id", auth.ensureAuth, matchController.getMatches);
router.post("/createMatches", auth.ensureAuth, matchController.createMatches);
router.put("/:id", auth.ensureAuth, matchController.updateMatches);

export default router;
