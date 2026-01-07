'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import downBtn from '@/assets/icons/down.svg';
import MyConcertGrid from '@/components/my/MyConcertGrid';
import searchBtn from '@/assets/icons/artistSearch.svg';
import searchBack from '@/assets/icons/searchBack.svg';
import searchGrayBtn from '@/assets/icons/searchGray.svg';
import type { ConcertListItem } from '@/types/mocks/mockConcerts';
import concertData from '@/mocks/concertDummy.json';

type SortKey = 'updated' | 'korean' | 'scrap';

export default function SearchConcert() {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('updated');
  const [concerts, setConcerts] = useState<ConcertListItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 드롭다운 닫기
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  // 추후 api 연동 시 수정
  useEffect(() => {
    async function fetchConcerts() {
      // 지금은 더미
      const data = concertData;

      // API 명세 그대로
      setConcerts(data.concerts);
    }

    fetchConcerts();
  }, []);

  const label =
    sortKey === 'updated' ? '업데이트순' : sortKey === 'korean' ? '가나다순' : '스크랩순';

  return (
    <section className="relative w-full flex flex-col px-[20px] mt-[20px]">
      {/* 검색 */}
      <Image
        src={searchBack}
        alt="back"
        className="absolute left-[20px] mt-[10px]"
        onClick={() => setQuery('')}
      />

      <div className="relative flex h-[44px] mb-[12px] px-3 py-2 rounded-[4px] bg-[#4A4747] text-white">
        <Image
          src={query ? searchGrayBtn : searchBtn}
          alt="Search"
          className="absolute right-[8px] mt-[2px]"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="placeholder:text-[#A6A6A6] outline-none bg-transparent"
        />
      </div>

      {/* 드롭다운 */}
      <div className="relative w-fit" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="w-24 h-7 border border-[#736F6F] rounded-sm flex items-center gap-1"
        >
          <span className="ml-[10px] text-[14px] text-white">{label}</span>
          <Image src={downBtn} alt="open dropdown" />
        </button>

        {isOpen && (
          <div className="absolute left-0 mt-2 w-25 bg-black border border-gray-600 rounded-sm">
            {(['updated', 'korean', 'scrap'] as SortKey[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setSortKey(key);
                  setIsOpen(false);
                }}
                className={`w-full h-7 text-[14px] ${
                  sortKey === key ? 'bg-gray-850 text-white' : 'text-gray-500'
                }`}
              >
                {key === 'updated' ? '업데이트순' : key === 'korean' ? '가나다순' : '스크랩순'}
              </button>
            ))}
          </div>
        )}
      </div>

      <MyConcertGrid concerts={concerts} />
    </section>
  );
}
