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
    <div className="flex flex-col bg-gray-900 rounded-[4px] border-1 border-gray-800 mt-[40px] p-3 gap-5">
      <div className="flex justify-between">
        <Image src={logo} alt="logo" width={67.94} height={14} className={'mr-auto'} />
        <button onClick={() => setVisible(false)} className={'cursor-pointer'}>
          <Image src={close} alt="logo" width={18} height={18} />
        </button>
      </div>
      <div className="flex flex-col mx-[12px]">
        <span className={'text-[18px] font-semibold mb-[4px]'}>
          로그인하여 당신만의 디깅을 시작하세요
        </span>
        <span className={'text-[12px] text-[#BEBABA] mb-[16px]'}>
          리스너님을 위한 아티스트와 공연 추천이 시작됩니다.
        </span>
        <div>
          <button
            onClick={() => {
              router.push('/auth/login');
              setVisible(false);
            }}
            className={
              'px-4 py-2 bg-main-red-2 rounded-sm flex items-center justify-center cursor-pointer text-sm font-medium  text-white'
            }
          >
            로그인 하러 가기
          </button>
        </div>
      </div>
    </div>
  );
}
