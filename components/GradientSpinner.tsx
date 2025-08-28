import React from 'react';

export default function GradientSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <defs>
        <linearGradient id="gradient-spinner" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--tw-gradient-from)" />
          <stop offset="50%" stopColor="var(--tw-gradient-via)" />
          <stop offset="100%" stopColor="var(--tw-gradient-to)" />
        </linearGradient>
      </defs>
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="url(#gradient-spinner)"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
