import type { MockIndieStory } from "@/types/mocks/mockIndieStory";
import { ImageTile } from "@/components/home/ImageTile";

type Props = {
  indieStory: MockIndieStory;
};

export default function IndieStoryCard({ indieStory }: Props) {
  const img = indieStory.imageUrl

  return (
    <div className="flex flex-col flex-none w-[160px] bg-[#1F1D1D] rounded-b-[4px]">
      <div className={"relative flex flex-col"}>
        <ImageTile
          src={img}
          alt={indieStory.title}
          variant="indieStory"
          className={"rounded-[4px]"}
        />
      </div>
    </div>
  );
}
