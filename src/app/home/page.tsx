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
import { authService } from '@/services/authService';
import { boardDetailService } from '@/services/boardDetail.service';
import { HotArticle } from '@/types/board';

export default function HomePage() {
  const { isAuthed } = useAuthStore();
  const userId = useAuthStore((s) => s.userId);
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);
  const [hotContent, setHotContent] = useState<HotArticle[]>([]);

  useEffect(() => {
    document.body.style.overflowY = isSideTabOpen ? 'hidden' : 'auto';
    document.body.style.overflowX = 'hidden';
  }, [isSideTabOpen]);

  useEffect(() => {
    const fetchIdIfNeeded = async () => {
      // 로그인은 되어 있는데 스토어에 userId가 없다면 (새로고침 상황 등)
      if (isAuthed && !userId) {
        try {
          await authService.getUserId();
        } catch (error) {
          console.error('사용자 정보를 가져오는 데 실패했습니다.');
        }
      }
    };
    fetchIdIfNeeded();
  });
  useEffect(() => {
    const fetchHotArticle = async () => {
      const content = await boardDetailService.getHotArticle();
      setHotContent(content);
    };
    fetchHotArticle();
  }, []);
  return (
    <div className="text-white bg-black relative w-full">
      <div className="relative mx-auto w-full min-h-screen bg-black">
        <HomeHeader onHamburgerClick={() => setIsSideTabOpen(true)} userId={userId} />
        <main className="mx-auto flex w-full flex-col items-center bg-black pb-20">
          <IndieStoryRec />
          <div className="px-5 w-full">
            <LoginBanner isLoggedIn={isAuthed} />
          </div>
          <PersonalArtistRec isLoggedIn={isAuthed} />
          <PersonalConcertRec isLoggedIn={isAuthed} />
          <ResetPreference isLoggedIn={isAuthed} />
          <Feedback isLoggedIn={isAuthed} />
          <HomeCalendar />
          <Popular content={hotContent} />
        </main>
      </div>
      {/* 사이드탭은 viewport 기준이지만 위치는 앱 기준 */}
      {isSideTabOpen && (
        <div className="fixed inset-0 z-[999]">
          {/* 1. 배경 오버레이: 화면 전체를 덮음 */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsSideTabOpen(false)} />

          {/* 2. 사이드탭 컨테이너: 메인 UI와 같은 너비와 중앙 정렬을 가짐 */}
          <div className="relative mx-auto w-full w-[inherit] inset-0 h-full pointer-events-none">
            {/* 3. 실제 사이드탭: 부모(375px)의 오른쪽 끝에 위치 */}
            <div className="absolute right-0 top-0 h-full w-[80%] pointer-events-auto">
              <SideTab onClose={() => setIsSideTabOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
