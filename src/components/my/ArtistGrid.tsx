'use client';

import { useMemo } from "react";
import ArtistCard from "@/components/home/ArtistCard";
import type { ArtistItem } from "@/types/artists";

type Props = {
  artists: ArtistItem[];
};

export default function ArtistGrid({ artists }: Props) {
  const leftColumn = useMemo(
    () => artists.filter((_, idx) => idx % 2 === 0),
    [artists]
  );
  const rightColumn = useMemo(
    () => artists.filter((_, idx) => idx % 2 === 1),
    [artists]
  );

  return (
    <div className="flex justify-start gap-[15px] mt-[16px]">
      <div className="flex flex-col gap-[16px] w-[160px]">
        {leftColumn.map((artist) => (
          <ArtistCard key={artist.artistId} artist={artist} />
        ))}
      </div>

      <div className="flex flex-col gap-[16px] w-[160px]">
        {rightColumn.map((artist) => (
          <ArtistCard key={artist.artistId} artist={artist} />
        ))}
      </div>
    </div>
  );
}
