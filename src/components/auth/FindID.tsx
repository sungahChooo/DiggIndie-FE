'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { authService } from '@/services/authService';

export default function FindId() {
  const [form, setForm] = useState({
    email: '',
    emailConfirm: '',
  });
  const [errors, setErrors] = useState<{
    email?: string;
    emailConfirm?: string;
  }>({});
  const [isEmailSent, setIsEmailSent] = useState(false); // 인증번호 전송 버튼 클릭 여부
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 인증번호 확인 성공 여부

  // 1. 이메일 중복 체크 및 인증번호 전송
  const handleEmailCheck = async () => {
    try {
      // API: 이메일 중복 체크 및 전송 (서버에서 중복이면 에러를 던진다고 가정)
      await authService.checkEmail(form.email, 'FIND_USER_ID');
      setIsEmailSent(true);
      setErrors((prev) => ({ ...prev, email: '인증번호가 전송되었습니다.' }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, email: '가입되지 않은 이메일입니다.' }));
    }
  };

  // 2. 인증번호 확인
  const handleVerifyCode = async () => {
    try {
      const isValid = await authService.verifyCode(
        form.email,
        form.emailConfirm,
        'FIND_USER_ID',
        'stringst'
      );
      if (isValid) {
        setIsEmailVerified(true);
        setErrors((prev) => ({ ...prev, emailConfirm: '인증되었습니다.' }));
        sessionStorage.setItem('FOUND_USER_ID', isValid.userId);
        sessionStorage.setItem('SIGNUP_DATE', isValid.createdAt);
      } else {
        setErrors((prev) => ({ ...prev, emailConfirm: '인증번호가 일치하지 않습니다.' }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, emailConfirm: '인증 확인 중 오류가 발생했습니다.' }));
    }
  };
  return (
    <div className="w-full bg-black flex flex-col items-center px-5 py-6 gap-3">
      {/* 이메일 입력, 인증정보 */}
      <div className="flex flex-col gap-2">
        <div className="w-[335px] flex items-end gap-[10px]">
          <div className="flex-1">
            <input
              type="email"
              placeholder="이메일 입력"
              className="w-full bg-transparent text-[#8C8787] text-base text-white
           px-4 placeholder:text-[#736F6F] border-b-[1px] border-[#4A4747] pb-1 focus:outline-none"
              onChange={(e) => {
                setIsEmailSent(false);
                setIsEmailVerified(false);
                setForm({ ...form, email: e.target.value });
                //if (errors.id) setErrors({});
              }}
            />
          </div>
          <button
            className="w-[87px] h-[33px] rounded-[4px] bg-[#4B4747] text-[#BEBABA] text-[12px] font-medium cursor-pointer"
            onClick={handleEmailCheck}
          >
            인증번호 전송
          </button>
        </div>
        {errors.email && <p className="text-red-400 text-xs px-3">{errors.email}</p>}
      </div>
      {/* 인증번호 입력 */}
      <div className="flex flex-col gap-2">
        <div className="w-[335px] flex items-end gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="인증번호 입력"
              className="w-full bg-transparent text-[#8C8787] placeholder:text-[#736F6F] px-4
                       border-b-1 border-[#4A4747] pb-1 text-white"
              onChange={(e) => {
                setIsEmailSent(false);
                setIsEmailVerified(false);
                setForm({ ...form, emailConfirm: e.target.value });
                //if (errors.id) setErrors({});
              }}
            />
          </div>
          <button
            className="w-[87px] h-[33px] rounded-[4px] bg-[#4B4747] text-[#BEBABA] text-[12px] font-medium cursor-pointer"
            onClick={handleVerifyCode}
          >
            확인
          </button>
        </div>
        {errors.emailConfirm && <p className="text-red-400 text-xs px-3">{errors.emailConfirm}</p>}
      </div>
      {/* 아이디 찾기 빨간 버튼 */}
      <Link href="/auth/find/id/result">
        <button
          className={`${!isEmailVerified ? 'cursor-not allowed bg-gray-600' : 'bg-main-red-2 cursor-pointer'} w-[335px] h-13 mt-5 rounded-sm  text-white font-semibold `}
          disabled={!isEmailVerified}
        >
          아이디 찾기
        </button>
      </Link>
    </div>
  );
}
