'use client';
//공연 상세에서 새 창열어 페이지 이동을 위한 버튼 컴포넌트
import Link from 'next/link';

interface ButtonProps {
  disabled?: boolean;
  href: string | null;
  isFinished: boolean;
  children: React.ReactNode; // 버튼 텍스트
  onClick?: () => void;
}

export default function Button({ disabled, href, isFinished, children }: ButtonProps) {
  const isDisabled = disabled || !href || isFinished;
  return (
    <Link
      href={isDisabled ? '#' : href}
      className={`block p-4 h-13 w-full font-semibold text-center rounded-sm ${
        isDisabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-red cursor-pointer'
      }`}
      target={isDisabled ? undefined : '_blank'}
      rel={isDisabled ? undefined : 'noopener noreferrer'}
      aria-disabled={isDisabled}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault();
          return;
        }
      }}
    >
      {children}
    </Link>
  );
}
