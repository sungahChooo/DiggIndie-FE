import Image from 'next/image';
import logo from '@/assets/common/logo.svg';
import search from '@/assets/common/search.svg';
import hamburger from '@/assets/common/hamburger.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
type Props = {
  onHamburgerClick: () => void;
};
export default function HomeHeader({ onHamburgerClick }: Props) {
  const router = useRouter();
  return (
    <div className="w-full max-w-[375px] h-13 flex flex-col items-center font-bold bg-gray-850">
      <div className="h-13 flex items-center font-bold mx-5">
        <Image
          src={logo}
          alt="logo"
          width={93.51}
          height={28}
          onClick={() => router.push('/')}
          className="cursor-pointer"
        />
        <Link href="/search" className="w-full flex justify-center">
          <Image
            src={search}
            alt="search"
            width={24}
            height={24}
            className="ml-[185.49px] mr-[8px]"
          />
        </Link>
        <Image
          src={hamburger}
          alt="hamburger"
          width={24}
          height={24}
          className={'cursor-pointer'}
          onClick={onHamburgerClick}
        />
      </div>
    </div>
  );
}
