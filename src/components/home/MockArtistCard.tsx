import { Artist } from '@/types/mocks/mockArtists';
import { ImageTile } from '@/components/home/ImageTile';
import Image from 'next/image';
import playBtn from '@/assets/common/play.svg';

type Props = {
  artist: Artist;
};

export default function ArtistCard({ artist }: Props) {
  const keyOne = artist.keyWords ? artist.keyWords[0] : '';
  const keyTwo = artist.keyWords ? artist.keyWords[1] : '';
  return (
    <div className="flex flex-col flex-none w-[160px] bg-[#1F1D1D] rounded-b-[4px] bg-black">
      <div className={'relative flex flex-col'}>
        <ImageTile
          src={artist.imageUrl}
          alt={artist.name}
          variant="artistRec"
          className={'rounded-t-[4px]'}
          gradient={'bg-gradient-to-t from-black/80 via-black/30 to-transparent'}
        />
        <div className={'absolute z-5 items-center justify-center mt-[130px] mx-[12px]'}>
          {artist.name}
        </div>
      </div>

      <div className="flex flex-col w-[160px] h-[57px] mx-[8px] ">
        <div className="flex items-center w-[144px] h-[20px] mt-[8px]">
          <Image src={playBtn} alt={'Play'} />
          <span className={'ml-[3px] text-[14px] text-white font-normal'}>
            {artist.popularSong}
          </span>
        </div>
        <div className={'h-[21px] text-[#736F6F] font-medium text-[12px]'}>
          #{keyOne} #{keyTwo}
        </div>
      </div>
    </div>
  );
}
