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
import { useAuthStore } from '@/stores/authStore';

export default function HomePage() {
  const { isAuthed } = useAuthStore();

  const [isSideTabOpen, setIsSideTabOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = isSideTabOpen ? 'hidden' : 'auto';
  }, [isSideTabOpen]);

  return (
    <div className="text-white flex flex-col h-screen bg-black relative">
      <div className="flex flex-col">
        <main className="overflow-y-auto scrollbar flex flex-col items-center bg-black pb-20">
          <HomeHeader onHamburgerClick={() => setIsSideTabOpen(true)} />
          <IndieStoryRec />
          <LoginBanner isLoggedIn={isAuthed} />
          <PersonalArtistRec isLoggedIn={isAuthed} />
          <PersonalConcertRec isLoggedIn={isAuthed} />
          <ResetPreference isLoggedIn={isAuthed} />
          <HomeCalendar />
        </main>
      </div>
      {isSideTabOpen && <SideTab onClose={() => setIsSideTabOpen(false)} />}
    </div>
  );
}
