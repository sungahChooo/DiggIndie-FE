
export type PageInfo = {
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

//이미지 업로드
export type PresignedImageParams = {
  fileName: string;
}

export type PresignedImagePayload = {
  presignedUrl: string;
  fileKey: string;
  expiresIn: number;
}