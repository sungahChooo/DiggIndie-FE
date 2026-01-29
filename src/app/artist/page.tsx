'use client';

import SearchArtist from '@/components/search/SearchArtist';
import SearchHeader from '@/components/search/SearchHeader';
import SideTab from '@/components/sideTabDir/SideTab';
import { useEffect, useState } from 'react';

export default function ArtistPage() {
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);
  // 사이드탭 열릴 때 body 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = isSideTabOpen ? 'hidden' : 'auto';
  }, [isSideTabOpen]);
  return (
    <div className="text-white bg-black relative">
      {/* 앱 컨테이너 */}
      <div className="relative mx-auto w-full max-w-[375px] h-screen bg-black overflow-hidden">
        {/* 헤더 */}
        <SearchHeader title="아티스트" onHamburgerClick={() => setIsSideTabOpen(true)} />

        {/* 콘텐츠 스크롤 영역 */}
        <main className="pt-13 overflow-y-auto h-full">
          <SearchArtist />
        </main>
      </div>

      {/* 사이드탭 (Home과 동일한 구조) */}
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
