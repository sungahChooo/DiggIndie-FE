'use client';

import { useEffect, useRef, useState } from 'react';
import downBtn from '@/assets/icons/down.svg';
import Image from 'next/image';

type Props<T extends string> = {
  headers: readonly T[];
  value: T;
  onChangeAction: (v: T) => void;
};

export default function CommunityHeaderFilter<T extends string>({
                                                                  headers,
                                                                  value,
                                                                  onChangeAction,
                                                                }: Props<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full z-30">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="ml-auto border border-[#736F6F] rounded-[4px] w-fit min-w-[68px] max-w-[92px] h-[28px] px-1 py-1
        text-[14px] flex items-center gap-1 bg-black justify-center"
      >
        {value}
        <Image src={downBtn} alt={'open'} width={16} height={16} />
      </button>

      {open && (
        <div
          className="ml-auto absolute right-0 flex flex-col mt-2 border w-[83px] border-[#736F6F] justify-between
         bg-black text-[14px] font-normal leading-[140%] tracking-[-0.03em] py-2 rounded-[4px]
         max-h-[236px] overflow-y-auto"
        >
          {headers.map((h) => (
            <div
              key={h}
              className={`w-[67px] h-[28px] py-1 cursor-pointer ml-[8px] px-2 rounded-[4px]
              ${
                h === value
                  ? 'bg-[#332F2F] text-white'
                  : 'text-[#8C8888] hover:bg-[#332F2F] hover:text-white'
                }
              `}
              onClick={() => {
                onChangeAction(h);
                setOpen(false);
              }}
            >
              {h}
            </div>

          ))}
        </div>
      )}
    </div>
  );
}
