'use client';

import { useEffect, useRef } from 'react';

interface TextAreaProps {
  title: string;
  content: string;
  onChangeTitle: (value: string) => void;
  onChangeContent: (value: string) => void;
}

const MAX_HEIGHT = 240;

export default function TextArea({
  title,
  content,
  onChangeTitle,
  onChangeContent,
}: TextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resize = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = 'auto';

    if (el.scrollHeight <= MAX_HEIGHT) {
      el.style.height = `${el.scrollHeight}px`;
      el.style.overflowY = 'hidden';
    } else {
      el.style.height = `${MAX_HEIGHT}px`;
      el.style.overflowY = 'auto';
    }
  };

  useEffect(() => {
    resize();
  }, [content]);

  return (
    <div className="py-3 flex flex-col px-5">
      <span className="font-medium text-base text-white mb-2">글 작성</span>

      <input
        value={title}
        maxLength={50}
        className="font-medium text-base px-2 py-3 text-gray-300 border-b border-gray-850 focus:outline-none placeholder-gray-700 bg-transparent"
        placeholder="제목을 입력해주세요.(최대 50자)"
        onChange={(e) => onChangeTitle(e.target.value)}
      />

      <textarea
        ref={textareaRef}
        value={content}
        placeholder="내용을 입력해주세요."
        onChange={(e) => onChangeContent(e.target.value)}
        className={[
          'px-2 py-4',
          'text-gray-300 text-normal',
          'focus:outline-none',
          'placeholder-gray-700',
          'bg-transparent',
          'resize-none',
          'overflow-y-auto', // 내부 스크롤 허용
          'min-h-[54px]',
        ].join(' ')}
      />
    </div>
  );
}
