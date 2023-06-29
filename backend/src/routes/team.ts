import express from "express";
import teamController from "../controllers/team";

const router = express.Router();

router.post("/createTeam", teamController.create);
router.put("/join/:id", teamController.join);
router.put("/leave/:id", teamController.leave);

export default router;
