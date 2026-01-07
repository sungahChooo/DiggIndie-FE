'use client';
import InputSection from '@/components/auth/InputSection';
import Button from '@/components/common/Button';
import xButton from '@/assets/auth/xButton.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { joinSchema } from '@/lib/auth';
import { authService } from '@/services/authService';

export default function JoinPage() {
  const router = useRouter();
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isIdValid, setIsIdValid] = useState(false);

  const [form, setForm] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    emailLocal: '',
    emailDomain: '',
  });
  const [errors, setErrors] = useState<{
    id?: string;
    password?: string;
    confirmPassword?: string;
    emailLocal?: string;
    emailDomain?: string;
  }>({});

  const handleJoin = async () => {
    // 1️.Zod 검증
    const result = joinSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        id: fieldErrors.id?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
        emailLocal: fieldErrors.emailLocal?.[0],
        emailDomain: fieldErrors.emailDomain?.[0],
      });
      return;
    }

    // 2️. 아이디 중복 확인 여부 검사
    if (!isIdChecked || !isIdValid) {
      setErrors((prev) => ({
        ...prev,
        id: '아이디 중복 확인을 해주세요.',
      }));
      return;
    }

    // 3️. 회원가입
    await authService.signup(form.id, form.password, form.emailLocal, form.emailDomain);

    router.push('/auth/agree');
  };

  //id 중복 체크 api 호출 함수
  const handleCheckId = async () => {
    if (!form.id) {
      setErrors((prev) => ({ ...prev, id: '아이디를 입력해주세요.' }));
      return;
    }

    try {
      const isAvailable = await authService.checkId(form.id);

      setIsIdChecked(true);

      if (isAvailable) {
        setIsIdValid(true);
        setErrors((prev) => ({ ...prev, id: '사용 가능한 아이디입니다.' }));
      } else {
        setIsIdValid(false);
        setErrors((prev) => ({ ...prev, id: '이미 사용 중인 아이디입니다.' }));
      }
    } catch (error) {
      console.log('로그인 중복 검사 오류', error);
      setErrors((prev) => ({ ...prev, id: '서버 통신 중 오류가 발생했습니다.' }));
    }
  };

  return (
    <div className="text-white flex flex-col h-screen items-center gap-6">
      <section className="flex px-5 py-3 w-full justify-between">
        <Link href="/auth/login">
          <Image src={xButton} alt="xButton" width={20} />
        </Link>
        <span className="text-base font-semibold text-white pr-35">회원가입</span>
      </section>
      <section className="flex flex-col gap-2">
        <span className="text-xs font-medium text-gray-300 px-1 mb-2">아이디</span>
        <div className="flex gap-2">
          <InputSection
            placeholder="아이디"
            width="w-[228px] h-[46px]"
            value={form.id}
            onChange={(e) => {
              setIsIdChecked(false);
              setIsIdValid(false);
              setForm({ ...form, id: e.target.value });
            }}
          />
          <button
            className="bg-main-red-4 px-4 py-3 rounded-sm text-white text-base font-semibold border-main-red-1 border cursor-pointer"
            onClick={handleCheckId}
          >
            중복확인
          </button>
        </div>
        {errors.id && <p className="text-red-400 text-xs px-3">{errors.id}</p>}
        <span className="text-xs font-medium text-gray-300 px-3">4~12이내</span>
      </section>
      <section className="flex flex-col gap-2">
        <span className="text-xs font-medium text-gray-300 mb-2">비밀번호</span>
        <div className="flex flex-col gap-3">
          <InputSection
            placeholder="비밀번호"
            type="password"
            width="w-[335px] h-[46px]"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && <p className="text-red-400 text-xs px-3">{errors.password}</p>}

          <InputSection
            placeholder="비밀번호 확인"
            type="password"
            width="w-[335px] h-[46px]"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-red-400 text-xs px-3">{errors.confirmPassword}</p>
        )}
        <span className="text-xs font-medium text-gray-500 px-3">
          6~20자/ 영문, 숫자, 특수문자 중 2가지 이상 조합
        </span>
      </section>
      <section className="flex flex-col gap-4">
        <span className="text-xs font-medium  text-gray-300">이메일</span>
        <div className="flex gap-3 justify-center items-center">
          <InputSection
            placeholder="이메일"
            width="w-[150px] h-[46px]"
            value={form.emailLocal}
            onChange={(e) => setForm({ ...form, emailLocal: e.target.value })}
          />
          <span className="font-semibold text-xl text-gray-600">@</span>
          <select
            className="w-[130px] h-[46px] border border-gray-700 rounded-sm px-4 py-3 text-sm text-gray-600 bg-gray-900 text-base"
            value={form.emailDomain}
            onChange={(e) => setForm({ ...form, emailDomain: e.target.value })}
          >
            <option value="" className="text-base">
              선택
            </option>
            <option value="@gmail.com">gmail.com</option>
            <option value="@naver.com">naver.com</option>
            <option value="@kakao.com">kakao.com</option>
          </select>
        </div>
        {errors.emailLocal && <p className="text-red-400 text-xs px-3">{errors.emailLocal}</p>}
        {errors.emailDomain && <p className="text-red-400 text-xs px-3">{errors.emailDomain}</p>}
      </section>
      <div className="w-[375px] px-5 absolute bottom-5">
        <Button onClick={handleJoin}>가입하기</Button>
      </div>
    </div>
  );
}
