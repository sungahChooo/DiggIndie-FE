'use client';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

export default function AgreePage() {
  const router = useRouter();
  const handleAgree = () => {
    router.push('/auth/join/success');
  };
  return (
    <div className="text-white flex flex-col h-screen w-[375px]">
      <section className="w-full ml-5 font-bold text-2xl mt-70 mb-11">
        서비스 이용을 위해
        <br /> 이용약관 동의가 필요합니다.
      </section>
      <section className="w-full mx-5 py-5 flex gap-2 border-b border-gray-600">
        <input type="radio" className="" />
        <span className="font-medium text-base">모두 동의하기</span>
      </section>

      <section className="flex flex-col my-5 gap-4">
        <div className="flex justify-between px-5">
          <span className="flex gap-2">
            <input type="radio" className="" />
            <span className="font-medium text-sm text-gray-400">
              서비스 이용약관&nbsp;<span className="text-main-red-1">(필수)</span>
            </span>
          </span>
          <span className="text-gray-600 text-sm underline">보기</span>
        </div>
        <div className="flex px-5 justify-between">
          <span className="flex gap-2">
            <input type="radio" className="" />
            <span className="font-medium text-sm text-gray-400">
              제 3자 제공 동의 &nbsp;<span className="text-main-red-1">(필수)</span>
            </span>
          </span>
          <span className="text-gray-600 text-sm underline">보기</span>
        </div>
        <div className="flex justify-between px-5">
          <span className="flex gap-2">
            <input type="radio" className="" />
            <span className="font-medium text-sm text-gray-400">
              개인정보 수집 및 이용 안내&nbsp;<span className="text-main-red-1">(필수)</span>
            </span>
          </span>
          <span className="text-gray-600 text-sm underline">보기</span>
        </div>
      </section>
      <div className="w-[375px] px-5 absolute bottom-5">
        <Button onClick={handleAgree}>확인</Button>
      </div>
    </div>
  );
}
