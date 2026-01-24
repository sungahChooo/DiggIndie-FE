'use client';
import Image from 'next/image';
import searchBtn from '@/assets/common/search.svg'
import writeBtn from '@/assets/common/write.svg'
import menuBtn from '@/assets/common/hamburger.svg'
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

type props = {
  title: string;
  onHamburgerClick: () => void;
};


export default function CommunityHeader({ title, onHamburgerClick }: props) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthed } = useAuthStore();


  const handleSearch = () => {
    if (pathname.includes('/community/free')) {
      router.push('/community/free/search');
    } else {
      router.push('/community/trade/search');
    }
  };

  return (
    <div className="bg-black w-full h-[52px] flex items-center px-5 py-3 top-0 z-50 justify-between">
      <span className="text-[20px] font-semibold">{title}</span>
      <div className={"flex gap-[10px]"}>
        <div onClick={() => handleSearch()}>
         <Image src={searchBtn} alt={"search"} width={24} height={24} className={'cursor-pointer'} />
        </div>
        <div onClick={() => {
          if (!isAuthed) return;
          router.push('/community/write')
        }}>
          <Image src={writeBtn} alt={"write"} width={24} height={24} className={'cursor-pointer'} />
        </div>
        <Image src={menuBtn} alt={"menu"} width={24} height={24} className={'cursor-pointer'} onClick={onHamburgerClick} />
      </div>
    </div>
  );
}
