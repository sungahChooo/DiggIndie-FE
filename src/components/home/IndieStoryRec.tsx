import IndieStoryRecCard from '@/components/home/IndieStoryRecCard';
import { mockIndieStory } from '@/mocks/mockIndieStory';
import { MockIndieStory } from '@/types/mocks/mockIndieStory';

export default function IndieStoryRec() {
  return (
    <div
      className="w-full pb-5 flex flex-col
        bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(120,3,3,0.18)_9.08%)]"
    >
      <div className="flex overflow-x-auto pt-3">
        <div className="flex gap-4 justify-between">
          {mockIndieStory.map((indieStory: MockIndieStory) => (
            <IndieStoryRecCard key={indieStory.id} indieStory={indieStory} />
          ))}
        </div>
      </div>
    </div>
  );
}
