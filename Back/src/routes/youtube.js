import express from "express";
import { getYoutubeVideos } from "../controllers/youtubeController.js";

const router = express.Router();

router.get("/", getYoutubeVideos);

export default router;
