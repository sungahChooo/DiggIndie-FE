'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import CalendarHeader from '@/components/home/calendar/CalendarHeader';
import Calendar from '@/components/home/calendar/Calendar';
import ConcertGrid from '@/components/my/ConcertGrid';

import { useMonthConcerts } from '@/hooks/useMonthConcerts';
import { useCalendarConcerts } from '@/hooks/useCalendarConcerts';

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

export default function CalendarPageClient() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');

  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(true);

  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth() + 1);

  useEffect(() => {
    if (!dateParam) return;
    setSelectedDates([dateParam]);
  }, [dateParam]);

  const monthEnabled = selectedDates.length === 0;

  const { data: monthData, isLoading: isMonthLoading } = useMonthConcerts({
    year: viewYear,
    month: viewMonth,
    enabled: monthEnabled,
  });

  const fetchDates = useMemo((): string[] | null => {
    if (selectedDates.length > 0) return selectedDates;

    if (!monthData) return null;

    const days = monthData.days ?? [];
    const concertDays = days.filter((d) => d.hasConcert).map((d) => d.day);

    return concertDays.map((day) => `${viewYear}-${pad2(viewMonth)}-${pad2(day)}`);
  }, [selectedDates, monthData, viewYear, viewMonth]);

  const concertsEnabled = selectedDates.length > 0 || (fetchDates !== null && fetchDates.length > 0);

  const {
    concerts,
    hasNext,
    isLoading: isConcertLoading,
    isLoadingMore,
    loadMore,
  } = useCalendarConcerts({
    dates: fetchDates ?? [],
    size: 100,
    enabled: concertsEnabled,
  });

  const isLoading =
    selectedDates.length > 0
      ? isConcertLoading
      : isMonthLoading || (concertsEnabled ? isConcertLoading : false);

  const concertsToShow = useMemo(() => {
    const base = concerts ?? [];

    return [...base].sort((a, b) => {
      const aEnded = a.dDay === '공연 종료';
      const bEnded = b.dDay === '공연 종료';

      if (aEnded && !bEnded) return 1;
      if (!aEnded && bEnded) return -1;
      return 0;
    });
  }, [concerts]);

  const noConcertsToday =
    !isLoading &&
    (selectedDates.length > 0
      ? concertsToShow.length === 0
      : fetchDates !== null && (fetchDates.length === 0 || concertsToShow.length === 0));

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    if (!concertsEnabled) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        loadMore();
      },
      { root: null, rootMargin: '200px', threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [concertsEnabled, loadMore]);

  return (
    <div className="text-white flex flex-col items-center min-h-screen bg-black pb-4">
      <CalendarHeader
        isCalendarOpen={showCalendar}
        onToggleCalendar={() => setShowCalendar((prev) => !prev)}
      />

      {showCalendar && (
        <Calendar
          selectedDates={selectedDates}
          onChangeSelectedDates={setSelectedDates}
          onMonthChange={(y, m) => {
            setViewYear(y);
            setViewMonth(m);
          }}
        />
      )}

      <div className="w-full max-w-[375px] h-[40px] mt-3 flex px-5 py-2">
        {selectedDates[0] && (
          <div
            className={`text-[16px] font-medium ${
              noConcertsToday ? "text-gray-700" : "text-[#BEBABA]"
            }`}
          >
            {selectedDates[0].slice(0, 4)}년 {selectedDates[0].slice(5, 7)}월{" "}
            {selectedDates[0].slice(8, 10)}일
          </div>
        )}
      </div>

      <div className="w-full flex justify-start px-5">
        {noConcertsToday ? (
          <div
            className="w-full max-w-full min-w-0 box-border h-[44px] bg-[#1F1D1D] border-[1px] border-[#413D3D]
            rounded-[4px] font-medium text-[14px] text-[#8C8888] px-4 flex items-center"
          >
            금일 예정된 공연은 없습니다
          </div>

        ) : (
          <div className="w-full">
            <ConcertGrid concerts={concertsToShow} />

            <div ref={sentinelRef} className="h-8" />

            {hasNext && (isLoadingMore || isConcertLoading) && (
              <div className="w-full max-w-[335px] mt-2 text-[#8C8888] text-[12px] px-4">
                더 불러오는 중...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
