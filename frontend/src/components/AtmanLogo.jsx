import React from "react";

/**
 * ATMAN Logo — uses the official brand logo image (brush-stroke circle + wordmark).
 * `size` controls the width in pixels. Wordmark prop kept for API compatibility
 * (the image already contains the wordmark, so we ignore showWordmark).
 */
export const AtmanLogo = ({ size = 44, showWordmark = true, className = "" }) => {
  return (
    <div className={`inline-flex items-center ${className}`} data-testid="atman-logo">
      <img
        src="https://customer-assets.emergentagent.com/job_atman-events/artifacts/fq98lltx_IMG-20260713-WA0003.jpg"
        alt="ATMAN"
        style={{ width: size * 2.4, height: "auto" }}
        className="object-contain select-none"
        draggable={false}
      />
    </div>
  );
};

export default AtmanLogo;
