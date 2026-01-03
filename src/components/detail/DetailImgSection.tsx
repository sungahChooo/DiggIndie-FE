import Image from 'next/image';
import share from '@/assets/common/share.svg';
import { DEFAULT_DETAIL_IMAGE, DetailImageVariant } from '@/assets/detail/Defulat-Image';

interface DetailImgSectionProps {
  imageSrc?: string;
  variant: DetailImageVariant;
  alt?: string;
  onShare?: () => void;
}
export default function DetailImgSection({
  imageSrc,
  variant,
  alt = 'detail image',
  onShare,
}: DetailImgSectionProps) {
  const isDefaultImage = !imageSrc || imageSrc.trim() === '';
  const resolvedImage = imageSrc || DEFAULT_DETAIL_IMAGE[variant];

  return (
    <section className="relative">
      <Image src={resolvedImage} alt={alt} width={376} height={531} className="relative" />
      {!isDefaultImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black/80"></div>
      )}
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
