import { fetchClient } from '@/api/client';
import type { GetMagazinesPayload, GetMagazineParams } from '@/types/magazine';
import { ApiResponse } from '@/types/api';

export function getMagazines(params: GetMagazineParams = {}): Promise<ApiResponse<GetMagazinesPayload>> {
  const order = params.order ?? "recent";
  const page = params.page ?? 0;
  const size = params.size ?? 20;

  const qs = new URLSearchParams();
  qs.set("order", order);
  qs.set("page", String(page));
  qs.set("size", String(size));
  if (params.query) qs.set("query", params.query);

  return fetchClient<GetMagazinesPayload>(`/magazines?${qs.toString()}`, {
    method: "GET",
    auth: true,
  });
}