import { ImageTile } from "@/components/home/ImageTile";
import type { MagazineItem } from "@/types/magazine";

type Props = {
  magazine?: MagazineItem | null;
  rounded?: boolean;
};

export default function MagazineCard({ magazine, rounded }: Props) {
  const img = magazine?.imageUrls?.[0] ?? "";
  const externalUrl = magazine?.externalUrl

  return (
    <div className={`flex flex-col flex-none w-[160px] bg-[#1F1D1D] `}>
      <div className={`relative flex flex-col cursor-pointer ${
        rounded ? "rounded-sm" : ""}`}
           onClick={() => window.open(externalUrl, "_blank", "noopener,noreferrer")}
      >
        <ImageTile
          src={img}
          alt={magazine?.title ?? ""}
          variant="indieStory"
          className={`${rounded ? "rounded-sm" : ""}`}
        />
      </div>
    </div>
  );
}
