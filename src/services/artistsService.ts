// src/services/artistsService.ts
import { artistAPI, fetchArtists } from '@/api/artists';
import { postOnboardArtist } from '@/api/onboardArtists';
import type { OnboardArtist, ArtistDetail, PageInfo } from '@/types/artists';

export async function getOnboardingArtists(): Promise<{
  artists: OnboardArtist[];
  pageInfo: PageInfo;
}> {
  const res = await fetchArtists({ page: 0, size: 12 });

  if (!res.isSuccess) {
    throw new Error(res.message || 'Failed to fetch artists');
  }

  return {
    artists: res.payload,
    pageInfo: res.pageInfo,
  };
}

export async function getArtistsPage(params: {
  page: number;
  size: number;
  query?: string;
}): Promise<{ artists: OnboardArtist[]; pageInfo: PageInfo }> {
  const res = await fetchArtists(params);

  if (!res.isSuccess) {
    throw new Error(res.message || 'Failed to fetch artists');
  }

  return { artists: res.payload, pageInfo: res.pageInfo };
}

//온보딩 취향 재설정 페이지 선택 아티스트 저장
export async function saveSelectedArtists(bands: number[]): Promise<void> {
  try {
    const res = await postOnboardArtist(bands);
  } catch (err) {
    console.error('온보딩 아티스트 저장 중 에러:', err);
  }
}

//아티스트 상세 페이지
export async function getArtistDetail(artistId: number): Promise<ArtistDetail> {
  try {
    const res = await artistAPI.getDetailArtist(artistId);
    if (!res.isSuccess) {
      throw new Error(res.message || '아티스트 조회 실패');
    }
    return res.payload;
  } catch (err) {
    console.log('아티스트 상세 조회 중 에러', err);
    throw err;
  }
}

//아티스트 상세 스크랩 토글
export async function scrapArtist(artistId: number): Promise<void> {
  try {
    const res = await artistAPI.toggleScrapArtist({ bandIds: [artistId] });
  } catch (err) {
    throw err;
  }
}
