'use client';

import { useMagazines } from '@/hooks/useMagazines';
import MagazineCard from '@/components/indieStory/IndieStoryCard';
import ArtistConcertSkeleton from '@/components/home/ArtistConcertSkeleton';

export default function IndieStoryRec() {
  const { magazines, isLoading } = useMagazines({
    order: 'recent',
    query: undefined,
    size: 10,
    enabled: true,
  });

  return (
    <div
      className="w-full pb-5 flex flex-col
        bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,#3E0102_100%)]"
    >
      <div className="flex overflow-x-auto pt-3">
        <div className="flex gap-4">
          {isLoading ? (
            <div className="px-5">
              <ArtistConcertSkeleton />
            </div>
          ) : (
            magazines.map((m) => <MagazineCard rounded={true} key={m.magazineId} magazine={m} />)
          )}
        </div>
      </div>
    </div>
  );
}
