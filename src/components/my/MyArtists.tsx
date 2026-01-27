
"use client";

import { useMemo, useState } from "react";
import ArtistGrid from "@/components/my/ArtistGrid";
import { useMyArtists } from "@/hooks/useMyArtists";
import { myArtistToArtistItem } from "@/services/artistMappers";

type SortKey = "updated" | "korean";

export default function MyArtists() {
  const [sortKey] = useState<SortKey>("updated");
  const { artists: myArtists, isLoading, error, refetch } = useMyArtists();


  const artistItems = useMemo(() => myArtists.map(myArtistToArtistItem), [myArtists]);

  const sortedArtists = useMemo(() => {
    const arr = [...artistItems];

    if (sortKey === "korean") {
      arr.sort((a, b) => (a.artistName ?? "").localeCompare(b.artistName ?? "", "ko"));
      return arr;
    }

    return arr;
  }, [artistItems, sortKey]);

  return (
    <section className="w-full flex flex-col px-[20px]">

      {/* 로딩/에러 (임시, 에러 시 대응방법 기획과 상의? */}
      {isLoading && (
        <div className="mt-[16px] text-[14px] text-[#8C8888]">불러오는 중...</div>
      )}

      {error && (
        <div className="mt-[16px] flex items-center gap-[8px]">
          <span className="text-[14px] text-[#8C8888]">{error}</span>
          <button
            type="button"
            onClick={refetch}
            className="text-[14px] text-white underline underline-offset-2"
          >
            다시 시도
          </button>
        </div>
      )}

      {!isLoading && !error &&
        <div className={"flex justify-center"}>
        <ArtistGrid artists={sortedArtists} />
        </div>}
    </section>
  );
}
