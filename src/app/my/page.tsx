'use client';
import PersonalArtistRecCard from '@/components/home/ArtistCard';
import ConcertCard from '@/components/home/HomeConcertCard';
import HorizontalSwipeList from '@/components/my/HorizontalSwipeList';
import MenuSection from '@/components/my/MenuSection';
import MyPageHeader from '@/components/my/MyPageHeader';
import ProfileSection from '@/components/my/ProfileSection';
import { mockArtists } from '@/mocks/mockArtists';
import { mockConcerts } from '@/mocks/mockConcerts';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';

export default function MyPage() {
  const router = useRouter();
  const handleLogout = async () => {
    await authService.logout();
    router.push('/');
  };
  return (
    <div className="text-white flex flex-col h-screen bg-black relative">
      <MyPageHeader />
      <div className="flex flex-col">
        <ProfileSection />
        <div onClick={() => router.push('/my/concert')}>
          <MenuSection title="스크랩한 공연" />
          <HorizontalSwipeList>
            {mockConcerts.map((concert) => (
              <ConcertCard key={concert.id} concert={concert} />
            ))}
          </HorizontalSwipeList>
        </div>
        <div onClick={() => router.push('/my/artist')}>
          <MenuSection title="스크랩한 아티스트" />
          <HorizontalSwipeList>
            {mockArtists.map((artist) => (
              <PersonalArtistRecCard key={artist.id} artist={artist} />
            ))}
          </HorizontalSwipeList>
        </div>
      </div>
      <div className="flex flex-col gap-3 bg-black">
        <MenuSection title="스크랩한 게시물" hasBorder={true} />
        <MenuSection title="스크랩한 인디스토리" hasBorder={true} />
        <MenuSection title="연동된 소셜계정" hasBorder={true} />
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
    </div>
  );
}
