import { fetchYoutubeVideos } from "../services/youtubeService.js";

export const getYoutubeVideos = async (req, res) => {
  try {
    const { q } = req.query;
    const videos = await fetchYoutubeVideos(q || "청약");
    res.json(videos);
  } catch (error) {
    console.error("유튜브 API 오류:", error);
    res.status(500).json({ error: "유튜브 API 요청 실패" });
  }
};
