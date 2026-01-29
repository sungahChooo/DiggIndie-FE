import { fetchClient } from "@/api/client";

import type {
  GetMarketListParams, MarketListPayload, MarketPayload, PostMarketParams, EditMarketParams,
  ScrapMarketParams, ScrapMarketPayload, MyMarketParams, MyMarketItem
}
  from '@/types/marketBoard';

export async function postMarket(params: PostMarketParams) {
  return fetchClient<MarketPayload>("/markets", {
    method: "POST",
    auth: true,
    body: JSON.stringify(params),
  });
}

//게시글 리스트
export async function getMarketList(params: GetMarketListParams) {
  const { type, query = '', page = 0, size = 20 } = params;

  const qs = new URLSearchParams();

  if (type && type !== '전체') {
    qs.set('type', type);
  }

  if (query.trim()) qs.set('query', query.trim());
  qs.set('page', String(page));
  qs.set('size', String(size));

  return fetchClient<MarketListPayload>(`/markets?${qs.toString()}`, {
    method: 'GET',
    auth: false,
  });
}

//게시글 삭제
export type DeleteMarketParams = { marketId: number };
export type DeleteMarketPayload = unknown;

export async function deleteMarket({ marketId }: DeleteMarketParams) {
  return fetchClient<DeleteMarketPayload>(`/markets/${marketId}`, {
    method: 'DELETE',
    auth: true,
  });
}

//게시글 수정
export async function editMarket(params: EditMarketParams) {
  const { marketId, ...body } = params;
  return fetchClient<MarketPayload>(`/markets/${marketId}`, {
    method: 'PUT',
    auth: true,
    body: JSON.stringify(body),
  });
}

//게시글 스크랩
export async function scrapMarket(params: ScrapMarketParams) {
  const { marketId } = params;
  return fetchClient<ScrapMarketPayload>(`/markets/${marketId}/scrap`, {
    method: 'PATCH',
    auth: true
  });
}

//내가 쓴 게시글
export async function GetMyMarketList(params: MyMarketParams = {}) {
  const { page = 0, size = 20 } = params;

  const qs = new URLSearchParams();
  qs.set("page", String(page));
  qs.set("size", String(size));

  return fetchClient<MyMarketItem[]>(`/my/posts/market?${qs.toString()}`, {
    method: "GET",
    auth: true,
  });
}

//내가 스크랩한 게시글
export async function GetMyMarketScraps(params: MyMarketParams = {}) {
  const { page = 0, size = 10 } = params;

  const qs = new URLSearchParams();
  qs.set("page", String(page));
  qs.set("size", String(size));

  return fetchClient<MyMarketItem[]>(`/my/scraps?${qs.toString()}`, {
    method: "GET",
    auth: true,
  });
}