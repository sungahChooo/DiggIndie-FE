'use client';
import MyHeader from '@/components/my/MyHeader';
import MyCommunityMenu from '@/components/my/MyCommunityMenu';

export default function MyCommunityPage() {
  return (
    <div className="text-white flex flex-col h-screen bg-black relative py-10">
      <MyHeader title={'MY 커뮤니티 활동'} />
      <div className="py-2">
        <MyCommunityMenu title="MY 게시물" />
        <MyCommunityMenu title="MY 댓글" />
        <MyCommunityMenu title="좋아요한 게시물" />
        <MyCommunityMenu title="스크랩한 거래/양도글" />
      </div>
    </div>
  );
}
