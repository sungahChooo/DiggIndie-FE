import { useFindIdStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FindIdResult() {
  const router = useRouter();
  const result = useFindIdStore((state) => state.result);
  const clearResult = useFindIdStore((state) => state.clearResult);
  useEffect(() => {
    // 만약 결과 데이터 없이 이 페이지에 직접 접속했다면 이전 페이지로 돌려보냄
    if (!result) {
      router.replace('/auth/find/id');
    }

    // 페이지를 떠날 때 데이터를 지우고 싶다면 언마운트 시점에 clearResult 호출
    // return () => clearResult();
  }, [result, router, clearResult]);

  if (!result) return null;
  return (
    <div className="w-full flex flex-col items-center gap-4 px-5 mt-7">
      {/* 아이디 박스 */}
      <div
        className="w-full h-21 bg-gray-900 rounded-sm border-1 border-gray-800 shadow-sm
                      px-4 flex flex-col justify-center"
      >
        <p className="text-white text-base text-[14px] font-medium">아이디 : {result.userId}</p>

        <p className="text-white text-base text-[14px] font-medium mt-2">
          가입일 : {result.createdAt}
        </p>
      </div>

      {/* 안내 문구 */}
      <p className="text-white text-xs text-center">이메일 정보와 일치하는 아이디입니다.</p>
      <a
        className="w-full h-14 mt-4 rounded-sm bg-main-red-2 text-white text-base font-semibold cursor-pointer text-center p-4"
        href="/auth/login"
      >
        로그인 페이지 가기
      </a>
    </div>
  );
}
