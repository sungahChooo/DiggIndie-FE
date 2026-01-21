import Image from "next/image";
import type { Article } from "@/types/mocks/mockArticles";
import imageIcon from "@/assets/myPage/imageIcon.svg";
import { GetWritten } from "@/hooks/GetWritten";

type Props = {
  article: Article;
};

export default function FreeArticleCard({ article }: Props) {
  const written = GetWritten(article.createdAt);

  return (
    <div className="w-[min(375px,100%)] mr-auto h-[76px] flex items-center border-b-[1px] border-[#332F2F] py-4 px-5">
      <div className="flex flex-col min-w-0 pr-[24px]">
        <div className="flex min-w-0">
          <span className="text-[#A5A1A1] font-medium mr-[2px] shrink-0">
            [{article.boardHeader}]
          </span>
          <p className="text-white text-[16px] h-[27px] font-medium truncate min-w-0">
            {article.boardTitle}
          </p>
        </div>

        <div className="flex text-gray-500 text-[12px] font-medium">
          <span className="mr-2 shrink-0">{written}</span>
          <span className="mr-2 shrink-0">조회 {article.views}</span>
          <Image
            src={imageIcon}
            alt="imageIcon"
            width={16}
            height={16}
            className="mr-[2px] shrink-0"
          />
          {/*이미지 수 API 추가 후 수정*/}
          <span className="shrink-0">[2]</span>
        </div>
      </div>
    </div>
  );
}
