'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import searchBtn from '@/assets/icons/artistSearch.svg';
import searchGrayBtn from '@/assets/icons/searchGray.svg';
import deleteBtn from '@/assets/community/delete.svg';

import CommunityTab from '@/components/community/CommunityTab';
import CommunityHeaderFilter from '@/components/community/CommunityHeaderFilter';
import ArticleList from '@/components/community/ArticleList';

import { useFreeList } from '@/hooks/useFreeList';
import type { FreeCategory } from '@/types/freeBoard';
import SearchFreeSkeleton from './SearchFreeSkeleton';

const headerOptions = ['전체', '정보', '공연 후기', '추천', '신보', '음악 뉴스', '동행'] as const;
type UiHeader = (typeof headerOptions)[number];

const headerToCategory: Record<UiHeader, FreeCategory> = {
  전체: 'none',
  정보: 'info',
  '공연 후기': 'review',
  추천: 'recommend',
  신보: 'release',
  '음악 뉴스': 'news',
  동행: 'companion',
};

export default function SearchFree() {
  const [header, setHeader] = useState<UiHeader>('전체');
  const [draft, setDraft] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const { articles, isLoading, setCategory, error, setQuery, loadMore, params } = useFreeList({
    category: 'none' as FreeCategory,
    query: '',
    page: 0,
    size: 20,
  });

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleHeaderChange = async (next: UiHeader) => {
    setHeader(next);
    setIsSearching(true);
    try {
      await setCategory(headerToCategory[next]);
    } finally {
      setIsSearching(false);
    }
  };

  const runSearch = async () => {
    setIsSearching(true);
    try {
      await setQuery(draft.trim());
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = async () => {
    setIsSearching(true);
    try {
      setDraft('');
      await setQuery('');
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        loadMore();
      },
      { root: null, rootMargin: '200px', threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [loadMore]);

  const isFirstPage = (params.page ?? 0) === 0;

  return (
    <section className="relative w-full flex flex-col items-center mt-[12px] min-h-0">
      <div className="flex w-full justify-between px-5 gap-1">
        <div className="relative flex h-[44px] px-3 py-2 rounded-[4px] w-full bg-[#4A4747] text-white">
          {draft ? (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="clear search"
              className="absolute right-[40px] top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <Image src={deleteBtn} alt="삭제" />
            </button>
          ) : null}

          <button
            type="button"
            onClick={runSearch}
            aria-label="search"
            className="absolute right-[8px] top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <Image src={draft ? searchBtn : searchGrayBtn} alt="Search" />
          </button>

          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') runSearch();
            }}
            placeholder="검색어를 입력하세요"
            className="placeholder:text-[#A6A6A6] font-regular outline-none bg-transparent w-full pr-[28px]"
          />
        </div>
      </div>

      <div className="w-full flex justify-between shrink-0 px-5 mt-4 items-center">
        <CommunityTab />
        <CommunityHeaderFilter
          headers={headerOptions}
          value={header}
          onChangeAction={handleHeaderChange}
        />
      </div>

      {/* 리스트만 스크롤 */}
      <main className="flex-1 min-h-0 w-full overflow-y-auto scrollbar flex flex-col bg-black">
        {/* 1. 첫 페이지 로딩이거나 검색 중일 때 스켈레톤 노출 */}
        {(isLoading || isSearching) && isFirstPage ? (
          <SearchFreeSkeleton />
        ) : error ? (
          <div className="px-5 py-20 text-center text-gray-500">{error}</div>
        ) : (
          <>
            {/* 2. 결과가 없을 때 처리 (추가하면 좋음) */}
            {!isLoading && articles.length === 0 ? (
              <div className="px-5 py-20 text-center text-gray-500">검색 결과가 없습니다.</div>
            ) : (
              <ArticleList articles={articles} basePath="/community/free" variant="free" />
            )}
            <div ref={sentinelRef} className="h-[20px]" /> {/* 높이를 조금 주면 인식이 더 잘됨 */}
            {/* 3. 다음 페이지 추가 로딩 시 (하단 스켈레톤 혹은 인디케이터) */}
            {(isLoading || isSearching) && !isFirstPage && (
              <div className="py-4 flex justify-center">
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            )}
          </>
        )}
      </main>
    </section>
  );
}
