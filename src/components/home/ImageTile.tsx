
import Image from "next/image";
import clsx from "clsx";

type ImageTileProps = {
  src: string;
  alt: string;
  variant?: "todayArtistRec" | "artistRec" | "concertRec" | "indieStory";
  className?: string;
  gradient?: string;
};

const variantClasses = {
  todayArtistRec: "w-[184px] h-[184px]",
  artistRec: "w-[160px] h-[160px]",
  concertRec: "w-[160px] h-[226px]",
  indieStory: "w-[162px] h-[202px]"
};

export function ImageTile({ src, alt, variant = "todayArtistRec", className, gradient}: ImageTileProps) {
  return (
    <div className={clsx("flex flex-col relative")}>
      <div className={clsx("", variantClasses[variant])}>
        <Image src={src} alt={alt} fill className={clsx("object-cover", className)}/>
        {gradient && (
          <div className={clsx("pointer-events-none absolute inset-0", gradient)} />
        )}
      </div>
    </div>
  );
}
