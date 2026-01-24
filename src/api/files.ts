import { fetchClient } from '@/api/client';


export type PresignedUrlPayload = {
  presignedUrl: string;
  fileUrl: string;
};

//이미지 url 반환
export async function getPresignedUrl(fileName: string) {
  return fetchClient<PresignedUrlPayload>('/files/presigned-url', {
    method: 'GET',
    auth: true,
    body: JSON.stringify({ fileName }),
  });
}

// presignedUrl로 업로드
export async function uploadToPresignedUrl(params: {
  presignedUrl: string;
  file: File;
}) {
  const { presignedUrl, file } = params;

  const res = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
    body: file,
  });

  if (!res.ok) {
    throw new Error(`S3 upload failed: ${res.status}`);
  }
}
