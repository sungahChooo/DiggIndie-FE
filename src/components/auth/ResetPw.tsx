'use client';

import React, { useState } from 'react';
import { authService } from '@/services/authService';
import { usePasswordResetStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

export default function ResetPw() {
  const { email, resetToken, clearResetInfo } = usePasswordResetStore();
  const router = useRouter();
  const [form, setForm] = useState({
    pw: '',
    pwConfirm: '',
  });
  const handleResetPassword = async () => {
    if (!form.pw || form.pw !== form.pwConfirm) {
      alert('비밀번호가 일치하지 않거나 입력되지 않았습니다.');
      return;
    }

    // 이메일이나 토큰이 없으면 비정상적인 접근
    if (!email || !resetToken) {
      alert('인증 정보가 없습니다. 다시 인증해주세요.');
      router.push('/auth/find/pw');
      return;
    }

    try {
      const reqBody = {
        email: email, // 스토어에서 가져온 값
        resetToken: resetToken, // 스토어에서 가져온 값
        newPassword: form.pw,
      };

      await authService.resetPw(email, resetToken, form.pw);
      clearResetInfo(); // 성공 시 정보 삭제
      router.push('/auth/find/pw/reset/result');
    } catch (error) {
      alert('비밀번호 재설정 실패');
    }
  };
  return (
    <div className="w-[375px] bg-black flex flex-col items-center px-[20px] py-6 gap-3">
      <div className="w-full flex items-end gap-3">
        <div className="flex-1">
          <input
            type="password"
            value={form.pw}
            placeholder="새로운 비밀번호 재설정"
            className="w-full bg-transparent text-[#8C8787] placeholder:text-[#736F6F]
                       px-4 border-b border-[#4A4747] pb-1
                       focus:outline-none focus:border-white focus:text-white"
            onChange={(e) => setForm({ ...form, pw: e.target.value })}
          />
        </div>
        {/* <button className="w-[87px] h-[33px] rounded-[4px] bg-[#4B4747] text-[#BEBABA] text-[12px] font-medium cursor-pointer">
          확인
        </button> */}
      </div>

      <div className="w-full flex items-end gap-3">
        <div className="flex-1">
          <input
            value={form.pwConfirm}
            type="password"
            placeholder="새로운 비밀번호 확인"
            className="w-full bg-transparent text-[#8C8787] placeholder:text-[#736F6F]
                       px-4 border-b border-[#4A4747] pb-1
                       focus:outline-none focus:border-white focus:text-white"
            onChange={(e) => setForm({ ...form, pwConfirm: e.target.value })}
          />
        </div>
        {/* <button className="w-[87px] h-[33px] rounded-[4px] bg-[#4B4747] text-[#BEBABA] text-[12px] font-medium cursor-pointer">
          확인
        </button> */}
      </div>

      {/* 아이디 찾기 빨간 버튼 */}
      <button
        className="w-[335px] h-[52px] mt-[20px] rounded-[4px] bg-[#FF3637] text-white font-semibold cursor-pointer"
        onClick={handleResetPassword}
      >
        비밀번호 재설정
      </button>
    </div>
  );
}
