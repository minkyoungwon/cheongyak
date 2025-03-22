// 개별 유튜브 영상 카드 UI 컴포넌트

// ScrapItem.tsx
import { Link } from "react-router-dom";

interface ScrapProps {
  scrap: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
  };
}

export default function ScrapItem({ scrap }: ScrapProps) {
  return (
    <Link to={`/youtube-scrap/${scrap.id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
        <img src={scrap.thumbnail} alt={scrap.title} className="w-full h-40 object-cover" />
        <div className="p-4 text-black">
          <h3 className="font-bold text-lg">{scrap.title}</h3>
          <p className="text-sm mt-1">{scrap.description}</p>
        </div>
      </div>
    </Link>
  );
}
