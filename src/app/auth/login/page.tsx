'use client';
import Image from 'next/image';
import diggindie from '@/assets/common/diggindie.svg';
import LinkButton from '@/components/common/LinkButton';
import InputSection from '@/components/auth/InputSection';
import { useRouter } from 'next/navigation';
import googleIcon from '@/assets/auth/google.svg';
import naverIcon from '@/assets/auth/naver.svg';
import kakaoIcon from '@/assets/auth/kakao.svg';
import { useState } from 'react';
import { loginSchema } from '@/lib/auth';
import MyHeader from '@/components/my/MyHeader';
import { authService } from '@/services/authService';
import recentLogin from '@/assets/auth/recentLogin.svg';

export default function LoginPage() {
  const router = useRouter();

  //최근 로그인 아이콘 띄우기
  const [recentPlatform] = useState<string | null>(() => {
    // 브라우저 환경(window 객체 존재 여부) 확인 후 값 가져오기
    if (typeof window !== 'undefined') {
      return localStorage.getItem('recent_provider');
    }
    return null;
  });

  const [form, setForm] = useState({
    id: '',
    password: '',
  });
  const [errors, setErrors] = useState<{
    id?: string;
    password?: string;
  }>({});

  const handleLogin = async () => {
    setErrors({});

    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      // 1. ID가 없거나 형식이 틀린 경우 ID 에러만 먼저 보여줌
      if (fieldErrors.id) {
        setErrors({ id: fieldErrors.id[0] });
        return; // 여기서 멈춤
      }

      // 2. ID는 통과했는데 비밀번호 에러가 있는 경우
      if (fieldErrors.password) {
        setErrors({ password: fieldErrors.password[0] });
        return; // 여기서 멈춤
      }
    }

    // API 요청 보내기
    try {
      await authService.login(form.id, form.password);
      router.push('/');
    } catch (err) {
      setErrors({
        password: '아이디 또는 비밀번호가 잘못 되었습니다.',
      });
    }
  };
  const handleSocialLogin = async (platform: 'GOOGLE' | 'NAVER' | 'KAKAO') => {
    const { authUrl } = await authService.getAuthURL(platform);
    window.location.href = authUrl;
  };
  return (
    <div className="text-white flex flex-col h-screen items-center relative">
      <MyHeader title="로그인" backUrl="/" />
      <Image src={diggindie} alt="diggindie icon" width={235} className="mt-35" />
      <section className="flex flex-col gap-3 mt-17">
        <InputSection
          placeholder="아이디를 입력해주세요."
          width="w-[335px] h-[52px]"
          value={form.id}
          onChange={(e) => {
            setForm({ ...form, id: e.target.value });
            if (errors.id) setErrors({});
          }}
        />
        <InputSection
          placeholder="비밀번호를 입력해주세요."
          width="w-[335px] h-[52px]"
          type="password"
          value={form.password}
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
            if (errors.password) setErrors({});
          }}
        />

        {errors.id && <p className="text-red-400 text-xs">{errors.id}</p>}
        {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
        <LinkButton onClick={handleLogin} disabled={false}>
          로그인
        </LinkButton>
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
      <section className="mt-10 flex flex-col w-full">
        <div className="flex gap-1 w-full items-center">
          <div className="flex-1 border-t border-gray-300" />
          <span className="text-gray-300 text-xs">SNS 계정으로 로그인</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        {/* 소셜 로그인 버튼 영역 */}
        <div className="flex flex-col justify-center items-center relative">
          <div className="flex gap-4 justify-center">
            {/* 구글 */}
            <div className="flex flex-col items-center relative">
              <Image
                src={googleIcon}
                alt="google login"
                width={58}
                height={58}
                className="mt-5 cursor-pointer"
                onClick={() => handleSocialLogin('GOOGLE')}
              />
              {recentPlatform === 'GOOGLE' && (
                <div className="absolute -bottom-8 animate-bounce">
                  <Image src={recentLogin} alt="최근 로그인" />
                </div>
              )}
            </div>

            {/* 네이버 */}
            <div className="flex flex-col items-center relative">
              <Image
                src={naverIcon}
                alt="naver login"
                width={58}
                height={58}
                className="mt-5 cursor-pointer"
                onClick={() => handleSocialLogin('NAVER')}
              />
              {recentPlatform === 'NAVER' && (
                <div className="absolute -bottom-8 animate-bounce">
                  <Image src={recentLogin} alt="최근 로그인" />
                </div>
              )}
            </div>

            {/* 카카오 */}
            <div className="flex flex-col items-center relative">
              <Image
                src={kakaoIcon}
                alt="kakao login"
                width={58}
                height={58}
                className="mt-5 cursor-pointer"
                onClick={() => handleSocialLogin('KAKAO')}
              />
              {recentPlatform === 'KAKAO' && (
                <div className="absolute -bottom-8 animate-bounce">
                  <Image src={recentLogin} alt="최근 로그인" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
