'use client';

import AuthFindHeader from '@/components/auth/AuthFindHeader';
import FindID from '@/components/auth/FindID';

export default function FindIDPage() {
  return (
    <div className="text-white flex flex-col min-h-dvh bg-black">
      <AuthFindHeader title={'아이디 찾기'} />
      <FindID />
    </div>
  );
}
