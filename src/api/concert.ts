import { fetchClient } from '@/api/client';
import { ApiResponse } from '@/types/api';
import type { ConcertDetail } from '@/types/concerts';

export const concertApi = {
  async fetchDetailConcert(params: {
    concertId: number;
  }): Promise<ApiResponse<ConcertDetail> | null> {
    return fetchClient<ConcertDetail>(`/concerts/${params.concertId}`, {
      method: 'GET',
      auth: true,
    });
  },

  async scrapConcert(params: {
    concertId: number;
  }): Promise<ApiResponse<{ isScrapped: boolean }> | null> {
    return fetchClient<{ memberId: string; concertId: number; isScrapped: boolean }>(
      `/my/concerts/${params.concertId}`,
      {
        method: 'PATCH',
        auth: true,
      }
    );
  },
};
