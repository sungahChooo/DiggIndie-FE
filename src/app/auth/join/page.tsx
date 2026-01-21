'use client';
import InputSection from '@/components/auth/InputSection';
import LinkButton from '@/components/common/LinkButton';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { joinSchema } from '@/lib/auth';
import { authService } from '@/services/authService';
import JoinHeader from '@/components/auth/JoinHeader';

export default function JoinPage() {
  const router = useRouter();
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isIdValid, setIsIdValid] = useState(false);

  const [form, setForm] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    email: '',
    emailConfirm: '',
  });
  const [errors, setErrors] = useState<{
    id?: string;
    password?: string;
    confirmPassword?: string;
    phoneNumber?: string;
    email?: string;
    emailConfirm?: string;
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
        phoneNumber: fieldErrors.phoneNumber?.[0],
        email: fieldErrors.email?.[0],
        emailConfirm: fieldErrors.emailConfirm?.[0],
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
    await authService.signup(form.id, form.password, form.email);

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
    <div className="text-white flex flex-col h-screen items-center gap-6 overflow-y-auto pb-25">
      <JoinHeader />
      {/* 아이디 입력 섹션 */}
      <section className="flex flex-col gap-2 w-full px-5 mt-9">
        <span className="text-xs font-medium text-gray-300 px-1 mb-2">아이디</span>
        <div className="flex gap-2 items-center">
          <InputSection
            placeholder="아이디"
            width="w-[255px] h-11"
            value={form.id}
            onChange={(e) => {
              setIsIdChecked(false);
              setIsIdValid(false);
              setForm({ ...form, id: e.target.value });
            }}
          />
          <button
            className="bg-main-red-4 px-4 h-11 rounded-sm text-white text-sm font-medium border-main-red-1 border cursor-pointer whitespace-nowrap "
            onClick={handleCheckId}
          >
            중복확인
          </button>
        </div>
        {errors.id && <p className="text-red-400 text-xs px-3">{errors.id}</p>}
        <span className="text-xs font-medium text-gray-300 px-3">4~12자 이내</span>
      </section>
      {/* 비밀번호 입력 섹션 */}
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
      {/*전화번호 입력 섹션 */}
      <section className="flex flex-col gap-2">
        <span className="text-xs font-medium text-gray-300 px-1 mb-2">전화번호</span>
        <InputSection
          placeholder="전화번호"
          width="w-[335px] h-[46px]"
          value={form.phoneNumber}
          onChange={(e) => {
            setIsIdChecked(false);
            setIsIdValid(false);
            setForm({ ...form, phoneNumber: e.target.value });
          }}
        />
        {errors.phoneNumber && <p className="text-red-400 text-xs px-3">{errors.phoneNumber}</p>}
        <span className="text-xs font-medium text-gray-300 px-3">-----</span>
      </section>
      {/* 이메일 입력 섹션 */}
      <section className="flex flex-col gap-4 px-5 w-full">
        <span className="text-xs font-medium  text-gray-300">이메일</span>
        <div className="flex gap-3">
          <InputSection
            placeholder="이메일"
            width="w-[237px] h-11"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <button
            className="bg-main-red-4 px-2 h-11 rounded-sm text-white text-sm font-medium border-main-red-1 border cursor-pointer whitespace-nowrap "
            onClick={handleCheckId}
          >
            인증번호 전송
          </button>
        </div>
        <div className="flex gap-3">
          <InputSection
            placeholder="이메일"
            width="w-[237px] h-11"
            value={form.emailConfirm}
            onChange={(e) => setForm({ ...form, emailConfirm: e.target.value })}
          />
          <button
            className="bg-main-red-4 px-2 h-11 rounded-sm text-white text-sm font-medium border-main-red-1 border cursor-pointer whitespace-nowrap"
            onClick={handleCheckId}
          >
            인증번호 확인
          </button>
        </div>
        {errors.email && <p className="text-red-400 text-xs px-3">{errors.email}</p>}
        {errors.emailConfirm && <p className="text-red-400 text-xs px-3">{errors.emailConfirm}</p>}
      </section>
      <div className="w-[375px] px-5 absolute bottom-5">
        <LinkButton onClick={handleJoin} disabled={false}>
          가입하기
        </LinkButton>
      </div>
    </div>
  );
}
