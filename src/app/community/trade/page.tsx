'use client';

import { useState } from 'react';
import SearchHeader from '@/components/search/SearchHeader';
import SideTab from '@/components/sideTabDir/SideTab';
import SearchMarket from '@/components/community/SearchMarket';
import CommunityHeader from '@/components/community/CommunityHeader';

export default function TradePage() {
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);

  return (
    <div className="text-white flex flex-col h-screen bg-black relative overflow-hidden">
      <header className="sticky top-0 z-50 bg-black shrink-0">
        <CommunityHeader title="디깅라운지" onHamburgerClick={() => setIsSideTabOpen(true)} />
      </header>

      <main className="flex-1 min-h-0 overflow-y-auto scrollbar flex flex-col bg-black">
        <SearchMarket />
      </main>

      {isSideTabOpen && <SideTab onClose={() => setIsSideTabOpen(false)} />}
    </div>
  );
}
