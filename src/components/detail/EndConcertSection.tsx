import Image from 'next/image';
// import artistData from '@/mocks/mockArtistDetail.json';
import { ArtistDetail } from '@/types/artists';
import { useRouter } from 'next/navigation';

interface EndedConcertSectionProps {
  artist: ArtistDetail;
}
export default function EndedConcertSection({ artist }: EndedConcertSectionProps) {
  const router = useRouter();
  return (
    <section className="px-5 pb-6">
      <span className="font-semibold text-xl mb-3">종료된 공연</span>
      <div className="flex gap-3 overflow-x-auto whitespace-nowrap mt-3">
        {artist.endedConcerts.length ? (
          artist.endedConcerts.map((concert) => (
            <div
              key={concert.concertId}
              className="my-4 relative w-40 h-[226px] flex-shrink-0 cursor-pointer"
              onClick={() => router.push(`/concert/${concert.concertId}`)}
            >
              <Image
                src={concert.concertImage}
                alt={concert.concertName}
                fill
                className="relative object-cover rounded-sm"
              />
              <div className="absolute inset-0 bg-black/70" />
              <span className="absolute inset-0 flex items-center justify-center text-base font-medium text-white">
                종료된 공연입니다
              </span>
            </div>
          ))
        ) : (
          <span className="text-gray-400 text-sm font-bold">종료된 공연이 없습니다.</span>
        )}
      </div>
    </section>
  );
}
