import Image from 'next/image';
// import concertData from '@/mocks/mockConcertDetail.json';
import lineup from '@/assets/common/Profile.svg';
import { ConcertDetail } from '@/types/concerts';
import { useRouter } from 'next/navigation';

interface LineupSectionProps {
  concert: ConcertDetail;
}
export default function LineupSection({ concert }: LineupSectionProps) {
  const router = useRouter();
  return (
    <section className="flex flex-col px-5 py-2 gap-4 my-6">
      <p className="flex gap-2">
        <Image src={lineup} alt="lineup" width={24} height={24} />
        <span className="font-medium text-base">라인업</span>
      </p>
      <p>
        {concert.lineUp.map((artist) => (
          <span
            key={artist.bandId}
            className="font-medium text-sm mr-4 cursor-pointer hover:text-gray-400"
            onClick={() => router.push(`/artist/${artist.bandId}`)}
          >
            {artist.bandName}
          </span>
        ))}
      </p>
    </section>
  );
}
