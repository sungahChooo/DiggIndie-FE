"use client";

import prevBtn from "@/assets/icons/prev.svg";
import nextBtn from "@/assets/common/next.svg";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

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
  key: string;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function makeKey(y: number, m0: number, d: number) {
  return `${y}-${pad2(m0 + 1)}-${pad2(d)}`;
}

function uniqSorted(dates: Iterable<string>) {
  return Array.from(new Set(dates)).sort();
}

function parseKey(key: string) {
  const [yy, mm, dd] = key.split("-").map((v) => Number(v));
  return new Date(yy, mm - 1, dd);
}

function makeKeyFromDate(dt: Date) {
  return `${dt.getFullYear()}-${pad2(dt.getMonth() + 1)}-${pad2(dt.getDate())}`;
}

function buildInclusiveRangeKeys(aKey: string, bKey: string) {
  const a = parseKey(aKey);
  const b = parseKey(bKey);

  a.setHours(0, 0, 0, 0);
  b.setHours(0, 0, 0, 0);

  const forward = a.getTime() <= b.getTime();
  const start = forward ? a : b;
  const end = forward ? b : a;

  const keys: string[] = [];
  const cur = new Date(start);

  while (cur.getTime() <= end.getTime()) {
    keys.push(makeKeyFromDate(cur));
    cur.setDate(cur.getDate() + 1);
  }

  return keys;
}

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

  function enterCellWhileDown(cell: Cell) {
    if (!pointerDownRef.current) return;

    if (!didDragRef.current) didDragRef.current = true;

    const startKey = startKeyRef.current;
    if (!startKey) return;

    if (lastKeyRef.current === cell.key) return;
    lastKeyRef.current = cell.key;

    commitRange(startKey, cell.key);
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
    const onDown = (e: PointerEvent) => {
      const el = wrapperRef.current;
      if (!el) return;
      if (el.contains(e.target as Node)) return;
      onChangeSelectedDates([]);
    };

    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("pointerdown", onDown);
    };
  }, [onChangeSelectedDates]);

  return (
    <div
      ref={wrapperRef}
      className={
        "flex flex-col items-center w-[335px] bg-gray-900 " +
        "border-gray-800 border-[1px] " +
        "py-[16px]"
      }
    >
      <div className={"flex w-[295px] ml-[10px] gap-[75px]"}>
        <button
          onClick={() => setCurrent(new Date(year, month - 1, 1))}
          className={"cursor-pointer"}
          type="button"
        >
          <Image src={prevBtn} alt="prev" width={24} height={24} />
        </button>

        <div className={"text-white text-[20px] font-semibold"}>
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

          return (
            <div
              key={`${cell.key}-${i}`}
              onPointerDown={(e) => {
                e.preventDefault();
                beginPointer(cell);
              }}
              onPointerEnter={() => {
                enterCellWhileDown(cell);
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
