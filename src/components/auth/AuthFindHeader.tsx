import Image from 'next/image';
import back from '@/assets/common/back.svg';
import { useRouter } from 'next/navigation';

type props = {
  title: string;
};

export default function AuthFindHeader({ title }: props) {
  const router = useRouter();

  return (
    <div className="w-full h-14 flex items-center justify-between bg-black px-5 py-3">
      <Image
        src={back}
        alt="logo"
        width={24}
        height={24}
        className="cursor-pointer"
        onClick={() => router.back()}
      />
      <span className="font-semibold text-white text-base mx-auto">{title}</span>
    </div>
  );
}
