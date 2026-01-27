'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function CommunityTab() {
  const router = useRouter();
  const pathname = usePathname();

  const isFree = pathname === '/community/free';
  const isTrade = pathname === '/community/trade';
  const isFreeSearch = pathname === '/community/free/search';
  const isTradeSearch = pathname === '/community/trade/search';

  return (
    <div
      className="relative bg-black w-full h-[42px] text-[16px] font-medium flex px-5 gap-[26px] text-center
      border-b-[1px] border-[#413D3D] mb-[12px]"
    >
      <span
        onClick={() =>
          router.push(isTradeSearch ? "/community/free/search" : "/community/free")
        }
        className={`relative w-[44px] pt-2 cursor-pointer ${
          (isFree || isFreeSearch) ? 'text-white' : 'text-[#736F6F]'
        }`}
      >
        자유
        {isFree && (
          <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-white" />
        )}
      </span>

      <span
        onClick={() =>
          router.push(isFreeSearch ? "/community/trade/search" : "/community/trade")
        }
        className={`relative w-[68px] pt-2 cursor-pointer ${
          (isTrade || isTradeSearch) ? 'text-white' : 'text-[#736F6F]'
        }`}
      >
        거래/양도
        {isTrade && (
          <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-white" />
        )}
      </span>
    </div>
  );
}
