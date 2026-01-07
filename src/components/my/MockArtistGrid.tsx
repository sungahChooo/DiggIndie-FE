"use client";

import { useMemo } from "react";
import ArtistCard from "@/components/home/MockArtistCard";
import type { Artist } from "@/types/mocks/mockArtists";

type Props = {
  artists: Artist[];
};

export default function MockArtistGrid({ artists }: Props) {
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
      {/* 왼쪽 컬럼 */}
      <div className="flex flex-col gap-[16px] w-[160px]">
        {leftColumn.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>

      {/* 오른쪽 컬럼  */}
      <div className="flex flex-col gap-[16px] w-[160px]">
        {rightColumn.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}