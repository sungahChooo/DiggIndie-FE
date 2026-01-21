import { apiFetch } from '@/api/client';
import { concertApi } from '@/api/concert';
import type { ConcertDetail } from '@/types/concerts';

export type GetConcertsParams = {
  date: string; //YYYY-MM-DD
  page?: number;
  size?: number;
  sort?: string;
  useDevAuth?: boolean;
};



export async function getDetailConcerts(concertId: number): Promise<ConcertDetail> {
  const res = await concertApi.fetchDetailConcert({ concertId });
  if (!res) {
    throw new Error('서버 응답이 없습니다.');
  }
  if (!res.isSuccess) {
    throw new Error(res?.message ?? '콘서트 상세 조회 실패');
  }
  console.log('공연 상세게시글', res.payload);
  return res.payload;
}

export async function toggleScrapConcert(concertId: number): Promise<boolean> {
  const res = await concertApi.scrapConcert({ concertId });

  if (!res) {
    throw new Error('서버 응답이 없습니다.');
  }
  if (!res.isSuccess) {
    throw new Error(res?.message ?? '스크랩 실패');
  }
  console.log('공연 스크랩 토글 성공', res.payload);
  return res.payload.isScrapped;
}
