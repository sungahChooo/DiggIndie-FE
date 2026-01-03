'use client';

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  gap?: number;
  paddingX?: number;
};

export default function HorizontalSwipeList({ children, gap = 12, paddingX = 16 }: Props) {
  return (
    <div className="mt-[16px] overflow-x-auto">
      <div
        className="flex w-max"
        style={{
          gap,
          paddingLeft: paddingX,
          paddingRight: paddingX,
        }}
      >
        {children}
      </div>
    </div>
  );
}
