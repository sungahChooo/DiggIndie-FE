export default function ArtistConcertSkeleton() {
  return (
    <div className="flex gap-4">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={`left-${idx}`}
          className="w-[160px] bg-[#1F1D1D] rounded-[4px] overflow-hidden animate-pulse"
        >
          {/* 이미지 */}
          <div className="w-full h-[160px] bg-[#2A2A2A]" />

          {/* 텍스트 */}
          <div className="px-[12px] py-[10px] flex flex-col gap-[8px]">
            <div className="h-[14px] w-3/4 bg-[#2F2F2F] rounded" />
            <div className="h-[12px] w-1/2 bg-[#2F2F2F] rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
