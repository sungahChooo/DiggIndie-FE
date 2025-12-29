import Image from 'next/image';
import concertData from '@/mocks/mockConcertDetail.json';
import bookmark from '@/assets/detail/bookMark.svg';
import Calendar from '@/assets/common/Calendar.svg';
import ticket from '@/assets/common/ticket.svg';
import location from '@/assets/detail/Location.svg';

interface ConcertContentSectionProps {
  concert: (typeof concertData.concerts)[number];
}
export default function ConcertContentSection({ concert }: ConcertContentSectionProps) {
  return (
    <section className="px-5 pt-5 pb-7 border-b-4 border-gray-800">
      <p className="flex justify-between items-center gap-6">
        <span className="font-semibold text-xl">{concert.concertName}</span>
        <Image src={bookmark} alt="bookmark" width={24} height={24} className="cursor-pointer" />
      </p>
      <p className="flex gap-2 pb-3 border-b border-gray-850">
        <Image src={Calendar} alt="calendar" width={24} height={24} />
        <span className="text-white text-xl font-medium">{concert.startDate}</span>
      </p>
      <p className="flex gap-2 items-center py-3 pb-3 border-b border-gray-850 mb-3 items-start">
        <Image src={location} alt="location" width={24} height={24} />
        <span className="flex flex-col">
          <span className="font-medium text-base">{concert.concertHallName}</span>
          <span className="font-normal text-sm text-gray-500">{concert.address}</span>
        </span>
      </p>
      <div className="flex gap-2 items-start">
        <Image src={ticket} alt="ticket" width={24} height={24} />
        <div>
          <p className="flex gap-1 items-end">
            <span className="font-normal text-base text-white">
              {concertData.concerts[0].onSite}원
            </span>
            <span className="text-gray-500 text-xs ">현장예매</span>
          </p>
          <p className="flex gap-1 items-end">
            <span className="font-normal text-base text-white">
              {concertData.concerts[0].preorderPrice}원
            </span>
            <span className="text-gray-500 text-xs">사전예매</span>
          </p>
        </div>
      </div>
    </section>
  );
}
