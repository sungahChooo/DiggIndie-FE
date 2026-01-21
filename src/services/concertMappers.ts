import type { MyConcertItem, ConcertItem, RecConcertItem} from "@/types/concerts";

//api 변수 이름 매핑
export function myConcertToConcertItem(item: MyConcertItem): ConcertItem {
  return {
    concertId: item.concertId,
    concertName: item.concertName,
    dDay: item.dday,
    period: item.duration,
    mainImage: item.imageUrl,
    lineUp: [],
  };
}


export function recToConcertItem(item: RecConcertItem): ConcertItem {
  return {
    concertId: item.concertId,
    concertName: item.concertName,
    dDay: item.dDay,
    period: item.duration,
    mainImage: item.imageUrl,
    lineUp: item.lineUp.map((b) => b.bandName),
  };
}
