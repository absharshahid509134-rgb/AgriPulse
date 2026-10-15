import React from 'react';

interface AgriSenseLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
  showTagline?: boolean;
  className?: string;
}

export const AgriSenseLogo: React.FC<AgriSenseLogoProps> = ({
  size = 'md',
  theme = 'dark',
  showTagline = false,
  className = '',
}) => {
  const iconSizeClass =
    size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-11 h-11' : size === 'xl' ? 'w-14 h-14' : 'w-9 h-9';

  const titleSizeClass =
    size === 'sm'
      ? 'text-base'
      : size === 'lg'
      ? 'text-xl'
      : size === 'xl'
      ? 'text-2xl'
      : 'text-lg';

  const textColor = theme === 'light' ? 'text-white' : 'text-slate-900';
  const accentColor = theme === 'light' ? 'text-emerald-400' : 'text-emerald-600';
  const subColor = theme === 'light' ? 'text-emerald-100/80' : 'text-slate-500';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision 1:1 Vector Emblem */}
      <div
        className={`${iconSizeClass} shrink-0 rounded-xl overflow-hidden shadow-sm transition-transform hover:scale-105`}
        title="AGRIPULSE Logo"
      >
        <svg
          viewBox="0 0 512 512"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Vibrant Green Ground */}
          <rect width="512" height="512" fill="#15803D" />

          {/* Three-Leaf Sprout & Water Lines in Cream */}
          <g fill="#F7F5EA" stroke="#F7F5EA">
            {/* Center Leaf */}
            <path
              d="M256,76 C256,76 202,175 202,254 C202,306 226,334 256,334 C286,334 310,306 310,254 C310,175 256,76 256,76 Z"
              fill="#F7F5EA"
              stroke="none"
            />
            <path
              d="M256,324 C256,324 256,238 256,192"
              stroke="#15803D"
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="256" cy="180" r="14" fill="#15803D" stroke="none" />

            {/* Left Leaf */}
            <path
              d="M236,330 C236,330 148,348 80,306 C24,272 26,206 72,192 C148,168 226,260 236,330 Z"
              fill="#F7F5EA"
              stroke="none"
            />
            <path
              d="M220,314 C176,276 142,246 114,232"
              stroke="#15803D"
              strokeWidth="11"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="106" cy="228" r="13" fill="#15803D" stroke="none" />

            {/* Right Leaf */}
            <path
              d="M276,330 C276,330 364,348 432,306 C488,272 486,206 440,192 C364,168 286,260 276,330 Z"
              fill="#F7F5EA"
              stroke="none"
            />
            <path
              d="M292,314 C336,276 370,246 398,232"
              stroke="#15803D"
              strokeWidth="11"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="406" cy="228" r="13" fill="#15803D" stroke="none" />

            {/* Upper Wave */}
            <path
              d="M104,364 C140,352 176,378 214,378 C252,378 288,352 326,352 C364,352 400,378 436,368"
              fill="none"
              stroke="#F7F5EA"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Lower Wave */}
            <path
              d="M104,404 C140,392 176,418 214,418 C252,418 288,392 326,392 C364,392 400,418 436,408"
              fill="none"
              stroke="#F7F5EA"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>

      {/* Brand Text & Tagline */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-0.5">
          <span className={`font-black tracking-tight leading-none ${titleSizeClass} ${textColor}`}>
            AGRI<span className={accentColor}>PULSE</span>
          </span>
        </div>
        {showTagline ? (
          <span className={`text-[10px] font-medium tracking-tight mt-0.5 ${subColor}`}>
            Measure. Understand. Predict. Protect.
          </span>
        ) : (
          <span className={`text-[9px] font-semibold tracking-wider uppercase ${subColor}`}>
            Farm Digital Twin
          </span>
        )}
      </div>
    </div>
  );
};
