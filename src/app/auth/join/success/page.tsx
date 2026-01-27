import Image from 'next/image';
import Diggindie from '@/assets/common/diggindie.svg';
import Button from '@/components/common/LinkButton';

export default function JoinSuccessPage() {
  return (
    <div className="text-white flex flex-col h-screen items-center">
      <div className="w-full px-10">
        <Image
          src={Diggindie}
          alt="diggindie 로고"
          width={235}
          height={50}
          className="mt-60 mb-5"
        />
        <span className="block text-2xl font-bold mb-2 text-white text-left leading-[var(--line-height-title)]">
          가입 완료
          <br /> 리스너님 환영합니다.
        </span>

        <span className="block text-base text-gray-300 text-left font-medium leading-[var(--line-height-text)]">
          더 깊고 끝없는 음악 여정이 시작됩니다.
        </span>
      </div>
      <div className="w-[375px] px-5 absolute bottom-5">
        <Button href="/splash?next=/onboard/artist">시작하기</Button>
      </div>
    </div>
  );
}
