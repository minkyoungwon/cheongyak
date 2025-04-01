// 개별 유튜브 영상 카드 UI 컴포넌트
import { Link } from "react-router-dom";
import { useScrapStore } from "../hooks/useScrapStore";
import { decode } from "html-entities";

interface ScrapProps {
  scrap: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    upload_date?: string;
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
        <h3 className="font-bold text-lg">{decode(scrap.title)}</h3>
        {/* 문자 인코딩문제 decode 처리 */}
        <p className="text-sm mt-1">{scrap.description}</p>

        <p className="text-sm text-gray-600 mt-1">
          업로드: {scrap.upload_date ? new Date(scrap.upload_date).toLocaleDateString("ko-KR") : "알 수 없음"}
        </p>



        {/* 스크랩 버튼 */}
        <button
          onClick={() => toggleScrap(scrap.id)}
          className={`mt-3 px-3 py-1 rounded font-semibold ${isScrapped ? 'bg-yellow-400 text-black' : 'bg-gray-300 text-gray-700'
            }`}
        >
          {isScrapped ? '스크랩됨' : '스크랩하기'}
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${scrap.id}`);
            alert("✅ 영상 URL이 복사되었습니다!");
          }}
          className="ml-2 bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 text-sm"
        >
          URL 복사
        </button>

      </div>
    </div>
  );
}
