"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import downBtn from "@/assets/icons/down.svg";
import searchBtn from "@/assets/icons/artistSearch.svg"
import searchGrayBtn from "@/assets/icons/searchGray.svg";
import deleteBtn from '@/assets/community/delete.svg';

import ArtistGrid from "@/components/my/ArtistGrid";
import SearchCardSkeleton from "@/components/search/SearchCardSkeleton";
import { useArtistSearch } from "@/hooks/useArtistSearch";

type SortKey = "updated" | "korean" | "scrap";

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

  const label =
    sortKey === "updated"
      ? "업데이트순"
      : sortKey === "korean"
        ? "가나다순"
        : "스크랩순";

  return (
    <section className="relative w-full flex flex-col items-center mt-[12px] px-5">

      {/* 검색 input */}
      <div className={"relative flex w-full h-[44px] mb-[12px] px-3 py-2 rounded-[4px] bg-[#4A4747] text-white"}>
        <Image
          src={searchTerm ? searchGrayBtn : searchBtn}
          alt="Search"
          className="absolute left-2 mt-[2px]"
        />
        {/* 검색 지우기 */}
        {searchTerm ? (
          <button
            type="button"
            onClick={() => {
              setIsLoading(true);
              onClearSearch().finally(() => setIsLoading(false));
            }}
            aria-label="clear search"
            className="absolute right-[12px] top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <Image src={deleteBtn} alt="삭제" />
          </button>
        ) : null
        }

        <input
          value={searchTerm}
          onChange={(e) => onChangeSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setDebouncedTerm(searchTerm); // 엔터는 즉시
            }
          }}
          placeholder="검색어를 입력하세요"
          className="ml-7 placeholder:text-[#A6A6A6] font-regular outline-none bg-transparent w-full"
        />
      </div>

      {/* 드롭다운 */}
      <div className="relative w-fit self-start" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="w-[100px] h-[28px] border justify-between border-[#736F6F] rounded-[4px] flex items-center pr-[10.5px]"
        >
          <span className="ml-[10.5px] text-[14px] tracking-[-0.42px] font-medium text-white cursor-pointer">
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
            {(["updated", "korean", "scrap"] as SortKey[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setSortKey(key);
                  setIsOpen(false);
                }}
                className="w-full h-[28px] px-2 text-left text-[14px]"
              >
                <div
                  className={`px-2 h-[28px] rounded-[4px] pt-[3px]
                    transition-colors
                    hover:bg-[#332F2F] hover:text-white
                    ${sortKey === key ? "bg-[#332F2F] text-white" : "text-[#8C8888]"}
                  `}
                >
                  {key === "updated" ? "업데이트순" : key === "korean" ? "가나다순" : "스크랩순"}
                </div>
              </button>

            ))}
          </div>
        )}
      </div>

      {isLoading ? <SearchCardSkeleton /> : <ArtistGrid artists={artists} />}

      {/* 무한스크롤 */}
      <div ref={sentinelRef} className="h-[1px]" />
    </section>
  );
}