'use client';

import { useMemo } from 'react';
import ConcertCard from '@/components/home/ConcertCard';
import type { ConcertItem } from '@/types/concerts';

type Props = {
  concerts: ConcertItem[];
};

export default function ConcertGrid({ concerts }: Props) {
  const sortedConcerts = useMemo(() => {
    return [...concerts].sort((a, b) => {
      const aEnded = a.dDay === '공연 종료';
      const bEnded = b.dDay === '공연 종료';

      if (aEnded && !bEnded) return 1;
      if (!aEnded && bEnded) return -1;
      return 0;
    });
  }, [concerts]);

  const leftColumn = useMemo(
    () => sortedConcerts.filter((_, idx) => idx % 2 === 0),
    [sortedConcerts]
  );

  const rightColumn = useMemo(
    () => sortedConcerts.filter((_, idx) => idx % 2 === 1),
    [sortedConcerts]
  );

  console.log(concerts.map((c) => c.dDay));


  return (
    <div className="flex justify-start gap-[16px]">
      <div className="flex flex-col gap-[20px]">
        {leftColumn.map((concert) => (
          <ConcertCard key={concert.concertId} concert={concert} />
        ))}
      </div>

      <div className="flex flex-col gap-[20px]">
        {rightColumn.map((concert) => (
          <ConcertCard key={concert.concertId} concert={concert} />
        ))}
      </div>
    </div>
  );
}
