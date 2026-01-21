import { ApiResponse, Keyword, KeywordResponse, SelectedArtistsResponse } from '@/types/api';
import { fetchClient } from './client';

export const onBoardApi = {
  //온보딩 키워드 불러오기
  async getOnboardingKeywords(): Promise<KeywordResponse> {
    const res = await fetchClient<Keyword[]>('/keywords', {
      method: 'GET',
      auth: true,
    });
    if (!res) {
      throw new Error('키워드 조회 응답이 비어있습니다.');
    }

    return res;
  },
  //온보딩 키워드 저장
  async saveOnboardKeywords(keywordIds: number[]) {
    return await fetchClient<void>('/my/keywords', {
      method: 'POST',
      auth: true,
      body: JSON.stringify({ keywordIds }),
    });
  },
  //취향 재설정: 온보딩 키워드 조회
  async getSelectedOnboardingKeywords(): Promise<KeywordResponse> {
    const res = await fetchClient<Keyword[]>('/my/keywords', {
      method: 'GET',
      auth: true,
    });
    if (!res) {
      throw new Error('키워드 조회 응답이 비어있습니다.');
    }

    return res;
  },
  //취향 재설정: 온보딩 아티스트 조회
  async getSelectedOnboardingArtists(): Promise<ApiResponse<SelectedArtistsResponse>> {
    const res = await fetchClient<SelectedArtistsResponse>('/artists/preferences', {
      method: 'GET',
      auth: true,
    });
    if (!res) {
      throw new Error('키워드 조회 응답이 비어있습니다.');
    }

    return res;
  },
};
