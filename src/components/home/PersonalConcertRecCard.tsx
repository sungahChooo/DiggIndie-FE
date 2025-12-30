import { Concert } from "@/types/concerts";
import { ImageTile } from "@/components/home/ImageTile";

type Props = {
  concert: Concert;
};

export function daysUntilConcert(targetDate: string): number {
  const today = new Date();
  const target = new Date(targetDate);

  const diff = target.getTime() - today.getTime();
  const oneDay = 1000 * 60 * 60 * 24;

  return Math.ceil(diff / oneDay);
}

function getDay(dateStr: string): string {
  return dateStr.split("-")[2];
}

export default function PersonalConcertRecCard({ concert }: Props) {
  const dDay = daysUntilConcert(concert.date);

  return (
    <div className="flex flex-col flex-none w-[160px] bg-[#1F1D1D] rounded-b-[4px]">
      <div className={`relative flex flex-col overflow-x-auto ${dDay < 0 ? "brightness-[0.4]" : ""}`}>
        <ImageTile
          src={concert.imageUrl}
          alt={concert.title}
          variant="concertRec"
          className="rounded-t-[4px]"
          gradient="bg-gradient-to-t from-black/80 via-black/30 to-transparent"
        />

        {dDay >= 0 && (
          <div className="flex flex-col absolute z-5 mt-[134px] text-[12px] mx-[8px]">
            <span className="flex w-[41px] h-[17px] bg-[#FF3637] items-center justify-center rounded-[2px]">
              D-{dDay}
            </span>
            <span className="text-[16px] mt-[4px]">
              {concert.description}
            </span>
            <span className="text-[14px]">
              {concert.artists}
            </span>
            <span className="text-[12px] text-[#8C8888]">
              {concert.date} ~ {getDay(concert.endDate)}
            </span>
          </div>
        )}

        {dDay < 0 && (
          <div className="flex flex-col absolute z-5 justify-center items-center">
            <span className="text-[16px] mt-[102px] mx-[22px] font-medium text-white brightness-[1.0]" >
              종료된 공연입니다
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
