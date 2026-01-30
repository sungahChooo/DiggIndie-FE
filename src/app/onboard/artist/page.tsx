"use client";

import Header from "@/components/onBoard/Header";
import TitleSection from "@/components/onBoard/TitleSection";
import SearchSection from "@/components/onBoard/SearchSection";
import ProgressBar from "@/components/onBoard/ProgressBar";
import OnboardArtistItem from "@/components/onBoard/OnboardArtistItem";
import NoResult from "@/components/onBoard/NoResult";
import LinkButton from "@/components/common/LinkButton";
import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { OnboardArtist } from "@/types/artists";
import { saveSelectedArtists } from "@/services/artistsService";
import { useOnboardArtists } from "@/hooks/useOnboardArtists";
import { onBoardKeywordService } from "@/services/onBoardKeyword.service";
import ArtistSkeletonGrid from "@/components/onBoard/ArtistSkeletonGrid";

export default function OnboardArtistPage() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isloading, setIsLoading] = useState(true);

  const {
    artists,
    pageInfo,
    searchTerm,
    onChangeSearch,
    onSubmitSearch,
    onClearSearch,
    loadFirstPage,
    loadNextPage,
    isFetching,
  } = useOnboardArtists(12);

  const handleReset = () => {
    setSelectedIds([]);
  };

  const isFetchingRef = useRef(false);
  const hasNextRef = useRef(false);

  useEffect(() => {
    isFetchingRef.current = isFetching;
    hasNextRef.current = !!pageInfo?.hasNext;
  }, [isFetching, pageInfo?.hasNext]);

  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);

      const [savedArtists] = await Promise.all([
        onBoardKeywordService.getSelectedArtists(),
        loadFirstPage(undefined),
      ]);

      if (savedArtists?.length) {
        setSelectedIds(savedArtists.map((artist: OnboardArtist) => artist.bandId));
      }

      setIsLoading(false);
    };

    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isloading) return;

    const el = sentinelRef.current;
    const rootEl = scrollRef.current;
    if (!el || !rootEl) return;

    let inFlight = false;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;

        if (inFlight) return;
        if (isFetchingRef.current) return;
        if (!hasNextRef.current) return;

        inFlight = true;
        try {
          await loadNextPage();
        } finally {
          inFlight = false;
        }
      },
      {
        root: rootEl,
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isloading, loadNextPage]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]));
  };

  const handleComplete = async () => {
    if (selectedIds.length < 2) return;
    await saveSelectedArtists(selectedIds);
    router.push("/onboard/genre");
  };


  const uniqueArtists = useMemo(() => {
    const seen = new Set<number>();
    const out: OnboardArtist[] = [];

    for (const a of artists) {
      if (seen.has(a.bandId)) continue;
      seen.add(a.bandId);
      out.push(a);
    }

    return out;
  }, [artists]);

  return (
    <div className="text-white flex flex-col h-screen">
      <Header />

      <div className="flex-1 overflow-auto flex flex-col">
        <div className="px-5 pb-5">
          <ProgressBar current={1} total={3} />
        </div>

        <TitleSection
          title={
            <>
              좋아하는
              <br /> 아티스트를 알려주세요
            </>
          }
          min="최소 2팀"
          minClassName="text-main-red-4 text-xs font-medium"
        />

        <span className="font-normal text-sm text-gray-600 px-5">
          아티스트를 많이 선택할수록 취향 추천의 정확도가 높아져요.
        </span>

        <div className="px-5 my-5">
          <SearchSection
            searchTerm={searchTerm}
            onChange={onChangeSearch}
            onClear={onClearSearch}
            onSubmit={onSubmitSearch}
          />
        </div>

        {isloading ? (
          <div className="grid grid-cols-3 gap-4 px-5 pt-5">
            <ArtistSkeletonGrid />
          </div>
        ) : artists.length > 0 ? (
          <div className="flex-1 overflow-y-scroll scroll-hidden grid grid-cols-3 gap-4 px-5" ref={scrollRef}>
            {uniqueArtists.map((artist: OnboardArtist) => (
              <OnboardArtistItem
                key={artist.bandId}
                artist={artist}
                isSelected={selectedIds.includes(artist.bandId)}
                toggleSelect={toggleSelect}
              />
            ))}

            {isFetching && <ArtistSkeletonGrid count={6} />}

            <div ref={sentinelRef} className="col-span-3 h-1" />
          </div>
        ) : (
          <NoResult />
        )}
      </div>

      <div className="px-5 pb-5 flex gap-2">
        <LinkButton disabled={selectedIds.length < 2} onClick={handleComplete}>
          선택완료
        </LinkButton>

        <button
          className="bg-gray-850 border border-gray-700 p-4 rounded-sm whitespace-nowrap h-13 cursor-pointer"
          onClick={handleReset}
        >
          초기화
        </button>
      </div>
    </div>
  );
}
