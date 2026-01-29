// components/community/SearchFreeSkeleton.tsx
export default function SearchFreeSkeleton() {
  return (
    <div className="w-full px-5 flex flex-col gap-4 mt-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col gap-2 py-4 border-b border-gray-800 animate-pulse">
          {/* 카테고리 & 날짜 레이어 */}
          <div className="flex gap-2">
            <div className="w-10 h-4 bg-gray-700 rounded-sm" />
            <div className="w-16 h-4 bg-gray-800 rounded-sm" />
          </div>
          {/* 제목 레이어 */}
          <div className="w-3/4 h-6 bg-gray-700 rounded-md mt-1" />
          {/* 본문 요약 레이어 */}
          <div className="w-full h-4 bg-gray-800 rounded-sm" />
          {/* 작성자 & 통계 레이어 */}
          <div className="flex justify-between mt-2">
            <div className="w-20 h-4 bg-gray-800 rounded-sm" />
            <div className="flex gap-3">
              <div className="w-8 h-4 bg-gray-800 rounded-sm" />
              <div className="w-8 h-4 bg-gray-800 rounded-sm" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
