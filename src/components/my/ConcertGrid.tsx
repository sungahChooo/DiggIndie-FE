"use client";

import { useMemo } from "react";
import ConcertCard from "@/components/home/ConcertCard";
import type { ConcertItem } from "@/types/concerts";

type Props = {
  concerts: ConcertItem[];
};

export default function ConcertGrid({ concerts }: Props) {
  const sortedConcerts = useMemo(() => {
    return [...concerts].sort((a, b) => {
      const aEnded = a.dDay === "공연 종료";
      const bEnded = b.dDay === "공연 종료";
      if (aEnded && !bEnded) return 1;
      if (!aEnded && bEnded) return -1;
      return 0;
    });
  }, [concerts]);

  return (
    <div className="mt-[16px] grid w-full grid-cols-2 gap-x-[15px] gap-y-[16px]">
      {sortedConcerts.map((concert) => (
        <ConcertCard key={concert.concertId} concert={concert} />
      ))}
    </div>
  );
}
