import { apiFetch } from "@/api/client";

type BasicResponse = {
  statusCode: number;
  message: string;
  isSuccess: boolean;
  payload: unknown;
};

export function postOnboardArtist(bands: number[]) {
  return apiFetch<BasicResponse>("/artists/preferences", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ bands }),
  });
}