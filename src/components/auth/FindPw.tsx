'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';

export default function FindPw() {
  const router = useRouter();
  const [newPw, setNewPw] = useState('');
  const [confirmNewPw, setConfirmNewPw] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false); // 인증번호 전송 버튼 클릭 여부
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 인증번호 확인 성공 여부
  const [form, setForm] = useState({
    id: '',
    email: '',
    emailConfirm: '',
    pw: '',
    pwConfrim: '',
  });
  const [errors, setErrors] = useState<{
    id?: string;
    email?: string;
    emailConfirm?: string;
    pw?: string;
    pwConfirm?: string;
  }>({});

  // 1. 이메일 중복 체크 및 인증번호 전송
  const handleEmailCheck = async () => {
    try {
      // API: 이메일 중복 체크 및 전송 (서버에서 중복이면 에러를 던진다고 가정)
      await authService.checkEmail(form.email, 'PASSWORD_RESET');
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
        'PASSWORD_RESET',
        form.pw
      );
      if (isValid) {
        setIsEmailVerified(true);
        setErrors((prev) => ({ ...prev, emailConfirm: '인증되었습니다.' }));
      } else {
        setErrors((prev) => ({ ...prev, emailConfirm: '인증번호가 일치하지 않습니다.' }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, emailConfirm: '가' }));
    }
  };
  return (
    <div className="w-full bg-black flex flex-col items-center px-5 py-6 gap-3">
      {/* 아이디 입력, 인증정보 api 수정 후 수정 예정*/}
      <div className="w-[335px] flex items-end gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="아이디 입력"
            className="w-full bg-transparent text-[#8C8787] text-[16px]
             placeholder:text-[#736F6F] px-4 border-b-[1px] border-[#4A4747] pb-1 focus:outline-none focus:border-white focus:text-white"
          />
        </div>
        <button className="w-[87px] h-[33px] rounded-[4px] bg-[#4B4747] text-[#BEBABA] text-[12px] font-medium cursor-pointer">
          확인
        </button>
      </div>

      {/* 이메일 입력 */}
      <div className="flex flex-col gap-2">
        <div className="w-[335px] flex items-end gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={form.email}
              placeholder="이메일 입력"
              className="w-full bg-transparent  px-4 text-[#8C8787] placeholder:text-[#736F6F] border-b-[1px] border-[#4A4747] pb-1
                       focus:outline-none focus:border-white focus:text-white"
              onChange={(e) => {
                setIsEmailSent(false);
                setIsEmailVerified(false);
                setForm({ ...form, email: e.target.value });
              }}
            />
          </div>
          <button
            className="w-22 py-2 rounded-sm bg-main-red-2 border border-main-red-1 text-white text-xs font-medium cursor-pointer"
            onClick={handleEmailCheck}
          >
            인증번호 전송
          </button>
        </div>
        {errors.email && <p className="text-red-400 text-xs px-3">{errors.email}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-[335px] flex items-end gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="인증번호 입력"
              value={form.emailConfirm}
              className="w-full bg-transparent  px-4 text-[#8C8787] placeholder:text-[#736F6F] border-b-[1px] border-[#4A4747] pb-1
                       focus:outline-none focus:border-white focus:text-white"
              onChange={(e) => {
                setIsEmailVerified(false);
                setForm({ ...form, emailConfirm: e.target.value });
              }}
            />
          </div>
          <button
            className="px-3 py-2  w-22 h-[33px] rounded-sm bg-main-red-2 border-2 border-main-red-1 text-white text-xs font-medium cursor-pointer"
            onClick={handleVerifyCode}
          >
            확인
          </button>
        </div>
        {errors.emailConfirm && <p className="text-red-400 text-xs px-3">{errors.emailConfirm}</p>}
      </div>

      {isEmailSent && (
        <>
          <div className="w-full flex items-end gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={form.pw}
                placeholder="새로운 비밀번호 재설정"
                className="w-full bg-transparent text-[#8C8787] placeholder:text-[#736F6F]
                       px-4 border-b border-[#4A4747] pb-1
                       focus:outline-none focus:border-white focus:text-white"
                onChange={(e) => setForm({ ...form, pw: e.target.value })}
              />
            </div>
            <button className="w-[87px] h-[33px] rounded-sm bg-main-red-2 border border-main-red-1 text-white text-xs font-medium cursor-pointer">
              확인
            </button>
          </div>

          <div className="w-full flex items-end gap-3">
            <div className="flex-1">
              <input
                value={form.pwConfrim}
                type="text"
                placeholder="새로운 비밀번호 확인"
                className="w-full bg-transparent text-[#8C8787] placeholder:text-[#736F6F]
                       px-4 border-b border-[#4A4747] pb-1
                       focus:outline-none focus:border-white focus:text-white"
                onChange={(e) => setForm({ ...form, pwConfrim: e.target.value })}
              />
            </div>
            <button className="w-22 py-2 rounded-sm bg-main-red-2 border border-main-red-1 text-white text-xs font-medium cursor-pointer">
              확인
            </button>
          </div>
        </>
      )}
      {/* 아이디 찾기 빨간 버튼 */}
      <button
        className={`${!isEmailSent || !isEmailVerified ? 'bg-gray-600 cursor-not-allowed' : 'bg-main-red-2 cursor-pointer'} min w-[335px] h-13 mt-4 rounded-sm text-white text-base font-semibold`}
        disabled={!isEmailSent || !isEmailVerified}
        onClick={() => router.push('/auth/find/pw/reset/result')}
      >
        인증 확인
      </button>
    </div>
  );
}
