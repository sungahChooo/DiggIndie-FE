'use client';
import Image from 'next/image';
import diggindie from '@/assets/common/diggindie.svg';
import Button from '@/components/Button';
import InputSection from '@/components/auth/InputSection';
import { useRouter } from 'next/navigation';
import loginIcon from '@/assets/auth/Ellipse 2657.svg';

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="text-white flex flex-col h-screen items-center px-5">
      <Image src={diggindie} alt="diggindie icon" width={235} className="mt-40" />
      <section className="flex flex-col gap-3 mt-10">
        <InputSection placeholder="아이디를 입력해주세요." width="w-[335px] h-[52px]" />
        <InputSection
          placeholder="비밀번호를 입력해주세요."
          width="w-[335px] h-[52px]"
          type="password"
        />
        <Button href="/">로그인</Button>
      </section>
      <div className="mt-5">
        <span
          className="text-gray-300 text-xs px-3 border-r cursor-pointer"
          onClick={() => router.push('find/id')}
        >
          아이디 찾기
        </span>
        <span
          className="text-gray-300 text-xs px-3 cursor-pointer"
          onClick={() => router.push('find/pw')}
        >
          비밀번호 재설정
        </span>
        <span
          className="text-gray-300 text-xs px-3 border-l cursor-pointer"
          onClick={() => router.push('join')}
        >
          회원가입
        </span>
      </div>
      <section className="mt-19 flex flex-col w-full">
        <div className="flex gap-1 w-full items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-300 text-xs">SNS 계정으로 로그인</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        <div className="flex gap-4 justify-center">
          <Image
            src={loginIcon}
            alt="kakao login"
            width={58}
            height={58}
            className="mt-5 cursor-pointer"
          />{' '}
          <Image
            src={loginIcon}
            alt="google login"
            width={58}
            height={58}
            className="mt-5 cursor-pointer"
          />{' '}
          <Image
            src={loginIcon}
            alt="naver login"
            width={58}
            height={58}
            className="mt-5 cursor-pointer"
          />
        </div>
      </section>
    </div>
  );
}
