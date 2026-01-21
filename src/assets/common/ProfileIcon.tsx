import React from 'react';

interface ProfileIconProps {
  width?: number;
  height?: number;
  stroke?: string;
}

export default function ProfileIcon({
  width = 25,
  height = 24,
  stroke = 'white',
}: ProfileIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5004 14.8189C15.8924 14.8106 18.7766 16.3057 19.8367 19.5242C17.6999 20.7748 15.1846 21.2564 12.5004 21.2501C9.81615 21.2564 7.3009 20.7748 5.16406 19.5242C6.22542 16.3022 9.10472 14.8105 12.5004 14.8189Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <ellipse
        cx="12.5004"
        cy="7.16973"
        rx="4.60389"
        ry="4.41973"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
