import Image from 'next/image';
import arrow from '@/assets/common/more.svg';
interface MyCommunityMenuProps {
  title?: string;
  onclick?: () => void;
}
export default function MyCommunityMenu({ title, onclick }: MyCommunityMenuProps) {
  return (
    <div className="flex py-2 mx-5 justify-between items-center cursor-pointer" onClick={onclick}>
      <span className="font-medium text-base text-white">{title}</span>
      <Image src={arrow} alt="arrow right" width={24} height={24} />
    </div>
  );
}
