import React, { useEffect, useState } from "react";

/**
 * ATMAN Enso Logo — bulletproof transparent rendering.
 *
 * The source JPG has a solid black background. Instead of relying on CSS
 * blend-modes or SVG filters (which some browsers/caches render inconsistently),
 * we load the JPG into an offscreen <canvas>, scan every pixel, and:
 *   - pixels darker than ~15% brightness  → alpha = 0 (fully transparent)
 *   - lighter pixels                       → alpha boosted proportional to brightness
 * The result is a genuine transparent PNG (data URL) that renders identically
 * on any dark surface, in any browser, with or without cache.
 */

// module-level cache so we only process the image once per page load
let _cachedDataUrl = null;
const _listeners = new Set();

const LOGO_SRC =
  "https://customer-assets.emergentagent.com/job_atman-events/artifacts/4eycqdw3_IMG-20260713-WA0003.jpg";

async function processLogo() {
  if (_cachedDataUrl) return _cachedDataUrl;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const px = data.data;
        for (let i = 0; i < px.length; i += 4) {
          const r = px[i];
          const g = px[i + 1];
          const b = px[i + 2];
          const brightness = (r + g + b) / 3; // 0-255
          if (brightness < 40) {
            px[i + 3] = 0; // fully transparent
          } else if (brightness < 90) {
            // feather edge for anti-aliasing
            px[i + 3] = Math.round(((brightness - 40) / 50) * 255);
          }
          // else keep original alpha (255)
        }
        ctx.putImageData(data, 0, 0);
        _cachedDataUrl = canvas.toDataURL("image/png");
        resolve(_cachedDataUrl);
      } catch (e) {
        // CORS or canvas failure — fall back to the original JPG
        resolve(LOGO_SRC);
      }
    };
    img.onerror = () => resolve(LOGO_SRC);
    img.src = LOGO_SRC;
  });
}

// Kick off processing eagerly (once) so first paint is fast
if (typeof window !== "undefined") {
  processLogo().then((url) => {
    _cachedDataUrl = url;
    _listeners.forEach((cb) => cb(url));
  });
}

function useProcessedLogo() {
  const [src, setSrc] = useState(_cachedDataUrl || LOGO_SRC);
  useEffect(() => {
    if (_cachedDataUrl) {
      setSrc(_cachedDataUrl);
      return;
    }
    const cb = (url) => setSrc(url);
    _listeners.add(cb);
    return () => _listeners.delete(cb);
  }, []);
  return src;
}

export const AtmanLogo = ({ size = 44, className = "" }) => {
  const src = useProcessedLogo();
  return (
    <div className={`inline-flex items-center ${className}`} data-testid="atman-logo">
      <img
        src={src}
        alt="ATMAN"
        style={{ width: size * 2.6, height: "auto" }}
        className="object-contain select-none pointer-events-none"
        draggable={false}
      />
    </div>
  );
};

/** Bigger version used in the hero centerpiece */
export const AtmanLogoLarge = ({ className = "" }) => {
  const src = useProcessedLogo();
  return (
    <img
      src={src}
      alt="ATMAN"
      className={`object-contain select-none pointer-events-none ${className}`}
      draggable={false}
      data-testid="atman-logo-large"
    />
  );
};

export default AtmanLogo;
