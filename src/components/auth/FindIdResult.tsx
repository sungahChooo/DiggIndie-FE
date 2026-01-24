export default function FindIdResult() {
  const id = sessionStorage.getItem('FOUND_USER_ID');
  const createdAt = sessionStorage.getItem('SIGNUP_DATE');
  return (
    <div className="w-full flex flex-col items-center gap-4 px-5 mt-7">
      {/* 아이디 박스 */}
      <div
        className="w-full h-21 bg-gray-900 rounded-sm border-1 border-gray-800 shadow-sm
                      px-4 flex flex-col justify-center"
      >
        <p className="text-white text-base text-[14px] font-medium">아이디 : {id}</p>

        <p className="text-white text-base text-[14px] font-medium mt-2">가입일 : {createdAt}</p>
      </div>

      {/* 안내 문구 */}
      <p className="text-white text-xs text-center">이메일 정보와 일치하는 아이디입니다.</p>
    </div>
  );
}
