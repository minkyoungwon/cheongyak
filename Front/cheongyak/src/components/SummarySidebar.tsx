import { useState } from "react";

export default function SummarySidebar() {
  const [open, setOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [summary, setSummary] = useState("");

const handleSummarize = async () => {
  if (!videoId.trim()) {
    alert("유튜브 영상 ID 또는 URL을 입력해주세요.");
    return;
  }

  // 유튜브 URL 전체가 들어오는 경우 → videoId만 추출
  const parsedVideoId = extractYoutubeVideoId(videoId);
  if (!parsedVideoId) {
    alert("유효한 유튜브 ID 또는 URL이 아닙니다.");
    return;
  }

  try {
    const response = await fetch("http://localhost:4000/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId: parsedVideoId }),
    });

    const data = await response.json();

    if (response.ok) {
      setSummary(data.summary);
    } else {
      setSummary(`요약 실패: ${data.error || "서버 오류"}`);
    }
  } catch (error) {
    console.error("요약 요청 에러:", error);
    setSummary("요약 중 오류가 발생했습니다.");
  }
};


function extractYoutubeVideoId(input: string): string | null {
  // ID만 입력한 경우
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;

  // URL에서 ID 추출
  const match = input.match(/[?&]v=([^&]+)/) || input.match(/youtu\.be\/([^?]+)/);
  return match ? match[1] : null;
}




  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* 요약창 본체 */}
      {open && (
        <div className="w-80 bg-white shadow-xl rounded-lg p-4 text-black">
          <h3 className="font-bold text-lg mb-2">영상 요약</h3>
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
            <div className="bg-gray-100 p-2 rounded text-sm">{summary}</div>
          )}
        </div>
      )}

      {/* 열고 닫는 버튼 */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700"
      >
        {open ? "닫기" : "요약하기"}
      </button>
    </div>
  );
}
