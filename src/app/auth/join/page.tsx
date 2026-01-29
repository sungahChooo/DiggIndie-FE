'use client';
import InputSection from '@/components/auth/InputSection';
import LinkButton from '@/components/common/LinkButton';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { joinSchema, emailSchema, idSchema } from '@/lib/auth';
import { authService } from '@/services/authService';
import JoinHeader from '@/components/auth/JoinHeader';

export default function JoinPage() {
  const router = useRouter();

  const [isIdChecked, setIsIdChecked] = useState(false); //id 중복확인 버튼 클릭 여부
  const [isIdValid, setIsIdValid] = useState(false); //id 유효성 검사 성공 여부

  const [isEmailSent, setIsEmailSent] = useState(false); // 인증번호 전송 버튼 클릭 여부
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 인증번호 확인 성공 여부

  // const [isCodeChecked, setISCodeChecked] = useState(false); //인증 번호 확인 버튼 클릭 여부
  // const [isCodeValid, setIsCodeValid] = useState(false); //인증번호 확인 성공 여부

  const [form, setForm] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    phoneNumber1: '',
    phoneNumber2: '',
    phoneNumber3: '',
    email: '',
    emailConfirm: '',
  });
  const [errors, setErrors] = useState<{
    id?: string;
    password?: string;
    confirmPassword?: string;
    phoneNumber1?: string;
    phoneNumber2?: string;
    phoneNumber3?: string;
    email?: string;
    emailConfirm?: string;
  }>({});
  const handleCheckId = async () => {
    // 1️.아이디 형식 검사
    const result = idSchema.safeParse(form.id);

    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        id: result.error.issues[0].message,
      }));
      return;
    }

    // 2️. 중복 확인 API
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
    } catch {
      setErrors((prev) => ({ ...prev, id: '서버 오류가 발생했습니다.' }));
    }
  };
  const handleEmailCheck = async () => {
    // 1️. 이메일 형식 검사
    const result = emailSchema.safeParse(form.email);

    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        email: result.error.issues[0].message,
      }));
      return;
    }

    // 2️. 이메일 중복 체크 + 전송
    try {
      await authService.checkEmail(form.email, 'SIGNUP');
      setIsEmailSent(true);
      setErrors((prev) => ({ ...prev, email: '인증번호가 전송되었습니다.' }));
    } catch {
      setErrors((prev) => ({ ...prev, email: '이미 가입된 이메일입니다.' }));
    }
  };
  // 2. 인증번호 확인
  const handleVerifyCode = async () => {
    if (!form.emailConfirm.trim()) {
      setErrors((prev) => ({
        ...prev,
        emailConfirm: '인증번호를 입력해주세요.',
      }));
      return;
    }
    try {
      const isValid = await authService.verifyCode(form.email, form.emailConfirm, 'SIGNUP');
      if (isValid) {
        setIsEmailVerified(true);
        setErrors((prev) => ({ ...prev, emailConfirm: '인증되었습니다.' }));
      } else {
        setErrors((prev) => ({ ...prev, emailConfirm: '인증번호가 일치하지 않습니다.' }));
      }
    } catch (error: any) {
      // 3. 서버 에러 처리 (409 에러 등)
      setIsEmailSent(false);

      if (error.response?.status === 409) {
        // 서버가 보내준 "이미 존재하는 이메일입니다." 메시지 사용
        const serverMsg = error.response?.data?.message || '이미 가입된 이메일입니다.';
        setErrors((prev) => ({ ...prev, email: serverMsg }));
      } else {
        setErrors((prev) => ({ ...prev, email: '인증번호 전송 중 오류가 발생했습니다.' }));
      }
    }
  };

  const handleJoin = async () => {
    // 1️.Zod 검증
    const result = joinSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        id: fieldErrors.id?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
        phoneNumber1: fieldErrors.phoneNumber1?.[0],
        phoneNumber2: fieldErrors.phoneNumber2?.[0],
        phoneNumber3: fieldErrors.phoneNumber3?.[0],
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

  const isJoinEnabled =
    // 필수값 입력 여부
    form.id.trim() !== '' &&
    form.password.trim() !== '' &&
    form.confirmPassword.trim() !== '' &&
    form.phoneNumber1.trim() !== '' &&
    form.phoneNumber2.trim() !== '' &&
    form.phoneNumber3.trim() !== '' &&
    form.email.trim() !== '' &&
    form.emailConfirm.trim() !== '' &&
    // 아이디 중복 확인
    isIdChecked &&
    isIdValid &&
    // 이메일 인증 완료
    isEmailVerified &&
    // 비밀번호 일치
    form.password === form.confirmPassword;
  return (
    <div className="text-white flex flex-col min-h-screen items-center gap-5 pb-32 ">
      <JoinHeader />
      {/* 아이디 입력 섹션 */}
      <section className="flex flex-col gap-2 w-full px-5">
        <span className="text-xs font-medium text-gray-300 px-1 mb-2">아이디</span>
        <div className="flex gap-2 items-center">
          <InputSection
            placeholder="아이디"
            width="w-[255px] h-11"
            value={form.id}
            onChange={(e) => {
              setIsIdChecked(false);
              setIsIdValid(false);
              setErrors((prev) => ({ ...prev, id: undefined }));
              setForm({ ...form, id: e.target.value });
            }}
          />
          <button
            className={`${isIdChecked && isIdValid ? 'bg-gray-700 text-gray-300 cursor-not-allowed' : 'bg-main-red-4  border border-main-red-1 cursor-pointer text-white'} px-4 h-11 rounded-sm text-sm font-medium whitespace-nowrap focus:none `}
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
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
              if (errors.password) setErrors({});
            }}
          />
          {errors.password && <p className="text-red-400 text-xs px-3">{errors.password}</p>}

          <InputSection
            placeholder="비밀번호 확인"
            type="password"
            width="w-[335px] h-[46px]"
            value={form.confirmPassword}
            onChange={(e) => {
              setForm({ ...form, confirmPassword: e.target.value });
              if (errors.confirmPassword) setErrors({});
            }}
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
        <div className="flex items-center gap-1 text-gray-300">
          <InputSection
            placeholder="전화번호"
            type="tel"
            maxlength={3}
            width="w-25 h-[46px]"
            value={form.phoneNumber1}
            onChange={(e) => {
              setIsIdChecked(false);
              setIsIdValid(false);
              setForm({ ...form, phoneNumber1: e.target.value });
              if (errors.phoneNumber1) setErrors({});
            }}
          />
          -
          <InputSection
            placeholder="앞자리 4자"
            type="tel"
            width="w-25 h-[46px]"
            maxlength={4}
            value={form.phoneNumber2}
            onChange={(e) => {
              setIsIdChecked(false);
              setIsIdValid(false);
              setForm({ ...form, phoneNumber2: e.target.value });
              if (errors.phoneNumber2) setErrors({});
            }}
          />
          -
          <InputSection
            placeholder="뒷자리 4자"
            type="tel"
            width="w-25 h-[46px]"
            maxlength={4}
            value={form.phoneNumber3}
            onChange={(e) => {
              setIsIdChecked(false);
              setIsIdValid(false);
              setForm({ ...form, phoneNumber3: e.target.value });
              if (errors.phoneNumber3) setErrors({});
            }}
          />
        </div>
        {errors.phoneNumber1 ||
          errors.phoneNumber2 ||
          (errors.phoneNumber3 && (
            <p className="text-red-400 text-xs px-3">{errors.phoneNumber1}</p>
          ))}
      </section>
      {/* 이메일 입력 섹션 */}
      <section className="flex flex-col gap-2 px-5 w-full">
        <span className="text-xs font-medium  text-gray-300">이메일</span>
        <div className="flex gap-2">
          <InputSection
            placeholder="이메일"
            width="w-[237px] h-11"
            value={form.email}
            disabled={isEmailVerified}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              setIsEmailSent(false); // 이메일 수정 시 상태 초기화
              setIsEmailVerified(false);
            }}
          />
          <button
            className={`${isEmailVerified ? 'bg-gray-700 text-gray-300 cursor-pointer' : 'bg-main-red-4  border border-main-red-1 cursor-pointer text-white'} w-24 px-2 h-11 rounded-sm text-sm font-medium whitespace-nowrap`}
            onClick={handleEmailCheck}
            disabled={isEmailVerified}
          >
            {isEmailSent ? '재전송 ' : '인증번호 전송'}
          </button>
        </div>
        {errors.email && <p className="text-red-400 text-xs px-3 mb-1">{errors.email}</p>}
        <div className="flex gap-2">
          <InputSection
            placeholder="인증번호"
            width="w-[237px] h-11"
            disabled={isEmailVerified}
            value={form.emailConfirm}
            onChange={(e) => {
              setForm({ ...form, emailConfirm: e.target.value });
            }}
          />
          <button
            className={`${
              isEmailVerified
                ? 'bg-gray-700 text-gray-300 border-gray-600 cursor-not-allowed'
                : isEmailSent
                  ? 'bg-main-red-4 border border-main-red-1 text-white cursor-pointer'
                  : 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
            } px-2 h-11 rounded-sm text-sm font-medium whitespace-nowrap w-24`}
            onClick={handleVerifyCode}
            disabled={isEmailVerified || !isEmailSent} // 인증 완료됐거나 발송 안됐으면 비활성화
          >
            {isEmailVerified ? '확인 완료' : '인증번호 확인'}
          </button>
        </div>
        {errors.emailConfirm && <p className="text-red-400 text-xs px-3">{errors.emailConfirm}</p>}
      </section>
      <div className="w-[375px] px-5 fixed bottom-5">
        <LinkButton onClick={handleJoin} disabled={!isJoinEnabled}>
          가입하기
        </LinkButton>
      </div>
    </div>
  );
}
