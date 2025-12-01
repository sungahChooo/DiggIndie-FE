
import Image from "next/image";
import clsx from "clsx";

type ImageTileProps = {
  src: string;
  alt: string;
  variant?: "square" | "smallSquare" | "rect";
  className?: string;
  gradient?: string;
};

const variantClasses = {
  square: "w-[184px] h-[184px]",
  smallSquare: "w-[160px] h-[160px]",
  rect: "w-[162px] h-[202px]",
};

export function ImageTile({ src, alt, variant = "square", className, gradient}: ImageTileProps) {
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
