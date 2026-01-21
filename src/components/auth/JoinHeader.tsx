import Image from 'next/image';
import xButton from '@/assets/auth/xButton.svg';
import Link from 'next/link';

export default function JoinHeader() {
  return (
    <section className="flex px-5 py-3 w-full justify-between sticky top-0 z-50 bg-black">
      <Link href="/auth/login">
        <Image src={xButton} alt="xButton" width={20} />
      </Link>
      <span className="text-base font-semibold text-white pr-35">회원가입</span>
    </section>
  );
}
