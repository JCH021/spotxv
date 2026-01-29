// src/icons/Explore.tsx
import React from "react";

export default function Explore(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polygon points="16,8 12,12 8,16 16,8"></polygon>
    </svg>
  );
}
