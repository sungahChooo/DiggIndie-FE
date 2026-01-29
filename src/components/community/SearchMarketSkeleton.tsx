// components/community/SearchMarketSkeleton.tsx
export default function SearchMarketSkeleton() {
  return (
    <div className="w-full px-5 flex flex-col gap-4 mt-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex gap-4 py-4 border-b border-gray-800 animate-pulse">
          {/* 이미지 썸네일 부분 */}
          <div className="w-[84px] h-[84px] bg-gray-800 rounded-[4px] shrink-0" />

          {/* 텍스트 정보 부분 */}
          <div className="flex flex-col flex-1 gap-2 justify-center">
            {/* 제목 (말머리 포함) */}
            <div className="flex gap-2 items-center">
              <div className="w-12 h-5 bg-gray-700 rounded-sm" />
              <div className="w-32 h-5 bg-gray-700 rounded-sm" />
            </div>
            {/* 가격 */}
            <div className="w-20 h-5 bg-gray-600 rounded-sm" />
            {/* 닉네임 & 시간 */}
            <div className="flex gap-2">
              <div className="w-16 h-3 bg-gray-800 rounded-sm" />
              <div className="w-12 h-3 bg-gray-800 rounded-sm" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
