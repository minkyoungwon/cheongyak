// 백엔드: controllers/youtubeController.js
import { YOUTUBE_API_KEY } from "../config/config.js";
import fetch from "node-fetch";

export const getYoutubeVideos = async (req, res) => {
  const { q } = req.query;
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=3&q=${encodeURIComponent(
      q
    )}&key=${YOUTUBE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items) {
      return res.status(500).json({ error: "YouTube API 응답 이상" });
    }

    const result = data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      //upload_date: item.snippet.upload_date, // ✅ 여기에 포함!
      upload_date: item.snippet.publishedAt, // ❌ item.snippet.upload_date

    }));

    res.json(result);
  } catch (err) {
    console.error("유튜브 API 오류:", err);
    res.status(500).json({ error: "YouTube API 호출 실패" });
  }
};
