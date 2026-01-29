'use client';

import { Checkbox } from '@mui/material';
import Image from 'next/image';
import sendIcon from '@/assets/community/Send.svg';
import sendRed from '@/assets/community/SendRed.svg';
import { useEffect, useRef, useState } from 'react';
import CustomCheckbox from './Checkbox';

interface Props {
  addReply: (content: string, isAnonymous: boolean) => void;
  disabled?: boolean;
  replyTarget?: { parentCommentId: number; nickname: string; depth: 0 | 1 } | null;
  onCancelReply?: () => void;
}

export default function ReplyInputSection({
  addReply,
  disabled,
  replyTarget,
  onCancelReply,
}: Props) {
  const [input, setInput] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!replyTarget) return;

    // 대대댓글 작성때만 자동 멘션 입력
    if (replyTarget.depth !== 1) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
      return;
    }

    const mention = `@${replyTarget.nickname} `;

    setInput((prev) => {
      const prevTrim = prev.trim();
      if (prevTrim.length === 0) return mention;
      if (prev.startsWith('@')) return mention;
      return prev;
    });

    requestAnimationFrame(() => {
      inputRef.current?.focus();
      const v = inputRef.current?.value ?? '';
      inputRef.current?.setSelectionRange(v.length, v.length);
    });
  }, [replyTarget]);

  const handleSend = () => {
    if (disabled) return;
    if (!input.trim()) return;

    addReply(input, isChecked);
    setInput('');
    onCancelReply?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleSend();
  };

  return (
    <section className="fixed w-full bottom-0 p-5 min-w-[375px] z-30">
      <div className="flex bg-gray-800 px-4 py-4 rounded-sm justify-between">
        <div className="flex items-center justify-between">
          <CustomCheckbox checked={isChecked} onChange={setIsChecked} size="sm" />

          <span
            onClick={() => setIsChecked((v) => !v)}
            className={`cursor-pointer text-sm font-medium pl-1 pr-2 ${
              isChecked ? 'text-main-red-2' : 'text-gray-400'
            }`}
          >
            익명
          </span>

          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="댓글을 입력하세요."
            disabled={disabled}
            className="flex-1 min-w-0 bg-transparent text-white text-sm placeholder-gray-600 focus:outline-none"
          />
        </div>
        {/* send */}
        <button type="button" disabled={disabled} onClick={handleSend} className="ml-3 shrink-0">
          <Image
            src={input.trim().length > 0 ? sendRed : sendIcon}
            alt="send"
            width={24}
            height={24}
            className={disabled ? 'cursor-default' : 'cursor-pointer'}
          />
        </button>
      </div>
    </section>
  );
}
