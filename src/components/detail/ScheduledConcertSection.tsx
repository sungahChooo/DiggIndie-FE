import Image from 'next/image';
import artistData from '@/mocks/mockArtistDetail.json';
interface ScheduledConcertSectionProps {
  artist: (typeof artistData.artists)[number];
}
export default function ScheduledConcertSection({ artist }: ScheduledConcertSectionProps) {
  return (
    <section className="px-5 mb-9">
      <span className="font-semibold text-xl mb-3">진행 예정 공연</span>
      <div className="mt-3">
        {artist.scheduledConcert.map((concert) => (
          <div key={concert.concertId}>
            <div className="py-4 relative w-[160px] h-[226px]">
              <Image
                src={concert.concertImage}
                alt={concert.concertName}
                fill
                className="relative object-cover rounded-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black/80"></div>
              <div className="absolute bottom-2 left-2 right-2 text-white flex flex-col">
                <span className="inline-block self-start bg-main-red-2 px-2 font-medium text-white text-sm rounded-xs mb-1">
                  {concert.dDay}
                </span>
                <span className="font-medium text-base text-white">{concert.concertName}</span>
                <span className="font-normal text-sm text-white truncate block w-full">
                  {concert.lineUp.join(', ')}
                </span>
                <span className="font-normal text-sm text-gray-500">{concert.concertDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
