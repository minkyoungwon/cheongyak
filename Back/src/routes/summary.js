import express from "express";
import { handleSummaryRequest, saveSummary } from "../controllers/summaryController.js";

const router = express.Router();

// 요약 생성 요청
router.post("/", handleSummaryRequest);

// ✅ 요약 저장 요청
router.post("/save", saveSummary);

export default router;
