import Image from 'next/image';
import hamburger from '@/assets/common/hamburger.svg';

type props = {
  title: string;
  onHamburgerClick: () => void;
};

export default function SearchHeader({ title, onHamburgerClick }: props) {
  return (
    <div className="w-full h-[52px] flex flex-col items-center font-semibold bg-black px-[20px]">
      <div className="w-[335px] h-[52px] flex items-center font-semibold text-[20px]">
        <span className={'mr-auto'}>{title}</span>
        <Image
          src={hamburger}
          alt="menu"
          width={24}
          height={24}
          className={'cursor-pointer'}
          onClick={onHamburgerClick}
        />
      </div>
    </div>
  );
}
