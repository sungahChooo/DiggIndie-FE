import * as React from 'react';

interface BookmarkIconProps extends React.SVGProps<SVGSVGElement> {
  isActive?: boolean;
  isMine?: boolean;
}

const BookmarkIcon = ({ isActive = false, isMine = false, className, ...props }: BookmarkIconProps) => {
  return (
    <svg
      viewBox="0 0 17 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.7051 0.75C9.8648 0.75 6.59035 0.75 0.75 0.75V19.25L8.25266 15.8045L15.7051 19.25V0.75Z"
        fill={(isActive || isMine) ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="square"
      />
    </svg>
  );
};

export default BookmarkIcon;
