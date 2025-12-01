import TodayArtistRecCard from '@/components/home/TodayArtistRecCard';
import { mockArtists } from '@/mocks/mockArtists';

export default function TodayArtistRec() {
  return (
    <div className="w-[375px] h-[286px] flex flex-col bg-black">
      <span className="mx-[20px] mt-[12px] mb-[20px] font-semibold">
        오늘의 밴드 추천
      </span>
      <div className="flex overflow-x-auto">
        <div className="flex gap-[16px] w-max">
          {mockArtists.map((artist) => (
            <TodayArtistRecCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    </div>
  );
}
