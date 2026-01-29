import Image from 'next/image';
import hamburger from '@/assets/common/hamburger.svg';
import homeBtn from '@/assets/common/homeBtn.svg';
import { useRouter } from 'next/navigation';

type props = {
  title: string;
  onHamburgerClick: () => void;
};

export default function SearchHeader({ title, onHamburgerClick }: props) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-black shrink-0">
      <div className="mx-auto flex h-13 py-3 w-full items-center justify-between px-5 bg-black">
        <span className="font-semibold text-white text-xl">{title}</span>
        <div className={'flex gap-[10px]'}>
          <Image
            src={homeBtn}
            alt="menu"
            width={24}
            height={24}
            className={'cursor-pointer'}
            onClick={() => router.push('/home')}
          />
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
    </header>
  );
}
