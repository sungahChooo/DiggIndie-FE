"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import downBtn from "@/assets/icons/down.svg";

import { mockArtists } from "@/mocks/mockArtists";
import MyArtistGrid from "@/components/my/ArtistGrid";

type SortKey = "updated" | "korean";

export default function MyArtists() {
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

  const sortedArtists = useMemo(() => {
    const arr = [...mockArtists];

    if (sortKey === "korean") {
      arr.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "", "ko"));
      return arr;
    }


    return arr;
  }, [sortKey]);

  const label = sortKey === "updated" ? "업데이트순" : "가나다순";

  return (
    <section className="w-full flex flex-col px-[20px] mt-[20px]">
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
            {/* alt에는 문자열 추천 */}
            <Image src={downBtn} alt="open dropdown" />
          </div>
        </button>

        {isOpen && (
          <div
            className="absolute left-0 mt-[8px] w-[100px] h-[108px] rounded-[4px] border border-[#736F6F]
                       flex flex-col items-center py-[8px] gap-[4px] bg-black shadow-lg z-50"
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

            <div className="flex w-[84px] h-[28px] rounded-[4px] text-[14px]">
              <span className="ml-[8px] mt-[3px] text-[#8C8888]">
                스크랩순
              </span>
            </div>
          </div>
        )}
      </div>

      <MyArtistGrid artists={sortedArtists} />
    </section>
  );
}
