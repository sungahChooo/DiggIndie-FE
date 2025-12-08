import Link from 'next/link';

interface ButtonProps {
  disabled?: boolean;
  href: string;
  children: React.ReactNode; // 버튼 텍스트
}

export default function Button({ disabled, href, children }: ButtonProps) {
  return (
    <Link
      href={disabled ? '#' : href}
      className={`block p-4 h-13 w-full font-semibold text-center rounded-sm ${
        disabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-red cursor-pointer'
      }`}
      aria-disabled={disabled}
    >
      {children}
    </Link>
  );
}
