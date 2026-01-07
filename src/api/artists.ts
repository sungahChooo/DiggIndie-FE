import { apiFetch } from "@/api/client";
import type { OnboardArtistsResponse } from "@/types/artists";

export function fetchArtists(params: { page: number; size: number; query?: string }) {
  return apiFetch<OnboardArtistsResponse>("/artists", {
    method: "GET",
    query: {
      page: params.page,
      size: params.size,
      ...(params.query ? { query: params.query } : {}),
    },
  });
}
