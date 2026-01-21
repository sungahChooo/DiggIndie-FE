import Link from "next/link";
import FreeArticleCard from "./FreeArticleCard";
import TradeArticleCard from "./TradeArticleCard";
import type { Article } from "@/types/mocks/mockArticles";

type Props = {
  articles: Article[];
  basePath: string;
  variant: 'free' | 'trade';
};

export default function ArticleList({ articles, basePath, variant }: Props) {
  return (
    <div className="flex flex-col">
      {articles.map((article) => (
        <Link
          key={article.boardId}
          href={`${basePath}/${article.boardId}`}
          className="block"
        >
          {variant === 'trade' ? (
            <TradeArticleCard article={article} />
          ) : (
            <FreeArticleCard article={article} />
          )}
        </Link>
      ))}
    </div>
  );
}
