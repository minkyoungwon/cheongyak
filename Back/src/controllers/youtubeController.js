// 백엔드: controllers/youtubeController.js
import { isShorts } from "../utils/isShorts.js";
import { YOUTUBE_API_KEY } from "../config/config.js";
import fetch from "node-fetch";

export const getYoutubeVideos = async (req, res) => {
  const { q } = req.query;
  try {
    // 1. 검색 API 호출
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&order=date&q=${encodeURIComponent(q)}&key=${YOUTUBE_API_KEY}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (!searchData.items) {
      return res.status(500).json({ error: "YouTube API 응답 이상" });
    }

    // 2. videoId 추출
    const ids = searchData.items.map((item) => item.id.videoId).join(",");

    // 3. 영상 정보 API 호출 (duration 얻기)
    const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids}&key=${YOUTUBE_API_KEY}`;
    const detailsRes = await fetch(videoDetailsUrl);
    const detailsData = await detailsRes.json();

    // 4. duration 매핑
    const durationMap = {};
    for (const item of detailsData.items) {
      durationMap[item.id] = item.contentDetails.duration; // e.g. PT1M2S
    }

    // 5. 최종 가공
    const result = searchData.items.map((item) => {
      const id = item.id.videoId;
      const snippet = item.snippet;
      const thumb = snippet.thumbnails.medium;
      const duration = durationMap[id] || "";

      return {
        id,
        title: snippet.title,
        description: snippet.description,
        thumbnail: thumb.url,
        upload_date: snippet.publishedAt,
        isShorts: isShorts({
          duration,
          title: snippet.title,
          description: snippet.description,
          thumbnail: thumb,
        }),
      };
    });

    // ✅ 응답 반환
    res.json(result);
  } catch (err) {
    console.error("유튜브 API 오류:", err);
    res.status(500).json({ error: "YouTube API 호출 실패" });
  }
};
