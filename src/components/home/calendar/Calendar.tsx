"use client";

import prevBtn from "@/assets/icons/prev.svg";
import nextBtn from "@/assets/icons/next.svg";
import { useState } from "react";
import Image from "next/image";

type CalendarProps = {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
};

type Cell = {
  y: number;
  m: number;
  d: number;
  inMonth: boolean;
  key: string; // YYYY-MM-DD
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function makeKey(y: number, m0: number, d: number) {
  return `${y}-${pad2(m0 + 1)}-${pad2(d)}`;
}

export default function SimpleCalendar({ selectedDate, onSelectDate }: CalendarProps) {
  const [current, setCurrent] = useState(new Date());

  const year = current.getFullYear();
  const month = current.getMonth();

  // 월요일 시작
  const firstDowSun0 = new Date(year, month, 1).getDay();
  const firstDowMon0 = (firstDowSun0 + 6) % 7;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // 저번달
  const leading: Cell[] = Array.from({ length: firstDowMon0 }, (_, i) => {
    const d = daysInPrevMonth - firstDowMon0 + 1 + i;
    const prev = new Date(year, month - 1, d);
    return {
      y: prev.getFullYear(),
      m: prev.getMonth(),
      d: prev.getDate(),
      inMonth: false,
      key: makeKey(prev.getFullYear(), prev.getMonth(), prev.getDate()),
    };
  });

  // 이번달
  const currentCells: Cell[] = Array.from({ length: daysInMonth }, (_, i) => {
    const d = i + 1;
    return { y: year, m: month, d, inMonth: true, key: makeKey(year, month, d) };
  });

  // 다음달
  const totalSoFar = leading.length + currentCells.length;
  const trailingCount = (7 - (totalSoFar % 7)) % 7;

  const trailing: Cell[] = Array.from({ length: trailingCount }, (_, i) => {
    const d = i + 1;
    const next = new Date(year, month + 1, d);
    return {
      y: next.getFullYear(),
      m: next.getMonth(),
      d: next.getDate(),
      inMonth: false,
      key: makeKey(next.getFullYear(), next.getMonth(), next.getDate()),
    };
  });

  const cells = [...leading, ...currentCells, ...trailing];

  return (
    <div
      className={
        "flex flex-col items-center w-[335px] bg-gray-900 " +
        "border-gray-800 border-[1px] " +
        "py-[16px]" // 위아래 패딩으로 안정적으로
      }
    >
      {/* header */}
      <div className={"flex w-[295px] ml-[10px] gap-[75px]"}>
        <button
          onClick={() => {
            setCurrent(new Date(year, month - 1, 1));
          }}
          className={"cursor-pointer"}
        >
          <Image src={prevBtn} alt="prev" width={24} height={24} />
        </button>

        <div className={"text-white text-[20px] font-semibold"}>
          {year}. {pad2(month + 1)}
        </div>

        <button
          onClick={() => {
            setCurrent(new Date(year, month + 1, 1));
          }}
          className={"cursor-pointer"}
        >
          <Image src={nextBtn} alt="next" width={24} height={24} />
        </button>
      </div>

      {/* 요일 */}
      <div
        className="grid grid-cols-7 text-center text-white gap-[6.5px]
        text-[12px] font-medium mt-[16px]"
      >
        {["m", "t", "w", "t", "f", "s", "s"].map((d, idx) => (
          <div
            key={`${d}-${idx}`}
            className={"w-[34px] h-[35px] text-center pt-[7px] text-gray-100"}
          >
            {d}
          </div>
        ))}
      </div>

      {/* dates */}
      <div className="grid grid-cols-7 gap-x-[10.83px]">
        {cells.map((cell, i) => {
          const isSelected = selectedDate === cell.key;
          const isGray = !cell.inMonth;

          return (
            <div
              key={`${cell.key}-${i}`}
              onClick={() => {
                if (!cell.inMonth) setCurrent(new Date(cell.y, cell.m, 1));
                onSelectDate(cell.key);
              }}
              className={`w-[30px] h-[35px] flex items-center justify-center cursor-pointer select-none rounded-[4px]
                font-medium text-[12px]
                ${isGray ? "text-gray-600" : "text-white"}
                ${isSelected ? "bg-[#880405] border-[#C31C20] border-[0.5px]" : "bg-transparent"}
              `}
            >
              {pad2(cell.d)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
