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

import { useConcertsByDate } from '@/hooks/useConcertsByDate';

export default function HomeCalendar() {
  const weekdays = ['월', '화', '수', '목', '금', '토', '일'];

  const [weekOffset, setWeekOffset] = useState(0);
  const dates = useMemo(() => getThisWeekDates(weekOffset), [weekOffset]);

  const today = new Date().getDay();
  const initialIndex = today === 0 ? 6 : today - 1; // 월요일: 0 기준으로 보정
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  // weekOffset 변경 시 선택 요일을 자연스럽게 조정 (원치 않으면 제거 가능)
  useEffect(() => {
    if (weekOffset === 0) setSelectedIndex(initialIndex); // 이번 주: 오늘
    if (weekOffset === 1) setSelectedIndex(0); // 다음 주: 월요일
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekOffset]);

  const selectedDate = dates[selectedIndex];

  //선택된 날짜의 공연 최대 2개
  const {
    concerts: todayConcerts,
    loading,
    error,
  } = useConcertsByDate(selectedDate, {
    size: 2,
    page: 0,
    // 정렬: 시작 내림차순
  });

  // 이번주와 다음주만 표기
  const isThisWeek = weekOffset === 0;
  const isNextWeek = weekOffset === 1;

  const yearMonth = dates[0].slice(0, 7).replace('-', '.');

  function getRidOfZero(date: string) {
    return date.startsWith('0') ? date.slice(1) : date;
  }

  return (
    <div className="flex flex-col justify-center mt-10 bg-black">
      <div className={'mx-[20px] text-[20px] font-semibold'}>공연 위클리 캘린더</div>

      <div className={'mx-5 mt-3 mb-4 text-5 font-medium text-[#E4E4E4]'}>{yearMonth}</div>

      <div className={'flex justify-between w-[340px] mx-[17.5px]'}>
        <button
          disabled={isThisWeek}
          onClick={() => setWeekOffset((prev) => Math.max(0, prev - 1))}
          className={`${!isThisWeek ? 'cursor-pointer' : ''}`}
        >
          <Image src={!isThisWeek ? prevBtn : prevDisabledBtn} alt="prevBtn" />
        </button>

        <div className="flex items-center justify-center w-[284px] h-[62px]">
          {weekdays.map((day, i) => {
            const isSelected = selectedIndex === i;

            return (
              <div
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`
                  flex flex-col items-center justify-center cursor-pointer rounded-sm
                  w-11 h-[62px] transition-all gap-[4px] border-[1px]
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

      {/*구분 선*/}
      <span className={'w-[334px] ml-[17.5px] mt-[12px] border-b-[1px] border-[#332F2F]'} />

      {/*캘린더 더보기버튼*/}
      <div className={'flex text-[14px] font-medium text-gray-500 mt-[12px]'}>
        <Link href={'/calendar'} className={'ml-auto'}>
          더보기
        </Link>
        <Image src={nextGrayBtn} alt={'more'} className={'mr-[20px]'} width={20} height={20} />
      </div>

      <div
        className="flex flex-col w-[334px] min-h-[56px] max-h-[224px]
        bg-black gap-[12px] mt-[8px] mx-[20px]"
      >
        {loading ? (
          <div className="text-[#8C8888] text-[14px]">불러오는 중...</div>
        ) : error ? (
          <div className="text-[#FF6B6B] text-[14px] break-words">{error}</div>
        ) : todayConcerts.length !== 0 ? (
          todayConcerts.map((concert) => (
            <div
              key={concert.id}
              className="flex flex-col w[335px] h-[100px] font-semibold bg-[#1F1D1D] rounded-[4px]"
            >
              <span className={'mx-[12px] mt-[13px] text-[18px]'}>{concert.time}</span>
              <div className={'flex mx-[12px] mt-[2px] gap-[4px] font-normal'}>
                <Image src={ticket} alt={'ticket'} width={20} height={20} />
                {concert.title}
              </div>
              <div className={'ml-[36px] text-[#8C8888] font-normal'}>{concert.location}</div>
            </div>
          ))
        ) : (
          <div
            className="w-[335px] h-[44px] border-[1px] border-[#413D3D]
          bg-[#1F1D1D] text-[#8C8888] text-[14px] pt-[10px] px-[12px] rounded-sm"
          >
            금일 예정된 공연은 없습니다
          </div>
        )}
      </div>
    </div>
  );
}
