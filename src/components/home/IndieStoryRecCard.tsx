import { IndieStory } from "@/types/indieStory";
import { ImageTile } from "@/components/home/ImageTile";


type Props = {
  indieStory: IndieStory;
};

export default function PersonalConcertRecCard({ indieStory }: Props) {
  return (
    <div className="flex flex-col flex-none w-[160px] bg-[#1F1D1D] rounded-b-[4px]">
      <div className={"relative flex flex-col"}>
        <ImageTile
          src={indieStory.imageUrl}
          alt={indieStory.title}
          variant="indieStory"
          className={"rounded-t-[4px]"}
          gradient={"bg-gradient-to-t from-black/80 via-black/30 to-transparent"}
        />
        <div className={"flex flex-col absolute z-5 mt-[152px] mx-[8px] "}>
          <span className={"w-[138px] h-[22px] text-[16px] font-semibold"}>
            {indieStory.title}
          </span>
          <span className={"w-[138px] h-[20px] text-[14px]"}>
            {indieStory.description}
          </span>
        </div>
      </div>
    </div>
  );
}
