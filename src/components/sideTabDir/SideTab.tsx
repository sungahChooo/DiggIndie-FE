import homeIcon from '@/assets/sidTab/Home 2.svg';
import concertIcon from '@/assets/sidTab/Calendar.svg';
import artistIcon from '@/assets/sidTab/Voice 3.svg';
import communityIcon from '@/assets/sidTab/Chat 2.svg';
import indieIcon from '@/assets/sidTab/Document.svg';
import myIcon from '@/assets/sidTab/Profile.svg';
import xIcon from '@/assets/sidTab/Star 8.svg';
import loginIcon from '@/assets/sidTab/Login.svg';
import logoutIcon from '@/assets/sidTab/Logout.svg';
import Image from 'next/image';
import { useState } from 'react';

interface SideTabProps {
  onClose: () => void;
}
export default function SideTab({ onClose }: SideTabProps) {
  // 임시 로그인 상태 (초기값: 로그아웃 상태)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleClick = () => {
    // 임시로 로그인/로그아웃 토글
    setIsLoggedIn((prev) => !prev);
  };
  return (
    <section className="bg-black flex flex-col h-screen w-[307px] gap-5">
      <div className="px-8 py-3 cursor-pointer mt-7" onClick={onClose}>
        <Image src={xIcon} alt="닫기" />
      </div>
      <div className="flex flex-col ">
        <div className="px-8 py-3 cursor-pointer flex gap-3 hover:bg-gray-800">
          <Image src={homeIcon} alt="홈" />
          <span className="text-white">홈</span>
        </div>
        <div className="px-8 py-3 cursor-pointer flex gap-3 hover:bg-gray-800">
          <Image src={concertIcon} alt="공연" />
          <span className="text-white">공연</span>
        </div>
        <div className="px-8 py-3 cursor-pointer flex gap-3 hover:bg-gray-800">
          <Image src={artistIcon} alt="아티스트" />
          <span className="text-white">아티스트</span>
        </div>
        <div className="px-8 py-3 cursor-pointer flex gap-3 hover:bg-gray-800">
          <Image src={communityIcon} alt="커뮤니티" />
          <span className="text-white">커뮤니티</span>
        </div>
        <div className="px-8 py-3 cursor-pointer flex gap-3 hover:bg-gray-800">
          <Image src={indieIcon} alt="인디스토리" />
          <span className="text-white">인디스토리</span>
        </div>
        <div className="px-8 py-3 cursor-pointer flex gap-3 hover:bg-gray-800">
          <Image src={myIcon} alt="마이페이지" />
          <span className="text-white">마이페이지</span>
        </div>
        <hr className="border-t border-gray-700 my-6" />

        <div
          className="px-8 py-3 cursor-pointer flex gap-3 hover:bg-gray-800"
          onClick={handleClick}
        >
          <Image
            src={isLoggedIn ? logoutIcon : loginIcon}
            alt={isLoggedIn ? '로그아웃' : '로그인'}
          />
          <span className="text-white">{isLoggedIn ? '로그아웃' : '로그인'}</span>
        </div>
      </div>
    </section>
  );
}
