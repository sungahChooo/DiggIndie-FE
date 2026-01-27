'use client';

import HomeHeader from '@/components/home/HomeHeader';
import LoginBanner from '@/components/home/LoginBanner';
import PersonalArtistRec from '@/components/home/PersonalArtistRec';
import HomeCalendar from '@/components/home/HomeCalendar';
import PersonalConcertRec from '@/components/home/PersonalConcertRec';
import IndieStoryRec from '@/components/home/IndieStoryRec';
import ResetPreference from '@/components/home/ResetPreference';
import Popular from '@/components/home/Popular';

import { useEffect, useState } from 'react';
import SideTab from '@/components/sideTabDir/SideTab';
import { useAuthStore } from '@/stores/authStore';
import Feedback from '@/components/home/Feedback';

export default function HomePage() {
  const { isAuthed } = useAuthStore();

  const [isSideTabOpen, setIsSideTabOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSideTabOpen ? 'hidden' : 'auto';
  }, [isSideTabOpen]);

  return (
    <div className="text-white min-h-screen bg-black relative">
      <div className="flex flex-col">
        <main className="flex flex-col items-center bg-black pb-20">
          <HomeHeader onHamburgerClick={() => setIsSideTabOpen(true)} />
          <IndieStoryRec />
          <div className="px-5 w-full">
            <LoginBanner isLoggedIn={isAuthed} />
          </div>
          <PersonalArtistRec isLoggedIn={isAuthed} />
          <PersonalConcertRec isLoggedIn={isAuthed} />
          <ResetPreference isLoggedIn={isAuthed} />
          <Feedback isLoggedIn={isAuthed} />
          <HomeCalendar />
          <Popular />
        </main>
      </div>
      {isSideTabOpen && <SideTab onClose={() => setIsSideTabOpen(false)} />}
    </div>
  );
}
