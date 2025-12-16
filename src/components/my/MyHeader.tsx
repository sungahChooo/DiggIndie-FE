import Image from "next/image";
import back from "../../assets/icons/back.svg"
import close from "../../assets/icons/close.svg"
import { useRouter } from 'next/navigation'

type props = {
  title: string;
};

export default function MyHeader({ title }: props) {
  const router = useRouter();

  return (
    <div className="w-[375px] h-[100px] flex flex-col items-center font-semibold bg-black px-[20px]">
      <div className="h-[48px] flex flex-col items-center font-bold">

      </div>
      <div className="w-[335px] h-[52px] flex justify-between items-center font-semibold">
        <Image src={back} alt="logo" width={24} height={24} onClick={() => router.back()}/>
        <span>
          { title }
        </span>
        <Image src={close} alt="close" width={24} height={24} className={'cursor-pointer'}/>
      </div>
    </div>
  );
}
