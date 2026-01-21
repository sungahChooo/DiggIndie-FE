
import { fetchClient } from "@/api/client";
import type {
  WeeklyConcertPayload, GetConcertsPayload, MonthConcertPayload, MyConcertItem, MyConcertPayload,
  RecConcertItem, RecConcertPayload, ConcertItem
}
  from '@/types/concerts';

import { recToConcertItem } from "@/services/concertMappers";

// 위클리 캘린더 용
export type GetWeeklyConcertParams = {
  date: string;
  page?: number;
  size?: number;
  sort?: string[];
};

export async function getWeeklyConcerts(params: GetWeeklyConcertParams) {
  const { date, page = 0, size = 10, sort } = params;

  const qs = new URLSearchParams();
  qs.set("date", date);
  qs.set("page", String(page));
  qs.set("size", String(size));
  if (sort?.length) sort.forEach((s) => qs.append("sort", s));

  return fetchClient<WeeklyConcertPayload>(`/concerts/calendar/weekly?${qs.toString()}`, {
    method: "GET",
    auth: false,
  });
}

// 공연 전체 검색 용
export type GetConcertParams = {
  order: "recent" | "view" | "scrap";
  query?: string;
  page?: number;
  size?: number;
  sort?: string[];
};

export async function getConcerts(params: GetConcertParams) {
  const { order, query = "", page = 0, size = 20, sort } = params;

  const qs = new URLSearchParams();
  qs.set("order", order);
  qs.set("page", String(page));
  qs.set("size", String(size));

  const trimmed = query.trim();
  if (trimmed) qs.set("query", trimmed);

  if (sort?.length) {
    sort.forEach((s) => qs.append("sort", s));

  }
  console.log(`/concerts?${qs.toString()}`);


  return fetchClient<GetConcertsPayload>(`/concerts?${qs.toString()}`, {
    method: "GET",
    auth: false,
  });

}

// 전체캘린더 공연 조회
export type GetConcertsByDatesParams = {
  dates: string[];
  page?: number;
  size?: number;
  sort?: string[];
};

export async function getConcertsByDates(params: GetConcertsByDatesParams) {
  const { dates, page = 0, size = 100, sort } = params;

  const qs = new URLSearchParams();

  dates.forEach((d) => qs.append("dates", d));

  qs.set("page", String(page));
  qs.set("size", String(size));

  if (sort?.length) sort.forEach((s) => qs.append("sort", s));

  return fetchClient<GetConcertsPayload>(`/concerts/calendar?${qs.toString()}`, {
    method: "GET",
    auth: false,
  });
}

// 전체캘린더 월별
export async function getMonthConcerts(params: { year: number; month: number }) {
  const { year, month } = params;

  const qs = new URLSearchParams();
  qs.set("year", String(year));
  qs.set("month", String(month));

  return fetchClient<MonthConcertPayload>(
    `/concerts/calendar/monthly?${qs.toString()}`,
    { method: "GET", auth: false }
  );
}

//마이페이지 스크랩한 콘서트
export async function getMyConcerts(): Promise<MyConcertItem[]> {
  const res = await fetchClient<MyConcertPayload>("/my/concerts", {
    method: "GET",
    auth: true,
  });

  if (!res.isSuccess) {
    throw new Error(res.message || "Failed to fetch my concerts");
  }

  return res.payload?.concerts ?? [];
}

//추천 콘서트
export async function getRecConcerts(): Promise<ConcertItem[]> {
  const res = await fetchClient<RecConcertPayload>("/concerts/recommendations", {
    method: "GET",
    auth: true,
  });

  if (!res.isSuccess) {
    throw new Error(res.message || "Failed to fetch recommended concerts");
  }

  const raw = res.payload?.concerts ?? [];
  return raw.map(recToConcertItem);
}