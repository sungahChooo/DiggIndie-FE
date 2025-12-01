
import Image from "next/image";
import clsx from "clsx";

type ImageTileProps = {
    src: string;
    alt: string;
    variant?: "square" | "smallSquare" | "rect";
    className?: string;
};

const variantClasses = {
    square: "w-[184px] h-[184px]",
    smallSquare: "w-[160px] h-[160px]",
    rect: "w-[162px] h-[202px]",
};

export function ImageTile({
                              src,
                              alt,
                              variant = "square", //default
                              className,
                          }: ImageTileProps) {
    return (
        <div className={clsx("flex flex-col relative", className)}>
            <div
                className={clsx("",
                    variantClasses[variant],
                )}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover rounded-[4px]"
                />
            </div>

        </div>
    );
}
