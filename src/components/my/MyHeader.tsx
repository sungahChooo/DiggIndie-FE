import Image from 'next/image';
import backIcon from '@/assets/onBoard/arrow.svg';
import { useRouter } from 'next/navigation';

type props = {
  title: string;
};

export default function MyHeader({ title }: props) {
  const router = useRouter();

  return (
    <div className="w-full flex items-center px-5 py-3 justify-between">
      <Image
        src={backIcon}
        alt="이전"
        width={24}
        height={24}
        onClick={() => router.back()}
        className="cursor-pointer"
      />
      <span className="mx-auto text-base font-semibold">{title}</span>
    </div>
  );
}
