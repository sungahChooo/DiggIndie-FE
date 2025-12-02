import Button from '@/components/onBoard/Button';
import GenreList from '@/components/onBoard/GenreList';
import Header from '@/components/onBoard/Header';
import ProgressBar from '@/components/onBoard/ProgressBar';
import TitleSection from '@/components/onBoard/TitleSection';

export default function onBoardGenrePage() {
  return (
    <div className="bg-black text-white flex flex-col h-screen">
      <Header href="/onboard/artist" />
      <div className="flex-1 overflow-auto m-5 gap-5 flex flex-col">
        <ProgressBar current={2} total={3} />
        <TitleSection
          title={
            <>
              좋아하는 장르나
              <br /> 키워드를 알려주세요
            </>
          }
          min="최소 2개"
        />
        <GenreList />
      </div>
      <div className="mx-5 mb-5">
        <Button href="/onboard/end" bgColor="bg-red">
          선택완료
        </Button>
      </div>
    </div>
  );
}
