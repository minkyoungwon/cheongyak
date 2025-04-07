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

  // ✅ 추가된 state
  const [tempSummary, setTempSummary] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // ✅ 요약 실행 함수 (요약만 수행, 저장은 아님)
  const handleSummarize = async () => {
    if (!videoId) return;
    setLoading(true);
    setError("");

    try {
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

      setTempSummary(data.summary);
    } catch (err) {
      console.error(err);
      setError("요약 요청 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  // 요약 저장
  const handleSaveSummary = async () => {
    if (!videoId || !tempSummary) return;
    const createdBy = localStorage.getItem("invite_code");

    // ✅ 먼저 scraps 테이블에 video_id가 없다면 추가 (upsert)
    await supabase.from("scraps").upsert({
      video_id: videoId,
      title: scrap?.title || "제목 없음",
      description: scrap?.description || "",
      thumbnail: scrap?.thumbnail || "",
      scrapped_by: createdBy,
    });

    // ✅ 그리고 나서 summaries에 저장

    const saveRes = await fetch("http://localhost:4000/summary/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId, summary: tempSummary, createdBy }),
    });

    if (saveRes.ok) {
      setTempSummary("");
      const { data, error } = await supabase
        .from("summaries")
        .select("*")
        .eq("video_id", videoId)
        .order("created_at", { ascending: false });
      if (!error && data) setSummaries(data);
    }
  };

  // ✅ 요약 삭제
  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("summaries").delete().eq("id", id);
    if (!error) {
      setSummaries((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // ✅ 요약 수정
  const handleUpdate = async () => {
    const { error } = await supabase
      .from("summaries")
      .update({ summary_text: editText })
      .eq("id", editingId);

    if (!error) {
      setSummaries((prev) =>
        prev.map((s) => (s.id === editingId ? { ...s, summary_text: editText } : s))
      );
      setEditingId(null);
      setEditText("");
    }
  };

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
        <p className="text-sm text-gray-400 mb-2">업로드 날짜 정보 없음</p>
      )}

      {/* ✅ 요약하기 */}
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

      {/* ✅ 요약 미리보기 + 저장 */}
      {tempSummary && (
        <div className="bg-white text-black p-4 rounded shadow mb-4">
          <h3 className="font-semibold mb-2">AI 요약 미리보기</h3>
          <p className="mb-2 whitespace-pre-wrap">{tempSummary}</p>
          <button
            onClick={handleSaveSummary}
            className="bg-green-600 text-white px-4 py-2 rounded mr-2"
          >
            저장하기
          </button>
          <button
            onClick={() => setTempSummary("")}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            취소
          </button>
        </div>
      )}

      {/* ✅ 저장된 요약 목록 */}
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
              {editingId === s.id ? (
                <>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditText("");
                      }}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      취소
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="whitespace-pre-wrap mb-2">{s.summary_text}</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(s.id);
                        setEditText(s.summary_text);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      삭제
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}