'use client';

import SearchArtist from '@/components/search/SearchArtist';
import SearchHeader from '@/components/search/SearchHeader';
import SideTab from '@/components/sideTabDir/SideTab';
import { useState } from 'react';

export default function MyArtistPage() {
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);

  return (
    <div className="text-white flex flex-col h-screen bg-black relative overflow-auto">
      <div className="flex flex-col">
        <div className={'sticky top-0 z-5'}>
          <SearchHeader title={'아티스트'} onHamburgerClick={() => setIsSideTabOpen(true)} />
        </div>
        <SearchArtist />
      </div>
      {isSideTabOpen && <SideTab onClose={() => setIsSideTabOpen(false)} />}
    </div>
  );
}
