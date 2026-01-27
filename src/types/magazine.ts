
export interface PageInfo {
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

export type MagazineOrder = "recent" | "view";

export type GetMagazineParams = {
  order?: MagazineOrder;
  query?: string;
  page?: number;
  size?: number;
};

export type MagazineItem = {
  magazineId: number;
  title: string;
  content: string;
  externalUrl: string;
  view: number;
  imageUrls: string[];
  createdAt: string;
};

export type GetMagazinesPayload = {
  magazines: MagazineItem[];
  pageInfo: PageInfo;
};