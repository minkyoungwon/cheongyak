import express from "express";
import { validateInviteCode, createInviteCode } from "../controllers/authController.js";

const router = express.Router();

router.post("/validate", validateInviteCode);
router.post("/invite", createInviteCode);

export default router;
