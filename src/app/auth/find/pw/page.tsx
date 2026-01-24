'use client';

import AuthFindHeader from '@/components/auth/AuthFindHeader';
import FindPw from '@/components/auth/FindPw';

export default function FindPwPage() {
  return (
    <div className="text-white flex flex-col h-screen bg-black">
      <AuthFindHeader title={'비밀번호 재설정'} />
      <FindPw />
    </div>
  );
}
