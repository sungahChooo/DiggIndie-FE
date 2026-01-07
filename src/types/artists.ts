export interface Artist {
  bandId: number;
  bandName: string;
  imageUrl: string | null;
}

export interface PageInfo {
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

export interface OnboardArtistsResponse {
  statusCode: number;
  message: string;
  pageInfo: PageInfo;
  payload: Artist[];
  isSuccess: boolean;
}
