
import { fetchClient } from "@/api/client";
import { ApiResponse } from '@/types/api';
import type { PresignedImageParams, PresignedImagePayload } from '@/types/file.ts'


//이미지 업로드
export async function postImage(params: PresignedImageParams): Promise<ApiResponse<PresignedImagePayload>> {
  const { fileName } = params;

  return fetchClient<PresignedImagePayload>(`/files/presigned-url`, {
    method: 'POST',
    auth: true,
    body: JSON.stringify({ fileName }),
  });
}