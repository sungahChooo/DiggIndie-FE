'use client';
//온보딩, 로그인, 회원가입 때 사용

interface LoginButtonProps {
  disabled?: boolean;
  children: React.ReactNode; // 버튼 텍스트
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function LoginButton({ disabled, children, onClick, type }: LoginButtonProps) {
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
    <button
      type={type}
      className={`block p-4 h-13 w-full font-semibold text-center rounded-sm ${
        disabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-red cursor-pointer'
      }`}
      aria-disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
