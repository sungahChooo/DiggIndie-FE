import Image from 'next/image';
import concertData from '@/mocks/mockConcertDetail.json';
import share from '@/assets/common/share.svg';

interface DetailImgSectionProps {
  content: (typeof concertData.concerts)[number];
}
export default function DetailImgSection({ content }: DetailImgSectionProps) {
  return (
    <section className="relative">
      <Image
        src={content.mainImage}
        alt="Artist Image"
        width={376}
        height={531}
        className="relative py-[18px] px-[19px]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black/80"></div>
      <Image
        src={share}
        alt="share"
        width={24}
        height={24}
        className="absolute bottom-[18px] right-[18px] cursor-pointer"
      />
    </section>
  );
}
