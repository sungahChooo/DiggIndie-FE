'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface ImageUploadSectionProps {
  required?: boolean;
}
export default function ImageUploadSection({ required }: ImageUploadSectionProps) {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    // 최대 개수 제한
    const MAX_IMAGES = 10;
    if (images.length + selectedFiles.length > MAX_IMAGES) {
      alert(`이미지는 최대 ${MAX_IMAGES}장까지 업로드할 수 있어요.`);
      return;
    }

    setImages((prev) => [...prev, ...selectedFiles]);

    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...previewUrls]);
  };
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };
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
        {/* + 버튼 */}
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
