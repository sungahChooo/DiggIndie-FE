

export type PageInfo = {
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

//게시글 작성 용
export type MarketPayload = {
  marketId: number;
}

export type MarketCategory =
  | "전체"
  | "판매"
  | "구매";


export type PostMarketParams = {
  title: string,
  content: string,
  price: number,
  chatUrl: string,
  type: MarketCategory,
  imageUrls: string[]
}


//게시글 리스트
export type MarketArticle = {
  marketId: number;
  title: string;
  price: number;
  type: string;
  nickname: string;
  timeAgo: string;
  views: number;
  scrapCount: number;
  thumbnailUrl: string;
}

export type MarketListPayload = {
  pageInfo: PageInfo;
  markets: MarketArticle [];
  currentPage: number;
  totalPages: number;
  totalElements: number
  hasNext: boolean;
}

export type GetMarketListParams = {
  type?: MarketCategory
  query?: string;
  page?: number;
  size?: number;
};


//게시글 수정
export type EditMarketParams = {
  marketId: number;
  title: string;
  content: string;
  price: number;
  chatUrl: string;
  type: MarketCategory;
  imageUrls: string[];
};

//게시글 스크랩
export type ScrapMarketParams = {
  marketId: number;
}

export type ScrapMarketPayload = {
  isScraped: boolean;
  scrapCount: number;
}

