import Image from 'next/image';
import logo from '@/assets/common/logo.svg';
import search from '@/assets/common/search.svg';
import hamburger from '@/assets/common/hamburger.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
type Props = {
  onHamburgerClick: () => void;
  userId: string | null;
};
export default function HomeHeader({ onHamburgerClick, userId }: Props) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-black shrink-0">
      <div className="mx-auto flex h-13 py-3 w-full items-center justify-between px-5 bg-black">
        {userId ? (
          <span className="text-white text-xl font-semibold">{userId}</span>
        ) : (
          <Image
            src={logo}
            alt="logo"
            width={93.51}
            height={28}
            onClick={() => router.push('/')}
            className="cursor-pointer"
          />
        )}
        <div className={'flex max-w-14 gap-2'}>
          <Link href="/search" className="flex justify-center">
            <Image src={search} alt="search" width={24} height={24} />
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
    </header>
  );
}
