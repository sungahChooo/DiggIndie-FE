import Image from "next/image";
import back from "../../assets/icons/back.svg"
import close from "../../assets/icons/close.svg"
import { useRouter } from 'next/navigation'

type props = {
  title: string;
};

export default function AuthFindHeader({ title }: props) {
  const router = useRouter();

  return (
    <div className="w-[375px] h-[96px] flex flex-col items-center font-semibold bg-black px-[20px]">
      <div className="h-[48px] flex flex-col items-center">

      </div>
      <div className="w-[335px] h-[48px] flex justify-center items-center font-semibold">
        <Image src={back} alt="logo" width={24} height={24} className={"absolute left-[20px] cursor-pointer"} onClick={() => router.back()}/>
        <span>
          { title }
        </span>
      </div>
    </div>
  );
}
