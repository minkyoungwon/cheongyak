import express from "express";
import { handleSummaryRequest } from "../controllers/summaryController.js";

const router = express.Router();
router.post("/", handleSummaryRequest);
export default router;
