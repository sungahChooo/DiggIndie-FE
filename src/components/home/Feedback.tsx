import RecSatisfaction from '@/components/home/RecSatisfaction';
import thumbsUpBtn from '@/assets/icons/thumbsUp.svg';
import thumbsDownBtn from '@/assets/icons/thumbsDown.svg';
import thumbsUpRedBtn from '@/assets/icons/thumbsUpRed.svg';
import thumbsDownRedBtn from '@/assets/icons/thumbsDownRed.svg';
import Image from 'next/image';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
type Vote = 'up' | 'down' | null;

type Props = {
  isLoggedIn: boolean;
};
export default function Feedback({ isLoggedIn }: Props) {
  const searchParams = useSearchParams();
  const [dismissed, setDismissed] = useState(false);
  const [selected, setSelected] = useState<Vote>(null);

  // URL 파라미터 체크: ?reset=success 가 있을 때만 노출
  const isResetSuccess = searchParams.get('reset') === 'true';
  // 노출 조건 필터링
  if (!isLoggedIn || dismissed || !isResetSuccess) return null;
  const getUpIcon = () => {
    if (selected === 'up') return thumbsUpRedBtn;
    return thumbsUpBtn;
  };

  const getDownIcon = () => {
    if (selected === 'down') return thumbsDownRedBtn;
    return thumbsDownBtn;
  };

  const onClickUp = () => {
    setSelected((prev) => (prev === 'up' ? null : 'up'));
  };

  const onClickDown = () => {
    setSelected((prev) => (prev === 'down' ? null : 'down'));
  };

  const handleSubmitted = () => {
    setDismissed(true);
  };
  if (dismissed) return null;

  return (
    <div className="relative w-full px-5">
      <div className="flex w-full bg-black mt-2 min-w-0 gap-2">
        <span className="min-w-0 flex-1 text-[#736F6F] text-[14px] font-medium truncate">
          추천 결과가 마음에 드시나요?
        </span>

        <div
          className="flex px-4 py-2 gap-3 justify-center items-center border-gray-800 border-1
            bg-[#1F1D1D] border-[#413D3D] border-0.25 rounded-[20px] h-[40px] shrink-0"
        >
          <button type="button" onClick={onClickUp} className="flex items-center justify-center">
            <Image src={getUpIcon()} alt="thumbs up" width={24} height={24} />
          </button>

          <button type="button" onClick={onClickDown} className="flex items-center justify-center">
            <Image src={getDownIcon()} alt="thumbs down" width={24} height={24} />
          </button>
        </div>
      </div>

      {selected === 'down' && (
        <div className="absolute right-5 top-full mt-2 z-50">
          <RecSatisfaction mode="down" onSubmitted={handleSubmitted} />
        </div>
      )}

      {selected === 'up' && (
        <div className="absolute right-5 top-full mt-2 z-50">
          <RecSatisfaction mode="up" onSubmitted={handleSubmitted} />
        </div>
      )}
    </div>
  );
}
