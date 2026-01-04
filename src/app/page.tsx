'use client';

import HomeHeader from '@/components/home/HomeHeader';
import LoginBanner from '@/components/home/LoginBanner';
import PersonalArtistRec from '@/components/home/PersonalArtistRec';
import HomeCalendar from '@/components/home/HomeCalendar';
import PersonalConcertRec from '@/components/home/PersonalConcertRec';
import IndieStoryRec from '@/components/home/IndieStoryRec';
import ResetPreference from '@/components/home/ResetPreference';

import { useEffect, useState } from 'react';
import SideTab from '@/components/sideTabDir/SideTab';

export default function HomePage() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = isSideTabOpen ? 'hidden' : 'auto';
  }, [isSideTabOpen]);

  return (
    <div className="text-white flex flex-col h-screen bg-black relative">
      <div className="flex flex-col">
        <div className={'sticky top-0 z-5'}>
          <HomeHeader onHamburgerClick={() => setIsSideTabOpen(true)} />
        </div>
        <main className="overflow-y-auto scrollbar flex flex-col justify-center items-center bg-black">
          <IndieStoryRec />
          <LoginBanner isLoggedIn={() => setLoggedIn(false)} />
          <ResetPreference isLoggedIn={isLoggedIn} />
          <HomeCalendar />
          <PersonalArtistRec isLoggedIn={isLoggedIn} />
          <PersonalConcertRec isLoggedIn={isLoggedIn} />
        </main>
      </div>
      {isSideTabOpen && <SideTab onClose={() => setIsSideTabOpen(false)} />}
    </div>
  );
}