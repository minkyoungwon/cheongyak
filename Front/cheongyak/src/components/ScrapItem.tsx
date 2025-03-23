// 개별 유튜브 영상 카드 UI 컴포넌트
import { Link } from "react-router-dom";
import { useScrapStore } from "../hooks/useScrapStore";

interface ScrapProps {
  scrap: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
  };
}

export default function ScrapItem({ scrap }: ScrapProps) {
  const scrappedIds = useScrapStore((state) => state.scrappedIds);
  const toggleScrap = useScrapStore((state) => state.toggleScrap);
  const isScrapped = scrappedIds.has(scrap.id);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      <Link to={`/youtube-scrap/${scrap.id}`}>
        <img src={scrap.thumbnail} alt={scrap.title} className="w-full h-40 object-cover" />
      </Link>
      <div className="p-4 text-black">
        <h3 className="font-bold text-lg">{scrap.title}</h3>
        <p className="text-sm mt-1">{scrap.description}</p>

        {/* 스크랩 버튼 */}
        <button
          onClick={() => toggleScrap(scrap.id)}
          className={`mt-3 px-3 py-1 rounded font-semibold ${
            isScrapped ? 'bg-yellow-400 text-black' : 'bg-gray-300 text-gray-700'
          }`}
        >
          {isScrapped ? '스크랩됨' : '스크랩하기'}
        </button>
      </div>
    </div>
  );
}
