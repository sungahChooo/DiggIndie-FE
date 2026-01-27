import { MockIndieStory } from "@/types/mocks/mockIndieStory";
import { ImageTile } from "@/components/home/ImageTile";
import { useMagazines } from "@/hooks/useMagazines";

type Props = {
  indieStory: MockIndieStory;
};

export default function MagazineBanner({ indieStory }: Props) {
  return (
    <div className="flex flex-col flex-none w-[160px] bg-[#1F1D1D] rounded-b-[4px] border-">
      <div className={"relative flex flex-col"}>
        <ImageTile
          src={indieStory.imageUrl}
          alt={indieStory.title}
          variant="indieStory"
          className={"rounded-[4px]"}
          gradient={"bg-gradient-to-t from-black/80 via-black/30 to-transparent"}
        />
        <div className={"flex flex-col absolute z-5 mt-[152px] mx-[8px] "}>
          <span className={"w-[138px] h-[22px] text-[16px] text-white font-semibold"}>
            {indieStory.title}
          </span>
          <span className={"w-[138px] h-[20px] text-[14px] text-white"}>
            {indieStory.description}
          </span>
        </div>
      </div>
    </div>
  );
}
