'use client';
import MyHeader from '@/components/my/MyHeader';
import MyCommunityMenu from '@/components/my/MyCommunityMenu';
import { useRouter } from 'next/navigation';

export default function MyCommunityPage() {
  const router = useRouter();
  return (
    <div className="text-white flex flex-col h-screen bg-black relative">
      <MyHeader title={'MY 커뮤니티 활동'} backUrl={'/my'}/>
      <div className="py-2 flex flex-col gap-3">
        <MyCommunityMenu
          title="MY 게시물"
          onclick={() => router.push('/my/community/freeArticle')}
        />
        <MyCommunityMenu title="MY 댓글" onclick={() => router.push('/my/community/freeComment')} />
        <MyCommunityMenu
          title="좋아요한 게시물"
          onclick={() => router.push('/my/community/like')}
        />
        <MyCommunityMenu
          title="스크랩한 거래/양도글"
          onclick={() => router.push('/my/community/scrap')}
        />
      </div>
    </div>
  );
}
