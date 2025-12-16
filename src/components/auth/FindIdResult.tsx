export default function FindIdResult() {
  return (
    <div className="w-[375px] flex flex-col items-center gap-4 px-[20px] mt-[28px]">
      {/* 아이디 박스 */}
      <div className="w-[337px] h-[84px] bg-[#1F1D1D] rounded-[4px] border-[1px] border-[#413D3D] shadow-sm
                      px-4 flex flex-col justify-center">

        <p className="text-white text-base text-[14px] font-medium">
          아이디 : 텍스트텍스트텍스트텍스트텍스트
        </p>

        <p className="text-white text-base text-[14px] font-medium mt-2">
          가입일 : 0000. 00. 00
        </p>
      </div>

      {/* 안내 문구 */}
      <p className="text-white text-[12px] text-center">
        이메일 정보와 일치하는 아이디입니다.
      </p>
    </div>
  );
}
