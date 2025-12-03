
import next from "../../assets/icons/next.svg"
import Image from "next/image";

type Props = {
  isLoggedIn: boolean;
};

export default function ResetPreference({ isLoggedIn }: Props) {
  if (isLoggedIn) return null;

  return (
    <div className={`w-[335px] h-[46px] flex bg-[#FF3637] mt-[40px] items-center justify-center rounded-[4px]`}>
      <div className={`flex overflow-x-auto text-[16px] font-semibold`}>
        취향 재설정 하러 가기
      </div>
      <div className={"w-[16px] h-[16px]"}>
        <Image src={next} alt={next}/>
      </div>
    </div>
  );
}
