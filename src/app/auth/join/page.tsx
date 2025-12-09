import InputSection from '@/components/auth/InputSection';
import Button from '@/components/Button';
import xButton from '@/assets/auth/xButton.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function JoinPage() {
  return (
    <form className="text-white flex flex-col h-screen items-center gap-6">
      <section className="flex px-5 py-3 w-full justify-between">
        <Link href="/auth/login">
          <Image src={xButton} alt="xButton" width={20} />
        </Link>
        <span className="text-base font-semibold text-white pr-35">회원가입</span>
      </section>
      <section className="flex flex-col gap-4">
        <span className="text-xs font-medium text-gray-300">아이디</span>
        <div className="flex gap-2">
          <InputSection placeholder="아이디" width="w-[228px] h-[46px]" />
          <button className="bg-main-red-2 px-4 py-3 rounded-sm text-white text-base font-semibold">
            중복확인
          </button>
        </div>
        <span className="text-xs font-medium text-gray-300 px-3">4~12이내</span>
      </section>
      <section className="flex flex-col gap-3 mt-3 gap-4">
        <span className="text-xs font-medium text-gray-300">비밀번호</span>
        <InputSection placeholder="비밀번호" type="password" width="w-[335px] h-[46px]" />
        <InputSection placeholder="비밀번호 확인" type="password" width="w-[335px] h-[46px]" />
        <span className="text-xs font-medium text-gray-300 px-3">
          6~20자/ 영문, 숫자, 특수문자 중 2가지 이상 조합
        </span>
      </section>
      <section className="flex flex-col gap-3">
        <span className="text-xs font-medium  text-gray-300">이메일</span>
        <div className="flex gap-3">
          <InputSection placeholder="이메일" type="email" width="w-[150px] h-[46px]" />
          <span className="font-semibold text-xl text-gray-600">@</span>
          <select
            className="w-[130px] h-[46px] bg-black border border-gray-600 rounded px-2 text-sm text-gray-300"
            defaultValue="gmail.com"
          >
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="kakao.com">kakao.com</option>
            <option value="custom">직접 입력</option>
          </select>
        </div>
      </section>
      <div className="w-[375px] px-5 absolute bottom-5">
        <Button href="/auth/join/success">가입하기</Button>
      </div>
    </form>
  );
}
