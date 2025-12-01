import HomeHeader from "../components/home/HomeHeader";
import TodayArtistRec from "../components/home/TodayArtistRec";
import LoginBanner from "../components/home/LoginBanner";
import PersonalArtistRec from "../components/home/PersonalArtistRec";

export default function Home() {
  return (
    <div className="flex justify-center items-centerbg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col">
        <div className={"sticky top-0"}>
          <HomeHeader />
        </div>
        <main className="overflow-y-auto scrollbar flex flex-col justify-center items-center">
          <TodayArtistRec />
          <LoginBanner />
          <PersonalArtistRec />
        </main>
      </div>
    </div>
  );
}
