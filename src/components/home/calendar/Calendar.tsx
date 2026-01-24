"use client";

import prevBtn from "@/assets/icons/prev.svg";
import nextBtn from "@/assets/common/next.svg";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import { pad2 } from '@/hooks/calendarHooks'
import { makeKey } from '@/hooks/calendarHooks'
import { uniqSorted } from '@/hooks/calendarHooks'
import { buildInclusiveRangeKeys } from '@/hooks/calendarHooks'
import { addDaysKey } from '@/hooks/calendarHooks'


type CalendarProps = {
  selectedDates: string[];
  onChangeSelectedDates: (next: string[]) => void;
  onMonthChange?: (year: number, month: number) => void;
};

type Cell = {
  y: number;
  m: number;
  d: number;
  inMonth: boolean;
  key: string; // YYYY-MM-DD
};

export default function SimpleCalendar({
                                         selectedDates,
                                         onChangeSelectedDates,
                                         onMonthChange,
                                       }: CalendarProps) {
  const [current, setCurrent] = useState(new Date());

  useEffect(() => {
    onMonthChange?.(current.getFullYear(), current.getMonth() + 1);
  }, [current, onMonthChange]);

  const year = current.getFullYear();
  const month = current.getMonth();

  const selectedSet = useMemo(() => new Set(selectedDates), [selectedDates]);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const pointerDownRef = useRef(false);
  const didDragRef = useRef(false);

  const startKeyRef = useRef<string | null>(null);
  const lastKeyRef = useRef<string | null>(null);

  const firstDowSun0 = new Date(year, month, 1).getDay();
  const firstDowMon0 = (firstDowSun0 + 6) % 7;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

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

  const currentCells: Cell[] = Array.from({ length: daysInMonth }, (_, i) => {
    const d = i + 1;
    return { y: year, m: month, d, inMonth: true, key: makeKey(year, month, d) };
  });

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

  function commitRange(startKey: string, endKey: string) {
    const rangeKeys = buildInclusiveRangeKeys(startKey, endKey);
    onChangeSelectedDates(uniqSorted(rangeKeys));
  }

  function beginPointer(cell: Cell) {
    pointerDownRef.current = true;
    didDragRef.current = false;

    startKeyRef.current = cell.key;
    lastKeyRef.current = cell.key;
  }

  function updateWhileDown(nextKey: string) {
    if (!pointerDownRef.current) return;

    const startKey = startKeyRef.current;
    if (!startKey) return;

    if (lastKeyRef.current === nextKey) return;
    lastKeyRef.current = nextKey;

    if (!didDragRef.current) didDragRef.current = true;
    commitRange(startKey, nextKey);
  }

  function endPointer() {
    if (!pointerDownRef.current) return;

    const startKey = startKeyRef.current;

    if (!didDragRef.current && startKey) {
      onChangeSelectedDates([startKey]);
    } else if (didDragRef.current && startKey && lastKeyRef.current) {
      commitRange(startKey, lastKeyRef.current);
    }

    pointerDownRef.current = false;
    didDragRef.current = false;
    startKeyRef.current = null;
    lastKeyRef.current = null;
  }

  useEffect(() => {
    const onUp = () => endPointer();
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const HALF_GAP = 5.415;

  return (
    <div
      ref={wrapperRef}
      className={
        "flex flex-col items-center w-[335px] bg-gray-900 " +
        "border-gray-800 border-[1px] " +
        "py-[16px] touch-none"
      }
      onPointerMove={(e) => {
        if (!pointerDownRef.current) return;

        const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
        const cellEl = el?.closest?.("[data-key]") as HTMLElement | null;
        const key = cellEl?.dataset?.key;
        if (key) updateWhileDown(key);
      }}
    >
      <div className={"flex w-[295px] ml-[10px] gap-[75px]"}>
        <button
          onClick={() => setCurrent(new Date(year, month - 1, 1))}
          className={"cursor-pointer"}
          type="button"
        >
          <Image src={prevBtn} alt="prev" width={24} height={24} />
        </button>

        <div
          className={"text-white text-[20px] font-semibold cursor-pointer"}
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          onClick={() => onChangeSelectedDates([])}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onChangeSelectedDates([]);
          }}
        >
          {year}. {pad2(month + 1)}
        </div>

        <button
          onClick={() => setCurrent(new Date(year, month + 1, 1))}
          className={"cursor-pointer"}
          type="button"
        >
          <Image src={nextBtn} alt="next" width={24} height={24} />
        </button>
      </div>

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

      <div className="grid grid-cols-7 gap-x-[10.83px]">
        {cells.map((cell, i) => {
          const isSelected = selectedSet.has(cell.key);
          const isGray = !cell.inMonth;

          const prevKey = addDaysKey(cell.key, -1);
          const nextKey = addDaysKey(cell.key, 1);

          const canHavePrev = i % 7 !== 0;
          const canHaveNext = i % 7 !== 6;

          //연속 선택
          const hasPrevGlobal = isSelected && selectedSet.has(prevKey);
          const hasNextGlobal = isSelected && selectedSet.has(nextKey);

          const isStart = isSelected && !hasPrevGlobal;
          const isEnd = isSelected && !hasNextGlobal;
          const isEdge = isStart || isEnd;

          //같은 줄에서만 이어붙이기. 배경색 조정
          const hasPrevInRow = hasPrevGlobal && canHavePrev;
          const hasNextInRow = hasNextGlobal && canHaveNext;


          return (
            <div
              key={`${cell.key}-${i}`}
              data-key={cell.key}
              onPointerDown={(e) => {
                e.preventDefault();
                (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
                beginPointer(cell);
              }}
              className={[
                "relative overflow-visible",
                "w-[30px] h-[35px] flex items-center justify-center cursor-pointer select-none",
                "font-medium text-[12px]",
                isGray ? "text-gray-600" : "text-white",
              ].join(" ")}
            >
              {isSelected && (
                <div
                  className="pointer-events-none absolute inset-y-0 z-0 bg-[#5E0D0E]"
                  style={{
                    left: hasPrevInRow ? `-${HALF_GAP}px` : 0,
                    right: hasNextInRow ? `-${HALF_GAP}px` : 0,
                    borderRadius: 0,
                  }}
                />
              )}

              {isSelected && isEdge && (
                <div className="pointer-events-none absolute inset-0 z-10 rounded-[4px] bg-[#880405] border-[#C31C20] border-[0.5px]" />
              )}


              <span className="relative z-20">{pad2(cell.d)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
