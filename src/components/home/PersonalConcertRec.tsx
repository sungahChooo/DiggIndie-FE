'use client';

import { useMemo } from 'react';
import ConcertCard from '@/components/home/ConcertCard';
import Image from 'next/image';

import { useRecConcerts } from '@/hooks/useRecConcerts';
import type { ConcertItem } from '@/types/concerts';

type Props = {
  isLoggedIn: boolean;
};

// 날짜 순 정렬 dday 가공
function parseDday(dday: string) {
  if (!dday) return Number.POSITIVE_INFINITY;
  const up = dday.toUpperCase().trim();
  if (up === '공연 종료') return Number.POSITIVE_INFINITY;
  if (up === 'D-DAY') return 0;

  const m = up.match(/^D-(\d+)$/);
  if (!m) return Number.POSITIVE_INFINITY;
  return Number(m[1]);
}

// 비로그인용 카드 자리만 동일하게 차지하는 이미지 카드
function GuestConcertCard() {
  return (
    <div className="relative w-[160px] h-[200px] shrink-0">
      <Image
        src="/mocks/mockConcertImage.png"
        alt="mock concert"
        width={160}
        height={200}
        className="rounded-[8px] object-cover"
        priority={false}
      />
      <div className="absolute inset-0 bg-[#0B0F1499]" />

      <div className="flex flex-col absolute inset-0 z-10 flex flex-col justify-end mb-3 px-2">
        <span className={"bg-[#FF3637] w-[41px] h-[17px] text-white font-medium text-[12px] text-center"}>
          D-7
        </span>
        <span className={"text-white font-medium text-[16px] mt-1"}>
          공연 제목
        </span>
        <span className={"text-white font-normal text-[14px]"}>
          공연 아티스트 라인업
        </span>
        <span className={"text-[#8C8888] font-medium text-[12px]"}>
          2024.08.06 ~ 2026.01.23
        </span>
      </div>
    </div>
  );
}

export default function PersonalConcertRec({ isLoggedIn }: Props) {
  const { concerts, isLoading, error } = useRecConcerts({
    enabled: isLoggedIn,
  });

  const visibleConcerts = useMemo<ConcertItem[]>(() => {
    return [...concerts]
      .filter((c) => parseDday(c.dDay) >= 1)
      .sort((a, b) => parseDday(a.dDay) - parseDday(b.dDay));
  }, [concerts]);

  return (
    <div className="w-full flex flex-col mt-10 px-5 gap-3">
      <div className="flex w-full">
        <span className="font-semibold text-[20px]">
          리스너님을 위한 추천 공연
        </span>
      </div>

      <div className={`flex w-full overflow-x-auto ${!isLoggedIn ? 'blur-[3px]' : 'blur-none'}`}>
        <div className="flex gap-3 w-max">
          {!isLoggedIn ? (
            //로그인 안 했을 시 불러올 임시 사진
            <>
              <GuestConcertCard />
              <GuestConcertCard />
              <GuestConcertCard />
            </>
          ) : (
            <>
              {isLoading && <div className="text-[14px] text-[#8C8888]">불러오는 중...</div>}
              {!isLoading && error && <div className="text-[14px] text-[#8C8888]">{error}</div>}

              {!isLoading &&
                !error &&
                visibleConcerts.map((concert) => (
                  <ConcertCard key={concert.concertId} concert={concert} />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
