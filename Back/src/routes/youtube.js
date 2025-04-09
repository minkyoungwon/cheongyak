import express from "express";
import { fetchYoutubeVideos } from "../controllers/youtubeController.js";


// fetchYoutubeVideos

const router = express.Router();

router.get("/", fetchYoutubeVideos);

export default router;
