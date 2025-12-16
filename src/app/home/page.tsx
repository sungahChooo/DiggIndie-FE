'use client'

import HomeHeader from "@/components/home/HomeHeader";
import TodayArtistRec from "@/components/home/TodayArtistRec";
import LoginBanner from "@/components/home/LoginBanner";
import PersonalArtistRec from "@/components/home/PersonalArtistRec";
import Calendar from "@/components/home/Calendar";
import PersonalConcertRec from "@/components/home/PersonalConcertRec";
import IndieStoryRec from "@/components/home/IndieStoryRec";
import ResetPreference from '@/components/home/ResetPreference';

import { useState } from 'react';

export default function HomePage() {
  const [isLoggedIn, setLoggedIn] = useState(true);

  return (
    <div className="text-white flex flex-col h-screen bg-black">
      <div className="flex flex-col">
        <div className={"sticky top-0 z-5"}>
          <HomeHeader />
        </div>
        <main className="overflow-y-auto scrollbar flex flex-col justify-center items-center bg-black">
          <TodayArtistRec />
          <LoginBanner isLoggedIn={() => setLoggedIn(false)} />
          <PersonalArtistRec isLoggedIn={isLoggedIn} />
          <ResetPreference isLoggedIn={isLoggedIn}/>
          <Calendar />
          <PersonalConcertRec isLoggedIn={isLoggedIn}/>
          <IndieStoryRec />
        </main>
      </div>
    </div>
  );
}
