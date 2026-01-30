import Image from 'next/image';
import nextBtn from '@/assets/common/next.svg';
import fireBtn from '@/assets/icons/fire.svg';
import { useRouter } from 'next/navigation';
import { HotArticle } from '@/types/board';

interface PopluarProps {
  content: HotArticle[];
}
export default function Popular({ content }: PopluarProps) {
  const router = useRouter();
  return (
    <div className="w-full justify-between px-5 h-45 flex flex-col items-center gap-4 mt-9">
      <div className="flex w-full justify-between items-center font-bold">
        <span className="font-semibold text-xl text-white">인기 게시물</span>
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
        {content.map((c) => {
          return (
            <div
              className="flex items-center w-full bg-[#550001] border-main-red-4 border-1
          px-3 py-2 rounded-sm gap-2 cursor-pointer"
              key={c.id}
              onClick={() => router.push(`/community/free/${c.id}`)}
            >
              <Image src={fireBtn} alt="most popular" width={24} height={24} />
              <span className="font-semibold text-base text-white truncate">
                {c.category && `[${c.category}]`} {c.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
