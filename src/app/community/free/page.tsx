'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import CommunityHeader from '@/components/community/CommunityHeader';
import CommunityTab from '@/components/community/CommunityTab';
import ArticleList from '@/components/community/ArticleList';
import CommunityHeaderFilter from '@/components/community/CommunityHeaderFilter';
import SideTab from '@/components/sideTabDir/SideTab';

import { useFreeList } from '@/hooks/useFreeList';
import type { FreeCategory } from '@/types/freeBoard';

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

export default function CommunityFreePage() {
  const [header, setHeader] = useState<UiHeader>('전체');
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);

  const initialCategory = useMemo(() => headerToCategory[header], [header]);

  const { articles, isLoading, error, setCategory, loadMore, params } = useFreeList({
    category: initialCategory,
    query: '',
    page: 0,
    size: 20,
  });

  const handleHeaderChange = (next: UiHeader) => {
    setHeader(next);
    setCategory(headerToCategory[next]);
  };

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        loadMore();
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [loadMore]);

  const isFirstPage = (params.page ?? 0) === 0;

  return (
    <div className="text-white flex flex-col h-screen bg-black relative overflow-hidden">
      <header className="sticky top-0 z-50 h-[52px] bg-black flex items-center shrink-0">
        <CommunityHeader title={'디깅 라운지'} onHamburgerClick={() => setIsSideTabOpen(true)} />
      </header>

      <div className="shrink-0">
        <CommunityTab />
      </div>

      <main className="flex-1 min-h-0 overflow-y-auto scrollbar flex flex-col bg-black">
        <CommunityHeaderFilter headers={headerOptions} value={header} onChangeAction={handleHeaderChange} />

        {isLoading && isFirstPage && <div className="px-5 py-4 text-gray-500">로딩중...</div>}
        {!isLoading && error && <div className="px-5 py-4 text-gray-500">{error}</div>}

        {!error && <ArticleList articles={articles} basePath="/community/free" variant="free" />}

        {/* 무한스크롤 트리거 */}
        <div ref={sentinelRef} className="h-[1px]" />

        {isLoading && !isFirstPage && <div className="px-5 py-4 text-gray-500">로딩중...</div>}

      </main>

      {isSideTabOpen && <SideTab onClose={() => setIsSideTabOpen(false)} />}
    </div>
  );
}
