export type PageInfo = {
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
};

//콘서트 검색용
export type ConcertItem = {
  concertId: number;
  concertName: string;
  dDay: string;
  lineUp: string[];
  mainImage: string;
  period: string;
};

export type GetConcertsPayload = {
  concerts: ConcertItem[];
  pageInfo: PageInfo;
};

//위클리 캘린더 용
export type WeeklyConcertItem = {
  concertId: number;
  concertName: string;
  startsAt: string;
  concertHall: string;
};

export type WeeklyConcertPayload = {
  concerts: WeeklyConcertItem[];
  pageInfo: PageInfo;
};

//전체 캘린더 날짜별 콘서트 유무 조회용
export type MonthConcertItem = {
  day: number;
  hasConcert: boolean;
};
export type MonthConcertPayload = {
  year: number;
  month: number;
  days: MonthConcertItem[];
};

//스크랩한 콘서트 용
export type MyConcertItem = {
  concertId: number;
  concertName: string;
  duration: string;
  imageUrl: string;
  dday: string;
  finished: boolean;
};

export type MyConcertPayload = {
  concerts: MyConcertItem[];
};

//추천 공연 용
export type LineUpItem = {
  bandId: number;
  bandName: string;
};
export interface ConcertLineUp {
  bandId: number;
  bandName: string;
  bandImage: string;
}
export interface ConcertDetail {
  concertId: number;
  concertName: string;
  isScrapped: boolean;
  startDate: string;
  endDate: string;
  isFinished: boolean;
  concertHallName: string;
  address: string;
  preorderPrice: number;
  onsitePrice: number;
  bookUrl: string;
  imageUrl: string;
  description: string;
  lineUp: ConcertLineUp[];
}

export type RecConcertItem = {
  concertId: number;
  concertName: string;
  dDay: string;
  lineUp: LineUpItem[];
  imageUrl: string;
  duration: string;
};

export type RecConcertPayload = {
  concerts: RecConcertItem[];
};
