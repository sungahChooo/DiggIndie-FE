import Image from 'next/image';
import arrow from '@/assets/common/more.svg';
interface MenuSectionProps {
  title?: string;
  hasBorder?: boolean;
}
export default function MenuSection({ title, hasBorder = false }: MenuSectionProps) {
  return (
    <div
      className={`flex py-2 mx-5 justify-between items-center ${
        hasBorder ? 'border-b border-gray-600' : ''
      }`}
    >
      <span className={`${hasBorder ? 'font-normal' : 'font-semibold'} text-xl text-white`}>
        {title}
      </span>
      <Image src={arrow} alt="arrow right" width={24} height={24} />
    </div>
  );
}
