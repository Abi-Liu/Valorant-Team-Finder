import express from "express";
import authController from "../controllers/auth";
import passport from "passport";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", passport.authenticate("local"), authController.login);
router.get("/logout", authController.logout);

export default router;
