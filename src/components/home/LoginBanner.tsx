import Image from "next/image";
import logo from "../../assets/icons/logo.svg"
import search from "../../assets/icons/search.svg"
import hamburger from "../../assets/icons/hamburger.svg"
import close from "../../assets/icons/close.svg"

import Link from "next/link";

export default function LoginBanner() {


  return (
    <div className="w-[335px] h-[166px] flex flex-col bg-gray-700 rounded-[4px]">
      <div className="w-[311px] h-[18px] mx-[12px] flex mt-[12px] mb-[20px] bg-red-200">
        <Image src={logo} alt="logo" width={67.94} height={14} className={"mr-auto"}/>
        <Image src={close} alt="logo" width={18} height={18}/>
      </div>
      <div className="h-[104px] flex flex-col mx-[12px]">
        <span className={"text-[18px] font-semibold mb-[4px]"}>
          로그인하여 당신만의 디깅을 시작하세요
        </span>
        <span className={"text-[12px] text-gray-300 mb-[16px]"}>
          리스너님을 위한 아티스트와 공연 추천이 시작됩니다.
        </span>
        <div className={"flex w-[248px] h-[36px] text-[12px] gap-[8px]"}>
          <Link href="/auth" className={"w-[121px] bg-[#ff3637] rounded-[4px] flex items-center justify-center"}>
            로그인 하러 가기
          </Link>
          <div className={"w-[121px] border-[1px] border-gray-300 rounded-[4px] flex items-center justify-center"}>
            이 상태로 보기
          </div>
        </div>
      </div>
    </div>
  );
}
