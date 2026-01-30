"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@mui/material";

import CommunityWriteHeader from "@/components/community/CommunityWriteHeader";
import ImageUploadSection from "@/components/community/ImageUploadSection";
import TextArea from "@/components/community/TextArea";
import TradingLinkArea from "@/components/community/TradingLinkArea";
import TradingPriceArea from "@/components/community/TradingPriceArea";

import { postFree, editFree } from "@/api/freeBoard";
import { postMarket, editMarket } from "@/api/marketBoard";

import { boardDetailService } from '@/services/boardDetail.service';
import type { MarketCategory } from '@/types/marketBoard';
import CustomCheckbox from '@/components/community/Checkbox';

type UiGeneralTag = "없음" | "정보" | "공연 후기" | "추천" | "신보" | "음악 뉴스" | "동행";
type UiTradeTag = "판매" | "구매";

type Mode = "create" | "edit";
type Board = "free" | "trade";

function mapFreeCategory(tag: UiGeneralTag) {
  switch (tag) {
    case "정보":
      return "info";
    case "공연 후기":
      return "review";
    case "추천":
      return "recommend";
    case "신보":
      return "release";
    case "음악 뉴스":
      return "news";
    case "동행":
      return "companion";
    default:
      return "none";
  }
}

function mapFreeCategoryToUi(category: string | null | undefined): UiGeneralTag {
  switch (category) {
    case "info":
      return "정보";
    case "review":
      return "공연 후기";
    case "recommend":
      return "추천";
    case "release":
      return "신보";
    case "news":
      return "음악 뉴스";
    case "companion":
      return "동행";
    default:
      return "없음";
  }
}

function mapMarketTypeToUi(type: string | null | undefined): UiTradeTag {
  return type === "구매" ? "구매" : "판매";
}

/* -------------------- 타입가드 유틸 -------------------- */

type TradeImage = {
  imageUrl: string;
  imageOrder?: number;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}

function isTradeImage(v: unknown): v is TradeImage {
  if (!isRecord(v)) return false;
  return typeof v.imageUrl === "string";
}

function pickString(obj: Record<string, unknown>, key: string, fallback = ""): string {
  const v = obj[key];
  return typeof v === "string" ? v : fallback;
}

