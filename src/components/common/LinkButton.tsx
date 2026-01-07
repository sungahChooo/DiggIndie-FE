import Link from 'next/link';

interface LinkButtonProps {
  disabled?: boolean;
  href: string;
  children: React.ReactNode; // 버튼 텍스트
  onClick?: () => void;
}

export default function LinkButton({ disabled, href, children, onClick }: LinkButtonProps) {
  return (
    <Link
      href={disabled ? '#' : href}
      className={`block p-4 h-13 w-full font-semibold text-center rounded-sm ${
        disabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-red cursor-pointer'
      }`}
      aria-disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
