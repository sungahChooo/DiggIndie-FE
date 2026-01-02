import Image from 'next/image';
import share from '@/assets/common/share.svg';

interface DetailImgSectionProps {
  imageSrc: string;
  alt?: string;
  onShare?: () => void;
}
export default function DetailImgSection({
  imageSrc,
  alt = 'detail image',
  onShare,
}: DetailImgSectionProps) {
  return (
    <section className="relative">
      <Image
        src={imageSrc}
        alt={alt}
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
        onClick={onShare}
      />
    </section>
  );
}
