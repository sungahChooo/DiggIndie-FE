import Image from "next/image";
import type { MarketArticle } from '@/types/marketBoard';
import concertDefault from '@/assets/common/concertDefault.png';

type Props = {
  article: MarketArticle;
};

export default function MarketArticleCard({ article }: Props) {


  return (
    <div className="w-full mr-auto h-[116px] flex items-center border-b-[1px] border-[#332F2F] py-4 px-5 gap-[18px]">
      <div className="relative w-[84px] h-[84px] overflow-hidden">
        <Image
          src={article.thumbnail?.trim() ? article.thumbnail : concertDefault}
          alt="image"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col min-w-0 flex-1 font-medium justify-between ">
        <div className="flex h-[22px] text-white text-[16px] min-w-0">
          <span className="shrink-0 mr-[2px]">[{article.type}]</span>
          <span className="truncate min-w-0">{article.title}</span>
        </div>

        <span className={"mt-[4px]"}>{article.price}원</span>

        <div className="flex h-[17px] text-[#8C8888] text-[12px] mt-[19px]">
          {article.timeAgo}
        </div>
      </div>
    </div>
  );
}
