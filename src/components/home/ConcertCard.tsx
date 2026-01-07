
import { ImageTile } from "@/components/home/ImageTile";
import { useRouter } from 'next/navigation';
import { ConcertListItem } from '@/types/mocks/mockConcerts';


type Props = {
  concert: ConcertListItem;
};

export function daysUntilConcert(targetDate: string): number {
  const today = new Date();
  const target = new Date(targetDate);

  const diff = target.getTime() - today.getTime();
  const oneDay = 1000 * 60 * 60 * 24;

  return Math.ceil(diff / oneDay);
}

export default function ConcertCard({ concert }: Props) {
  const dDay = concert.dDay;
  const router = useRouter();
  return (
    <div
      className="flex flex-col flex-none w-[160px] bg-[#1F1D1D] rounded-b-[4px] cursor-pointer"
      onClick={() => router.push(`/concert/${concert.concertId}`)}
    >
      <div
        className={`relative flex flex-col overflow-x-auto ${
          dDay === '공연 종료' ? 'brightness-[0.4]' : ''
        }`}
      >
        <ImageTile
          src={concert.mainImage}
          alt={concert.concertName}
          variant="concertRec"
          className="rounded-t-sm"
          gradient="bg-gradient-to-t from-black/80 via-black/30 to-transparent"
        />

        {dDay !== '공연 종료' && (
          <div className="flex flex-col absolute z-5 mt-[134px] text-sm mx-2">
            <span className="flex w-[41px] h-[17px] bg-[#FF3637] items-center justify-center rounded-xs">
              {concert.dDay}
            </span>
            <span className="text-base mt-1">{concert.concertName}</span>
            <span className="text-[14px]">{concert.lineUp}</span>
            <span className="text-sm text-[#8C8888]">{concert.period}</span>
          </div>
        )}

        {dDay === '공연 종료' && (
          <div className="flex flex-col absolute z-5 justify-center items-center">
            <span className="text-base mt-[102px] mx-[22px] font-medium text-white brightness-[1.0]">
              종료된 공연입니다
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
