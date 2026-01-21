'use client';
import { useState } from 'react';
interface TextAreaProps {
  title: string;
  content: string;
  onChangeTitle: (value: string) => void;
  onChangeContent: (value: string) => void;
}
export default function TextArea({
  title,
  content,
  onChangeTitle,
  onChangeContent,
}: TextAreaProps) {
  return (
    <div className="py-3 flex flex-col px-5">
      <span className="font-medium text-base text-white mb-2">글 작성</span>
      <input
        value={title}
        maxLength={50}
        className="font-medium text-base px-2 py-3 text-gray-300 border-b border-gray-850 focus:outline-none placeholder-gray-700"
        placeholder="제목을 입력해주세요.(최대 50자)"
        onChange={(e) => onChangeTitle(e.target.value)}
      />
      <textarea
        value={content}
        className="px-2 py-4 text-gray-300 text-normal focus:outline-none placeholder-gray-700 "
        placeholder="내용을 입력해주세요."
        onChange={(e) => onChangeContent(e.target.value)}
      />
    </div>
  );
}
