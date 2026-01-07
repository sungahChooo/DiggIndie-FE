import { apiFetch } from "@/api/client";
import type { GetConcertsResponse } from "@/types/concerts";

export type GetConcertsParams = {
  date: string;     //YYYY-MM-DD
  page?: number;
  size?: number;
  sort?: string;
  useDevAuth?: boolean;
};

export async function getConcerts(params: GetConcertsParams): Promise<GetConcertsResponse> {
  const { date, page = 0, size = 2, sort, useDevAuth } = params;

  return apiFetch<GetConcertsResponse>("/concerts", {
    query: {
      date,
      page,
      size,
      ...(sort ? { sort } : {}),
    },
    useDevAuth,
  });
}
