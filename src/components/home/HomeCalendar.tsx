'use client';

import { useEffect, useMemo, useState } from 'react';
import { getThisWeekDates } from '@/hooks/getDay';
import Image from 'next/image';
import ticket from '@/assets/common/ticket.svg';
import nextBtn from '@/assets/common/next.svg';
import prevBtn from '@/assets/icons/prev.svg';
import prevDisabledBtn from '@/assets/icons/prevDisabled.svg';
import nextDisabledBtn from '@/assets/icons/nextDisabled.svg';
import nextGrayBtn from '@/assets/icons/nextGray.svg';
import Link from 'next/link';

import { useWeeklyConcerts } from '@/hooks/useWeeklyConcerts';

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function todayKey() {
  const t = new Date();
  return `${t.getFullYear()}-${pad2(t.getMonth() + 1)}-${pad2(t.getDate())}`;
}

export default function HomeCalendar() {
  const weekdays = ['월', '화', '수', '목', '금', '토', '일'];

  const [weekOffset, setWeekOffset] = useState(0);
  const dates = useMemo(() => getThisWeekDates(weekOffset), [weekOffset]);

  const today = new Date().getDay();
  const initialIndex = today === 0 ? 6 : today - 1;
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  useEffect(() => {
    if (weekOffset === 0) setSelectedIndex(initialIndex);
    if (weekOffset === 1) setSelectedIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekOffset]);

  const selectedDate = dates[selectedIndex];

  const { concerts: todayConcerts, error } = useWeeklyConcerts(selectedDate, {
    size: 2,
    page: 0,
  });

  const isThisWeek = weekOffset === 0;
  const isNextWeek = weekOffset === 1;

  const yearMonth = dates[0].slice(0, 7).replace('-', '.');

  function getRidOfZero(date: string) {
    return date.startsWith('0') ? date.slice(1) : date;
  }

  return (
    <div className="flex flex-col w-full px-5 justify-center mt-10 bg-black">
      <div className={'flex'}>
        <div className={'text-[20px] font-semibold'}>공연 위클리 캘린더</div>
        {/* 상단 >: 금일 날짜로 진입 */}
        <Link
          href={{ pathname: '/calendar', query: { date: todayKey() } }}
          className="ml-auto"
        >
          <Image src={nextBtn} alt="next" width={24} height={24} />
        </Link>
      </div>

      <div className={'mt-4 text-4 font-medium text-gray-500'}>{yearMonth}</div>

      <div className={'flex justify-between w-full'}>
        <button
          disabled={isThisWeek}
          onClick={() => setWeekOffset((prev) => Math.max(0, prev - 1))}
          className={`${!isThisWeek ? 'cursor-pointer' : ''}`}
        >
          <Image src={!isThisWeek ? prevBtn : prevDisabledBtn} alt="prevBtn" />
        </button>

        <div className="flex items-center justify-center w-full h-[62px]">
          {weekdays.map((day, i) => {
            const isSelected = selectedIndex === i;
            return (
              <div
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`
                  flex flex-col items-center justify-center cursor-pointer rounded-sm
                  w-full h-[62px] transition-all gap-1 border-[1px]
                  ${
                  isSelected
                    ? 'bg-[#880405] font-bold border-[#C31C20]'
                    : 'border-black text-white'
                }
                `}
              >
                <span className="text-[14px]">{day}</span>
                <span className="text-[13px]">{getRidOfZero(dates[i].split('-')[2])}</span>
              </div>
            );
          })}
        </div>

        <button
          disabled={isNextWeek}
          onClick={() => setWeekOffset((prev) => Math.min(1, prev + 1))}
          className={`${!isNextWeek ? 'cursor-pointer' : ''}`}
        >
          <Image src={!isNextWeek ? nextBtn : nextDisabledBtn} alt="nextBtn" />
        </button>
      </div>

      <span className={'w-full mt-3 border-b-[1px] border-[#332F2F]'} />

      {/* 더보기 : 위클리에서 선택된 날짜로 전체 캘린더 진입 */}
      <Link
        href={{ pathname: '/calendar', query: { date: selectedDate } }}
        className={'flex items-center text-[14px] font-medium text-gray-500 mt-3 ml-auto'}
      >
        더보기
        <Image
          src={nextGrayBtn}
          alt={'more'}
          width={20}
          height={20}
        />
      </Link>

      <div
        className="flex flex-col w-full min-h-[56px] max-h-[224px]
        bg-black gap-3 mt-2"
      >
        {error ? (
          <div className="text-[#FF6B6B] text-3.5 break-words ">{error}</div>
        ) : todayConcerts.length !== 0 ? (
          todayConcerts.map((concert) => (
            <div
              key={concert.concertId}
              className="flex flex-col w-full h-25 font-semibold bg-[#1F1D1D] px-4 py-3
              border-[1px] border-[#413D3D] rounded-sm"
            >
              <span className="text-[16px] truncate">
                {concert.startsAt}
              </span>

              <div className={'flex gap-1 mt-1'}>
                <div className="flex gap-1 font-normal min-w-0 pb-8">
                  <Image src={ticket} alt="ticket" width={20} height={20} />
                </div>

                <div className="flex flex-col text-[#8C8888] font-normal truncate">
                <span className="truncate text-white">
                  {concert.concertName}
                </span>
                  {concert.concertHall}
                </div>
              </div>

            </div>
          ))
        ) : (
          <div
            className="w-full border-[1px] border-[#413D3D]
          bg-[#1F1D1D] text-[#8C8888] text-[14px] py-3 px-4 rounded-sm"
          >
            금일 예정된 공연은 없습니다
          </div>
        )}
      </div>
    </div>
  );
}
