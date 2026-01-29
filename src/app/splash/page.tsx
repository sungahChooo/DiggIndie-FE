'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Diggindie from '@/assets/common/diggindie.svg';

export default function SplashPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [fade, setFade] = useState(true);
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || 'home';
  useEffect(() => {
    sessionStorage.setItem('hasSeenSplash', 'true');
    // 1초 후 첫 텍스트 → 두 번째 텍스트로 페이드전환 시작
    const timer1 = setTimeout(() => {
      setFade(false); // fade-out

      // transition-duration과 맞춰서 300ms 후 step 변경
      const timer2 = setTimeout(() => {
        setStep(1);
        setFade(true); // fade-in
      }, 300);
    }, 1000);

    // 전체 스플래시 끝 → 메인페이지 이동
    const timer3 = setTimeout(() => {
      router.replace(`${next}`);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer3);
    };
  }, [router]);

  return (
    <div className="flex justify-center h-[100dvh] bg-gradient-to-b from-[#140B0B] to-[#330301] fixed inset-0">
      <div
        className={`flex flex-col justify-center items-center text-center gap-4 px-6 transition-opacity duration-300 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {step === 0 ? (
          <>
            <Image src={Diggindie} alt="logo" width={180} />
            <span className="text-base font-medium text-white/80">
              더 깊고 끝없는 음악 여정이 시작됩니다.
            </span>
          </>
        ) : (
          <>
            <span className="text-base font-medium text-white/80 leading-[var(--line-height-text)] ">
              취향에 맞는 인디뮤직 디깅을 편리하게,
              <br />
              공연 정보부터 뮤지션 발굴까지, 모든 것을 한 곳에서
            </span>
          </>
        )}
      </div>
    </div>
  );
}
