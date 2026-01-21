export default function ArtistItemSkeleton() {
  return (
    <div
      className="
        relative
        w-full
        aspect-[102/104]
        border
        border-gray-700
        rounded-sm
        overflow-hidden
        animate-pulse
      "
    >
      {/* 이미지 영역 */}
      <div className="absolute inset-0 bg-gray-700/60" />

      {/* 하단 그라데이션 */}
      <div
        className="absolute inset-0
        bg-[linear-gradient(180deg,#00000000_0%,rgba(0,0,0,0.6)_80%)]"
      />

      {/* 텍스트 스켈레톤 */}
      <div className="absolute bottom-2 left-2 right-2 z-10">
        <div className="h-4 w-3/4 rounded bg-gray-600" />
      </div>
    </div>
  );
}
