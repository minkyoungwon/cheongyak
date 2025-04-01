import { getYoutubeCaptions } from "../services/youtubeCaptionService.js";
import { summarizeTextWithDeepSeek } from "../services/summaryService.js";
import { supabase } from "../config/supabaseAdminClient.js";

// 1. 요약만 처리 (요약만 반환하고 저장은 프론트에서 별도 요청)
export const handleSummaryRequest = async (req, res) => {
  const { videoId } = req.body;

  try {
    const captions = await getYoutubeCaptions(videoId);
    if (!captions) {
      return res.status(404).json({ error: "자막을 불러올 수 없습니다." });
    }

    const summary = await summarizeTextWithDeepSeek(captions);
    res.json({ summary });
  } catch (err) {
    console.error("요약 실패:", err);
    res.status(500).json({ error: "요약 처리 중 오류 발생" });
  }
};

// 2. 별도로 요약을 Supabase에 저장하는 API
export const saveSummary = async (req, res) => {
  const { videoId, summary, createdBy } = req.body;

  console.log("✅ 저장 요청 받은 데이터:", { videoId, summary, createdBy });

  if (!videoId || !summary || !createdBy) {
    return res.status(400).json({ error: "모든 필드가 필요합니다." });
  }

  const { error } = await supabase.from("summaries").insert({
    video_id: videoId,
    summary_text: summary,
    created_by: createdBy,
  });

  if (error) {
    console.error("요약 저장 실패:", error.message);
    return res.status(500).json({ error: "요약 저장 실패" });
  }

  res.json({ success: true });
};
