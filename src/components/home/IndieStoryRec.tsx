import IndieStoryRecCard from '@/components/home/IndieStoryRecCard';
import { mockIndieStory } from '@/mocks/mockIndieStory';
import Image from "next/image";
import more from "../../assets/icons/more.svg"
import { IndieStory } from '@/types/indieStory';

export default function IndieStoryRec() {
  return (
    <div className="w-[375px] h-[257px] flex flex-col bg-black mt-[40px]">
      <div className={"flex mx-[20px] mb-[12px]"}>
        <span className="text-[20px] font-semibold mr-[4px]">
          인디스토리
        </span>
        <Image src={more} alt="more" width={24} height={24}/>
      </div>
      <div className="flex overflow-x-auto">
        <div className="flex gap-[16px] w-max">
          {mockIndieStory.map((indieStory: IndieStory) => (
            <IndieStoryRecCard key={indieStory.id} indieStory={indieStory} />
          ))}
        </div>
      </div>
    </div>
  );
}
