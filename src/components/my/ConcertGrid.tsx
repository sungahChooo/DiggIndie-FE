"use client";

import { useMemo } from "react";
import PersonalConcertRecCard from "@/components/home/PersonalConcertRecCard";
import type { Concert } from "@/types/concerts";

type Props = {
  concerts: Concert[];
};

export default function ConcertGrid({ concerts }: Props) {
  const leftColumn = useMemo(
    () => concerts.filter((_, idx) => idx % 2 === 0),
    [concerts]
  );
  const rightColumn = useMemo(
    () => concerts.filter((_, idx) => idx % 2 === 1),
    [concerts]
  );

  return (
    <div className="flex justify-start gap-[16px] mt-[16px]">
      {/* 왼쪽 컬럼 */}
      <div className="flex flex-col gap-[20px] w-[160px]">
        {leftColumn.map((concert) => (
          <PersonalConcertRecCard
            key={concert.id}
            concert={concert}
          />
        ))}
      </div>

      {/* 오른쪽 컬럼  */}
      <div className="flex flex-col gap-[20px] w-[160px]">
        {rightColumn.map((concert) => (
          <PersonalConcertRecCard
            key={concert.id}
            concert={concert}
          />
        ))}
      </div>
    </div>
  );
}
