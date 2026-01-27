'use client';

import Image from 'next/image';
import linkIcon from '@/assets/community/link.svg';

type Props = {
  value: string;
  onChange: (next: string) => void;
};

export default function TradingLinkArea({ value, onChange }: Props) {
  const hasValue = value.length > 0;

  return (
    <div className=" flex flex-col px-5">
      <span className="font-medium text-base text-white mb-3">링크</span>

      <div className="flex relative bg-gray-900 border border-gray-850 rounded-sm px-2 ">
        {/* 입력 아이콘 */}
        {hasValue && (
          <Image
            src={linkIcon}
            alt="link"
            width={24}
            height={24}
            className="absolute left-2 top-1/2 -translate-y-1/2"
          />
        )}

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="거래자와 소통할 링크를 첨부해주세요."
          className={[
            'w-full bg-transparent',
            'font-medium text-base',
            'py-3',
            'focus:outline-none',
            'placeholder-gray-700',
            hasValue ? 'text-white pl-8' : 'text-white pl-1',
          ].join(' ')}
        />
      </div>
    </div>
  );
}
