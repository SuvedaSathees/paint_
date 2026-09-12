import React from "react";

export function FooterCurveLine() {
  return (
    <div className="relative w-full overflow-hidden leading-none select-none -mb-1 z-20">
      <svg
        viewBox="0 0 1440 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-7 sm:h-9 lg:h-11 block"
        aria-hidden="true"
      >
        <defs>
          {/* Birla Opus Signature Orange Linear Gradient */}
          <linearGradient id="footerCurveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f26522" stopOpacity="0.2" />
            <stop offset="12%" stopColor="#f26522" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#ea580c" stopOpacity="1" />
            <stop offset="88%" stopColor="#f26522" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#f26522" stopOpacity="0.2" />
          </linearGradient>

          {/* Soft architectural ambient glow filter */}
          <filter id="footerCurveGlow" x="-5%" y="-60%" width="110%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Soft Glow Duplicate Line */}
        <path
          d="M 0,22 C 320,6 640,36 960,14 C 1140,2 1320,24 1440,20"
          stroke="#f26522"
          strokeWidth="6"
          strokeOpacity="0.28"
          strokeLinecap="round"
          filter="url(#footerCurveGlow)"
        />

        {/* Crisp Main Curved Line in Birla Opus Signature Orange */}
        <path
          d="M 0,22 C 320,6 640,36 960,14 C 1140,2 1320,24 1440,20"
          stroke="url(#footerCurveGradient)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
