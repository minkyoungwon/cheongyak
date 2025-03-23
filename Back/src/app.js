import express from "express";
import cors from "cors";
import youtubeRoutes from "./routes/youtube.js";
import { PORT } from "./config/config.js";
import summaryRoutes from "./routes/summary.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/youtube", youtubeRoutes);
app.use("/summary", summaryRoutes);

app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 작동 중입니다.`);
});