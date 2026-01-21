import xbutton from '@/assets/auth/xButton.svg';
import { RecentSearch } from '@/types/searches';
import Image from 'next/image';

interface RecentSearchSectionProps {
  searches: RecentSearch[];
  onDelete: (id: number) => void;
  onClearAll: () => void;
}
export default function RecentSearchSection({
  searches,
  onDelete,
  onClearAll,
}: RecentSearchSectionProps) {
  return (
    <section className="px-5 flex gap-3 flex-col">
      <p className="flex justify-between">
        <span className="text-gray-600 text-xs font-medium">최근 검색어</span>
        <span
          className="text-gray-600 text-xs font-medium border-b border-gray-600 cursor-pointer"
          onClick={() => onClearAll()}
        >
          전체 삭제
        </span>
      </p>
      <div className="flex gap-2 flex-wrap">
        {searches.map((search) => (
          <span
            key={search.recentSearchId}
            className="cursor-pointer bg-gray-850 border-gray-700 text-gray-300 text-xs font-medium px-2 py-1 flex gap-1 rounded-xs justify-between items-center border-gray-700 border min-w-[60px] "
          >
            {search.content}
            <Image
              src={xbutton}
              alt="x button"
              height={16}
              width={16}
              className="cursor-pointer"
              onClick={() => onDelete(search.recentSearchId)}
            />
          </span>
        ))}
      </div>
    </section>
  );
}
