'use client';

import Image from 'next/image';
import backBtn from '@/assets/common/back.svg';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleBack = () => {
    const from = searchParams.get('from');

    if (from === 'write') {
      if (pathname.startsWith('/community/free/')) {
        router.push('/community/free');
        return;
      }
      if (pathname.startsWith('/community/trade/')) {
        router.push('/community/trade');
        return;
      }
      router.push('/community');
      return;
    }

    router.back();
  };

  return (
    <header className="sticky top-0 z-50 bg-black shrink-0">
      <div className="mx-auto flex h-13 py-3 w-full items-center justify-between px-5 bg-black">
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
        <HeaderDrowDown onEdit={onEdit ?? (() => {})} onDelete={onDelete ?? (() => {})} />
      )}
    </header>
  );
}
