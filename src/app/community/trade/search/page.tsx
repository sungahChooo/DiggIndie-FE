'use client';

import { useState } from 'react';
import SearchHeader from '@/components/search/SearchHeader';
import SideTab from '@/components/sideTabDir/SideTab';
import SearchMarket from '@/components/community/SearchMarket';
import CommunityTab from '@/components/community/CommunityTab';
import { useAuthStore } from '@/stores/authStore';

export default function MarketSearchPage() {
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);
  const { isAuthed } = useAuthStore();

  return (
    <div className="text-white flex flex-col h-screen bg-black relative overflow-hidden">
      <header className="sticky top-0 z-50 bg-black shrink-0">
        <SearchHeader title="거래/양도 게시판" onHamburgerClick={() => setIsSideTabOpen(true)} />
      </header>
      <CommunityTab />
      <main className=" flex-1 min-h-0 overflow-y-auto scrollbar flex flex-col bg-black">
        <SearchMarket />
      </main>

      {isSideTabOpen && <SideTab onClose={() => setIsSideTabOpen(false)} />}
    </div>
  );
}
