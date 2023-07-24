import express from "express";
import searchController from "../controllers/search";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/:searchTerm", auth.ensureAuth, searchController.search);

export default router;
