import Image from 'next/image';
import arrow from '@/assets/common/more.svg';
interface MenuSectionProps {
  title?: string;
  hasBorder?: boolean;
  onclick?: () => void;
}
export default function MenuSection({ title, hasBorder = false, onclick }: MenuSectionProps) {
  return (
    <div
      className={`flex py-2 mx-5 justify-between items-center cursor-pointer ${
        hasBorder ? 'border-b border-gray-600' : ''
      }`}
      onClick={onclick}
    >
      <span
        className={`${hasBorder ? 'font-normal text-base' : 'font-semibold text-xl'} text-white`}
      >
        {title}
      </span>
      <Image src={arrow} alt="arrow right" width={24} height={24} />
    </div>
  );
}
