'use client';

import React from 'react';
export default function FindPwResult() {
  return (
    <div className="w-full bg-black flex flex-col text-base items-center px-5 mt-14">
      <span className="mb-15">비밀번호 재설정이 완료되었습니다</span>
      <a
        className="w-[335px] h-14 mt-4 rounded-sm bg-main-red-2 text-white text-base font-semibold cursor-pointer text-center p-4"
        href="/auth/login"
      >
        로그인 페이지 가기
      </a>
    </div>
  );
}
