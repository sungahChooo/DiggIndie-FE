'use client';
import Image from 'next/image';
import searchBtn from '@/assets/common/search.svg'
import writeBtn from '@/assets/common/write.svg'
import menuBtn from '@/assets/common/hamburger.svg'
import { useRouter } from 'next/navigation';

type props = {
  title: string;
  onHamburgerClick: () => void;
};

export default function CommunityHeader({ title, onHamburgerClick }: props) {
  const router = useRouter();
  return (
    <div className="bg-black w-full h-[52px] flex items-center px-5 py-3 top-0 z-50 justify-between">
      <span className="text-[20px] font-semibold">{title}</span>
      <div className={"flex gap-[10px]"}>
        <Image src={searchBtn} alt={"search"} width={24} height={24} className={'cursor-pointer'} />
        <div onClick={() => router.push('/community/write')}>
          <Image src={writeBtn} alt={"write"} width={24} height={24} className={'cursor-pointer'} />
        </div>
        <Image src={menuBtn} alt={"menu"} width={24} height={24} className={'cursor-pointer'} onClick={onHamburgerClick} />
      </div>
    </div>
  );
}