function pickNumber(obj: Record<string, unknown>, key: string, fallback = 0): number {
  const v = obj[key];
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

function pickTradeImageUrls(detail: unknown): string[] {
  if (!isRecord(detail)) return [];

  const imageUrls = detail.imageUrls;
  if (isStringArray(imageUrls)) {
    return imageUrls.map((s) => s.trim()).filter((s) => s.length > 0);
  }

  const images = detail.images;
  if (Array.isArray(images)) {
    return images
      .filter(isTradeImage)
      .map((x) => x.imageUrl.trim())
      .filter((s) => s.length > 0);
  }

  return [];
}

/* -------------------- 컴포넌트 -------------------- */

export default function Write() {
  const router = useRouter();
  const sp = useSearchParams();

  const mode = (sp.get("mode") as Mode) ?? "create";
  const board = (sp.get("board") as Board) ?? "free";
  const id = Number(sp.get("id") ?? "0");

  const isEdit =
    mode === "edit" &&
    (board === "free" || board === "trade") &&
    Number.isFinite(id) &&
    id > 0;

  const generalTag: UiGeneralTag[] = ["없음", "정보", "공연 후기", "추천", "신보", "음악 뉴스", "동행"];
  const tradeTag: UiTradeTag[] = ["판매", "구매"];

  const [boardType, setBoardType] = useState<"general" | "trade">("general");
  const [selectedTag, setSelectedTag] = useState<UiGeneralTag | UiTradeTag>("없음");
  const tags = boardType === "general" ? generalTag : tradeTag;

  const [anonymous, setAnonymous] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [price, setPrice] = useState<number | null>(null);
  const [chatUrl, setChatUrl] = useState("");

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrefilling, setIsPrefilling] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    const run = async () => {
      setIsPrefilling(true);
      try {
        if (board === "free") {
          const detail = await boardDetailService.getFreeBoardDetail(id);

          setBoardType("general");
          setTitle(detail.title ?? "");
          setContent(detail.content ?? "");
          setAnonymous(detail.writerNickname === '작성자');
          setSelectedTag(mapFreeCategoryToUi(detail.category));

          setPrice(null);
          setChatUrl("");

          setImageUrls(detail.imageUrls ?? []);
          return;
        }

        const detail = await boardDetailService.getTradeBoardDetail(id);

        setBoardType("trade");

        if (isRecord(detail)) {
          setTitle(pickString(detail, "title", ""));
          setContent(pickString(detail, "content", ""));
          setSelectedTag(mapMarketTypeToUi(typeof detail.type === "string" ? detail.type : undefined));
          setPrice(pickNumber(detail, "price", 0));
          setChatUrl(pickString(detail, "chatUrl", ""));
        } else {
          setTitle("");
          setContent("");
          setSelectedTag("판매");
          setPrice(0);
          setChatUrl("");
        }

        setAnonymous(false);
        setImageUrls(pickTradeImageUrls(detail));
      } finally {
        setIsPrefilling(false);
      }
    };

    run();
  }, [isEdit, id, board]);

  const handleBoardTypeChange = (type: "general" | "trade") => {
    if (isEdit) return;
    setBoardType(type);
    setSelectedTag(type === "general" ? "없음" : "판매");
  };

  const isFormValidBase = title.trim().length > 0 && content.trim().length > 0;

  const isFormValid =
    boardType === "general"
      ? isFormValidBase && String(selectedTag).length > 0
      : isFormValidBase &&
      (selectedTag === "판매" || selectedTag === "구매") &&
      price !== null &&
      price >= 0 &&
      chatUrl.trim().length > 0;

  const handleSubmit = async () => {
    if (!isFormValid || isSubmitting || isPrefilling || isUploadingImages) return;

    try {
      setIsSubmitting(true);

      if (isEdit) {
        if (board === "free") {
          const res = await editFree({
            boardId: id,
            title,
            content,
            isAnonymous: anonymous,
            category: mapFreeCategory(selectedTag as UiGeneralTag),
            imageUrls,
          });

          if (res.isSuccess) router.replace(`/community/free/${id}?from=write`);
          else alert(res.message || "게시글 수정에 실패했습니다.");
          return;
        }

        const res = await editMarket({
          marketId: id,
          title,
          content,
          price: price ?? 0,
          chatUrl,
          type: selectedTag as unknown as MarketCategory,
          imageUrls,
        });

        if (res.isSuccess) router.replace(`/community/trade/${id}?from=write`);
        else alert(res.message || "게시글 수정에 실패했습니다.");
        return;
      }

      if (boardType === "general") {
        const res = await postFree({
          title,
          content,
          isAnonymous: anonymous,
          category: mapFreeCategory(selectedTag as UiGeneralTag),
          imageUrls,
        });

        if (res.isSuccess) router.push(`/community/free/${res.payload.boardId}?from=write`);
        else alert(res.message || "게시글 작성에 실패했습니다.");
        return;
      }

      const res = await postMarket({
        title,
        content,
        price: price ?? 0,
        chatUrl,
        type: selectedTag as UiTradeTag,
        imageUrls,
      });

      if (res.isSuccess) router.push(`/community/trade/${res.payload.marketId}?from=write`);
      else alert(res.message || "게시글 작성에 실패했습니다.");
    } catch (err) {
      console.error(err);
      alert(isEdit ? "게시글 수정에 실패했습니다." : "게시글 작성에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnonymousToggle = () => {
    setAnonymous((v) => !v);
  };

  const boardLockClass = isEdit ? "pointer-events-none opacity-60" : "";

  return (
    <div className="min-h-dvh bg-black text-white flex flex-col">
      <CommunityWriteHeader
        disabled={!isFormValid || isSubmitting || isPrefilling || isUploadingImages}
        onRightButtonClick={handleSubmit}
      />

      <div
        className={[
          'flex-1 overflow-y-auto scrollbar-hide ',
          boardType === 'trade' ? 'pb-24' : 'pb-16',
        ].join(' ')}
      >
        <div className="flex justify-between mb-3 px-5 ">
          <span className="font-medium text-base text-white">게시판 선택</span>
          <span className="flex gap-2" onClick={() => setAnonymous(!anonymous)}>
            <CustomCheckbox checked={anonymous} onChange={setAnonymous} size="sm" />
            <span
              className={`text-sm font-medium ${anonymous ? 'text-main-red-2' : 'text-gray-500'}`}
            >
              익명
            </span>
          </span>
        </div>

        <div className="flex gap-2 pb-3 px-5">
          <span
            onClick={() => handleBoardTypeChange('general')}
            className={`border font-medium text-sm px-3 py-1 rounded-xs cursor-pointer ${boardLockClass}
            ${boardType === 'general' ? 'border-main-red-1 bg-main-red-4 text-white' : 'border-gray-600 text-gray-600'}`}
          >
            일반
          </span>
          <span
            onClick={() => handleBoardTypeChange("trade")}
            className={`border font-medium text-sm px-3 py-1 rounded-xs cursor-pointer ${boardLockClass}
            ${
              boardType === "trade"
                ? "border-main-red-1 bg-main-red-4 text-white"
                : "border-gray-600 text-gray-600"
            }`}
          >
            거래/양도
          </span>
        </div>

        <div className="flex justify-between mb-3 px-5">
          <span className="font-medium text-base text-white">말머리 선택</span>
        </div>

        <div className="flex flex-wrap gap-2 pb-3 px-5">
          {tags.map((tag) => (
            <span
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`border font-medium text-sm px-3 py-1 rounded-xs cursor-pointer
              ${
                selectedTag === tag
                  ? "border-main-red-1 bg-main-red-4 text-white"
                  : "border-gray-600 text-gray-600"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <ImageUploadSection
          required={boardType === "trade"}
          value={imageUrls}
          onChangeImageUrls={setImageUrls}
          onUploadingChange={setIsUploadingImages}
        />

        {boardType === "trade" && <TradingPriceArea value={price} onChange={setPrice} />}

        <TextArea
          title={title}
          content={content}
          onChangeTitle={setTitle}
          onChangeContent={setContent}
        />

        {boardType === "trade" && <TradingLinkArea value={chatUrl} onChange={setChatUrl} />}
      </div>
    </div>
  );
}
