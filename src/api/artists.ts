import { apiFetch, fetchClient } from '@/api/client';
import { ApiResponse } from '@/types/api';
import type {
  ArtistDetail,
  ArtistPayload,
  GetArtistsParams,
  GetMyArtistsParams,
  MyArtistsItem,
  MyArtistsResult,
  OnboardArtistsResponse,
  PageInfo,
  RecArtistPayload,
} from '@/types/artists';

export function fetchArtists(params: { page: number; size: number; query?: string }) {
  return apiFetch<OnboardArtistsResponse>('/artists', {
    method: 'GET',
    query: {
      page: params.page,
      size: params.size,
      ...(params.query ? { query: params.query } : {}),
    },
  });
}

export const artistAPI = {
  async getDetailArtist(artistId: number): Promise<ApiResponse<ArtistDetail>> {
    const res = await fetchClient<ArtistDetail>(`/artists/${artistId}`, {
      method: 'GET',
      auth: true,
    });
    if (!res) {
      throw new Error('아티스트 상세 응답이 null입니다.');
    }
    return res;
  },

  async toggleScrapArtist(params: { bandIds: number[] }): Promise<void> {
    await fetchClient<void>('/my/artists', {
      method: 'PATCH',
      auth: true,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bandIds: params.bandIds,
      }),
    });
  },
};

//아티스트 검색 용
export async function getArtists(params: GetArtistsParams = {}): Promise<ArtistPayload> {
  const { order = 'recent', query = '', page = 0, size = 20 } = params;

  const sp = new URLSearchParams({
    order,
    query,
    page: String(page),
    size: String(size),
  });

  const res = await fetchClient<ArtistPayload>(`/artists/search?${sp.toString()}`, {
    method: 'GET',
    auth: true,
  });

  if (!res.isSuccess) {
    throw new Error(res.message || 'Failed to fetch artists');
  }

  return (
    res.payload ?? {
      artists: [],
      pageInfo: {
        page,
        size,
        hasNext: false,
        totalElements: 0,
        totalPages: 0,
      },
    }
  );
}

// 마이 아티스트 조회
type MyArtistsRawResponse = ApiResponse<MyArtistsItem[]> & {
  pageInfo?: PageInfo;
};

export async function getMyArtists(params: GetMyArtistsParams = {}): Promise<MyArtistsResult> {
  const { page = 0, size = 20 } = params;

  const sp = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  const res = (await fetchClient<MyArtistsItem[]>(`/my/artists?${sp.toString()}`, {
    method: 'GET',
    auth: true,
  })) as MyArtistsRawResponse;

  if (!res.isSuccess) {
    throw new Error(res.message || 'Failed to fetch my artists');
  }

  return {
    artists: res.payload ?? [],
    pageInfo: res.pageInfo ?? {
      page,
      size,
      hasNext: false,
      totalElements: 0,
      totalPages: 0,
    },
  };
}

//아티스트 추천
const AI_BASE_URL = process.env.NEXT_PUBLIC_AI_BASE_URL;

export async function postUpdateBandRecommendations(): Promise<RecArtistPayload> {
  const res = await fetchClient<RecArtistPayload>('/api/bands/recommendations/update', {
    method: 'POST',
    auth: true,
    baseUrl: AI_BASE_URL,
    body: JSON.stringify({}),
    headers: {
      'Content-Type': undefined as any, // or delete override
    },
  });

  if (!res.isSuccess) {
    throw new Error(res.message || 'Failed to update band recommendations');
  }

  return res.payload;
}

export async function getRecommendedArtists() {
  const res = await fetchClient(`/artists/recommendations/users`, {
    method: 'GET',
    auth: true,
  });
  if (!res) {
    throw new Error('홈 아티스트 추천 반환 데이터 null입니다.');
  }
  return res.payload;
}
