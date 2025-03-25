// ScrapDetail.tsx
import { useParams } from "react-router-dom";
import { useScrapStore } from "../hooks/useScrapStore";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

interface Summary {
  id: number;
  video_id: string;
  summary_text: string;
  created_at: string;
}

export default function ScrapDetail() {
  const { id: videoId } = useParams();
  const scraps = useScrapStore((state) => state.scraps);
  const scrap = scraps.find((item) => item.id === videoId);

  const [summaries, setSummaries] = useState<Summary[]>([]);

  // ✅ Supabase에서 요약 불러오기
  useEffect(() => {
    const loadSummaries = async () => {
      const { data, error } = await supabase
        .from("summaries")
        .select("*")
        .eq("video_id", videoId)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setSummaries(data);
      }
    };
    loadSummaries();
  }, [videoId]);

  if (!scrap) return <div className="text-white p-8">영상을 찾을 수 없습니다.</div>;

  return (
    <div className="p-8 text-white bg-gray-900 min-h-screen">
      <img src={scrap.thumbnail} alt={scrap.title} className="w-full max-w-2xl mb-6 rounded" />
      <h2 className="text-3xl font-bold mb-2">{scrap.title}</h2>
      <p className="text-lg mb-8">{scrap.description}</p>

      {/* ✅ 요약 목록 */}
      <h3 className="text-2xl font-semibold mb-4">요약 기록</h3>
      {summaries.length === 0 ? (
        <p className="text-gray-400">아직 저장된 요약이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {summaries.map((s) => (
            <li key={s.id} className="bg-white text-black rounded p-4 shadow">
              <div className="text-sm text-gray-600 mb-1">{new Date(s.created_at).toLocaleString()}</div>
              <div>{s.summary_text}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
