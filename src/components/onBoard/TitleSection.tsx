import React from 'react';

interface TitleSectionProps {
  title: React.ReactNode;
  min: string;
  titleClassName?: string;
  minClassName?: string;
}

export default function TitleSection({
  title,
  min,
  titleClassName = 'w-full flex items-end gap-2 px-5',
  minClassName = 'text-xs font-medium leading-[var(--line-height-text)] tracking-[var(--letter-spacing-text)]',
}: TitleSectionProps) {
  return (
    <div className={titleClassName}>
      <span className="text-white font-bold text-2xl leading-[var(--line-height-title)] tracking-[var(--letter-spacing-title)]">
        {title}
      </span>
      <span className={minClassName}>{min}</span>
    </div>
  );
}
