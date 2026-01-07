import Image from 'next/image';
import artistData from '@/mocks/mockArtistDetail.json';

interface EndedConcertSectionProps {
  artist: (typeof artistData.artists)[number];
}
export default function EndedConcertSection({ artist }: EndedConcertSectionProps) {
  return (
    <section className="px-5">
      <span className="font-semibold text-xl mb-3">종료된 공연</span>
      {artist.endedConcert.map((concert) => (
        <div key={concert.concertId} className="my-4 relative w-40 h-[226px]">
          <Image
            src={concert.concertImage}
            alt={concert.concertName}
            fill
            className="relative object-cover rounded-sm"
          />
          <div className="absolute inset-0 bg-black/70"></div>
          <span className="absolute inset-0 flex items-center justify-center text-base font-medium text-white">
            종료된 공연입니다
          </span>
        </div>
      ))}
    </section>
  );
}
