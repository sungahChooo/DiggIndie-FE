'use client';

import ArtistCard from '@/components/home/ArtistCard';
import ConcertCard from '@/components/home/ConcertCard';
import HorizontalSwipeList from '@/components/my/HorizontalSwipeList';
import MenuSection from '@/components/my/MenuSection';
import MyPageHeader from '@/components/my/MyPageHeader';
import ProfileSection from '@/components/my/ProfileSection';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useMyConcerts } from '@/hooks/useMyConcerts';
import { useMyArtists } from '@/hooks/useMyArtists';
import { useAuthStore } from '@/stores/authStore';
import type { ConcertItem } from '@/types/concerts';
import type { ArtistItem } from '@/types/artists';
import { myConcertToConcertItem } from '@/services/concertMappers';
import { myArtistToArtistItem } from '@/services/artistMappers';
import SideTab from '@/components/sideTabDir/SideTab';

export default function MyPage() {
  const router = useRouter();
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);

  const accessToken = useAuthStore((s) => s.accessToken);
  const isLoggedIn = !!accessToken;
  const userId = useAuthStore((s) => s.userId);
  useEffect(() => {
    const fetchIdIfNeeded = async () => {
      // 로그인은 되어 있는데 스토어에 userId가 없다면 (새로고침 상황 등)
      if (isLoggedIn && !userId) {
        try {
          await authService.getUserId();
        } catch (error) {
          console.error('사용자 정보를 가져오는 데 실패했습니다.');
        }
      }
    };

    fetchIdIfNeeded();
  }, [isLoggedIn, userId]);
  const { concerts: myConcerts, isLoading: isMyConcertsLoading } = useMyConcerts({
    enabled: isLoggedIn,
  });

  const { artists: myArtists, isLoading: isMyArtistsLoading } = useMyArtists({
    enabled: isLoggedIn,
  });

  const mappedConcerts = useMemo<ConcertItem[]>(
    () => myConcerts.map(myConcertToConcertItem),
    [myConcerts]
  );

  const mappedArtists = useMemo<ArtistItem[]>(
    () => myArtists.map(myArtistToArtistItem),
    [myArtists]
  );

  const handleLogout = async () => {
    await authService.logout();
    router.push('/');
  };

  return (
    <div className="text-white flex flex-col h-screen bg-black relative">
      <div className="sticky">
        <MyPageHeader onOpenSideTab={() => setIsSideTabOpen(true)} />
      </div>
      <div className="flex flex-col pb-6 bg-black mt-13">
        <ProfileSection userId={userId} />

        {/* 스크랩한 공연 */}
        <div onClick={() => router.push('/my/concert')}>
          <MenuSection title="스크랩한 공연" />
          <HorizontalSwipeList>
            {isMyConcertsLoading ? (
              <div className="text-[14px] text-[#8C8888] px-5">
                불러오는 중...
              </div>
            ) : mappedConcerts.length === 0 ? (
              <div className="py-6 text-[16px] text-[#8C8888]">
                관심있는 공연을 스크랩해 보세요
              </div>
            ) : (
              mappedConcerts.map((concert) => (
                <ConcertCard key={concert.concertId} concert={concert} />
              ))
            )}
          </HorizontalSwipeList>
        </div>

        {/* 스크랩한 아티스트 */}
        <div onClick={() => router.push('/my/artist')} className={"mt-6"}>
          <MenuSection title="스크랩한 아티스트" />
          <HorizontalSwipeList>
            {isMyArtistsLoading ? (
              <div className="text-[14px] text-[#8C8888] px-5">
                불러오는 중...
              </div>
            ) : mappedArtists.length === 0 ? (
              <div className="py-6 text-[16px] text-[#8C8888]">
                좋아하는 아티스트를 스크랩해 보세요
              </div>
            ) : (
              mappedArtists.map((artist) => <ArtistCard key={artist.artistId} artist={artist} />)
            )}
          </HorizontalSwipeList>
        </div>
      </div>

      <div className="flex flex-col gap-3 bg-black py-2">
        <MenuSection
          title="MY 디깅 라운지 활동"
          hasBorder={true}
          onclick={() => router.push('/my/community')}
        />
        {/*데모데이까지 미개발 예정 */}
        <div className="opacity-50 grayscale pointer-events-none cursor-not-allowed">
          <MenuSection title="MY 인디스토리 활동" hasBorder={true} />
        </div>
        <MenuSection
          title="약관 및 수신동의"
          hasBorder={true}
          onclick={() => router.push('/my/agree')}
        />
        <MenuSection
          title="소셜계정 연동하기"
          hasBorder={true}
          onclick={() => router.push('/my/social')}
        />
      </div>

      <p className="flex justify-center items-center gap-2 pt-37 p-5 text-center bg-black ">
        <span
          className="text-sm font-normal text-gray-500 border-r border-gray-500 px-3 cursor-pointer"
          onClick={handleLogout}
        >
          로그아웃
        </span>
        <span className="text-sm font-normal text-gray-500 px-3 cursor-pointer">회원탈퇴</span>
      </p>
      {isSideTabOpen && <SideTab onClose={() => setIsSideTabOpen(false)} />}
    </div>
  );
}
