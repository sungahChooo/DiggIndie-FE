export default function SearchCardSkeleton() {
  return (
    <div className="w-[375px] h-[286px] flex flex-col bg-black animate-pulse">
      {/* 제목 스켈레톤 */}
      <div className="mx-5 mt-3 mb-5">
        <div className="h-5 w-32 bg-gray-700 rounded" />
      </div>

      {/* 카드 스켈레톤 영역 */}
      <div className="flex overflow-x-auto px-[20px]">
        <div className="flex gap-4 w-max">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="w-[140px] h-[190px] bg-gray-800 rounded-lg flex flex-col">
              {/* 이미지 영역 */}
              <div className="w-full h-[140px] bg-gray-700 rounded-t-lg" />

              {/* 텍스트 영역 */}
              <div className="p-2 flex flex-col gap-2">
                <div className="h-4 w-3/4 bg-gray-700 rounded" />
                <div className="h-3 w-1/2 bg-gray-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
