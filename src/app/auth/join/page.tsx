import InputSection from '@/components/auth/InputSection';
import Button from '@/components/Button';
import xButton from '@/assets/auth/xButton.svg';
import Image from 'next/image';

export default function JoinPage() {
  return (
    <div className="text-white flex flex-col h-screen items-center gap-6">
      <section className="flex px-5 py-3 w-full justify-between">
        <Image src={xButton} alt="xButton" width={20} />
        <span className="text-base font-semibold text-white">회원가입</span>
      </section>
      <section className="flex flex-col gap-4">
        <span className="text-xs font-medium text-gray-300">아이디</span>
        <div className="flex gap-2">
          <InputSection placeholder="아이디" width="w-[228px]" />
          <button className="bg-main-red-2 px-4 py-3 rounded-sm text-white text-base font-semibold">
            중복확인
          </button>
        </div>
        <span className="text-xs font-medium text-gray-300">4~12이내</span>
      </section>
      <section className="flex flex-col gap-3 mt-3 gap-4">
        <span className="text-xs font-medium">비밀번호</span>
        <InputSection placeholder="비밀번호" type="password" />
        <InputSection placeholder="비밀번호 확인" type="password" />
        <span className="text-xs font-medium text-gray-300">
          6~20자/ 영문, 숫자, 특수문자 중 2가지 이상 조합
        </span>
      </section>
      <section className="flex flex-col gap-3 mt-3">
        <span className="text-xs font-medium">이메일</span>
        <InputSection placeholder="이메일" type="email" />
      </section>
      <div className="w-[375px] px-5 absolute bottom-5">
        <Button href="/auth/join/success">가입하기</Button>
      </div>
    </div>
  );
}
