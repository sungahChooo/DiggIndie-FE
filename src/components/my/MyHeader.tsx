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
    <div className="w-full flex items-center px-5 py-3 justify-between bg-transparent absolute top-0 z-50">
      <Image
        src={backIcon}
        alt="이전"
        width={24}
        height={24}
        onClick={() => (backUrl ? router.push(backUrl) : router.back())}
        className="cursor-pointer aboslute left-5"
      />
      <span className="mx-auto text-base font-semibold">{title}</span>
    </div>
  );
}
