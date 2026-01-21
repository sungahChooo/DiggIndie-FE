export function getThisWeekDates(weekOffset: number = 0) {
  const today = new Date();
  const day = today.getDay();

  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday + weekOffset * 7);

  const result = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const date = String(d.getDate()).padStart(2, '0');

    result.push(`${year}-${month}-${date}`);
  }
  return result;
}
/* 공연 상세페이지 시작 날짜, 종료 날짜 처리 용 */
export const formatConcertDate = (start: string, end?: string) => {
  const format = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
      d.getDate()
    ).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(
      2,
      '0'
    )}`;
  };

  if (!end || start === end) {
    return format(start);
  }

  return `${format(start)} ~ ${format(end)}`;
};

//api에서 xxxx.xx.xx ~ xx로 주는 걍우 (recommendation) 첫날짜 기준으로
function cutStartDate(period: string) {
  return period.split('~')[0].trim();
}


export function daysUntilConcert(targetDate: string): number {
  const today = new Date();
  const target = new Date(cutStartDate(targetDate));

  const diff = target.getTime() - today.getTime();
  const oneDay = 1000 * 60 * 60 * 24;

  return Math.ceil(diff / oneDay);
}
