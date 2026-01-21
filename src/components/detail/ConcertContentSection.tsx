import Image from 'next/image';
//import concertData from '@/mocks/mockConcertDetail.json';
import Calendar from '@/assets/common/Calendar.svg';
import ticket from '@/assets/common/ticket.svg';
import location from '@/assets/detail/Location.svg';
import BookmarkIcon from '@/components/detail/BookmarkIcon';
import { ConcertDetail } from '@/types/concerts';
import { formatConcertDate } from '@/hooks/getDay';

interface ConcertContentSectionProps {
  concert: ConcertDetail;
  isLoggedIn?: boolean;
  isScrapped: boolean;
  onToggleScrap: () => void;
}
export default function ConcertContentSection({
  concert,
  isLoggedIn,
  isScrapped,
  onToggleScrap,
}: ConcertContentSectionProps) {
  console.log('Concert Data exists:', !!concert, '스크랩 데이터', isScrapped);
  return (
    <section className="px-5 pt-5 pb-7 border-b-4 border-gray-800">
      <p className="flex justify-between gap-6 pb-1">
        <span className="font-semibold text-xl">{concert.concertName}</span>
        <BookmarkIcon
          isActive={isScrapped}
          onClick={isLoggedIn ? onToggleScrap : undefined}
          className={`w-6 h-6 transition-colors
            ${
              isLoggedIn
                ? isScrapped
                  ? 'text-white scale-110 cursor-pointer'
                  : 'text-white cursor-pointer'
                : 'text-gray-600 cursor-not-allowed'
            }
          `}
        />
      </p>
      <p className="flex flex-col pb-4 border-b border-gray-850">
        <span className="flex gap-2 items-start">
          <Image src={Calendar} alt="calendar" width={24} height={24} />
          <span className="text-white text-xl font-medium">
            {formatConcertDate(concert.startDate, concert.endDate)}
          </span>
        </span>
        {/* <span className="flex gap-2">
          <Image src={Calendar} alt="calendar" width={24} height={24} />
          <span className="text-white text-xl font-medium">{concert.endDate}</span>
        </span> */}
      </p>
      <p className="flex gap-2 items-center py-3 pb-4 border-b border-gray-850 mb-3 items-start">
        <Image src={location} alt="location" width={24} height={24} />
        <span className="flex flex-col">
          <span className="font-medium text-base line-clamp-2">{concert.concertHallName}</span>
          <span className="font-normal text-sm text-gray-500 line-clamp-2">{concert.address}</span>
        </span>
      </p>
      <div className="flex gap-2 items-start">
        <Image src={ticket} alt="ticket" width={24} height={24} />
        <div>
          <p className="flex gap-1 items-end">
            <span
              className={`font-normal text-base ${concert.onsitePrice != null ? 'text-white text-gray-200' : 'text-gray-400'}`}
            >
              {concert.onsitePrice != null ? `${concert.onsitePrice}원` : '가격정보 없음'}
            </span>
            <span className="text-gray-600 text-xs">현장예매</span>
          </p>
          <p className="flex gap-1 items-end">
            <span
              className={`font-normal text-base ${concert.preorderPrice != null ? 'text-white' : 'text-gray-400'}`}
            >
              {concert.preorderPrice != null ? `${concert.preorderPrice}원` : '가격정보 없음'}
            </span>
            <span className="text-gray-600 text-xs">사전예매</span>
          </p>
        </div>
      </div>
    </section>
  );
}
