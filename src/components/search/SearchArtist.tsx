"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import downBtn from "@/assets/icons/down.svg";
import searchBtn from "@/assets/icons/artistSearch.svg";
import searchBack from "@/assets/icons/searchBack.svg";
import searchGrayBtn from "@/assets/icons/searchGray.svg"

import { mockArtists } from "@/mocks/mockArtists";
import MyArtistGrid from "@/components/my/ArtistGrid";

type SortKey = "updated" | "korean";

function normalizeText(input: string) {
  return (input ?? "").trim().toLowerCase().normalize("NFC").replace(/\s+/g, "");
}

export default function MyArtistsWithSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("updated");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const label = sortKey === "updated" ? "업데이트순" : "가나다순";

  const filteredSortedArtists = useMemo(() => {
    const q = normalizeText(query);
    let arr = [...mockArtists];

    //검색
    if (q) {
      arr = arr.filter((a) => normalizeText(a.name ?? "").includes(q));
    }
    if (sortKey === "korean") {
      arr.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "", "ko"));
    }
    return arr;
  }, [query, sortKey]);

  return (
    <section className="relative w-full flex flex-col px-[20px] mt-[12px]">
      {/* 검색 */}
      <Image src={searchBack} alt="back" className={"absolute left-[20px] mt-[10px]"}
             onClick={() => setQuery("")}
      />
      <div className={`relative flex h-[44px] mb-[12px] px-3 py-2 rounded-[4px] bg-[#4A4747] text-white 
      ${query ? "w-[307px] ml-[28px] mr-[12px]" : "w-[335px] "}`}>

        <Image src={query ? searchGrayBtn : searchBtn} alt="Search" className={ "absolute right-[8px] mt-[2px]" } />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요"
          className={`placeholder:text-[#A6A6A6] font-regular outline-none bg-transparent`}
        />
      </div>

      {/* 드롭다운*/}
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

            <div className="flex w-[84px] h-[28px] rounded-[4px] text-[14px]">
              <span className="ml-[8px] mt-[3px] text-[#8C8888]">
                스크랩순
              </span>
            </div>
          </div>
        )}
      </div>

      <MyArtistGrid artists={filteredSortedArtists} />
    </section>
  );
}
