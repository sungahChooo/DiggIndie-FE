'use client';

import { useMemo, useState } from 'react';
import { myConcertToConcertItem } from '@/services/concertMappers'

import MyConcertGrid from '@/components/my/ConcertGrid';
import { useMyConcerts } from '@/hooks/useMyConcerts';
import type { MyConcertItem, ConcertItem } from '@/types/concerts';

type SortKey = 'updated' | 'korean';


export default function MyConcerts() {
  const [sortKey] = useState<SortKey>('updated');
  const { concerts, isLoading, error, refetch } = useMyConcerts();

  // MyConcertItem 기준 정렬
  const sortedMyConcerts = useMemo<MyConcertItem[]>(() => {
    const list = [...(concerts ?? [])];

    if (sortKey === 'korean') {
      list.sort((a, b) => (a.concertName ?? '').localeCompare(b.concertName ?? '', 'ko'));
      return list;
    }

    return list;
  }, [concerts, sortKey]);

  //매핑 함수 이용하여 concertItem으로 매핑. 두 API 변수명이 조금씩 다름 (period -> duration 등)
  const sortedConcerts = useMemo<ConcertItem[]>(
    () => sortedMyConcerts.map(myConcertToConcertItem),
    [sortedMyConcerts]
  );

  return (
    <section className="w-full flex flex-col px-[20px]">
      {/* 로딩/에러 */}
      {isLoading && (
        <div className="mt-[12px] text-[14px] text-[#8C8888]">불러오는 중...</div>
      )}

      {error && (
        <div className="mt-[12px] flex items-center gap-[8px]">
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

      <div className={"flex mt-4 justify-center"}>
        <MyConcertGrid concerts={sortedConcerts} />
      </div>

    </section>
  );
}
