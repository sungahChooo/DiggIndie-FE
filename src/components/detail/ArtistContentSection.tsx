import Image from 'next/image';
import play from '@/assets/common/play.svg';
import voice from '@/assets/common/Voice 3.svg';
import profile from '@/assets/common/Profile.svg';
import BookmarkIcon from '@/components/detail/BookmarkIcon';
import artistData from '@/mocks/mockArtistDetail.json';
import { useState } from 'react';

interface ArtistContentSectionProps {
  artist: (typeof artistData.artists)[number];
}
export default function ArtistContentSection({ artist }: ArtistContentSectionProps) {
  const [isScrapped, setIsScrapped] = useState(artist.isScrapped ?? false);
  const handleToggleScrap = () => {
    setIsScrapped((prev) => !prev);
  };
  return (
    <section className="px-5 pt-5">
      <div className="flex flex-col gap-1 pb-3 border-b border-gray-850">
        <p className="flex justify-between items-center gap-6">
          <span className="font-semibold text-xl">{artist.artistName}</span>
          <BookmarkIcon
            isActive={isScrapped}
            onClick={handleToggleScrap}
            className={`cursor-pointer w-6 h-6 transition-colors
            ${isScrapped ? 'text-white scale-110' : 'text-gray-600'}
          `}
          />
        </p>
        <div className="flex">
          {artist.keywords.map((keyword, index) => (
            <p key={index} className="text-gray-500 font-normal text-sm">
              #{keyword}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="py-3 flex gap-2 items-start border-b border-gray-850">
          <Image src={play} alt="play" width={24} height={24} />
          <div className="flex flex-col">
            <span className="font-medium text-base">{artist.mainMusic.title}</span>
            <span className="font-normal text-sm text-gray-500">
              {artist.mainMusic.description}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 pb-3 border-b border-gray-850">
          <p className="flex gap-2">
            <Image src={voice} alt="voice" width={24} height={24} />
            <span>{artist.artistName}</span>
          </p>
          <p className="font-medium text-sm text-gray-500">{artist.description}</p>
        </div>
      </div>
      <div className="my-6 flex flex-col gap-2">
        <p className="flex gap-2">
          <Image src={profile} alt="profile" width={24} height={24} />
          <span>멤버</span>
        </p>
        <p className="flex gap-2">
          {artist.members.map((member, index) => (
            <span key={index} className="font-medium text-sm text-gray-500">
              {member},
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
