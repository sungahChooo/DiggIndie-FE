import goBack from '@/assets/onBoard/arrow.svg';
import Image from 'next/image';
import Link from 'next/link';

interface OnBoardHeaderProps {
  href?: string; // 이동할 주소 (기본값 '/')
}

export default function OnBoardHeader({ href = '/' }: OnBoardHeaderProps) {
  return (
    <header className="w-full flex items-start bg-transparent px-5 py-3">
      <Link href={href}>
        <Image src={goBack} alt="DiggIndie Logo" className="h-6 w-6" />
      </Link>
    </header>
  );
}
