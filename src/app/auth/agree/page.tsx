'use client';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AgreePage() {
  const router = useRouter();
  const handleAgree = () => {
    router.push('/auth/join/success');
  };
  const [state1, setState1] = useState(false); // 서비스 이용약관
  const [state2, setState2] = useState(false); // 제3자 제공 동의
  const [state3, setState3] = useState(false); // 개인정보 수집 및 이용 안내
  const allChecked = state1 && state2 && state3;

  const toggleAll = () => {
    const next = !(state1 && state2 && state3);
    setState1(next);
    setState2(next);
    setState3(next);
  };

  return (
    <div className="text-white flex flex-col h-screen w-[375px]">
      <section className="ml-5 font-bold text-2xl mt-70 mb-11">
        서비스 이용을 위해
        <br /> 이용약관 동의가 필요합니다.
      </section>
      <section className="mx-5 py-5 flex gap-2 border-b border-gray-600 items-center justitfy-center">
        <label>
          <input type="checkbox" className="hidden" checked={allChecked} onChange={toggleAll} />

          <span
            className={`flex
      w-4 h-4 rounded-full border
      transition-colors
      ${allChecked ? 'bg-main-red-4 border-main-red-4' : 'bg-transparent border-white'}
    `}
          />
        </label>
        <span className="font-medium text-base">모두 동의하기</span>
      </section>

      <section className="flex flex-col my-5 gap-4">
        <div className="flex justify-between px-5">
          <span className="flex gap-2">
            <label>
              <input
                type="checkbox"
                className="hidden"
                checked={state1}
                onChange={() => setState1((prev) => !prev)}
              />

              <span
                className={`flex
      w-4 h-4 rounded-full border
      transition-colors
      ${state1 ? 'bg-main-red-4 border-main-red-4' : 'bg-transparent border-gray-400'}
    `}
              />
            </label>
            <span className="font-medium text-sm text-gray-400">
              서비스 이용약관&nbsp;<span className="text-main-red-1">(필수)</span>
            </span>
          </span>
          <span className="text-gray-600 text-sm underline">보기</span>
        </div>
        <div className="flex px-5 justify-between">
          <span className="flex gap-2">
            <label>
              <input
                type="checkbox"
                className="hidden"
                checked={state2}
                onChange={() => setState2((prev) => !prev)}
              />

              <span
                className={`flex
      w-4 h-4 rounded-full border
      transition-colors
      ${state2 ? 'bg-main-red-4 border-main-red-4' : 'bg-transparent border-gray-400'}
    `}
              />
            </label>
            <span className="font-medium text-sm text-gray-400">
              제 3자 제공 동의 &nbsp;<span className="text-main-red-1">(필수)</span>
            </span>
          </span>
          <span className="text-gray-600 text-sm underline">보기</span>
        </div>
        <div className="flex justify-between px-5">
          <span className="flex gap-2">
            <label>
              <input
                type="checkbox"
                className="hidden"
                checked={state3}
                onChange={() => setState3((prev) => !prev)}
              />

              <span
                className={`flex
      w-4 h-4 rounded-full border
      transition-colors
      ${state3 ? 'bg-main-red-4 border-main-red-4' : 'bg-transparent border-gray-400'}
    `}
              />
            </label>
            <span className="font-medium text-sm text-gray-400">
              개인정보 수집 및 이용 안내&nbsp;<span className="text-main-red-1">(필수)</span>
            </span>
          </span>
          <span className="text-gray-600 text-sm underline">보기</span>
        </div>
      </section>
      <div className="w-[375px] px-5 absolute bottom-5">
        <Button onClick={handleAgree} disabled={!allChecked}>
          확인
        </Button>
      </div>
    </div>
  );
}
