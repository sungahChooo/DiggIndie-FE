'use client';

import Image from 'next/image';
import logo from '@/assets/common/logo.svg';
import close from '@/assets/icons/close.svg';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  isLoggedIn: boolean;
};

export default function LoginBanner({ isLoggedIn }: Props) {
  const [visible, setVisible] = useState(true);
  const router = useRouter();
  if (!visible || isLoggedIn) return;

  return (
    <div className="w-[335px] h-[166px] flex flex-col bg-[#1F1D1D] rounded-[4px] border-4px border-[#413D3D] mt-[40px]">
      <div className="w-[311px] h-[18px] mx-[12px] flex mt-[12px] mb-[20px]">
        <Image src={logo} alt="logo" width={67.94} height={14} className={'mr-auto'} />
        <button onClick={() => setVisible(false)} className={'cursor-pointer'}>
          <Image src={close} alt="logo" width={18} height={18} />
        </button>
      </div>
      <div className="h-[104px] flex flex-col mx-[12px]">
        <span className={'text-[18px] font-semibold mb-[4px]'}>
          로그인하여 당신만의 디깅을 시작하세요
        </span>
        <span className={'text-[12px] text-[#BEBABA] mb-[16px]'}>
          리스너님을 위한 아티스트와 공연 추천이 시작됩니다.
        </span>
        <div className={'flex w-[248px] h-[36px] text-[12px] gap-[8px]'}>
          <button
            onClick={() => {
              setVisible(false);
              router.push('/auth/login');
            }}
            className={'w-[121px] bg-[#ff3637] rounded-[4px] flex items-center justify-center'}
          >
            로그인 하러 가기
          </button>
          <button
            onClick={() => setVisible(false)}
            className={
              'w-[121px] border-[1px] ' +
              'border-[#736F6F] rounded-[4px] flex items-center justify-center cursor-pointer'
            }
          >
            이 상태로 보기
          </button>
        </div>
      </div>
    </div>
  );
}
