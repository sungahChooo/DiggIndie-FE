'use client';

import AuthFindHeader from '@/components/auth/AuthFindHeader';
import FindIdResult from '@/components/auth/FindIdResult';

export default function FindIdResultPage() {
  return (
    <div className="text-white flex flex-col h-screen bg-black">
      <div className="flex flex-col">
        <div className={'sticky top-0 z-5'}>
          <AuthFindHeader title={'아이디 찾기'} />
        </div>
        <div className="h-[calc(100vh-100px)] overflow-y-auto bg-black">
          <FindIdResult />
        </div>
      </div>
    </div>
  );
}
