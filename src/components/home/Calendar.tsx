'use client';

import { useState } from 'react';
import { getThisWeekDates } from '@/hooks/getDay';
import { mockConcerts } from '@/mocks/mockConcerts';
import Image from 'next/image';
import ticket from '@/assets/icons/ticket.svg';
import nextBtn from '@/assets/common/more.svg';
import prevBtn from '@/assets/icons/prev.svg';

export default function Calendar() {
  const weekdays = ['월', '화', '수', '목', '금', '토', '일'];

  const [weekOffset, setWeekOffset] = useState(0);
  const dates = getThisWeekDates(weekOffset);

  const today = new Date().getDay();
  const initialIndex = today === 0 ? 6 : today - 1; // 월요일: 0 기준으로 보정
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const selectedDate = dates[selectedIndex];
  //날짜에 있는 공연 목록
  const todayConcerts = mockConcerts.filter((concert) => concert.date === selectedDate);

  function getRidOfZero(date: string) {
    const cleanedDate = date.startsWith('0') ? date.slice(1) : date;
    return cleanedDate;
  }

  return (
    <div className="flex flex-col w-full justify-center mt-[40px] bg-black">
      <div className={"mx-[20px] mb-[12px] text-[20px] font-semibold"}>
        공연 위클리 캘린더
      </div>

      <div className={'flex justify-between w-[340px] mx-[17.5px]'}>
        <button onClick={() => setWeekOffset((prev) => prev - 1)}>
          <Image src={prevBtn} alt="prevBtn" />
        </button>
        <div className="flex items-center justify-center w-[284px] h-[62px]">
          {weekdays.map((day, i) => {
            const isSelected = selectedIndex === i;
            return (
              <div
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`
              flex flex-col items-center justify-center cursor-pointer rounded-[4px] 
              w-[44px] h-[62px] transition-all gap-[4px]
              ${isSelected ? 'bg-[#880405] font-bold border-[#C31C20]' : 'text-white'}
            `}
              >
                <span className="text-[14px]">{day}</span>
                <span className="text-[13px]">{getRidOfZero(dates[i].split('-')[2])}</span>
              </div>
            );
          })}
        </div>
        <button onClick={() => setWeekOffset((prev) => prev + 1)}>
          <Image src={nextBtn} alt="nextBtn" />
        </button>
      </div>

      <div className="flex flex-col w-[335px] h-[212px] gap-[12px] mt-[16px] mx-[20px]">
        {todayConcerts.length !== 0 ? (
          todayConcerts.map((concert) => (
            <div
              key={concert.id}
              className="flex flex-col w[335px] h-[100px] font-semibold bg-[#1F1D1D] rounded-[4px]"
            >
              <span className={'mx-[12px] mt-[13px] text-[18px]'}>{concert.time}</span>
              <div className={'flex mx-[12px] mt-[2px] gap-[4px] font-normal'}>
                <Image src={ticket} alt={'ticket'} />
                {concert.title}
              </div>
              <div className={'ml-[36px] text-[#8C8888] font-normal'}>{concert.location}</div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
