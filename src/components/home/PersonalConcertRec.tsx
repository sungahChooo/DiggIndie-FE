import ConcertCard from '@/components/home/ConcertCard';;
import Image from "next/image";
import more from "../../assets/icons/more.svg"
import { mockConcerts } from '@/mocks/mockConcerts';
import { daysUntilConcert } from '@/components/home/ConcertCard';

type Props = {
  isLoggedIn: boolean;
};

export default function PersonalConcertRec({ isLoggedIn }: Props) {
  return (
    <div className="w-[375px] h-[266px] flex flex-col mt-[40px]">
      <div className={"flex mx-[20px] mb-[12px]"}>
        <span className="h-[28px] font-semibold mr-[4px] text-[20px]">
          리스너님을 위한 추천 공연
        </span>
        <Image src={more} alt="more" width={24} height={24}/>
      </div>
      <div className={`flex overflow-x-auto ml-[20px] ${isLoggedIn ? "blur-sm" : "blur-none"}`}>
        <div className="flex gap-[16px] w-max">
          {mockConcerts
            .filter((concert) => daysUntilConcert(concert.date) >= 1)
            .sort((a, b) => daysUntilConcert(a.date) - daysUntilConcert(b.date))
            .map((concert) => (
              <ConcertCard key={concert.id} concert={concert} />
            ))}
        </div>
      </div>
    </div>
  );
}
