export type Concert = {
  id: string;
  title: string;
  artists: string;
  date: string;
  dDay: string;
  time: string;
  location: string;
  imageUrl: string;
  description: string;
};
export type ConcertListItem = {
  concertId: number;
  concertName: string;
  dDay: string;
  lineUp: string[];
  mainImage: string;
  period: string;
};

export type ConcertListResponse = {
  concerts: ConcertListItem[];
};
