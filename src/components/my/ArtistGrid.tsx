"use client";

import { useMemo } from "react";
import PersonalArtistRecCard from "@/components/home/PersonalArtistRecCard";
import type { Artist } from "@/types/artists";

type Props = {
  artists: Artist[];
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
      {/* 왼쪽 컬럼 */}
      <div className="flex flex-col gap-[16px] w-[160px]">
        {leftColumn.map((artist) => (
          <PersonalArtistRecCard key={artist.id} artist={artist} />
        ))}
      </div>

      {/* 오른쪽 컬럼  */}
      <div className="flex flex-col gap-[16px] w-[160px]">
        {rightColumn.map((artist) => (
          <PersonalArtistRecCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}
