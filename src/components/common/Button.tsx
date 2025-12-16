interface ButtonProps {
  disabled?: boolean;
  children: React.ReactNode; // 버튼 텍스트
  onClick?: () => void;
}

export default function Button({ disabled, children, onClick }: ButtonProps) {
  return (
    <button
      className={`block p-4 h-13 w-full font-semibold text-center rounded-sm ${
        disabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-red cursor-pointer'
      }`}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
