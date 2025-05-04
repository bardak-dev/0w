import React, { memo, type SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}

export const IconClose = memo<Props>(({ color = "#808080", size = 24, ...rest }) => {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...rest}
    >
      <rect width={size} height={size} fill="#fff" rx="12" />
      <path
        fill={color}
        d="M15.597 7 17 8.403 8.403 17 7 15.597 15.597 7ZM8.403 7 17 15.597 15.597 17 7 8.403 8.403 7Z"
      />
    </svg>
  );
});
