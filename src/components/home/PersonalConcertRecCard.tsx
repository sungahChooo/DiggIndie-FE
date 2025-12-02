import { Concert } from "@/types/concerts";
import { ImageTile } from "@/components/home/ImageTile";
import Image from "next/image";
import playBtn from "../../assets/icons/play.svg"


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

export default function PersonalConcertRecCard({ concert }: Props) {
  return (
    <div className="flex flex-col flex-none w-[160px] bg-[#1F1D1D] rounded-b-[4px]">
      <div className={"relative flex flex-col"}>
        <ImageTile
          src={concert.imageUrl}
          alt={concert.title}
          variant="rect"
          className={"rounded-t-[4px]"}
          gradient={"bg-gradient-to-t from-black/80 via-black/30 to-transparent"}
        />
        <div className={"flex flex-col absolute z-5 mt-[134px] " +
          "text-[12px] mx-[8px] "}>
          <span className={"flex w-[41px] h-[17px] bg-[#FF3637] items-center justify-center rounded-[2px]"}>
            D-{daysUntilConcert(concert.date)}
          </span>
          <span className={"text-[16px] mt-[4px]"}>
            {concert.description}
          </span>
          <span className={"text-[14px]"}>
            {concert.artists}
          </span>
          <span className={"text-[12px] text-[#8C8888]"}>
            {concert.date}
          </span>
        </div>
      </div>
    </div>
  );
}
