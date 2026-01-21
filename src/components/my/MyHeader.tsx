'use client';
import Image from 'next/image';
import backIcon from '@/assets/onBoard/arrow.svg';
import { useRouter } from 'next/navigation';

type props = {
  title: string;
  backUrl?: string;
};

export default function MyHeader({ title, backUrl }: props) {
  const router = useRouter();
  return (
    <div className="bg-black w-full flex items-center px-5 py-3 justify-center absolute top-0 z-50 bg-transparent h-14">
      <Image
        src={backIcon}
        alt="이전"
        width={24}
        height={24}
        onClick={() => {
          if (backUrl)
            router.push(backUrl); // backUrl이 있으면 이동
          else router.back(); // 없으면 브라우저 히스토리 뒤로
        }}
        className="cursor-pointer absolute left-5"
      />
      <span className="text-base font-semibold">{title}</span>
    </div>
  );
}
