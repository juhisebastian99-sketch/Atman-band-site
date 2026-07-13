import React from "react";

/**
 * ATMAN Logo — the official Enso brush-stroke wordmark JPG.
 *
 * The source JPG has a solid black background. We render it cleanly on any
 * dark surface using a two-layer approach:
 *   1) SVG feColorMatrix filter (`#atman-remove-black`, defined once at
 *      App root) that maps pure-black pixels to alpha=0 — a proper cutout.
 *   2) mix-blend-mode: lighten as a fallback for any rendering path where
 *      the SVG filter isn't applied — max(dark bg, near-black JPG) still
 *      keeps the visible artwork.
 */
export const AtmanLogo = ({ size = 44, className = "" }) => {
  return (
    <div className={`inline-flex items-center ${className}`} data-testid="atman-logo">
      <img
        src="https://customer-assets.emergentagent.com/job_atman-events/artifacts/4eycqdw3_IMG-20260713-WA0003.jpg"
        alt="ATMAN"
        style={{
          width: size * 2.6,
          height: "auto",
          filter: "url(#atman-remove-black) contrast(1.15)",
          mixBlendMode: "lighten",
        }}
        className="object-contain select-none pointer-events-none"
        draggable={false}
      />
    </div>
  );
};

export default AtmanLogo;
