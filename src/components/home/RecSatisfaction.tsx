
"use client";

import { postRecSatisfaction } from "@/api/artists";

type Props =
  | { mode: "down"; onSubmitted: () => void }
  | { mode: "up"; onSubmitted: () => void };

type DownReason =
  | "ALREADY_KNOWN"
  | "NOT_MY_TASTE"
  | "KEYWORD_MISMATCH"
  | "GENRE_FINE_TRACK_NOT_MY_TASTE"
  | "BORED"
  | "OTHER";

type UpReason = "PERFECT_MATCH" | "NEW_DISCOVERY";

export default function RecSatisfaction({ mode, onSubmitted }: Props) {
  const handleClick = async (reason: DownReason | UpReason) => {
    try {
      const res = await postRecSatisfaction({
        isSatisfied: mode === "up",
        reason,
      });

      if (res.isSuccess) {
        onSubmitted();
        return;
      }

      alert(res.message || "만족도 전달에 실패했습니다.");
    } catch (err) {
      console.error(err);
      alert("만족도 전달에 실패했습니다.");
    }
  };

  if (mode === "up") {
    return (
      <div
        className="w-[235px] h-[80px] flex flex-col justify-between p-2 bg-black font-normal
      text-[14px] text-white border-[1px] border-[#413D3D] rounded-[4px]"
      >
        <button
          className="flex w-full pl-2 py-1 cursor-pointer"
          onClick={() => handleClick("PERFECT_MATCH")}
          type="button"
        >
          <span>취향에 딱 맞아요</span>
        </button>

        <button
          className="flex w-full pl-2 py-1 cursor-pointer"
          onClick={() => handleClick("NEW_DISCOVERY")}
          type="button"
        >
          <span>새로운 발견이 가능했어요</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className="w-[235px] h-[188px] flex flex-col justify-between p-2 bg-black font-normal
      text-[14px] text-white border-[1px] border-[#413D3D] rounded-[4px]"
    >
      <button
        className="flex w-full pl-2 py-1 cursor-pointer"
        onClick={() => handleClick("ALREADY_KNOWN")}
        type="button"
      >
        <span>이미 알고 있는 아티스트예요</span>
      </button>

      <button
        className="flex w-full pl-2 py-1 cursor-pointer"
        onClick={() => handleClick("NOT_MY_TASTE")}
        type="button"
      >
        <span>취향과 상관 없는 음악 같아요</span>
      </button>

      <button
        className="flex w-full pl-2 py-1 cursor-pointer"
        onClick={() => handleClick("KEYWORD_MISMATCH")}
        type="button"
      >
        <span>키워드와 실제 음악이 매칭되지 않아요</span>
      </button>

      <button
        className="flex w-full pl-2 py-1 cursor-pointer"
        onClick={() => handleClick("GENRE_FINE_TRACK_NOT_MY_TASTE")}
        type="button"
      >
        <span>장르는 맞지만 노래가 취향이 아니예요</span>
      </button>

      <button
        className="flex w-full pl-2 py-1 cursor-pointer"
        onClick={() => handleClick("BORED")}
        type="button"
      >
        <span>비슷한 스타일만 나와 지루해요</span>
      </button>

      <button
        className="flex w-full pl-2 py-1 cursor-pointer"
        onClick={() => handleClick("OTHER")}
        type="button"
      >
        <span>기타</span>
      </button>
    </div>
  );
}
