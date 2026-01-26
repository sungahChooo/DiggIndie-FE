
"use client";
export default function CalendarNotice() {
    return (
      <div
        className="w-[160px] h-[60px] flex flex-col justify-between p-2 bg-black font-normal
      text-[14px] text-white border-[1px] border-[#413D3D] rounded-[4px]"
      >
        <span>
          드래그로 다중 선택
        </span>
        <span>
          선택 해제 하려면 클릭
        </span>
    </div>
  );
}
