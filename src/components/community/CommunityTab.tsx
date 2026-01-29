'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function CommunityTab() {
  const router = useRouter();
  const pathname = usePathname();

  const isFree = pathname === '/community/free';
  const isTrade = pathname === '/community/trade';

  return (
    <div
      className="pt-[1px] relative h-[42px] w-full text-[16px] font-medium flex gap-[26px] text-center "
    >
      <span
        onClick={() =>
          router.push("/community/free")
        }
        className={`relative w-[44px] pt-2 cursor-pointer ${
          (isFree) ? 'text-white' : 'text-[#736F6F]'
        }`}
      >
        자유
        {isFree && (
          <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-white" />
        )}
      </span>

      <span
        onClick={() =>
          router.push( "/community/trade")
        }
        className={`relative w-[68px] pt-2 cursor-pointer ${
          (isTrade) ? 'text-white' : 'text-[#736F6F]'
        }`}
      >
        거래/양도
        {isTrade && (
          <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-white" />
        )}
      </span>
    </div>
  );
}
