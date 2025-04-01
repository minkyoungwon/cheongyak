// ScrapDetail.tsx
import { useParams } from "react-router-dom";
import { useScrapStore } from "../hooks/useScrapStore";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { decode } from "html-entities";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const role = localStorage.getItem("role");


  // ✅ 요약 실행 함수
  const handleSummarize = async () => {
    if (!videoId) return;
    setLoading(true);
    setError("");

    try {
      // 1단계: 요약 요청
      const res = await fetch("http://localhost:4000/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "요약 실패");
        return;
      }

      const summaryText = data.summary;

      // 2단계: 저장 요청
      const saveRes = await fetch("http://localhost:4000/summary/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId,
          summary: summaryText,
          createdBy: localStorage.getItem("invite_code"),
        }),
      });

      if (!saveRes.ok) {
        console.warn("요약 저장 실패");
      }

      // 3단계: 상태 반영
      setSummaries((prev) => [
        {
          id: Date.now(),
          video_id: videoId,
          summary_text: summaryText,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
    } catch (err) {
      console.error(err);
      setError("요약 요청 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

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

  if (!scrap)
    return <div className="text-white p-8">영상을 찾을 수 없습니다.</div>;

  return (
    <div className="p-8 text-gray-800 bg-gradient-to-br from-purple-50 via-white to-gray-100 min-h-screen">

      
      <img
        src={scrap.thumbnail}
        alt={scrap.title}
        className="w-full max-w-2xl mb-6 rounded"
      />
      <h2 className="text-3xl font-bold mb-2">{decode(scrap.title)}</h2>
      <p className="text-lg mb-8">{decode(scrap.description)}</p>

      {scrap.upload_date ? (
        <p className="text-sm text-gray-400 mb-2 text-black">
          업로드 날짜: {new Date(scrap.upload_date).toLocaleDateString("ko-KR")}
        </p>
      ) : (
        <p className="text-sm text-gray-400 mb-2 ">업로드 날짜 정보 없음</p>
      )}

      {/* ✅ 요약하기 버튼 */}
      {role === "admin" && (
  <div className="mb-4">
    <button
      onClick={handleSummarize}
      disabled={loading}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "요약 중..." : "요약하기"}
    </button>
    {error && <p className="text-red-400 mt-2">{error}</p>}
  </div>
)}

{loading && (
  <div className="w-full h-1 bg-gray-200 mt-2 rounded overflow-hidden">
    <div className="h-full bg-blue-500 animate-pulse w-full" />
  </div>
)}


      {/* ✅ 요약 목록 */}
      <h3 className="text-2xl font-semibold mb-4">요약 기록</h3>
      {summaries.length === 0 ? (
        <p className="text-gray-400">아직 저장된 요약이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {summaries.map((s) => (
            <li key={s.id} className="bg-white text-black rounded p-4 shadow">
              <div className="text-sm text-gray-600 mb-1">
                {new Date(s.created_at).toLocaleString()}
              </div>
              <div>{s.summary_text}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
