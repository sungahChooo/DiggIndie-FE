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

export default function Home() {
  const [isLoggedIn, setLoggedIn] = useState(true);

  return (
    <div className="flex justify-center items-centerbg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col">
        <div className={"sticky top-0 z-5"}>
          <HomeHeader />
        </div>
        <main className="overflow-y-auto scrollbar flex flex-col justify-center items-center">
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
