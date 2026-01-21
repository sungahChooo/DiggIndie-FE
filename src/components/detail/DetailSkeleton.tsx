export default function ArtistDetailSkeleton() {
  return (
    <div className="text-white flex flex-col min-h-screen animate-pulse">
      {/* Header + Image */}
      <div className="relative">
        <div className="h-12 bg-black" />
        <div className="w-full h-120 aspect-square bg-gray-800" />
      </div>

      {/* Artist Content */}
      <div className="px-5 py-6 space-y-4">
        {/* Artist Name */}
        <div className="h-6 w-2/3 bg-gray-700 rounded" />

        {/* Keywords */}
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-gray-700 rounded-full" />
          <div className="h-5 w-14 bg-gray-700 rounded-full" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-5/6" />
          <div className="h-4 bg-gray-700 rounded w-4/6" />
        </div>
      </div>

      {/* Scheduled Concerts */}
      <div className="px-5 py-4 space-y-3">
        <div className="h-5 w-40 bg-gray-700 rounded" />
        <div className="flex gap-3 overflow-x-hidden">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="min-w-[140px] h-[180px] bg-gray-800 rounded-md" />
          ))}
        </div>
      </div>

      {/* Ended Concerts */}
      <div className="px-5 py-4 space-y-3">
        <div className="h-5 w-40 bg-gray-700 rounded" />
        <div className="flex gap-3 overflow-x-hidden">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="min-w-[140px] h-[180px] bg-gray-800 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}
