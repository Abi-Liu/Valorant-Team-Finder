import express from "express";
import teamController from "../controllers/team";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/createTeam", auth.ensureAuth, teamController.create);
router.put("/join/:id", auth.ensureAuth, teamController.join);
router.put("/leave/:id", auth.ensureAuth, teamController.leave);
router.get("/getTeams", auth.ensureAuth, teamController.getTeams);

export default router;
