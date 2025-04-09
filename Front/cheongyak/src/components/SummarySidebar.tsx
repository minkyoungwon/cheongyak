import { useState } from "react";

export default function SummarySidebar() {
  const [open, setOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!videoId.trim()) {
      alert("유튜브 영상 ID 또는 URL을 입력해주세요.");
      return;
    }

    const parsedVideoId = extractYoutubeVideoId(videoId);
    if (!parsedVideoId) {
      alert("유효한 유튜브 ID 또는 URL이 아닙니다.");
      return;
    }

    setLoading(true);
    setSummary("");

    try {
      const response = await fetch("${import.meta.env.VITE_API_URL}/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: parsedVideoId }),
      });

      const data = await response.json();

      if (response.ok) {
        setSummary(data.summary);

        // ✅ DB에 요약 저장
        const saveRes = await fetch(`${import.meta.env.VITE_API_URL}/summary/save`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            videoId: parsedVideoId,
            summary: data.summary,
            createdBy: localStorage.getItem("invite_code"),
          }),
        });

        if (!saveRes.ok) {
          console.warn("❌ 요약 저장 실패");
        } else {
          console.log("✅ 요약 저장 성공");
        }
      } else {
        setSummary(`요약 실패: ${data.error || "서버 오류"}`);
      }
    } catch (error) {
      console.error("요약 요청 에러:", error);
      setSummary("요약 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  function extractYoutubeVideoId(input: string): string | null {
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
    const match = input.match(/[?&]v=([^&]+)/) || input.match(/youtu\.be\/([^?]+)/);
    return match ? match[1] : null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="w-80 bg-white shadow-xl rounded-lg p-4 text-black">
          <h3 className="font-bold text-lg mb-2">원하는 영상 요약 하는곳이라구</h3>

          {loading && (
            <div className="w-full h-2 bg-gray-200 rounded overflow-hidden mb-2">
              <div className="h-full bg-blue-500 animate-pulse w-full" />
            </div>
          )}

          <input
            type="text"
            placeholder="유튜브 ID 또는 URL"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <button
            onClick={handleSummarize}
            className="w-full bg-blue-500 text-white py-2 rounded mb-2 hover:bg-blue-600"
          >
            요약 요청
          </button>
          {summary && (
            <div className="bg-gray-100 p-2 rounded text-sm whitespace-pre-wrap">{summary}</div>
          )}
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700"
      >
        {open ? "닫기" : "원하는 영상 URL 넣으면 요약하는곳"}
      </button>
    </div>
  );
}
