import React from "react";

/**
 * ATMAN Logo — uses the official brand logo image (brush-stroke circle + wordmark).
 * mix-blend-mode: screen removes the black JPG background so the logo shows
 * cleanly against any dark surface (navbar, footer, hero).
 */
export const AtmanLogo = ({ size = 44, showWordmark = true, className = "" }) => {
  return (
    <div className={`inline-flex items-center ${className}`} data-testid="atman-logo">
      {/* Inline SVG filter that converts pure black pixels to transparent alpha,
          so the JPG's black background is invisible on any surface. */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="atman-logo-remove-black">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      3 3 3 0 -0.6"
            />
          </filter>
        </defs>
      </svg>
      <img
        src="https://customer-assets.emergentagent.com/job_atman-events/artifacts/4eycqdw3_IMG-20260713-WA0003.jpg"
        alt="ATMAN"
        style={{
          width: size * 2.6,
          height: "auto",
          filter: "url(#atman-logo-remove-black)",
        }}
        className="object-contain select-none pointer-events-none"
        draggable={false}
      />
    </div>
  );
};

export default AtmanLogo;
