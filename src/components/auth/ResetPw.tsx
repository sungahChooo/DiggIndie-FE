'use client';

import React from 'react';
import Link from 'next/link';

export default function ResetPw() {
  return (
    <div className="w-[375px] bg-black flex flex-col items-center px-[20px] py-6 gap-3">
      <div className="w-full flex items-end gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="새로운 비밀번호 재설정"
            className="w-full bg-transparent text-[#8C8787] placeholder:text-[#736F6F]
                       px-4 border-b border-[#4A4747] pb-1
                       focus:outline-none focus:border-white focus:text-white"
          />
        </div>
        <button className="w-[87px] h-[33px] rounded-[4px] bg-[#4B4747] text-[#BEBABA] text-[12px] font-medium cursor-pointer">
          확인
        </button>
      </div>

      <div className="w-full flex items-end gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="새로운 비밀번호 확인"
            className="w-full bg-transparent text-[#8C8787] placeholder:text-[#736F6F]
                       px-4 border-b border-[#4A4747] pb-1
                       focus:outline-none focus:border-white focus:text-white"
          />
        </div>
        <button className="w-[87px] h-[33px] rounded-[4px] bg-[#4B4747] text-[#BEBABA] text-[12px] font-medium cursor-pointer">
          확인
        </button>
      </div>

      {/* 아이디 찾기 빨간 버튼 */}
      <Link href="/auth/find/pw/reset/result">
        <button className="w-[335px] h-[52px] mt-[20px] rounded-[4px] bg-[#FF3637] text-white font-semibold cursor-pointer">
          비밀번호 재설정
        </button>
      </Link>
    </div>
  );
}
