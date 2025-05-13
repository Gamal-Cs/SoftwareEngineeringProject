
import React from "react";

export function PrescriptionBottle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 2h10v4H7zm11 8V6H6v4zm-9 8a3 3 0 0 1-3-3V10h14v5a3 3 0 0 1-3 3zm5-5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z" />
    </svg>
  );
}
