'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { postImage } from '@/api/file';

interface ImageUploadSectionProps {
  required?: boolean;
  onChangeImageUrls?: (urls: string[]) => void;
  onUploadingChange?: (uploading: boolean) => void;
}

function sanitizeFileName(name: string) {
  return name.replace(/[^\w.\-() ]+/g, '_');
}

async function uploadOne(file: File) {
  const safeName = sanitizeFileName(file.name);

  const res = await postImage({ fileName: safeName });

  if (!res?.isSuccess) {
    throw new Error(res?.message || 'Presigned URL 발급 실패');
  }

  const { presignedUrl, fileKey } = res.payload;

  const putRes = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
    body: file,
  });

  if (!putRes.ok) {
    throw new Error(`S3 업로드 실패 (${putRes.status})`);
  }

  return fileKey;
}

export default function ImageUploadSection({ required, onChangeImageUrls, onUploadingChange }: ImageUploadSectionProps) {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [fileKeys, setFileKeys] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onChangeImageUrls?.(fileKeys);
  }, [fileKeys, onChangeImageUrls]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    const MAX_IMAGES = 10;
    if (images.length + selectedFiles.length > MAX_IMAGES) {
      alert(`이미지는 최대 ${MAX_IMAGES}장까지 업로드할 수 있어요.`);
      e.target.value = '';
      return;
    }

    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...selectedFiles]);
    setPreviews((prev) => [...prev, ...previewUrls]);

    onUploadingChange?.(true);
    try {
      const uploadedKeys = await Promise.all(selectedFiles.map((f) => uploadOne(f)));
      setFileKeys((prev) => [...prev, ...uploadedKeys]);
    } catch (err) {
      console.error(err);
      alert('이미지 업로드에 실패했습니다.');
      setImages((prev) => prev.slice(0, prev.length - selectedFiles.length));
      setPreviews((prev) => {
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
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      const url = prev[index];
      if (url) URL.revokeObjectURL(url);
      return prev.filter((_, i) => i !== index);
    });
    setFileKeys((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    return () => {
      previews.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [previews]);

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
        {images.length < 10 && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-24 h-24 flex items-center justify-center
                 border border-gray-800
                 bg-gray-900
                 text-gray-600 text-3xl shrink-0 cursor-pointer"
          >
            +
          </button>
        )}
        {previews.map((src, index) => (
          <div key={index} className="relative w-24 h-24 shrink-0">
            <Image src={src} alt="preview" fill className="object-cover rounded" />
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
