'use client';

import SearchArtist from '@/components/search/SearchArtist';
import SearchHeader from '@/components/search/SearchHeader';
import SideTab from '@/components/sideTabDir/SideTab';
import { useEffect, useState } from 'react';

export default function ArtistPage() {
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSideTabOpen ? 'hidden' : 'auto';
  }, [isSideTabOpen]);

  return (
    <div className="text-white bg-black relative">
      {/* 앱 컨테이너 */}
      <div className="relative mx-auto w-full h-[100dvh] bg-black flex flex-col overflow-hidden">
        {/* 헤더는 높이 고정 */}
        <SearchHeader title="아티스트" onHamburgerClick={() => setIsSideTabOpen(true)} />

        <main className="flex-1 min-h-0 overflow-y-auto">
          <SearchArtist />
        </main>
      </div>

      {isSideTabOpen && (
        <div className="fixed inset-0 z-[999] flex justify-center">
          <div className="relative w-full max-w-full h-full">
            {/* 오버레이 */}
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsSideTabOpen(false)} />
            <SideTab onClose={() => setIsSideTabOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
