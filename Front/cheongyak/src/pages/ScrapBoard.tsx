import { useEffect } from "react";
import { useScrapStore } from "../hooks/useScrapStore";
import { fetchYoutubeVideos } from "../utils/youtubeApi";
import ScrapList from "../components/ScrapList";

export default function ScrapBoard() {
  const setScraps = useScrapStore((state) => state.setScraps);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videos = await fetchYoutubeVideos("청약"); // 검색 키워드
        setScraps(videos);
      } catch (error) {
        console.error("유튜브 영상 불러오기 실패", error);
      }
    };

    loadVideos();
  }, []);

  return (
    <div className="p-8 text-white bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">스크랩된 유튜브 영상</h2>
      <ScrapList />
    </div>
  );
}
