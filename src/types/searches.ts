export interface RecentSearch {
  recentSearchId: number;
  content: string;
  category: string;
  createdAt: string;
}
export interface RecentSearchResponse {
  searches: RecentSearch[];
}
