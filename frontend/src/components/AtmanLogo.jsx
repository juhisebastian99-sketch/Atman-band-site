import React from "react";

/**
 * ATMAN Logo — elegant gold letter A with a treble clef & soundwave.
 * Represents music (clef + waves) and spirituality (aum-like curve above A).
 */
export const AtmanLogo = ({ size = 44, showWordmark = true, className = "" }) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`} data-testid="atman-logo">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ATMAN"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E9CB6C" />
            <stop offset="55%" stopColor="#C9A227" />
            <stop offset="100%" stopColor="#8F6F18" />
          </linearGradient>
        </defs>

        {/* Spiritual arc above (aum-like) */}
        <path
          d="M14 16 C22 6, 42 6, 50 16"
          stroke="url(#goldGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        {/* Bindu dot */}
        <circle cx="32" cy="8.5" r="1.4" fill="url(#goldGrad)" />

        {/* Letter A */}
        <path
          d="M14 54 L30 18 L34 18 L50 54"
          stroke="url(#goldGrad)"
          strokeWidth="3.2"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
        {/* Crossbar */}
        <path
          d="M22 42 L42 42"
          stroke="url(#goldGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Tiny treble stem inside crossbar (music mark) */}
        <path
          d="M32 34 C34 34, 34 30, 32 30 C30 30, 30 34, 32 34 Z"
          fill="url(#goldGrad)"
          opacity="0.9"
        />

        {/* Soundwave to the right */}
        <g stroke="url(#goldGrad)" strokeLinecap="round" strokeWidth="1.4" opacity="0.85">
          <line x1="52" y1="30" x2="52" y2="34" />
          <line x1="55" y1="26" x2="55" y2="38" />
          <line x1="58" y1="22" x2="58" y2="42" />
          <line x1="61" y1="28" x2="61" y2="36" />
        </g>
      </svg>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className="font-cinzel text-[1.15rem] tracking-[0.28em] text-[#F8F6F2]">
            ATMAN
          </span>
          <span className="hidden md:block text-[0.5rem] tracking-[0.32em] uppercase text-[#C9A227]/70 mt-1 whitespace-nowrap">
            Music That Touches The Soul
          </span>
        </div>
      )}
    </div>
  );
};

export default AtmanLogo;
