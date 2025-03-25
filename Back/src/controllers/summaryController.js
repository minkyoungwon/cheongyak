import { getYoutubeCaptions } from "../services/youtubeCaptionService.js";
import { summarizeTextWithDeepSeek } from "../services/summaryService.js";
import { supabase } from "../config/supabaseAdminClient.js";

export const handleSummaryRequest = async (req, res) => {
  const { videoId } = req.body;
  try {
    const captions = await getYoutubeCaptions(videoId);
    if (!captions) {
      return res.status(404).json({ error: "자막을 불러올 수 없습니다." });
    }

    const summary = await summarizeTextWithDeepSeek(captions);

    // ✅ Supabase 저장
    await supabase.from("summaries").insert({
      video_id: videoId,
      summary_text: summary,
    });

    res.json({ summary });
  } catch (err) {
    console.error("요약 실패:", err);
    res.status(500).json({ error: "요약 처리 중 오류 발생" });
  }
};
