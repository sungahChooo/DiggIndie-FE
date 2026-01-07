'use-client';
import next from '@/assets/common/more.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  isLoggedIn: boolean;
};

export default function ResetPreference({ isLoggedIn }: Props) {
  const router = useRouter();
  if (!isLoggedIn) return null;
  return (
    <div
      className={`w-[335px] h-[46px] flex bg-[#FF3637] mt-[40px] items-center rounded-[4px] cursor-pointer`}
      onClick={() => router.push('/onboard/artist')}
    >
      <div className={`flex overflow-x-auto text-[16px] ml-[12px] font-semibold`}>
        <span className={'w-[148px] h-[22px] ml-[12px]'}>취향 재설정 하러 가기</span>
      </div>
      <div className={'w-[16px] h-[16px]'}>
        <Image src={next} alt={next} />
      </div>
    </div>
  );
}
