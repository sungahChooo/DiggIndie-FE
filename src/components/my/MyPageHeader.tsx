import Image from 'next/image';
import logo from '@/assets/common/diggindie.svg';
import sidTab from '@/assets/common/hamburger.svg';
import { useState } from 'react';
import SideTab from '../sideTabDir/SideTab';
export default function MyHeader() {
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);

  return (
    <header className="flex px-5 py-3 items-center justify-between">
      <Image src={logo} alt="Logo" width={100} height={50} />
      <div className="flex gap-2">
        <Image
          src={sidTab}
          alt="SidTab"
          width={20}
          height={20}
          onClick={() => setIsSideTabOpen(true)}
          className="cursor-pointer"
        />
      </div>
      {isSideTabOpen && <SideTab onClose={() => setIsSideTabOpen(false)} />}
    </header>
  );
}
