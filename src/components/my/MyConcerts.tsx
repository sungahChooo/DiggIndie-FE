'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import downBtn from '@/assets/icons/down.svg';
import { myConcertToConcertItem } from '@/services/concertMappers'

import MyConcertGrid from '@/components/my/ConcertGrid';
import { useMyConcerts } from '@/hooks/useMyConcerts';
import type { MyConcertItem, ConcertItem } from '@/types/concerts';

type SortKey = 'updated' | 'korean';

function parseDday(dday: string) {
  if (!dday) return Number.POSITIVE_INFINITY;
  const up = dday.toUpperCase().trim();
  if (up === 'D-DAY') return 0;

  const m = up.match(/^D-(\d+)$/);
  if (!m) return Number.POSITIVE_INFINITY;
  return Number(m[1]);
}


export default function MyConcerts() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('updated');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { concerts, isLoading, error, refetch } = useMyConcerts();

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const label = sortKey === 'updated' ? '업데이트순' : '가나다순';

  //api에 "order" 추가 후 수정 필요, 아래는 더미데이터 용 직접 정렬
  // MyConcertItem 기준 정렬
  const sortedMyConcerts = useMemo<MyConcertItem[]>(() => {
    const list = [...(concerts ?? [])];

    if (sortKey === 'korean') {
      list.sort((a, b) => (a.concertName ?? '').localeCompare(b.concertName ?? '', 'ko'));
      return list;
    }

    // updated: 진행중 우선, D-day 가까운 순
    list.sort((a, b) => {
      if (a.finished !== b.finished) return a.finished ? 1 : -1;

      const da = parseDday(a.dday);
      const db = parseDday(b.dday);
      if (da !== db) return da - db;

      return (a.concertName ?? '').localeCompare(b.concertName ?? '', 'ko');
    });

    return list;
  }, [concerts, sortKey]);

  //매핑 함수 이용하여 concertItem으로 매핑. 두 API 변수명이 조금씩 다름 (period -> duration 등)
  const sortedConcerts = useMemo<ConcertItem[]>(
    () => sortedMyConcerts.map(myConcertToConcertItem),
    [sortedMyConcerts]
  );

  return (
    <section className="w-full flex flex-col px-[20px] mt-[20px]">
      {/* 드롭다운*/}
      <div className="relative w-fit" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="w-[100px] h-[28px] border border-[#736F6F] rounded-[4px] flex items-center gap-[4px]"
        >
          <span className="ml-[10.5px] text-[14px] tracking-[-0.42px] font-medium text-white">
            {label}
          </span>
          <div className="w-[16px] h-[16px]">
            <Image src={downBtn} alt="open dropdown" />
          </div>
        </button>

        {isOpen && (
          <div
            className="absolute left-0 mt-[8px] w-[100px] h-[108px] rounded-[4px]
                       border border-[#736F6F] flex flex-col items-center
                       py-[8px] gap-[4px] bg-black shadow-lg z-50"
          >
            <button
              type="button"
              onClick={() => {
                setSortKey('updated');
                setIsOpen(false);
              }}
              className={`flex w-[84px] h-[28px] rounded-[4px] text-[14px] ${
                sortKey === 'updated' ? 'bg-[#332F2F] text-white' : 'text-[#8C8888]'
              }`}
            >
              <span className="ml-[8px] mt-[3px]">업데이트순</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSortKey('korean');
                setIsOpen(false);
              }}
              className={`flex w-[84px] h-[28px] rounded-[4px] text-[14px] ${
                sortKey === 'korean' ? 'bg-[#332F2F] text-white' : 'text-[#8C8888]'
              }`}
            >
              <span className="ml-[8px] mt-[3px]">가나다순</span>
            </button>

            <div className="flex w-[84px] h-[28px] rounded-[4px] text-[14px]">
              <span className="ml-[8px] mt-[3px] text-[#8C8888]">스크랩순</span>
            </div>
          </div>
        )}
      </div>

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

      <div className={"mt-4"}>
        <MyConcertGrid concerts={sortedConcerts} />
      </div>

    </section>
  );
}
