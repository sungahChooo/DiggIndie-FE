import Image from 'next/image';
import nextBtn from '@/assets/common/next.svg';
import fireBtn from '@/assets/icons/fire.svg';
import soundBtn from '@/assets/icons/sound.svg';
import { useRouter } from 'next/navigation';

export default function HomeHeader() {
  const router = useRouter();
  return (
    <div className="w-full justify-between px-5 h-45 flex flex-col items-center gap-4 mt-9">
      <div className="flex w-full justify-between items-center font-bold">
        <span className={"font-semibold text-[20px] text-white"}>
          인기 게시물
        </span>
        <Image
          src={nextBtn}
          alt="next"
          width={24}
          height={24}
          onClick={() => router.push('/community/free')}
          className="cursor-pointer"
        />
      </div>
      <div className="flex flex-col w-full items-center justify-center gap-2">
        <div className="flex items-center w-full bg-[#550001] border-[#880405] border-[1px]
          px-3 py-2 rounded-[4px] gap-2"
        >
          <Image
            src={fireBtn}
            alt="most popular"
            width={24}
            height={24}
          />
          <span className={"font-medium text-[16px] text-white truncate"}>
            [머릿글] 잔나비 티켓 양도합니다
          </span>
        </div>
        <div className="flex items-center w-full  bg-[#332F2F] border-[#4A4747] border-[1px]
          px-3 py-2 rounded-[4px] gap-2"
        >
          <Image
            src={soundBtn}
            alt="popular"
            width={24}
            height={24}
          />
          <span className={"font-medium text-[16px] text-white truncate "}>
            [머릿글] 잔나비 티켓 양도합니다
          </span>
        </div>
        <div className="flex items-center w-full bg-[#332F2F] border-[#4A4747] border-[1px]
         px-3 py-2 rounded-[4px] gap-2"
        >
          <Image
            src={soundBtn}
            alt="popular"
            width={24}
            height={24}
          />
          <span className={"font-medium text-[16px] text-white truncate "}>
            [머릿글] 잔나비 티켓 양도합니다
          </span>
        </div>
      </div>
    </div>
  );
}
