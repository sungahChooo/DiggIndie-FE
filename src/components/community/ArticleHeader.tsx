'use client';

import Image from 'next/image';
import backBtn from '@/assets/common/back.svg';
import { useRouter, usePathname } from 'next/navigation';
import communityMore from '@/assets/community/Menu Kebab Vertical.svg';
import { useState } from 'react';
import HeaderDrowDown from './HeaderDropDown';

interface ArticleHeaderProps {
  title: string;
  isMine?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ArticleHeader({ title, isMine, onEdit, onDelete }: ArticleHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //현재 url에 따라 자유게시판으로 갈지 거래개시판으로 갈지
  const handleBack = () => {
    if (pathname.includes('/community/free')) {
      router.push('/community/free');
    } else {
      router.push('/community/trade');
    }
  };

  return (
    <section className="w-full flex flex-col px-5 py-[10px] max-w-[inherit] text-white h-11 fixed top-0 z-10 bg-transparent relative">
      <div className="flex justify-between items-center">
        <Image
          src={backBtn}
          alt="back"
          width={24}
          height={24}
          onClick={handleBack}
          className="cursor-pointer flex items-center"
        />

        <span className="font-semibold text-base text-white">{title}</span>

        {isMine ? (
          <Image
            src={communityMore}
            alt="헤더 더보기 아이콘"
            className="cursor-pointer"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          />
        ) : (
          <div className="w-6 h-6" />
        )}
      </div>

      {isMine && isDropdownOpen && (
        <HeaderDrowDown
          onEdit={onEdit ?? (() => {})}
          onDelete={onDelete ?? (() => {})}
        />
      )}
    </section>
  );
}
