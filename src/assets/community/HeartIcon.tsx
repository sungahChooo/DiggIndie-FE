import React from 'react';

interface HeartIconProps {
  firstStroke?: string;
  active?: boolean;
  size?: number;
  onClick?: () => void;
}

export default function HeartIcon({
                                    active = false,
                                    size = 24,
                                    onClick,
                                    firstStroke = '#F6F6F6',
                                  }: HeartIconProps) {
  const strokeColor = active ? '#FF3637' : `${firstStroke}`;
  const fillColor = active ? '#FF3637' : 'none';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className="cursor-pointer"
    >
      <path
        d="M21.2499 9.63531C21.24 7.09945 19.9096 4.71464 17.2866 3.86966C15.4855 3.28845 13.5236 3.61167 12 5.79914C10.4764 3.61167 8.51447 3.28845 6.71339 3.86966C4.09014 4.71474 2.75971 7.09999 2.75008 9.63618C2.72582 14.6799 7.83662 18.5394 11.9987 20.3842L12 20.3836L12.0013 20.3842C16.1636 18.5393 21.2748 14.6794 21.2499 9.63531Z"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="square"
      />
    </svg>
  );
}