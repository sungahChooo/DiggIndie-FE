import Image from 'next/image';
import back from '@/assets/common/back.svg';
import { useRouter } from 'next/navigation';

interface CommunityHeaderProps {
  onRightButtonClick?: () => void;
  disabled?: boolean;
}
export default function CommunityHeader({ onRightButtonClick, disabled }: CommunityHeaderProps) {
  const router = useRouter();
  return (
    <header className="px-5 py-3 flex justify-between w-full mb-3">
      <Image
        src={back}
        width={24}
        height={24}
        alt="back"
        className="cursor-pointer"
        onClick={() => router.push('/community/free')}
      />
      <span className="font-semibold text-base text-white">게시물 작성</span>
      <button
        className={`text-normal text-sm ${
          disabled ? 'text-gray-700 disabled' : 'text-main-red-2 cursor-pointer'
        }`}
        onClick={onRightButtonClick}
        disabled={disabled}
      >
        완료
      </button>
    </header>
  );
}
