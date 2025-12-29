import Image from 'next/image';
import concertData from '@/mocks/mockConcertDetail.json';
import paper from '@/assets/detail/Paper.svg';

interface ConcertStorySectionProps {
  concert: (typeof concertData.concerts)[number];
}
export default function ConcertStorySection({ concert }: ConcertStorySectionProps) {
  return (
    <section className="px-5 gap-2 mb-10">
      <p className="flex gap-2">
        <Image src={paper} alt="paper" width={24} height={24} />
        <span>공연 스토리</span>
      </p>
      <p className="py-3 text-gray-500 font-medium text-sm">{concert.description}</p>
    </section>
  );
}
