export interface ApiResponse<T> {
  statusCode: number;
  isSuccess: boolean;
  message: string;
  payload: T;
}
export interface Keyword {
  keywordId: number;
  keyword: string;
}
export interface KeywordResponse {
  statusCode: number;
  isSuccess: boolean;
  message: string;
  payload: Keyword[];
}
