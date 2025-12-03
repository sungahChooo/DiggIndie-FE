import homeIcon from '@/assets/sidTab/Home 2.svg';
import concertIcon from '@/assets/sidTab/Calendar.svg';
import artistIcon from '@/assets/sidTab/Voice 3.svg';
import communityIcon from '@/assets/sidTab/Chat 2.svg';
import indieIcon from '@/assets/sidTab/Document.svg';
import myIcon from '@/assets/sidTab/Profile.svg';
import xIcon from '@/assets/sidTab/Star 8.svg';
import loginIcon from '@/assets/sidTab/Login.svg';
import Image from 'next/image';

export default function SideTab() {
  return (
    <section className="bg-black flex flex-col h-screen w-[307px] gap-5">
      <div className="px-8 py-3 cursor-pointer mt-7">
        <Image src={xIcon} alt="닫기" />
      </div>
      <div className="flex flex-col ">
        <div className="px-8 py-3 cursor-pointer flex gap-3">
          <Image src={homeIcon} alt="홈" />
          <span className="text-white">홈</span>
        </div>
        <div className="px-8 py-3 cursor-pointer flex gap-3">
          <Image src={concertIcon} alt="공연" />
          <span className="text-white">공연</span>
        </div>
        <div className="px-8 py-3 cursor-pointer flex gap-3">
          <Image src={artistIcon} alt="아티스트" />
          <span className="text-white">아티스트</span>
        </div>
        <div className="px-8 py-3 cursor-pointer flex gap-3">
          <Image src={communityIcon} alt="커뮤니티" />
          <span className="text-white">커뮤니티</span>
        </div>
        <div className="px-8 py-3 cursor-pointer flex gap-3">
          <Image src={indieIcon} alt="인디스토리" />
          <span className="text-white">인디스토리</span>
        </div>
        <div className="px-8 py-3 cursor-pointer flex gap-3">
          <Image src={myIcon} alt="마이페이지" />
          <span className="text-white">마이페이지</span>
        </div>
        <hr className="border-t border-gray-700 my-6" />
        <div className="px-8 py-3 cursor-pointer flex gap-3">
          <Image src={loginIcon} alt="로그인" />
          <span className="text-white">로그인</span>
        </div>
      </div>
    </section>
  );
}
