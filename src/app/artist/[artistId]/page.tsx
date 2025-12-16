'use client';
import Image from 'next/image';
import artistData from '@/mocks/mockArtistDetail.json';
import share from '@/assets/common/share.svg';
import { useParams } from 'next/navigation';
import bookmark from '@/assets/detail/bookMark.svg';
import play from '@/assets/common/play.svg';
import voice from '@/assets/common/Voice 3.svg';
import profile from '@/assets/common/Profile.svg';

export default function ArtistDetailPage() {
  const params = useParams();
  const artistId = Number(params.artistId);
  const artist = artistData.artists.find((a) => a.artistId === artistId);

  if (!artist) {
    return <p className="text-white">아티스트를 찾을 수 없습니다.</p>;
  }
  return (
    <div className="text-white flex flex-col min-h-screen">
      <section className="relative">
        <Image
          src={artistData.artists[0].artistImage}
          alt="Artist Image"
          width={376}
          height={376}
          className="py-[10px] px-[10px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black/80"></div>
        <Image
          src={share}
          alt="share"
          width={24}
          height={24}
          className="absolute bottom-[18px] right-[18px] cursor-pointer"
        />
      </section>
      <section className="px-5 pt-5">
        <div className="flex flex-col gap-1 pb-3 border-b border-gray-850">
          <p className="flex justify-between items-center gap-6">
            <span className="font-semibold text-xl">{artist.artistName}</span>
            <Image
              src={bookmark}
              alt="bookmark"
              width={24}
              height={24}
              className="cursor-pointer"
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
      <section className="px-5">
        <span className="font-semibold text-xl mb-3">진행 예정 공연</span>
        <div className="mt-3">
          {artist.scheduledConcert.map((concert) => (
            <div key={concert.concertId}>
              <div className="py-4 relative w-[160px] h-[226px]">
                <Image
                  src={concert.concertImage}
                  alt={concert.concertName}
                  fill
                  className="relative object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black/80"></div>
                <div className="absolute bottom-2 left-2 right-2 text-white flex flex-col">
                  <span className="inline-block self-start bg-main-red-2 px-2 font-medium text-white text-sm rounded-xs mb-1">
                    {concert.dDay}
                  </span>
                  <span className="font-medium text-base text-white">{concert.concertName}</span>
                  <span className="font-normal text-sm text-white truncate block w-full">
                    {concert.lineUp.join(', ')}
                  </span>
                  <span className="font-normal text-sm text-gray-500">{concert.concertDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="px-5">
        <span className="font-semibold text-xl mb-3">종료된 공연</span>
        {artist.endedConcert.map((concert) => (
          <div key={concert.concertId} className="my-4 relative w-[160px] h-[226px]">
            <Image
              src={concert.concertImage}
              alt={concert.concertName}
              fill
              className="relative object-cover"
            />
            <div className="absolute inset-0 bg-black/70"></div>
            <span className="absolute inset-0 flex items-center justify-center text-base font-medium text-white">
              종료된 공연입니다
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
