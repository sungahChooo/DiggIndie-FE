"use client";

import React from "react";
import Link from 'next/link';

export default function FindId() {
  return (
    <div className="w-[375px] bg-black flex flex-col items-center px-[20px] py-6 gap-3">
      {/* 이메일 입력, 인증정보 */}
      <div className="w-[335px] flex items-end gap-3">
        <div className="flex-1">
          <input type="email" placeholder="아이디 입력" className="w-full bg-transparent text-[#8C8787] text-[16px]
             placeholder:text-[#736F6F] px-4 border-b-[1px] border-[#4A4747] pb-1 focus:outline-none focus:border-white focus:text-white"
          />
        </div>
        <button className="w-[87px] h-[33px] rounded-[4px] bg-[#4B4747] text-[#BEBABA] text-[12px] font-medium cursor-pointer">
          확인
        </button>
      </div>

      {/* 이메일 입력 */}
      <div className="w-[335px] flex items-end gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="이메일 입력"
            className="w-full bg-transparent  px-4 text-[#8C8787] placeholder:text-[#736F6F] border-b-[1px] border-[#4A4747] pb-1
                       focus:outline-none focus:border-white focus:text-white"
          />
        </div>
        <button className="w-[87px] h-[33px] rounded-[4px] bg-[#4B4747] text-[#BEBABA] text-[12px] font-medium cursor-pointer">
          인증번호 전송
        </button>
      </div>

      <div className="w-[335px] flex items-end gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="인증번호 입력"
            className="w-full bg-transparent  px-4 text-[#8C8787] placeholder:text-[#736F6F] border-b-[1px] border-[#4A4747] pb-1
                       focus:outline-none focus:border-white focus:text-white"
          />
        </div>
        <button className="w-[87px] h-[33px] rounded-[4px] bg-[#4B4747] text-[#D0CBCB] text-[12px] font-medium cursor-pointer">
          확인
        </button>
      </div>

      {/* 아이디 찾기 빨간 버튼 */}
      <Link href="/auth/find/pw/reset">
        <button className="w-[335px] h-[52px] mt-4 rounded-[4px] bg-[#FF3637] text-white text-base font-semibold cursor-pointer">
          인증 확인
        </button>
      </Link>
    </div>
  );
}
