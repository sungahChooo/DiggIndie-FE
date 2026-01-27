'use client';

export default function ArticleBodySkeleton() {
  return (
    <div className="flex flex-col w-full py-4 px-5 border-b-4 border-gray-850 animate-pulse">
      {/* 제목 */}
      <div className="h-6 w-3/4 bg-gray-700 rounded mb-2" />

      {/* 작성자 / 날짜 / 조회수 */}
      <div className="flex gap-2 mb-3">
        <div className="h-3 w-16 bg-gray-700 rounded" />
        <div className="h-3 w-20 bg-gray-700 rounded" />
        <div className="h-3 w-14 bg-gray-700 rounded" />
      </div>

      {/* 본문 */}
      <div className="space-y-2 mb-5">
        <div className="h-4 w-full bg-gray-700 rounded" />
        <div className="h-4 w-11/12 bg-gray-700 rounded" />
        <div className="h-4 w-4/5 bg-gray-700 rounded" />
      </div>

      {/* 이미지 */}
      <div className="w-full aspect-square bg-gray-700 rounded-sm mb-4" />

      {/* 좋아요 / 댓글 */}
      <div className="flex gap-4">
        <div className="h-5 w-12 bg-gray-700 rounded" />
        <div className="h-5 w-12 bg-gray-700 rounded" />
      </div>
    </div>
  );
}
