'use client';
import Image from 'next/image';
import diggindie from '@/assets/common/diggindie.svg';
import Button from '@/components/common/Button';
import InputSection from '@/components/auth/InputSection';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import googleIcon from '@/assets/auth/google.svg';
import naverIcon from '@/assets/auth/naver.svg';
import kakaoIcon from '@/assets/auth/kakao.svg';
import { useState } from 'react';

const idSchema = z
  .string()
  .min(4, '아이디는 4자 이상이어야 합니다')
  .max(12, '아이디는 12자 이하여야 합니다');
const passwordSchema = z
  .string()
  .min(6, '비밀번호는 6자 이상이어야 합니다')
  .max(20, '비밀번호는 20자 이하여야 합니다')
  .refine(
    (pw) => {
      const hasLetter = /[a-zA-Z]/.test(pw);
      const hasNumber = /[0-9]/.test(pw);
      const hasSpecial = /[^a-zA-Z0-9]/.test(pw);

      const count = Number(hasLetter) + Number(hasNumber) + Number(hasSpecial);

      return count >= 2;
    },
    {
      message: '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 조합해야 합니다',
    }
  );
export const loginSchema = z.object({
  id: idSchema,
  password: passwordSchema,
});

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    id: '',
    password: '',
  });
  const [errors, setErrors] = useState<{
    id?: string;
    password?: string;
  }>({});

  const handleLogin = () => {
    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        id: fieldErrors.id?.[0],
        password: fieldErrors.password?.[0],
      });
      alert('입력한 id와 password 내용을 다시 확인해주세요.');
      return;
    }
    router.push('/');
    // 여기서 API 요청 보내기
    console.log('로그인 성공', result.data);
  };
  return (
    <div className="text-white flex flex-col h-screen items-center px-5">
      <Image src={diggindie} alt="diggindie icon" width={235} className="mt-40" />
      <section className="flex flex-col gap-3 mt-10">
        <InputSection
          placeholder="아이디를 입력해주세요."
          width="w-[335px] h-[52px]"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
        />
        {errors.id && <p className="text-red-400 text-xs">{errors.id}</p>}
        <InputSection
          placeholder="비밀번호를 입력해주세요."
          width="w-[335px] h-[52px]"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
        <Button onclick={handleLogin}>로그인</Button>
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
            src={googleIcon}
            alt="google login"
            width={58}
            height={58}
            className="mt-5 cursor-pointer"
          />
          <Image
            src={naverIcon}
            alt="naver login"
            width={58}
            height={58}
            className="mt-5 cursor-pointer"
          />
          <Image
            src={kakaoIcon}
            alt="kakao login"
            width={58}
            height={58}
            className="mt-5 cursor-pointer"
          />
        </div>
      </section>
    </div>
  );
}
