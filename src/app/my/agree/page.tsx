'use client';
import MyHeader from '@/components/my/MyHeader';
import Image from 'next/image';
import rightArrow from '@/assets/common/more.svg';
import { useRouter } from 'next/navigation';

export default function MyAgreePage() {
  const router = useRouter();
  return (
    <div className="text-white flex flex-col h-screen bg-black relative py-10">
      <MyHeader title={'약관 및 수신 동의'} />
      <div className="py-2 px-5 ">
        <p className="flex py-2 gap-2 items-center">
          <span className="font-medium text-base text-white">서비스 이용 약관</span>
          <a
            className="font-medium text-xs text-gray-600 underline"
            href="https://www.notion.so/diggindie-2e43f601039f808ab65fd15529200981?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            보기
          </a>
        </p>
        <p className="flex py-2 gap-2 items-center">
          <span className="font-medium text-base text-white">제 3자 제공 동의</span>
          <a
            className="font-medium text-xs text-gray-600 underline"
            href="https://www.notion.so/3-2e43f601039f80d6a84df777449f1db4?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            보기
          </a>
        </p>
        <p className="flex py-2 gap-2 items-center">
          <span className="font-medium text-base text-white">개인정보 수집 및 이용 안내</span>
          <a
            className="font-medium text-xs text-gray-600 underline"
            href="https://www.notion.so/2e43f601039f808eb43dde8f495239ec?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            보기
          </a>
        </p>
        <p
          className="flex py-2 justify-between cursor-pointer"
          onClick={() => router.push('/my/agree/settings')}
        >
          <span className="flex gap-2 items-center ">
            <span className="font-medium text-base text-white">마케팅 수신 동의</span>
            <a
              className="font-medium text-xs text-gray-600 underline"
              href="https://www.notion.so/2-2e43f601039f80ab9911fce97bb05ed0?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              보기
            </a>
          </span>
          <Image src={rightArrow} alt="more아이콘" />
        </p>
      </div>
    </div>
  );
}
