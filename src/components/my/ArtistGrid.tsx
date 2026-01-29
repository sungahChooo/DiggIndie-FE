'use client';

import ArtistCard from '@/components/home/ArtistCard';
import type { ArtistItem } from '@/types/artists';

type Props = {
  artists: ArtistItem[];
};

export default function ArtistGrid({ artists }: Props) {
  return (
    <div className="mt-4 grid w-full grid-cols-2 gap-x-[15px] gap-y-[16px]">
      {artists.map((artist) => (
        <ArtistCard key={artist.artistId} artist={artist} />
      ))}
    </div>
  );
}
