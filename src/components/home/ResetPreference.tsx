'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import next from '@/assets/common/more.svg';

type Props = {
  isLoggedIn: boolean;
};

export default function ResetPreference({ isLoggedIn }: Props) {
  const router = useRouter();

  if (!isLoggedIn) return null;

  return (
    <div className="relative flex flex-col w-full px-5 min-w-0 items-center justify-center">
      <div
        className="flex w-full bg-[#FF3637] mt-10 px-3 py-3 items-center cursor-pointer min-w-0 rounded-[4px]"
        onClick={() => router.push('/onboard/artist')}
      >
        <div className="min-w-0 text-4 text-center">
          <span className="block truncate">취향 재설정 하러 가기</span>
        </div>

        <div className="ml-1 shrink-0 flex items-center mr-auto">
          <Image src={next} alt="next" width={16} height={16} />
        </div>
      </div>
    </div>
  );
}
