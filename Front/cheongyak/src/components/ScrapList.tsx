// 전체 스크랩된 영상 리스트를 출력하는 컴포넌트
import { useScrapStore } from "../hooks/useScrapStore";
import ScrapItem from "./ScrapItem";

interface Props {
  filterIds?: string[];
}

export default function ScrapList({ filterIds }: Props) {
  const scraps = useScrapStore((state) => state.scraps);

  const filtered = filterIds
    ? scraps.filter((scrap) => filterIds.includes(scrap.id))
    : scraps;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((scrap) => (
        <ScrapItem key={scrap.id} scrap={scrap} />
      ))}
    </div>
  );
}
