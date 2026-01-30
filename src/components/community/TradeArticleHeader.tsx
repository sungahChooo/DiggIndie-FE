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

export default function TradeArticleHeader({
  title,
  isMine,
  onEdit,
  onDelete,
}: ArticleHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchParams = useSearchParams();

  const handleBack = () => {
    const from = searchParams.get('from');

    if (from === 'write') {
      if (pathname.startsWith('/community/trade/')) {
        router.push('/community/trade');
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
    <header className="sticky top-0 z-50 shrink-0">
      <section className="w-full flex px-5 py-[10px] text-white bg-transparent mx-auto justify-between absolute">
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
      </section>

      {isMine && isDropdownOpen && (
        <HeaderDrowDown onEdit={onEdit ?? (() => {})} onDelete={onDelete ?? (() => {})} />
      )}
    </header>
  );
}
