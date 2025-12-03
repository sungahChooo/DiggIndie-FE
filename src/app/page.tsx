'use client';
import SideTab from '@/components/sideTabDir/SideTab';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="text-center">
        <Link href="onboard/artist">온보딩 페이지로 이동</Link>
        <div onClick={() => setIsSideTabOpen(true)}>사이드탭 보이기</div>
      </div>
      {isSideTabOpen && <SideTab />}
    </div>
  );
}
