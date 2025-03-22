// 전체 스크랩된 영상 리스트를 출력하는 컴포넌트

// ScrapList.tsx
import { useScrapStore } from "../hooks/useScrapStore";
import ScrapItem from "./ScrapItem";

export default function ScrapList() {
  const scraps = useScrapStore((state) => state.scraps);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {scraps.map((scrap) => (
        <ScrapItem key={scrap.id} scrap={scrap} />
      ))}
    </div>
  );
}
