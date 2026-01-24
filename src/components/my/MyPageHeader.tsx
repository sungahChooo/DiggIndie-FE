import Image from 'next/image';
import logo from '@/assets/common/diggindie.svg';
import sidTab from '@/assets/common/hamburger.svg';

interface MyPageHeaderProps {
  onOpenSideTab: () => void;
}
export default function MyPageHeader({ onOpenSideTab }: MyPageHeaderProps) {
  return (
    <header className="flex px-5 py-3 items-center justify-between h-13 justify-between w-full top-0 bg-black z-40 items-center absolute">
      <Image src={logo} alt="Logo" width={100} height={50} />
      <div className="flex gap-2">
        <Image
          src={sidTab}
          alt="SidTab"
          width={20}
          height={20}
          onClick={onOpenSideTab}
          className="cursor-pointer"
        />
      </div>
    </header>
  );
}
