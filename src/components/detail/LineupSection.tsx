import Image from 'next/image';
import concertData from '@/mocks/mockConcertDetail.json';
import lineup from '@/assets/common/Profile.svg';

interface LineupSectionProps {
  concert: (typeof concertData.concerts)[number];
}
export default function LineupSection({ concert }: LineupSectionProps) {
  return (
    <section className="flex flex-col px-5 py-2 gap-4 my-6">
      <p className="flex gap-2">
        <Image src={lineup} alt="lineup" width={24} height={24} />
        <span className="font-medium text-base">라인업</span>
      </p>
      <p>
        {concert.lineUp.map((artist) => (
          <span key={artist.artistId} className="font-medium text-sm mr-4">
            {artist.artistName}
          </span>
        ))}
      </p>
    </section>
  );
}
