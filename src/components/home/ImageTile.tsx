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
};

const variantSize: Record<Variant, { w: number; h: number; wrap: string }> = {
  todayArtistRec: { w: 184, h: 184, wrap: "w-[184px] h-[184px]" },
  artistRec: { w: 160, h: 160, wrap: "w-[160px] h-[160px]" },
  concertRec: { w: 160, h: 226, wrap: "w-[160px] h-[226px]" },
  indieStory: { w: 162, h: 202, wrap: "w-[162px] h-[202px]" },
};

export function ImageTile({
                            src,
                            alt,
                            variant = "todayArtistRec",
                            className,
                            gradient,
                          }: ImageTileProps) {
  const { w, h, wrap } = variantSize[variant];

  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <div className={clsx("relative overflow-hidden", wrap)}>
      <Image
        src={imgSrc}
        alt={"Image"}
        width={w}
        height={h}
        className={clsx("h-full w-full object-cover", className)}
        onError={() => {
          if (imgSrc !== concertDefault.src) {
            setImgSrc(concertDefault.src);
          }
        }}
      />
      {gradient && (
        <div className={clsx("pointer-events-none absolute inset-0", gradient)} />
      )}
    </div>
  );
}
