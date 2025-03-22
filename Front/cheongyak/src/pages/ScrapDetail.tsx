// 개별 유튜브 영상 상세 정보 페이지

// ScrapDetail.tsx
import { useParams } from "react-router-dom";
import { useScrapStore } from "../hooks/useScrapStore";

export default function ScrapDetail() {
  const { id } = useParams();
  const scraps = useScrapStore((state) => state.scraps);
  const scrap = scraps.find((item) => item.id === id);

  if (!scrap) return <div className="text-white p-8">영상을 찾을 수 없습니다.</div>;

  return (
    <div className="p-8 text-white bg-gray-900 min-h-screen">
      <img src={scrap.thumbnail} alt={scrap.title} className="w-full max-w-2xl mb-6 rounded" />
      <h2 className="text-3xl font-bold mb-2">{scrap.title}</h2>
      <p className="text-lg">{scrap.description}</p>
    </div>
  );
}
