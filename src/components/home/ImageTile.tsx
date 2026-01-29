import Image from "next/image";
import clsx from "clsx";
import { useEffect, useState } from "react";
import concertDefault from "@/assets/common/concertDefault.png";

type Variant = "todayArtistRec" | "artistRec" | "concertRec" | "indieStory";

type ImageTileProps = {
  src: string;
  alt: string;
  variant?: Variant;
  className?: string;
  gradient?: string;
  wrapClassName?: string;
};

const variantMeta: Record<Variant, { w: number; h: number; aspect: string }> = {
  todayArtistRec: { w: 184, h: 184, aspect: "aspect-square" },
  artistRec: { w: 160, h: 160, aspect: "aspect-square" },
  concertRec: { w: 160, h: 226, aspect: "aspect-[160/226]" },
  indieStory: { w: 162, h: 202, aspect: "aspect-[162/202]" },
};

export function ImageTile({
                            src,
                            alt,
                            variant = "todayArtistRec",
                            className,
                            gradient,
                            wrapClassName,
                          }: ImageTileProps) {
  const { w, h, aspect } = variantMeta[variant];
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <div className={clsx("relative w-full overflow-hidden", aspect, wrapClassName)}>
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 160px"
        className={clsx("object-cover", className)}
        onError={() => {
          if (imgSrc !== concertDefault.src) setImgSrc(concertDefault.src);
        }}
      />
      {gradient && (
        <div className={clsx("pointer-events-none absolute inset-0", gradient)} />
      )}
    </div>
  );
}
