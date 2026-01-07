'use client';

import { useMemo } from 'react';
import PersonalConcertRecCard from '@/components/home/ConcertCard';
import type { ConcertListItem } from '@/types/mocks/mockConcerts';

type Props = {
  concerts: ConcertListItem[];
};

export default function ConcertGrid({ concerts }: Props) {
  const leftColumn = useMemo(() => concerts.filter((_, idx) => idx % 2 === 0), [concerts]);
  const rightColumn = useMemo(() => concerts.filter((_, idx) => idx % 2 === 1), [concerts]);

  return (
    <div className="flex justify-start gap-[16px] mt-[16px]">
      <div className="flex flex-col gap-[20px]">
        {leftColumn.map((concert) => (
          <PersonalConcertRecCard key={concert.concertId} concert={concert} />
        ))}
      </div>

      <div className="flex flex-col gap-[20px]">
        {rightColumn.map((concert) => (
          <PersonalConcertRecCard key={concert.concertId} concert={concert} />
        ))}
      </div>
    </div>
  );
}
