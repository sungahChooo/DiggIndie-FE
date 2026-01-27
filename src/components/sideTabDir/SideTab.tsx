import homeIcon from '@/assets/sideTab/Home 2.svg';
import concertIcon from '@/assets/common/Calendar.svg';
import artistIcon from '@/assets/common/Voice 3.svg';
import communityIcon from '@/assets/sideTab/Chat 2.svg';
import indieIcon from '@/assets/sideTab/Document.svg';
import xIcon from '@/assets/sideTab/Star 8.svg';
import loginIcon from '@/assets/sideTab/Login.svg';
import logoutIcon from '@/assets/sideTab/Logout.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';
import ProfileIcon from '@/assets/common/ProfileIcon';

interface SideTabProps {
  onClose: () => void;
}
export default function SideTab({ onClose }: SideTabProps) {
  const router = useRouter();
  const { isAuthed } = useAuthStore();

  const handleLoginClick = () => {
    router.push('/auth/login');
    onClose();
  };

  const handleLogout = async () => {
    await authService.logout();
    onClose();
    router.push('/');
  };

  return (
    <section className="bg-black flex flex-col h-screen w-[307px] gap-5 absolute top-0 z-500 right-0 min-h-screen">
      <div className="px-8 py-3 cursor-pointer mt-7" onClick={onClose}>
        <Image src={xIcon} alt="닫기" />
      </div>
      <div className="flex flex-col ">
        <div
          className="px-8 py-3 cursor-pointer flex gap-3 hover:bg-gray-800"
          onClick={() => router.push('/home')}
        >
          <Image src={homeIcon} alt="홈" />
          <span className="text-white">홈</span>
        </div>
        <div
          className="px-8 py-3 cursor-pointer flex gap-3 hover:bg-gray-800"
          onClick={() => router.push('/concert')}
        >
          <Image src={concertIcon} alt="공연" />
          <span className="text-white">공연</span>
        </div>
        <div
          className="px-8 py-3 cursor-pointer flex gap-3 hover:bg-gray-800"
          onClick={() => router.push('/artist')}
        >
          <Image src={artistIcon} alt="아티스트" />
          <span className="text-white">아티스트</span>
        </div>
        <div
          className="px-8 py-3 cursor-pointer flex gap-3 hover:bg-gray-800"
          onClick={() => router.push('/community/free')}
        >
          <Image src={communityIcon} alt="디깅 라운지" />
          <span className="text-white">디깅 라운지</span>
        </div>

        <div
          className="px-8 py-3 cursor-pointer flex gap-3 hover:bg-gray-800"
          onClick={() => router.push('/indieStory')}
        >
          <Image src={indieIcon} alt="인디 스토리" />
          <span className="text-white">인디 스토리</span>
        </div>
        <div
          className={`px-8 py-3 flex gap-3 items-center ${
            isAuthed ? 'cursor-pointer hover:bg-gray-800' : 'cursor-not-allowed'
          }`}
          onClick={() => {
            if (!isAuthed) return;
            router.push('/my');
            onClose();
          }}
        >
          <ProfileIcon stroke={`${isAuthed ? 'white' : '#4A4747'}`} />
          <span className={`${isAuthed ? 'text-white' : 'text-gray-700'}`}>마이페이지</span>
        </div>
        <hr className="border-t-2 border-gray-700 my-6" />

        <div
          className="px-8 py-3 cursor-pointer flex gap-3 hover:bg-gray-800"
          onClick={isAuthed ? handleLogout : handleLoginClick}
        >
          <Image src={isAuthed ? logoutIcon : loginIcon} alt={isAuthed ? '로그아웃' : '로그인'} />
          <span className="text-white" onClick={() => handleLogout}>
            {isAuthed ? '로그아웃' : '로그인'}
          </span>
        </div>
      </div>
    </section>
  );
}
