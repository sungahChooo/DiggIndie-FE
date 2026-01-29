'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import searchBtn from '@/assets/icons/artistSearch.svg';
import searchBack from '@/assets/icons/searchBack.svg';
import searchGrayBtn from '@/assets/icons/searchGray.svg';

import ArticleList from '@/components/community/ArticleList';
import { useMarketList } from '@/hooks/useMarketList';
import type { MarketCategory } from '@/types/marketBoard';
import { useRouter } from 'next/navigation';
import deleteBtn from '@/assets/community/delete.svg';
import CommunityTab from '@/components/community/CommunityTab';
import CommunityHeaderFilter from '@/components/community/CommunityHeaderFilter';

const headerOptions = ['전체', '판매', '구매'] as const;
type UiHeader = (typeof headerOptions)[number];

const headerToCategory: Record<UiHeader, MarketCategory> = {
  전체: '전체',
  판매: '판매',
  구매: '구매',
};


export default function SearchMarket() {
  const [header, setHeader] = useState<UiHeader>('전체');
  const [draft, setDraft] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter()

  const { markets, isLoading, error, setQuery, setCategory, loadMore, params } = useMarketList({
    type: '전체' as MarketCategory,
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
    <section className="relative w-full flex flex-col items-center mt-[12px]">
      <div className={"flex w-full justify-between px-5 gap-1"}>
        {/* 검색 */}
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
          ) : null
          }

          <button
            type="button"
            onClick={runSearch}
            aria-label="search"
            className="absolute right-[8px] top-1/2 cursor-pointer -translate-y-1/2"
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


      <div className="w-full flex justify-between shrink-0 px-5 mt-4 items-center mb-3">
        <CommunityTab />
        <CommunityHeaderFilter headers={headerOptions} value={header} onChangeAction={handleHeaderChange} />
      </div>

      {/* 리스트만 스크롤 */}
      <main className="flex-1 min-h-0 w-full overflow-y-auto scrollbar flex flex-col bg-black">
        {isLoading && isFirstPage && <div className="px-5 py-4 text-gray-500">로딩중...</div>}
        {!isLoading && error && <div className="px-5 py-4 text-gray-500">{error}</div>}

        {!error && <ArticleList articles={markets} basePath="/community/trade" variant="trade" />}

        <div ref={sentinelRef} className="h-[1px]" />

        {(isLoading || isSearching) && !isFirstPage && (
          <div className="px-5 py-4 text-gray-500">로딩중...</div>
        )}
      </main>
      {/* 무한스크롤 */}
      <div ref={sentinelRef} className="h-[1px]" />

      {(isLoading || isSearching) && !isFirstPage && (
        <div className="px-5 py-4 text-gray-500">로딩중...</div>
      )}
    </section>
  );
}
