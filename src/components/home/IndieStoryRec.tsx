import IndieStoryRecCard from '@/components/home/IndieStoryRecCard';
import { mockIndieStory } from '@/mocks/mockIndieStory';
import { IndieStory } from '@/types/indieStory';

export default function IndieStoryRec() {
  return (
    <div className="w-[375px] h-[234px] flex flex-col bg-[#332F2F]">
      <div className="flex overflow-x-auto">
        <div className="flex gap-[16px] mt-[12px] w-max">
          {mockIndieStory.map((indieStory: IndieStory) => (
            <IndieStoryRecCard key={indieStory.id} indieStory={indieStory} />
          ))}
        </div>
      </div>
    </div>
  );
}
