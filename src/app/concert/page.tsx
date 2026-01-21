'use client';

import SearchConcert from '@/components/search/SearchConcert';
import SearchHeader from '@/components/search/SearchHeader';
import SideTab from '@/components/sideTabDir/SideTab';
import { useState } from 'react';

export default function ConcertPage() {
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);

  return (
    <div className="text-white flex flex-col h-screen bg-black relative overflow-auto">
      <div className="flex flex-col">
        <div className={'sticky top-0 z-50'}>
          <SearchHeader title={'공연'} onHamburgerClick={() => setIsSideTabOpen(true)} />
        </div>
        <div className={'pb-4'}>
          <SearchConcert />
        </div>
      </div>
      {isSideTabOpen && <SideTab onClose={() => setIsSideTabOpen(false)} />}
    </div>
  );
}
