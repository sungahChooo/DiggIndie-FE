'use client';

import SearchConcert from '@/components/search/SearchConcert';
import SearchHeader from '@/components/search/SearchHeader';
import SideTab from '@/components/sideTabDir/SideTab';
import { useEffect, useState } from 'react';

export default function ConcertPage() {
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);
  // 스크롤 방지 로직
  useEffect(() => {
    document.body.style.overflow = isSideTabOpen ? 'hidden' : 'auto';
  }, [isSideTabOpen]);
  return (
    <div className="text-white bg-black relative">
      <div className="relative mx-auto w-full  min-h-screen bg-black">
        <SearchHeader title="공연" onHamburgerClick={() => setIsSideTabOpen(true)} />

        <main className="">
          <SearchConcert />
        </main>
      </div>

      {/* 사이드탭은 viewport 기준이지만 위치는 앱 기준 */}
      {isSideTabOpen && (
        <div className="fixed inset-0 z-[999] flex justify-center">
          <div className="relative w-full max-w-[375px] h-full">
            {/* 오버레이 */}
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsSideTabOpen(false)} />
            <SideTab onClose={() => setIsSideTabOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
