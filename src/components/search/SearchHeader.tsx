import Image from "next/image";
import hamburger from "@/assets/icons/hamburger.svg"

type props = {
  title: string;
};

export default function SearchHeader({ title }: props) {

  return (
    <div className="w-full h-[100px] flex flex-col items-center font-semibold bg-black px-[20px]">
      <div className="h-[48px] flex flex-col items-center font-bold">

      </div>
      <div className="w-[335px] h-[52px] flex items-center font-semibold text-[20px]">
        <span className={"mr-auto"}>
          {title}
        </span>
        <Image src={hamburger} alt="menu" width={24} height={24} className={'cursor-pointer'} />
      </div>
    </div>
  );
}