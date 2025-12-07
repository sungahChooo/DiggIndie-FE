'use client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="text-white flex flex-col h-screen">
      <h1>로그인 페이지입니다</h1>
      <div className="px-5 py-3" onClick={() => router.push('/')}>
        로그인
      </div>
    </div>
  );
}
