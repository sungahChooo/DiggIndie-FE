import Image from "next/image";
import backBtn from "@/assets/common/back.svg";
import calendarIcon from "@/assets/icons/calendarIcon.svg";
import redCalendarIcon from "@/assets/icons/redCalendarIcon.svg";

import { getThisWeekDates } from "@/hooks/getDay";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  onToggleCalendar: () => void;
  isCalendarOpen: boolean;
};

export default function CalendarHeader({ onToggleCalendar, isCalendarOpen, }: Props) {
  const router = useRouter();


  return (
    <div className="flex w-full h-[56px] items-center bg-black py-4 px-5 justify-between">
      <button onClick={() => router.back()} className=" cursor-pointer">
        <Image src={backBtn} alt="back" width={24} height={24} />
      </button>

      <span className="text-[16px] font-semibold text-white">
        전체 캘린더
      </span>

      <button onClick={onToggleCalendar}>
        <Image src={isCalendarOpen ? redCalendarIcon : calendarIcon} alt="calendar" width={24} height={24} />
      </button>
    </div>
  );
}
