'use client';
import { useRouter } from 'next/navigation';

export default function MyPage() {
  const router = useRouter();
  return (
    <div className="text-white flex flex-col h-screen">
      <h1>임시 마이페이지 입니다</h1>
      <div className="px-5 py-3" onClick={() => router.push('/auth/login')}>
        로그인 하고 디긴디하기
      </div>
    </div>
  );
}
