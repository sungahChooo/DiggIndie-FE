'use client';
import MenuSection from '@/components/my/MenuSection';
import MyHeader from '@/components/my/MyHeader';
import ProfileSection from '@/components/my/ProfileSection';

export default function MyPage() {
  return (
    <div className="text-white flex flex-col h-screen">
      <MyHeader />
      <div className="flex flex-col gap-6">
        <ProfileSection />
        <MenuSection title="스크랩한 공연" />
        <MenuSection title="스크랩한 아티스트" />
      </div>
      <div className="flex flex-col gap-3">
        <MenuSection title="스크랩한 게시물" hasBorder={true} />
        <MenuSection title="스크랩한 인디스토리" hasBorder={true} />
        <MenuSection title="연동된 소셜계정" hasBorder={true} />
      </div>
      <p className="flex justify-center items-center gap-2 mt-auto mb-6 text-center">
        <span className="text-sm font-normal text-gray-500 border-r border-gray-500 px-3">
          로그아웃
        </span>
        <span className="text-sm font-normal text-gray-500 px-3">회원탈퇴</span>
      </p>
    </div>
  );
}
