import express from "express";
import { 
  sendCheongyakAlarmManual, 
  sendCheongyakUpdateAlarm, 
  sendNewVideoAlarm, 
  updateNotificationSettings 
} from "../controllers/notificationController.js";

const router = express.Router();

// 수동 알림 전송
router.post("/manual", sendCheongyakAlarmManual);

// 청약 정보 알림 전송
router.post("/cheongyak", sendCheongyakUpdateAlarm);

// 새 영상 알림 전송
router.post("/video", sendNewVideoAlarm);

// 사용자 알림 설정 업데이트
router.post("/settings", updateNotificationSettings);

export default router;
