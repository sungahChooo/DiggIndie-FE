import Image from 'next/image';
import hamburger from '@/assets/common/hamburger.svg';

type props = {
  title: string;
  onHamburgerClick: () => void;
};

export default function SearchHeader({ title, onHamburgerClick }: props) {
  return (
    <div className="w-full h-13 items-center font-semibold bg-black px-5 py-3">
      <div className="flex items-center justify-between text-[20px]">
        <span>{title}</span>
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
