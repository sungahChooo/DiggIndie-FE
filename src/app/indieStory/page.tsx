'use client';

import SearchHeader from '@/components/search/SearchHeader';
import SideTab from '@/components/sideTabDir/SideTab';
import MagazineList from '@/components/indieStory/IndieStoryList';
import { useState } from 'react';
import Image from 'next/image';

import searchBtn from '@/assets/common/search.svg';
import deleteBtn from '@/assets/icons/delete.svg';

type SortKey = '업데이트순' | '조회순';

export default function IndieStoryPage() {
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('업데이트순');
  const [query, setQuery] = useState('');

  return (
    <div className="text-white flex flex-col h-screen bg-black relative overflow-auto ">
      <div className="sticky top-0 z-50">
        <SearchHeader title={'매거진'} onHamburgerClick={() => setIsSideTabOpen(true)} />
      </div>
      <div className="flex flex-col px-5">

        {/* 검색 input */}
        <div className="flex items-center mb-3">
          <div className="w-full h-[44px] rounded-[4px] bg-[#4A4747] text-[16px] text-[#A6A6A6] flex items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색어를 입력하세요"
              className="flex-1 h-full bg-transparent border-none text-[#A6A6A6] outline-none ring-0 focus:outline-none focus:ring-0 px-3"
            />

            {/* x 버튼 */}
            {query && (
              <button type="button" className="mr-[8px] flex-shrink-0" onClick={() => setQuery('')}>
                <Image src={deleteBtn} alt="delete" width={20} height={20} />
              </button>
            )}

            {/* 검색 버튼 */}
            <div className="mr-[8px] flex-shrink-0">
              <Image src={searchBtn} alt="search" width={24} height={24} />
            </div>
          </div>
        </div>

        <MagazineList sortKey={sortKey} onSortChangeAction={setSortKey} query={query} />
      </div>

      {isSideTabOpen && <SideTab onClose={() => setIsSideTabOpen(false)} />}
    </div>
  );
}
