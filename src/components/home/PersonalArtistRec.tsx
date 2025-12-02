import PersonalArtistRecCard from '@/components/home/PersonalArtistRecCard';
import { mockArtists } from '@/mocks/mockArtists';
import Image from "next/image";
import more from "../../assets/icons/more.svg"

export default function TodayArtistRec() {
  return (
    <div className="w-[375px] h-[257px] flex flex-col bg-black mt-[40px]">
      <div className={"flex mx-[20px] mb-[12px]"}>
        <span className="text-[20px] font-semibold mr-[4px]">
          리스너님을 위한 추천 아티스트
        </span>
        <Image src={more} alt="more" width={24} height={24}/>
      </div>
      <div className="flex overflow-x-auto">
        <div className="flex gap-[16px] w-max">
          {mockArtists.map((artist) => (
            <PersonalArtistRecCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    </div>
  );
}
