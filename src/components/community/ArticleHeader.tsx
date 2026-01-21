'use client';

import Image from 'next/image';
import backBtn from '@/assets/common/back.svg';
import { useRouter } from 'next/navigation';

interface ArticleHeaderProps {
  title: string;
}
export default function ArticleHeader({ title }: ArticleHeaderProps) {
  const router = useRouter();

  return (
    <div className="w-full flex items-center px-5 py-[10px] justify-start gap-3 text-white h-11 absolute z-10 bg-transparent">
      <Image
        src={backBtn}
        alt="back"
        width={24}
        height={24}
        onClick={() => router.back()}
        className="cursor-pointer absolute left-[16px] flex items-center"
      />

      <span className="font-semibold text-base absolute left-1/2 -translate-x-1/2">{title}</span>
    </div>
  );
}
