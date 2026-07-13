import React from "react";

/**
 * ATMAN Logo — uses the official brand logo image (brush-stroke circle + wordmark).
 * mix-blend-mode: screen removes the black JPG background so the logo shows
 * cleanly against any dark surface (navbar, footer, hero).
 */
export const AtmanLogo = ({ size = 44, showWordmark = true, className = "" }) => {
  return (
    <div className={`inline-flex items-center ${className}`} data-testid="atman-logo">
      <img
        src="https://customer-assets.emergentagent.com/job_atman-events/artifacts/4eycqdw3_IMG-20260713-WA0003.jpg"
        alt="ATMAN"
        style={{
          width: size * 2.6,
          height: "auto",
          mixBlendMode: "screen",
        }}
        className="object-contain select-none pointer-events-none"
        draggable={false}
      />
    </div>
  );
};

export default AtmanLogo;
