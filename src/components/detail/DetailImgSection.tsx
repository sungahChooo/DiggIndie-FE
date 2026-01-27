'use client';

import Image, { StaticImageData } from 'next/image';
import default_image from '@/assets/detail/concert_default.svg';
import { useState } from 'react';

interface DetailImgSectionProps {
  imageSrc?: string | null;
  alt?: string;
  type?: 'artist' | 'concert';
}

type ImageSrc = string | StaticImageData;


export default function DetailImgSection({
  imageSrc,
  alt = 'detail image',
  type,
}: DetailImgSectionProps) {
  const [hasError, setHasError] = useState(false);

  // 깨진 이미지가 있으면 fallback
  const src: ImageSrc = !hasError && imageSrc ? imageSrc : default_image;
  const showGradient = src !== default_image;
  // type에 따라 높이 클래스 결정
  const heightClass = type === 'artist' ? 'h-96' : 'h-120';
  return (
    <section className={`${heightClass} w-full relative`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
        onError={() => {
          if (!hasError) setHasError(true); // 실패 시 디폴트로 교체
        }}
      />
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
      )}
    </section>
  );
}
