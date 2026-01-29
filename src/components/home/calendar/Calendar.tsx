"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import prevBtn from "@/assets/icons/prev.svg";
import nextBtn from "@/assets/common/next.svg";
import questionBtn from "@/assets/common/questionMark.svg"
import calendarNotice from "@/assets/common/calendarNotice.svg"

import {
  pad2,
  makeKey,
  uniqSorted,
  buildInclusiveRangeKeys,
  addDaysKey,
} from "@/hooks/calendarHooks";

type CalendarProps = {
  selectedDates: string[];
  onChangeSelectedDates: (next: string[]) => void;
  onMonthChange?: (year: number, month: number) => void;
  datesWithConcerts?: string[] | null;
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
                                         datesWithConcerts = null,
                                       }: CalendarProps) {



  const [current, setCurrent] = useState(new Date());

  useEffect(() => {
    onMonthChange?.(current.getFullYear(), current.getMonth() + 1);
  }, [current, onMonthChange]);

  const year = current.getFullYear();
  const month = current.getMonth();

  const selectedSet = useMemo(() => new Set(selectedDates), [selectedDates]);

  const concertSet = useMemo(
    () => new Set(datesWithConcerts ?? []),
    [datesWithConcerts]
  );

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const pointerDownRef = useRef(false);
  const didDragRef = useRef(false);

  const startKeyRef = useRef<string | null>(null);
  const lastKeyRef = useRef<string | null>(null);

  const [halfGap, setHalfGap] = useState(7.415);

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

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const measure = () => {
      const nodes = el.querySelectorAll<HTMLElement>('[data-cell="day"]');
      if (nodes.length < 2) return;

      let a: HTMLElement | null = null;
      let b: HTMLElement | null = null;

      for (let i = 0; i < nodes.length - 1; i++) {
        const r1 = nodes[i].getBoundingClientRect();
        const r2 = nodes[i + 1].getBoundingClientRect();
        if (Math.abs(r1.top - r2.top) < 2) {
          a = nodes[i];
          b = nodes[i + 1];
          break;
        }
      }

      if (!a || !b) return;

      const r1 = a.getBoundingClientRect();
      const r2 = b.getBoundingClientRect();

      const gap = r2.left - r1.right;
      if (!Number.isFinite(gap) || gap <= 0) {
        setHalfGap(0);
        return;
      }

      setHalfGap(gap / 2);
    };

    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [cells.length, year, month]);

  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const noticeWrapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!isNoticeOpen) return;

    const onDown = (e: MouseEvent) => {
      const wrap = noticeWrapRef.current;
      if (!wrap) return;

      // 버튼+팝업 영역 밖 클릭이면 닫기
      if (!wrap.contains(e.target as Node)) {
        setIsNoticeOpen(false);
      }
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [isNoticeOpen]);

  return (
    <div className={"w-full px-5"}>
      <div
        ref={wrapperRef}
        className="flex flex-col items-center w-full bg-gray-900 border-gray-800 border-[1px] px-2 py-4 rounded-[4px] touch-none"
        onPointerMove={(e) => {
          if (!pointerDownRef.current) return;

          const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
          const cellEl = el?.closest?.("[data-key]") as HTMLElement | null;
          const key = cellEl?.dataset?.key;
          if (key) updateWhileDown(key);
        }}
      >
        <div className="flex w-full gap-[75px] px-4">
          <div
            ref={noticeWrapRef}
            className="flex relative"
          >
            <div
              className="text-white text-[20px] font-semibold cursor-pointer"
              onPointerDown={(e) => e.stopPropagation()}
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
              className="ml-[2px] cursor-pointer"
              type="button"
              onMouseEnter={() => setIsNoticeOpen(true)}
              onMouseLeave={() => setIsNoticeOpen(false)}
            >
              <Image src={questionBtn} alt="notice" width={24} height={24} />
            </button>

            {isNoticeOpen && (
              <div className="absolute left-19 mt-8 mt-2 z-50 w-[210px]">
                <Image
                  src={calendarNotice}
                  alt="notice"
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>

          <div className={"flex ml-auto gap-[13px]"}>
            <button
              onClick={() => setCurrent(new Date(year, month - 1, 1))}
              className="cursor-pointer"
              type="button"
            >
              <Image src={prevBtn} alt="prev" width={24} height={24} />
            </button>

            <button
              onClick={() => setCurrent(new Date(year, month + 1, 1))}
              className="cursor-pointer"
              type="button"
            >
              <Image src={nextBtn} alt="next" width={24} height={24} />
            </button>
          </div>
        </div>

        <div
          className="
            w-full
            grid grid-cols-7
            justify-items-center
            justify-between
            text-center text-[12px] font-medium mt-4
          "
        >
          {["m", "t", "w", "t", "f", "s", "s"].map((d, idx) => (
            <div key={idx} className="w-[34px] h-[35px] pt-[7px] text-gray-100">
              {d}
            </div>
          ))}
        </div>

        <div
          ref={gridRef}
          className="w-full grid grid-cols-7 justify-items-center justify-between"
        >
          {cells.map((cell, i) => {
            const isSelected = selectedSet.has(cell.key);
            const isGray = !cell.inMonth;

            const prevKey = addDaysKey(cell.key, -1);
            const nextKey = addDaysKey(cell.key, 1);

            const canHavePrev = i % 7 !== 0;
            const canHaveNext = i % 7 !== 6;

            const hasPrevGlobal = isSelected && selectedSet.has(prevKey);
            const hasNextGlobal = isSelected && selectedSet.has(nextKey);

            const isEdge = isSelected && (!hasPrevGlobal || !hasNextGlobal);

            const hasPrevInRow = hasPrevGlobal && canHavePrev;
            const hasNextInRow = hasNextGlobal && canHaveNext;

            const hasConcertInfo = datesWithConcerts !== null;
            const hasConcert = concertSet.has(cell.key);
            const graySelectedText = hasConcertInfo && isSelected && !hasConcert;

            return (
              <div
                key={`${cell.key}-${i}`}
                data-key={cell.key}
                data-cell="day"
                onPointerDown={(e) => {
                  e.preventDefault();
                  (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
                  beginPointer(cell);
                }}
                className={[
                  "relative overflow-visible",
                  "w-[30px] h-[35px] flex items-center justify-center cursor-pointer select-none",
                  "font-medium text-[12px]",
                  isGray ? "text-[#736F6F]" : "text-white",
                ].join(" ")}
              >
                {isSelected && (
                  <div
                    className="pointer-events-none absolute inset-y-0 z-0 bg-[#5E0D0E]"
                    style={{
                      left: hasPrevInRow ? `-${halfGap}px` : 0,
                      right: hasNextInRow ? `-${halfGap}px` : 0,
                    }}
                  />
                )}

                {isSelected && isEdge && (
                  <div className="pointer-events-none absolute inset-0 z-10 rounded-[4px] bg-[#880405] border-[#C31C20] border-[0.5px]" />
                )}

                <span
                  className="relative z-20"
                  style={graySelectedText ? { color: "#736F6F" } : undefined}
                >
                  {pad2(cell.d)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
