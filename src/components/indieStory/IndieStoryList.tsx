"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import downBtn from "@/assets/icons/down.svg";
import MagazineCard from "./IndieStoryCard";
import { useMagazines } from "@/hooks/useMagazines";
import type { MagazineOrder } from "@/types/magazine";

type SortKey = "업데이트순" | "조회순";

function sortKeyToOrder(k: SortKey): MagazineOrder {
  return k === "업데이트순" ? "recent" : "view";
}

type Props = {
  sortKey: SortKey;
  onSortChangeAction: (k: SortKey) => void;
  query?: string;
  size?: number;
};

export default function MagazineList({ sortKey, onSortChangeAction, query, size = 20 }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const order = useMemo(() => sortKeyToOrder(sortKey), [sortKey]);
  const { magazines, isLoading } = useMagazines({ order, query, size });

  const safeMagazines = useMemo(() => (magazines ?? []).filter(Boolean), [magazines]);

  const leftColumn = useMemo(() => safeMagazines.filter((_, i) => i % 2 === 0), [safeMagazines]);
  const rightColumn = useMemo(() => safeMagazines.filter((_, i) => i % 2 === 1), [safeMagazines]);

  return (
    <div className="flex flex-col">
      <div ref={ref} className="relative mb-[16px] z-30">
        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          className="border border-[#736F6F] rounded-[4px] w-[100px] h-[28px] px-2 py-1
            text-[14px] flex gap-1 bg-black items-center justify-between"
        >
          {sortKey}
          <Image src={downBtn} alt="open" width={16} height={16} />
        </button>

        {open && (
          <div
            className="absolute mt-2 border w-[100px] border-[#736F6F]
              bg-black text-[14px] font-normal leading-[140%] tracking-[-0.03em]
              py-2 rounded-[4px]"
          >
            {(["업데이트순", "조회순"] as SortKey[]).map((key) => (
              <div
                key={key}
                className={`w-[84px] h-[28px] py-1 cursor-pointer ml-[8px] px-2
                  ${key === sortKey ? "bg-[#332F2F] rounded-[4px] text-white" : "text-[#8C8888]"}
                `}
                onClick={() => {
                  onSortChangeAction(key);
                  setOpen(false);
                }}
              >
                {key}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-[15px] justify-center">
        <div className="flex flex-col gap-[16px] w-[160px]">
          {leftColumn.map((m) => (
            <MagazineCard rounded={true} key={m.magazineId} magazine={m} />
          ))}
        </div>

        <div className="flex flex-col gap-[16px] w-[160px]">
          {rightColumn.map((m) => (
            <MagazineCard rounded={true} key={m.magazineId} magazine={m} />
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="px-[20px] py-6 text-[12px] text-[#8C8888]">로딩중...</div>
      )}
    </div>
  );
}
