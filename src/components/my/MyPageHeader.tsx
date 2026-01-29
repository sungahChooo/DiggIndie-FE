import Image from 'next/image';
import logo from '@/assets/common/diggindie.svg';
import sidTab from '@/assets/common/hamburger.svg';

interface MyPageHeaderProps {
  onOpenSideTab: () => void;
}
export default function MyPageHeader({ onOpenSideTab }: MyPageHeaderProps) {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-transparent ">
      <div className="mx-auto flex h-13 py-3 w-full max-w-[375px] items-center justify-between px-5 bg-black">
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
      </div>
    </header>
  );
}
