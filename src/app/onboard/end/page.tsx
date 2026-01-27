import Button from '@/components/common/LinkButton';
import TitleSection from '@/components/onBoard/TitleSection';
import Header from '@/components/onBoard/Header';
import ProgressBar from '@/components/onBoard/ProgressBar';

export default function OnBoardEndPage() {
  return (
    <div className="bg-black text-white flex flex-col h-screen">
      <Header href="/onboard/genre" />
      <div className="flex-1 overflow-auto m-5 gap-5 flex flex-col">
        <ProgressBar current={3} total={3} />
        <TitleSection
          titleClassName="w-full flex flex-col gap-2"
          minClassName="text-gray-300 text-base font-normal leading-[var(--line-height-text)] tracking-[var(--letter-spacing-text)]"
          title={
            <>
              리스너님의 취향에 맞는
              <br /> 아티스트와 공연을 추천해드릴게요
            </>
          }
          min="취향은 언제든지 다시 선택할 수 있어요"
        />
      </div>
      <div className="p-5 bg-transparent">
        <Button href="/home?reset=true">완료</Button>
      </div>
    </div>
  );
}
