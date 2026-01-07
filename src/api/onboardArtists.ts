import { apiFetch, fetchClient } from '@/api/client';

type BasicResponse = {
  statusCode: number;
  message: string;
  isSuccess: boolean;
  payload: unknown;
};

export function postOnboardArtist(bands: number[]) {
  return fetchClient('/artists/preferences', {
    method: 'POST',
    auth: true,
    body: JSON.stringify({ bands }),
  });
}
