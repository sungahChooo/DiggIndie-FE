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
    <div className="w-full justify-between px-5 py-3 flex h-13 flex-col items-center font-bold">
      <div className="flex w-full justify-between items-center font-bold">
        <Image
          src={logo}
          alt="logo"
          width={93.51}
          height={28}
          onClick={() => router.push('/')}
          className="cursor-pointer"
        />

        <div className={'flex max-w-14 gap-2'}>
          <Link href="/search" className="flex justify-center">
            <Image
              src={search}
              alt="search"
              width={24}
              height={24}
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
    </div>
  );
}
