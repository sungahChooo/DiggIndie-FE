'use client';

import IndieStoryList from '@/components/indieStory/IndieStoryList';
import SearchHeader from '@/components/search/SearchHeader';
import SideTab from '@/components/sideTabDir/SideTab';
import { useMemo, useState } from 'react';
import type { MockIndieStory } from '@/types/mocks/mockIndieStory';
import { mockIndieStory } from '@/mocks/mockIndieStory';
import Image from 'next/image';
import searchBtn from '@/assets/common/search.svg';
import backBtn from '@/assets/icons/Arrow-Left.svg';
import deleteBtn from '@/assets/icons/delete.svg'

type SortKey = '업데이트순' | '조회순';


export default function IndieStoryPage() {
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('업데이트순');
  const [query, setQuery] = useState('');

  const visibleStories = useMemo<MockIndieStory[]>(() => {
    // 검색 필터
    const q = (query);
    const filtered =
      q.length === 0
        ? mockIndieStory
        : mockIndieStory.filter((s) =>
          (s.title).includes(q)
        );

    // 정렬
    if (sortKey === '조회순') {
      return [...filtered].sort((a, b) => b.views - a.views);
    }

    // 업데이트순, API 연결 후 수정필요
    return filtered;
  }, [query, sortKey]);

  return (
    <div className="text-white flex flex-col h-screen bg-black relative overflow-auto">
      <div className="flex flex-col">
        <div className="sticky top-0 z-50">
          <SearchHeader title={'인디스토리'} onHamburgerClick={() => setIsSideTabOpen(true)} />
        </div>

        {/* 검색 input */}
        <div className="flex items-center ml-5 mb-3">
          {/* query 있을 때*/}
          {query && (
            <button
              type="button"
              className="w-[28px] h-[44px] flex items-center justify-start cursor-pointer"
              onClick={() => setQuery('')}
            >
              <Image src={backBtn} alt="back" width={24} height={24} />
            </button>
          )}

          <div
            className={`
               h-[44px] rounded-[4px] bg-[#4A4747] text-[16px] text-[#A6A6A6]
               flex items-center
              ${query ? 'w-[307px]' : 'w-[335px]'}
            `}
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색어를 입력하세요"
              className="flex-1 h-full bg-transparent border-none text-[#A6A6A6] outline-none ring-0 focus:outline-none focus:ring-0 px-3"
            />

            {/* x 버튼*/}
            {query && (
              <button
                type="button"
                className="mr-[8px] flex-shrink-0"
                onClick={() => setQuery('')}
              >
                <Image src={deleteBtn} alt="delete" width={20} height={20} />
              </button>
            )}

            {/* 검색 버튼 */}
            <div className="mr-[8px] flex-shrink-0">
              <Image src={searchBtn} alt="search" width={24} height={24} />
            </div>
          </div>
        </div>

        <IndieStoryList
          indieStories={visibleStories}
          sortKey={sortKey}
          onSortChangeAction={setSortKey}
        />
      </div>

      {isSideTabOpen && <SideTab onClose={() => setIsSideTabOpen(false)} />}
    </div>
  );
}
