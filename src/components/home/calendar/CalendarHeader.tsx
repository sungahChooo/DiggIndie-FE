import Image from "next/image";
import backBtn from "@/assets/icons/back.svg";
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

  const [weekOffset] = useState(0);
  const dates = getThisWeekDates(weekOffset);

  const today = new Date().getDay();
  const initialIndex = today === 0 ? 6 : today - 1;
  const [selectedIndex] = useState(initialIndex);

  const fullDate = `${dates[selectedIndex].split("-")[0]}년 
                    ${Number(dates[selectedIndex].split("-")[1])}월 
                    ${Number(dates[selectedIndex].split("-")[2])}일`;

  return (
    <div className="flex w-[375px] h-[56px] items-center gap-[88px] bg-black py-[17px]">
      <button onClick={() => router.back()} className="ml-[20px] cursor-pointer">
        <Image src={backBtn} alt="back" width={24} height={24} />
      </button>

      <span className="text-[16px] font-semibold text-white">
        {fullDate}
      </span>

      <button onClick={onToggleCalendar}>
        <Image src={isCalendarOpen ? redCalendarIcon : calendarIcon} alt="calendar" width={24} height={24} />
      </button>
    </div>
  );
}
