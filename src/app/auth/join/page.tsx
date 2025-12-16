'use client';
import InputSection from '@/components/auth/InputSection';
import Button from '@/components/common/Button';
import xButton from '@/assets/auth/xButton.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

export default function JoinPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    id: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{
    id?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const joinSchema = z.object({
    id: z.string().min(4, '아이디는 4자 이상이어야 합니다'),
    password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
    confirmPassword: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
  });
  const handleJoin = () => {
    const result = joinSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        id: fieldErrors.id?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });
      alert('입력한 id와 password 내용을 다시 확인해주세요.');
      return;
    }
    router.push('/auth/join/success');
    // 여기서 API 요청 보내기
    console.log('회원가입 성공', result.data);
  };
  return (
    <form className="text-white flex flex-col h-screen items-center gap-6">
      <section className="flex px-5 py-3 w-full justify-between">
        <Link href="/auth/login">
          <Image src={xButton} alt="xButton" width={20} />
        </Link>
        <span className="text-base font-semibold text-white pr-35">회원가입</span>
      </section>
      <section className="flex flex-col gap-2">
        <span className="text-xs font-medium text-gray-300 px-1 mb-2">아이디</span>
        <div className="flex gap-2">
          <InputSection placeholder="아이디" width="w-[228px] h-[46px]" />
          <button className="bg-main-red-4 px-4 py-3 rounded-sm text-white text-base font-semibold border-main-red-1 border">
            중복확인
          </button>
        </div>
        <span className="text-xs font-medium text-gray-300 px-3">4~12이내</span>
      </section>
      <section className="flex flex-col gap-2">
        <span className="text-xs font-medium text-gray-300 mb-2">비밀번호</span>
        <div className="flex flex-col gap-3">
          <InputSection placeholder="비밀번호" type="password" width="w-[335px] h-[46px]" />
          <InputSection placeholder="비밀번호 확인" type="password" width="w-[335px] h-[46px]" />
        </div>
        <span className="text-xs font-medium text-gray-500 px-3">
          6~20자/ 영문, 숫자, 특수문자 중 2가지 이상 조합
        </span>
      </section>
      <section className="flex flex-col gap-4">
        <span className="text-xs font-medium  text-gray-300">이메일</span>
        <div className="flex gap-3 justify-center items-center">
          <InputSection placeholder="이메일" type="email" width="w-[150px] h-[46px]" />
          <span className="font-semibold text-xl text-gray-600">@</span>
          <select
            className="w-[130px] h-[46px] bg-black border border-gray-600 rounded px-2 text-sm text-gray-300"
            defaultValue="gmail.com"
          >
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="kakao.com">kakao.com</option>
            <option value="custom">직접 입력</option>
          </select>
        </div>
      </section>
      <div className="w-[375px] px-5 absolute bottom-5">
        <Button onclick={handleJoin}>가입하기</Button>
      </div>
    </form>
  );
}
