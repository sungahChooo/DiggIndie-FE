import { Artist } from '@/types/artists';
import { ImageTile } from '@/components/home/ImageTile';
import Image from 'next/image';
import playBtn from '@/assets/common/play.svg';

type Props = {
  artist: Artist;
};

export default function PersonalArtistRecCard({ artist }: Props) {
  const keyOne = artist.keyWords ? artist.keyWords[0] : '';
  const keyTwo = artist.keyWords ? artist.keyWords[1] : '';
  return (
    <div className="flex flex-col flex-none w-40 bg-gray-900 rounded-b-sm shrink-0">
      <div className={'relative flex flex-col'}>
        <ImageTile
          src={artist.imageUrl}
          alt={artist.name}
          variant="artistRec"
          className={'rounded-t-sm'}
          gradient={'bg-gradient-to-t from-black/80 via-black/30 to-transparent'}
        />
        <div className={'absolute z-5 items-center justify-center mt-[130px] mx-3 text-white'}>
          {artist.name}
        </div>
      </div>

      <div className="flex flex-col w-40 h-[57px] mx-2 ">
        <div className="flex items-center w-[144px] h-[20px] mt-[8px]">
          <Image src={playBtn} alt={'Play'} />
          <span className={'ml-[3px] text-[14px] font-normal text-gray-200'}>
            {artist.popularSong}
          </span>
        </div>
        <div className={'h-[21px] text-gray-600 font-medium text-sm'}>
          #{keyOne} #{keyTwo}
        </div>
      </div>
    </div>
  );
}
