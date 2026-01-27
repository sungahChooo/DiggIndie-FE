'use client';

import { useState } from 'react';
import SearchHeader from '@/components/search/SearchHeader';
import SideTab from '@/components/sideTabDir/SideTab';
import SearchFree from '@/components/community/SearchFree';
import CommunityTab from '@/components/community/CommunityTab'

export default function FreeSearchPage() {
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);

  return (
    <div className="text-white flex flex-col h-screen bg-black relative overflow-hidden">
      <header className="sticky top-0 z-50 bg-black shrink-0">
        <SearchHeader title="자유게시판" onHamburgerClick={() => setIsSideTabOpen(true)} />
      </header>
      <CommunityTab />
      <main className=" flex-1 min-h-0 overflow-y-auto scrollbar flex flex-col bg-black">
        <SearchFree />

      </main>

      {isSideTabOpen && <SideTab onClose={() => setIsSideTabOpen(false)} />}
    </div>
  );
}
