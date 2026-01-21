'use client';

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  gap?: number;
  paddingX?: number;
};

export default function HorizontalSwipeList({ children, gap = 12, paddingX = 16 }: Props) {
  return (
    <div className="mt-4 overflow-x-auto bg-black">
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
