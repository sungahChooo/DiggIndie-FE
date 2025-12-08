'use client';
import Image from 'next/image';
import diggindie from '@/assets/myPage/diggindie.svg';
import Button from '@/components/Button';

export default function LoginPage() {
  return (
    <div className="text-white flex flex-col h-screen items-center">
      <Image src={diggindie} alt="diggindie icon" width={235} className="mt-46" />
      <section className="flex flex-col gap-3 mt-18">
        <div className="p-4 w-[335px] bg-gray-900 border-gray-700 rounded-sm ">
          <input
            placeholder="아이디를 입력해주세요."
            className="focus:outline-none selection:bg-gray-600"
          />
        </div>
        <div className="p-4 w-[335px] bg-gray-900 border-gray-700 rounded-sm">
          <input
            placeholder="비밀번호를 입력해주세요."
            className="focus:outline-none selection:bg-gray-600"
          />
        </div>
        <Button href="/">로그인</Button>
      </section>
    </div>
  );
}
