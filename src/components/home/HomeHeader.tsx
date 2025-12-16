import Image from 'next/image';
import logo from '../../assets/common/logo.svg';
import search from '../../assets/common/search.svg';
import hamburger from '../../assets/common/hamburger.svg';

import Link from 'next/link';

export default function HomeHeader() {
  return (
    <div className="w-[375px] h-[100px] flex flex-col items-center font-bold bg-black">
      <div className="h-[48px] flex flex-col items-center font-bold">임시</div>
      <div className="h-[52px] flex items-center font-bold mx-[20px]">
        <Image src={logo} alt="logo" width={93.51} height={28} />
        <Link href="/home/search" className="w-full flex justify-center">
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
        />
      </div>
    </div>
  );
}
