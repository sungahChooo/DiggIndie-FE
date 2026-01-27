import Image from 'next/image';
import imageIcon from '@/assets/myPage/imageIcon.svg';
import type { FreeArticle } from '@/types/freeBoard';

type Props = {
  article: FreeArticle;
};

export default function FreeArticleCard({ article }: Props) {

  return (
    <div className="w-full h-[76px] flex items-center border-b-[1px] border-[#332F2F] py-4 px-5">
      <div className="flex flex-col min-w-0 pr-[24px]">
        <div className="flex min-w-0">
          {article.category !== null && (
            <span className="text-[#A5A1A1] font-medium mr-[2px] shrink-0">
              [{article.category}]
            </span>
          )}
          <p className="text-white text-[16px] h-[27px] font-medium truncate min-w-0">
            {article.title}
          </p>
        </div>

        <div className="flex text-gray-500 text-[12px] font-medium">
          <span className="mr-2 shrink-0">{article.createdAt}</span>
          <span className="mr-2 shrink-0">조회 {article.views}</span>
          <Image
            src={imageIcon}
            alt="imageIcon"
            width={16}
            height={16}
            className="mr-[2px] shrink-0"
          />
          <span className="shrink-0">[{article.imageCount ?? 0}]</span>
        </div>
      </div>
    </div>
  );
}
