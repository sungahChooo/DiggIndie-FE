'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { postImage } from '@/api/file';

interface ImageUploadSectionProps {
  required?: boolean;
  value?: string[]; // fileKey 배열 수정용
  onChangeImageUrls?: (urls: string[]) => void;
  onUploadingChange?: (uploading: boolean) => void;
}

function sanitizeFileName(name: string) {
  return name.replace(/[^\w.\-() ]+/g, '_');
}

async function uploadOne(file: File) {
  const safeName = sanitizeFileName(file.name);

  const res = await postImage({ fileName: safeName });
  if (!res?.isSuccess) throw new Error(res?.message || 'Presigned URL 발급 실패');

  const { presignedUrl, fileKey } = res.payload;

  const putRes = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
    body: file,
  });

  if (!putRes.ok) throw new Error(`S3 업로드 실패 (${putRes.status})`);

  return fileKey as string;
}

const S3_BASE =
  process.env.NEXT_PUBLIC_MARKET_IMAGE_BASE_URL ||
  'https://diggindie-imgs.s3.ap-northeast-2.amazonaws.com';

function toS3Url(raw?: string | null) {
  if (!raw) return null;
  const v = raw.trim();
  if (!v) return null;
  if (v.startsWith('http://') || v.startsWith('https://')) return v;
  return `${S3_BASE}/${encodeURIComponent(v)}`;
}

export default function ImageUploadSection({
                                             required,
                                             value,
                                             onChangeImageUrls,
                                             onUploadingChange,
                                           }: ImageUploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 업로드된fileKey 목록
  const [fileKeys, setFileKeys] = useState<string[]>(value ?? []);

  const [localPreviews, setLocalPreviews] = useState<string[]>([]);

  // 수정모드에서 value가 들어오면 내부 상태에 반영
  useEffect(() => {
    if (!value) return;
    setFileKeys(value);
    setLocalPreviews([]);
  }, [value]);

  // 외부로 fileKey 배열 전달
  useEffect(() => {
    onChangeImageUrls?.(fileKeys);
  }, [fileKeys, onChangeImageUrls]);

  const previews = useMemo(() => {
    const existing = fileKeys.map((k) => toS3Url(k)).filter(Boolean) as string[];
    return [...existing, ...localPreviews];
  }, [fileKeys, localPreviews]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    const MAX_IMAGES = 10;
    if (fileKeys.length + selectedFiles.length > MAX_IMAGES) {
      alert(`이미지는 최대 ${MAX_IMAGES}장까지 업로드할 수 있어요.`);
      e.target.value = '';
      return;
    }

    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setLocalPreviews((prev) => [...prev, ...previewUrls]);

    onUploadingChange?.(true);
    try {
      const uploadedKeys = await Promise.all(selectedFiles.map((f) => uploadOne(f)));
      setFileKeys((prev) => [...prev, ...uploadedKeys]);
    } catch (err) {
      console.error(err);
      alert('이미지 업로드에 실패했습니다.');
      setLocalPreviews((prev) => {
        const next = prev.slice(0, prev.length - previewUrls.length);
        return next;
      });
      previewUrls.forEach((u) => URL.revokeObjectURL(u));
    } finally {
      onUploadingChange?.(false);
      e.target.value = '';
    }
  };

  const removeImage = (index: number) => {

    // index가 기존 영역이면 fileKeys에서 제거
    const existingCount = fileKeys.length;
    if (index < existingCount) {
      setFileKeys((prev) => prev.filter((_, i) => i !== index));
      return;
    }

    // index가 local 영역이면 localPreviews에서 제거
    const localIndex = index - existingCount;
    setLocalPreviews((prev) => {
      const url = prev[localIndex];
      if (url) URL.revokeObjectURL(url);
      return prev.filter((_, i) => i !== localIndex);
    });

    setFileKeys((prev) => prev.filter((_, i) => i !== existingCount + localIndex));
  };

  useEffect(() => {
    return () => {
      localPreviews.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [localPreviews]);

  return (
    <div className="py-3 flex flex-col gap-3 px-5">
      <div className="flex gap-[7px] items-end">
        <span className="font-medium text-base text-white">사진 추가</span>
        <span className={`${required ? 'text-main-red-1' : 'text-gray-700'} text-sm font-medium`}>
          {required ? '필수' : '선택'}
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto shrink-0">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />

        {previews.length < 10 && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-24 h-24 flex items-center justify-center border border-gray-800 bg-gray-900 text-gray-600 text-3xl shrink-0 cursor-pointer"
          >
            +
          </button>
        )}

        {previews.map((src, index) => (
          <div key={`${src}-${index}`} className="relative w-24 h-24 shrink-0">
            <Image src={src} alt="preview" fill className="object-cover rounded" unoptimized />
            <button
              type="button"
              className="absolute top-1 right-1 bg-black/60 text-white text-xs rounded-full w-5 h-5 cursor-pointer"
              onClick={() => removeImage(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
