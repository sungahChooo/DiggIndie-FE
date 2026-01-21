"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import downBtn from "@/assets/icons/down.svg";
import searchBtn from "@/assets/icons/artistSearch.svg";
import searchBack from "@/assets/icons/searchBack.svg";
import searchGrayBtn from "@/assets/icons/searchGray.svg";

import ArtistGrid from "@/components/my/ArtistGrid";
import SearchCardSkeleton from "@/components/search/SearchCardSkeleton";
import { useArtistSearch } from "@/hooks/useArtistSearch";

type SortKey = "updated" | "korean";

export default function MyArtistsWithSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // debounce, loading
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const {
    artists,
    searchTerm,
    onChangeSearch,
    onSubmitSearch,
    onClearSearch,
    sortKey,
    setSortKey,
    loadFirstPage,
    sentinelRef, // 무한스크롤
  } = useArtistSearch(20);

  /* 최초 1회 로드 */
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        await loadFirstPage(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  /* 바깥 클릭 시 드롭다운 닫기 */
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setIsLoading(true);

      if (debouncedTerm === "") {
        await onClearSearch();
      } else {
        await onChangeSearch(debouncedTerm);
        await onSubmitSearch();
      }

      if (!cancelled) setIsLoading(false);
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [debouncedTerm]);

  const label = sortKey === "updated" ? "업데이트순" : "가나다순";

  return (
    <section className="relative w-full flex flex-col px-[20px] mt-[12px]">
      {/* 검색 초기화 */}
      <Image
        src={searchBack}
        alt="back"
        className="absolute left-[20px] mt-[10px] cursor-pointer"
        onClick={() => {
          setIsLoading(true);
          onClearSearch().finally(() => setIsLoading(false));
        }}
      />

      {/* 검색 input */}
      <div
        className={`relative flex h-[44px] mb-[12px] px-3 py-2 rounded-[4px] bg-[#4A4747] text-white 
        ${searchTerm ? "w-[307px] ml-[28px] mr-[12px]" : "w-[335px]"}`}
      >
        <Image
          src={searchTerm ? searchGrayBtn : searchBtn}
          alt="Search"
          className="absolute right-[8px] mt-[2px]"
        />
        <input
          value={searchTerm}
          onChange={(e) => onChangeSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setDebouncedTerm(searchTerm); // 엔터는 즉시
            }
          }}
          placeholder="검색어를 입력하세요"
          className="placeholder:text-[#A6A6A6] font-regular outline-none bg-transparent w-full"
        />
      </div>

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
                setSortKey("updated" as SortKey);
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
                setSortKey("korean" as SortKey);
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

      {isLoading ? <SearchCardSkeleton /> : <ArtistGrid artists={artists} />}

      {/* 무한스크롤 */}
      <div ref={sentinelRef} className="h-[1px]" />
    </section>
  );
}
