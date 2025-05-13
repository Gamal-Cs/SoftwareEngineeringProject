import React from "react";

const blueLogo = ({ size = 36, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M18 3C10 3 3 10 3 18c0 7 4 15 8 15 2 0 3-2 4-5 1 3 2 5 4 5 4 0 8-8 8-15 0-8-7-15-15-15z"
      fill="#fff"
      stroke="#0ea5e9"
      strokeWidth="2"
    />
    <path
      d="M13 20c2 2 8 2 10 0"
      stroke="#0ea5e9"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default blueLogo; 