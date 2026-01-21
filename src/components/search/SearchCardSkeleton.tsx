export default function ArtistGridSkeleton() {
  const leftCount = 3;
  const rightCount = 3;

  return (
    <div className="flex justify-start gap-[15px] mt-[16px] animate-pulse">
      {/* 좌측 열 */}
      <div className="flex flex-col gap-[16px] w-[160px]">
        {Array.from({ length: leftCount }).map((_, idx) => (
          <div
            key={`left-${idx}`}
            className="w-[160px] bg-[#1F1D1D] rounded-[4px] overflow-hidden"
          >
            {/* 이미지 */}
            <div className="w-full h-[160px] bg-gray-800" />

            {/* 텍스트 */}
            <div className="px-[12px] py-[10px] flex flex-col gap-[8px]">
              <div className="h-[14px] w-3/4 bg-gray-700 rounded" />
              <div className="h-[12px] w-1/2 bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* 우측 열 */}
      <div className="flex flex-col gap-[16px] w-[160px]">
        {Array.from({ length: rightCount }).map((_, idx) => (
          <div
            key={`left-${idx}`}
            className="w-[160px] bg-[#1F1D1D] rounded-[4px] overflow-hidden"
          >
            {/* 이미지 */}
            <div className="w-full h-[160px] bg-gray-800" />

            {/* 텍스트 */}
            <div className="px-[12px] py-[10px] flex flex-col gap-[8px]">
              <div className="h-[14px] w-3/4 bg-gray-700 rounded" />
              <div className="h-[12px] w-1/2 bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
