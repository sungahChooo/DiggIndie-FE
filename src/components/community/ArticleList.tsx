import Link from 'next/link';
import FreeArticleCard from './FreeArticleCard';
import TradeArticleCard from './TradeArticleCard';
import type { MarketArticle } from '@/types/marketBoard';
import type { FreeArticle } from '@/types/freeBoard';

type FreeProps = {
  variant: 'free';
  basePath: string;
  articles: FreeArticle[];
};

type TradeProps = {
  variant: 'trade';
  basePath: string;
  articles: MarketArticle[];
};

type Props = FreeProps | TradeProps;

export default function ArticleList(props: Props) {
  const { basePath, variant } = props;

  //market
  if (variant === 'trade') {
    return (
      <div className="flex w-full flex-col">
        {props.articles.map((article, index) => (
          <Link
            key={`market-${article.marketId ?? 'none'}-${index}`}
            href={`${basePath}/${article.marketId}`}
            className="block"
          >
            <TradeArticleCard article={article} />
          </Link>
        ))}
      </div>
    );
  }


  // free
  return (
    <div className="flex w-full flex-col">
      {props.articles.map((article, index) => (
        <Link
          key={`free-${article.boardId ?? 'none'}-${index}`}
          href={`${basePath}/${article.boardId}`}
          className="block"
        >
          <FreeArticleCard article={article} />
        </Link>
      ))}
    </div>
  );

}
