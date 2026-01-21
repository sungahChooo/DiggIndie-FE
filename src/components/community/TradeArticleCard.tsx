import Image from "next/image";
import type { Article } from "@/types/mocks/mockArticles";
import { GetWritten } from "@/hooks/GetWritten";

type Props = {
  article: Article;
};

export default function FreeArticleCard({ article }: Props) {
  const written = GetWritten(article.createdAt);

  return (
    <div className="w-[min(375px,100%)] mr-auto h-[116px] flex items-center border-b-[1px] border-[#332F2F] py-4 px-5 gap-[18px]">
      <div className="relative w-[84px] h-[84px] overflow-hidden">
        <Image
          src={article.imageUrl}
          alt="image"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col min-w-0 flex-1 font-medium justify-between ">
        <div className="flex h-[22px] text-white text-[16px] min-w-0">
          <span className="shrink-0 mr-[2px]">[{article.boardHeader}]</span>
          <span className="truncate min-w-0">{article.boardTitle}</span>
        </div>

        {/* 거래/양도 게시글 API 추가 후 수정*/}
        <span className={"mt-[4px]"}>5000원</span>

        <div className="flex h-[17px] text-[#8C8888] text-[12px] mt-[19px]">
          {written}
        </div>
      </div>
    </div>
  );
}
