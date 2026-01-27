'use client';

export default function TradeDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* 이미지 영역 */}
      <div className="w-full h-[375px] bg-gray-850 mb-3" />

      {/* 프로그레스 바 */}
      <div className="px-5 mb-6">
        <div className="h-2 w-full bg-gray-850 rounded" />
      </div>

      <section className="px-5">
        {/* 링크 박스 */}
        <div className="h-12 w-full bg-gray-850 rounded-sm mb-7" />

        {/* 제목 + 북마크 */}
        <div className="flex items-center gap-3 mb-2">
          <div className="h-6 w-12 bg-gray-850 rounded" />
          <div className="h-6 flex-1 bg-gray-850 rounded" />
          <div className="h-6 w-6 bg-gray-850 rounded" />
        </div>

        {/* 가격 */}
        <div className="h-6 w-24 bg-gray-850 rounded mb-3" />

        {/* 닉네임 / 시간 */}
        <div className="flex gap-2 mb-5">
          <div className="h-4 w-16 bg-gray-850 rounded" />
          <div className="h-4 w-20 bg-gray-850 rounded" />
        </div>

        {/* 본문 */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-850 rounded" />
          <div className="h-4 w-full bg-gray-850 rounded" />
          <div className="h-4 w-3/4 bg-gray-850 rounded" />
        </div>
      </section>
    </div>
  );
}
