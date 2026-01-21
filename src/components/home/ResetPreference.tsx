"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import next from "@/assets/common/more.svg";
import thumbsUpBtn from "@/assets/icons/thumbsUp.svg";
import thumbsDownBtn from "@/assets/icons/thumbsDown.svg";
import thumbsUpRedBtn from "@/assets/icons/thumbsUpRed.svg";
import thumbsDownRedBtn from "@/assets/icons/thumbsDownRed.svg";

type Props = {
  isLoggedIn: boolean;
};

type Vote = "up" | "down" | null;

export default function ResetPreference({ isLoggedIn }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<Vote>(null);

  if (!isLoggedIn) return null;

  const getUpIcon = () => {
    if (selected === "up") return thumbsUpRedBtn;
    return thumbsUpBtn;
  };

  const getDownIcon = () => {
    if (selected === "down") return thumbsDownRedBtn;
    return thumbsDownBtn;
  };

  return (
    <div className="flex flex-col w-full px-5 min-w-0 items-center justify-center">

      {/* 취향 재설정 버튼 */}
      <div
        className="flex w-full bg-[#FF3637] mt-10 px-3 py-3 items-center cursor-pointer min-w-0 rounded-[4px]"
        onClick={() => router.push("/onboard/artist")}
      >
        <div className="min-w-0 text-4 text-center">
          <span className="block truncate">취향 재설정 하러 가기</span>
        </div>

        <div className="ml-1 shrink-0 flex items-center mr-auto">
          <Image src={next} alt="next" width={16} height={16} />
        </div>
      </div>

      {/* 만족도 영역 */}
      <div className="flex w-full bg-black mt-2 min-w-0 gap-2">
        <span className="min-w-0 flex-1 text-[#736F6F] text-[14px] font-medium truncate">
          추천 결과가 마음에 드시나요?
        </span>

        <div
          className="flex px-4 py-2 gap-3 justify-center items-center border-gray-800 border-1
            bg-[#1F1D1D] border-[#413D3D] border-0.25 rounded-[20px] h-[40px] shrink-0"
        >
          <button
            type="button"
            onClick={() => setSelected(selected === "up" ? null : "up")}
            className="flex items-center justify-center"
          >
            <Image src={getUpIcon()} alt="thumbs up" width={24} height={24} />
          </button>

          <button
            type="button"
            onClick={() => setSelected(selected === "down" ? null : "down")}
            className="flex items-center justify-center"
          >
            <Image src={getDownIcon()} alt="thumbs down" width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
