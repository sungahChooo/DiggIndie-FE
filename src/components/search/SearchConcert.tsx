"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import downBtn from "@/assets/icons/down.svg";
import ConcertGrid from "@/components/my/ConcertGrid";
import SearchCardSkeleton from "@/components/search/SearchCardSkeleton";

import searchBtn from "@/assets/icons/artistSearch.svg";
import searchBack from "@/assets/icons/searchBack.svg";
import searchGrayBtn from "@/assets/icons/searchGray.svg";

import { useConcertsSearch } from "@/hooks/useConcertSearch";

type SortKey = "recent" | "view" | "scrap";

function mapSortKeyToOrder(key: SortKey): "recent" | "view" | "scrap" {
  if (key === "recent") return "recent";
  if (key === "view") return "view";
  return "scrap";
}

export default function SearchConcert() {
  const [query, setQuery] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [isTypingLoading, setIsTypingLoading] = useState(false);

  const [sortKey, setSortKey] = useState<SortKey>("recent");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const size = 20;

  const order = useMemo(() => mapSortKeyToOrder(sortKey), [sortKey]);

  /* 바깥 클릭 시 드롭다운 닫기 */
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  /* debounce */
  useEffect(() => {
    setIsTypingLoading(true);

    const timer = setTimeout(() => {
      setDebouncedTerm(query);
      setIsTypingLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const { concerts, pageInfo, error, isFetching, isFetchingMore, loadFirstPage, sentinelRef } =
    useConcertsSearch({
      order,
      query: debouncedTerm,
      size,
      enabled: true,
    });

  const label =
    sortKey === "recent" ? "업데이트순" : sortKey === "view" ? "조회수 순" : "스크랩순";

  const showSkeleton = isTypingLoading || (isFetching && pageInfo.page === 0);

  return (
    <section className="relative w-full flex flex-col px-[20px] mt-[20px]">
      {/* 검색 초기화 */}
      <Image
        src={searchBack}
        alt="back"
        className="absolute left-[20px] mt-[10px] cursor-pointer"
        onClick={() => {
          setQuery("");
          setDebouncedTerm("");
          setIsTypingLoading(false);
          loadFirstPage();
        }}
      />

      {/* 검색 input */}
      <div
        className={`relative flex h-[44px] mb-[12px] px-3 py-2 rounded-[4px] bg-[#4A4747] text-white 
        ${query ? "w-[307px] ml-[28px] mr-[12px]" : "w-[335px]"}`}
      >
        <Image
          src={query ? searchGrayBtn : searchBtn}
          alt="Search"
          className="absolute right-[8px] mt-[2px]"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setDebouncedTerm(query);
              setIsTypingLoading(false);
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
          <Image src={downBtn} alt="open dropdown" />
        </button>

        {isOpen && (
          <div
            className="absolute left-0 mt-[8px] w-[100px] h-[108px] rounded-[4px]
                       border border-[#736F6F] flex flex-col items-center
                       py-[8px] gap-[4px] bg-black shadow-lg z-50"
          >
            {(["recent", "view", "scrap"] as SortKey[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setSortKey(key);
                  setIsOpen(false);
                }}
                className={`w-full h-[28px] text-[14px] ${
                  sortKey === key ? "bg-[#332F2F] text-white" : "text-[#8C8888]"
                }`}
              >
                {key === "recent" ? "업데이트순" : key === "view" ? "조회수 순" : "스크랩순"}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 에러 */}
      {error ? <div className="mt-4 text-[#FF6B6B] text-[14px] break-words">{error}</div> : null}

      {/* 결과 */}
      <div className="mt-4">
        {showSkeleton ? <SearchCardSkeleton /> : <ConcertGrid concerts={concerts} />}

        {isFetchingMore ? (
          <div className="mt-3 text-[13px] text-[#8C8888] font-normal">불러오는 중...</div>
        ) : null}

        <div ref={sentinelRef} className="h-[1px]" />
      </div>
    </section>
  );
}
