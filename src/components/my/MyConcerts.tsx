"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PersonalConcertRecCard, {
  daysUntilConcert,
} from "@/components/home/PersonalConcertRecCard";
import { mockConcerts } from "@/mocks/mockConcerts";
import Image from "next/image";
import downBtn from "@/assets/icons/down.svg";

type SortKey = "updated" | "korean";

export default function ScrappedConcert() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("updated");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const sortedConcerts = useMemo(() => {
    const arr = [...mockConcerts];

    if (sortKey === "korean") {
      // 공연 제목 가나다순
      arr.sort((a, b) =>
        (a.title ?? "").localeCompare(b.title ?? "", "ko")
      );
      return arr;
    }

    // 업데이트순 (다가오는 공연 우선)
    arr.sort(
      (a, b) => daysUntilConcert(b.date) - daysUntilConcert(a.date)
    );
    return arr;
  }, [sortKey]);

  const leftColumn = useMemo(
    () => sortedConcerts.filter((_, idx) => idx % 2 === 0),
    [sortedConcerts]
  );
  const rightColumn = useMemo(
    () => sortedConcerts.filter((_, idx) => idx % 2 === 1),
    [sortedConcerts]
  );

  const label = sortKey === "updated" ? "업데이트순" : "가나다순";

  return (
    <section className="w-full flex flex-col overflow-y-auto px-[20px] mt-[20px]">
      {/* 드롭다운 */}
      <div className="relative w-fit" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="w-[100px] h-[28px] border border-[#736F6F] rounded-[4px] flex items-center gap-[4px]"
        >
          <span className="ml-[10.5px] text-[14px] tracking-[-0.42px] font-medium text-white">
            {label}
          </span>
          <div className="w-[16px] h-[16px]">
            <Image src={downBtn} alt="open dropdown" />
          </div>
        </button>

        {isOpen && (
          <div
            className="absolute left-0 mt-[8px] w-[100px] h-[108px] rounded-[4px]
                       border border-[#736F6F] flex flex-col items-center
                       py-[8px] gap-[4px] bg-black shadow-lg z-50"
          >
            <button
              type="button"
              onClick={() => {
                setSortKey("updated");
                setIsOpen(false);
              }}
              className={`flex w-[84px] h-[28px] rounded-[4px] text-[14px] ${
                sortKey === "updated"
                  ? "bg-[#332F2F] text-white"
                  : "text-[#8C8888]"
              }`}
            >
              <span className="ml-[8px] mt-[3px]">업데이트순</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSortKey("korean");
                setIsOpen(false);
              }}
              className={`flex w-[84px] h-[28px] rounded-[4px] text-[14px] ${
                sortKey === "korean"
                  ? "bg-[#332F2F] text-white"
                  : "text-[#8C8888]"
              }`}
            >
              <span className="ml-[8px] mt-[3px]">가나다순</span>
            </button>

            {/* 추후 확장*/}
            <div className="flex w-[84px] h-[28px] rounded-[4px] text-[14px]">
              <span className="ml-[8px] mt-[3px] text-[#8C8888]">
                스크랩순
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 2열 카드 영역 */}
      <div className="flex justify-center gap-[16px] mt-[16px]">
        <div className="flex flex-col gap-[20px]">
          {leftColumn.map((concert) => (
            <PersonalConcertRecCard
              key={concert.id}
              concert={concert}
            />
          ))}
        </div>

        <div className="flex flex-col gap-[20px]">
          {rightColumn.map((concert) => (
            <PersonalConcertRecCard
              key={concert.id}
              concert={concert}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
