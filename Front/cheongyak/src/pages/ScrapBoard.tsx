import { useEffect, useState } from "react";
import { useScrapStore } from "../hooks/useScrapStore";
import { fetchYoutubeVideos } from "../utils/youtubeApi";
import ScrapList from "../components/ScrapList";

export default function ScrapBoard() {
  const setScraps = useScrapStore((state) => state.setScraps);
  const scraps = useScrapStore((state) => state.scraps);
  const scrappedIds = useScrapStore((state) => state.scrappedIds);
  const [query, setQuery] = useState("청약");
  const [loading, setLoading] = useState(false);
  const [showScrappedOnly, setShowScrappedOnly] = useState(false); // ✅ 위치 수정

  const handleSearch = async () => {
    setLoading(true);
    try {
      const videos = await fetchYoutubeVideos(query);
      setScraps(videos);
    } catch (error) {
      console.error("유튜브 영상 불러오기 실패", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(); // 첫 로딩 시 기본 검색어로 호출
  }, []);

  return (
    <div className="p-8 text-white bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">유튜브 청약 영상 검색</h2>

      {/* 검색창 */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 text-black rounded w-full max-w-md"
          placeholder="검색어를 입력하세요 (예: 청약, LH, 신혼부부)"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 font-semibold"
        >
          검색
        </button>
      </div>

      {/* 스크랩 필터 버튼 */}
      <div className="mb-4">

        <button
          onClick={() => setShowScrappedOnly((prev) => !prev)}
          className="px-4 py-2 bg-purple-500 rounded hover:bg-purple-600 font-semibold"
        >
          {showScrappedOnly ? '전체 보기' : '스크랩한 영상만 보기'}
        </button>

      </div>
      {/* 현재 보기 상태 표시 */}
      <div>
      <p className="mb-2 text-sm text-gray-300">
        현재 보기 모드:
        <span className={`ml-2 px-2 py-1 rounded text-sm font-bold
    ${showScrappedOnly ? 'bg-yellow-400 text-black' : 'bg-blue-500 text-white'}`}>
          {showScrappedOnly ? '스크랩한 영상만 보기' : '전체 영상 보기'}
        </span>
      </p>
      </div>

      {/* 로딩 상태 */}
      {loading && <p>⏳ 영상 불러오는 중...</p>}

      {/* 결과 없음 */}
      {!loading && scraps.length === 0 && (
        <p className="text-red-300">😢 관련된 영상을 찾을 수 없습니다.</p>
      )}

      {/* 영상 리스트 */}
      {!loading && (
        <ScrapList filterIds={showScrappedOnly ? Array.from(scrappedIds) : undefined} />
      )}
    </div>
  );
}
