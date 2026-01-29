'use client';
//온보딩, 로그인, 회원가입 때 사용

interface LinkButtonProps {
  disabled?: boolean;
  children: React.ReactNode; // 버튼 텍스트
  onClick?: () => void;
  href?: string;
}

export default function LinkButton({ disabled, children, onClick, href }: LinkButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    // 함수가 존재하면 실제로 실행함
    if (onClick) {
      onClick();
    }
  };
  return (
    <a
      href={href}
      className={`flex items-center justify-center p-4 h-13 w-full font-semibold rounded-sm ${
        disabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-red cursor-pointer'
      }`}
      aria-disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
