'use client';
import Image from 'next/image';
import play from '@/assets/common/play.svg';
import voice from '@/assets/common/Voice 3.svg';
import profile from '@/assets/common/Profile.svg';
import albumIcon from '@/assets/detail/music.svg';
import BookmarkIcon from '@/components/detail/BookmarkIcon';
// import artistData from '@/mocks/mockArtistDetail.json';
import default_album_image from '@/assets/detail/default_album.svg';
import { ArtistDetail } from '@/types/artists';
import needLogin from '@/assets/community/isNotLoggined.svg';

interface ArtistContentSectionProps {
  artist: ArtistDetail;
  onToggleScrap: () => Promise<void>;
  isScrapped: boolean;
  isLogined: boolean;
}
export default function ArtistContentSection({
  artist,
  onToggleScrap,
  isScrapped,
  isLogined,
}: ArtistContentSectionProps) {
  return (
    <section className="px-5 pt-5 border-b-4 border-gray-850 mb-6 ">
      <div className="flex flex-col gap-1 pb-3 border-b border-gray-850">
        <p className="flex justify-between items-center gap-6">
          <span className="font-semibold text-xl w-full">{artist.artistName}</span>
          <span className="flex flex-col group items-end relative w-100">
            <BookmarkIcon
              isActive={isScrapped}
              onClick={isLogined ? onToggleScrap : undefined}
              className={`w-6 h-6 transition-colors 
            ${
              isLogined
                ? isScrapped
                  ? 'text-white scale-110 cursor-pointer'
                  : 'text-white cursor-pointer'
                : 'text-gray-600 cursor-not-allowed'
            }
          `}
            />
            {!isLogined ? (
              <Image
                src={needLogin}
                alt="로그인 필요 아이콘"
                height={100}
                width={400}
                className="
      absolute top-7
      opacity-0
      group-hover:opacity-100
      transition-opacity
    "
              />
            ) : (
              <></>
            )}
          </span>
        </p>
        <div className="flex">
          {artist.keywords.map((keyword, index) => (
            <p key={index} className="text-gray-500 font-normal text-sm">
              #{keyword}
            </p>
          ))}
        </div>
      </div>
      {/*멤버 */}
      <div className="flex pt-4 pb-3 flex-col gap-2 border-b border-gray-850">
        <p className="flex gap-2">
          <Image src={profile} alt="profile" width={24} height={24} />
          <span className="text-gray-200 text-base font-medium">멤버</span>
        </p>
        <div className="flex gap-2 overflow-x-auto line-clamp-4">
          {artist.members.length > 0 ? (
            artist.members.map((member, index) => (
              <span key={index} className="font-medium text-sm text-gray-500 flex-shrink-0">
                {member}
                {index !== artist.members.length - 1 && ','}
              </span>
            ))
          ) : (
            <span className="font-bold text-sm text-gray-400 text-sm">
              정보가 존재하지 않습니다.
            </span>
          )}
        </div>
      </div>
      {/*대표곡 */}
      <div className="flex flex-col gap-4">
        <div className="pt-4 pb-3 flex flex-col gap-2 items-start border-b border-gray-850">
          <a
            className="flex gap-2"
            href={artist.topTrack?.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={play} alt="play" width={24} height={24} />
            <span
              className={`font-medium text-base text-gray-200 ${artist.topTrack ? 'hover:text-gray-400' : ''}`}
            >
              {artist.topTrack ? artist.topTrack.title : '대표곡이 없습니다.'}
            </span>
          </a>
          {/* <span className="font-normal text-sm text-gray-500">response에 없음</span> */}
        </div>
        {/*아티스트 */}
        <div className="flex flex-col gap-2 pb-3 border-b border-gray-850">
          <p className="flex gap-2">
            <Image src={voice} alt="voice" width={24} height={24} />
            <span className="text-white font-medium text-base">아티스트</span>
          </p>
          <p
            className={`text-sm text-gray-400  ${artist.description ? 'font-medium' : 'font-bold '}`}
          >
            {artist.description && artist.description.trim() !== ''
              ? artist.description
              : '없는 정보입니다.'}
          </p>
        </div>
        {/*앨범 */}

        <div className="flex flex-col gap-3 pb-7">
          <p className="flex gap-2">
            <Image src={albumIcon} alt="album" width={24} height={24} />
            <span>앨범</span>
          </p>
          <section className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {artist.albums.length > 0 ? (
              artist.albums.map((album) => {
                const albumImageSrc =
                  album.albumImage && album.albumImage.trim() !== ''
                    ? album.albumImage
                    : default_album_image;

                return (
                  <div key={album.albumId} className="flex flex-col w-[92px] flex-shrink-0">
                    <div className="relative w-[92px] h-[92px]">
                      <Image
                        src={albumImageSrc}
                        alt="앨범이미지"
                        width={92}
                        height={92}
                        className="object-cover rounded"
                      />
                    </div>

                    <span className="mt-1 font-medium text-sm text-gray-500 truncate">
                      {album.albumName}
                    </span>
                    <span className="font-medium text-sm text-gray-500">{album.releaseYear}</span>
                  </div>
                );
              })
            ) : (
              <span className="font-bold text-sm text-gray-400">앨범이 없습니다.</span>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
