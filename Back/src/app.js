import express from "express";
import youtubeRoutes from "./routes/youtube.js";
import { PORT } from "./config/config.js";
import summaryRoutes from "./routes/summary.js";
import authRoutes from "./routes/auth.js";
import notificationRoutes from "./routes/notification.js";

const app = express();

import cors from "cors";
app.use(cors({
  origin: [
    "https://cheongyak.vercel.app",
    "https://cheongyak.vercel.app/login",
    "https://cheongyak-git-main-mkws-projects-da83bca3.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

app.use(express.json());
app.use("/youtube", youtubeRoutes);
app.use("/summary", summaryRoutes);
app.use("/auth", authRoutes);
app.use("/notification", notificationRoutes);

app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 작동 중입니다.`);
});