import React from "react";

/**
 * ATMAN Enso Logo — served as a same-origin static PNG (`/atman-logo.png`)
 * with real transparency. Bypasses cross-origin canvas restrictions.
 *
 * The PNG was pre-processed from the source JPG: every near-black pixel
 * was mapped to alpha=0 with feathered edges. Result works in every
 * browser, on any dark surface, cache or no cache.
 */
const LOGO_SRC = "/atman-logo.png";

export const AtmanLogo = ({ size = 44, className = "" }) => {
  return (
    <div className={`inline-flex items-center ${className}`} data-testid="atman-logo">
      <img
        src={LOGO_SRC}
        alt="ATMAN"
        style={{ width: size * 2.6, height: "auto" }}
        className="object-contain select-none pointer-events-none"
        draggable={false}
      />
    </div>
  );
};

/** Bigger version used in the hero centerpiece + footer */
export const AtmanLogoLarge = ({ className = "" }) => {
  return (
    <img
      src={LOGO_SRC}
      alt="ATMAN"
      className={`object-contain select-none pointer-events-none ${className}`}
      draggable={false}
      data-testid="atman-logo-large"
    />
  );
};

export default AtmanLogo;
