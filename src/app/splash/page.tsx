'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Diggindie from '@/assets/common/diggindie.svg';

export default function SplashPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const toStep1 = setTimeout(() => {
      setFade(false); // fade-out

      setTimeout(() => {
        setStep(1);
        setFade(true); // fade-in
      }, 300);
    }, 1000);

    const movePage = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => {
      clearTimeout(toStep1);
      clearTimeout(movePage);
    };
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-[#140B0B] to-[#330301] gap-4 px-6 text-center">
      {step === 0 ? (
        <>
          <Image
            src={Diggindie}
            alt="logo"
            width={180}
            className={`transition-opacity duration-700 ${fade ? 'opacity-100' : 'opacity-0'}`}
          />

          <span
            className={`text-base font-medium text-white/80 transition-opacity duration-700 ${
              fade ? 'opacity-100' : 'opacity-0'
            }`}
          >
            더 깊고 끝없는 음악 여정이 시작됩니다.
          </span>
        </>
      ) : (
        <>
          <span
            className={`text-base font-medium text-white/80 transition-opacity duration-700 ${
              fade ? 'opacity-100' : 'opacity-0'
            }`}
          >
            취향에 맞는 인디뮤직 디깅을 편리하게,
            <br />
            공연 정보부터 뮤지션 발굴까지, 모든 것을 한 곳에서
          </span>
        </>
      )}
    </div>
  );
}
