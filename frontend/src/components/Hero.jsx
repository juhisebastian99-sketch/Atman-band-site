import React from "react";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

// Grayscale band silhouettes on stage — matches the reference mockup.
// Wide shot of musicians silhouetted against stage lights and smoke.
const HERO_BG =
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=2400&q=80";

const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_atman-events/artifacts/4eycqdw3_IMG-20260713-WA0003.jpg";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Diagonal parallel gold brush strokes — matches the bottom-left decoration
// from the reference mockup. Rendered as an SVG group of skewed shapes.
const DiagonalBrushStrokes = ({ side = "left" }) => {
  const isLeft = side === "left";
  return (
    <svg
      className={`absolute pointer-events-none select-none hidden md:block ${
        isLeft ? "bottom-0 left-0" : "top-0 right-0 rotate-180"
      }`}
      width="420"
      height="360"
      viewBox="0 0 420 360"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`diag-brush-${side}`}
          x1="0"
          y1="1"
          x2="1"
          y2="0"
        >
          <stop offset="0%" stopColor="#E9CB6C" stopOpacity="1" />
          <stop offset="55%" stopColor="#C9A227" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#8F6F18" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g
        fill={`url(#diag-brush-${side})`}
        transform="translate(0 360) rotate(-30)"
      >
        <rect x="0" y="0" width="360" height="10" rx="2" />
        <rect x="20" y="30" width="300" height="6" rx="2" opacity="0.85" />
        <rect x="0" y="55" width="340" height="8" rx="2" opacity="0.9" />
        <rect x="40" y="80" width="260" height="5" rx="2" opacity="0.75" />
        <rect x="0" y="105" width="320" height="9" rx="2" opacity="0.85" />
        <rect x="30" y="135" width="240" height="4" rx="2" opacity="0.65" />
        <rect x="10" y="160" width="280" height="6" rx="2" opacity="0.7" />
      </g>
    </svg>
  );
};

export const Hero = () => {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* Grayscale band silhouette background */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={HERO_BG}
          alt="ATMAN band silhouettes performing live under stage spotlights"
          className="w-full h-full object-cover object-center"
          style={{ filter: "grayscale(100%) contrast(1.15) brightness(0.55)" }}
        />
      </motion.div>

      {/* Dark overlays for dramatic contrast — keeps band visible but subdued */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_78%)]" />

      {/* Gold diagonal brush strokes — bottom-left + top-right corner accents */}
      <DiagonalBrushStrokes side="left" />
      <DiagonalBrushStrokes side="right" />

      {/* Subtle film grain */}
      <div className="absolute inset-0 grain opacity-60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 min-h-screen flex flex-col items-center justify-center text-center pt-24 pb-24">
        {/* Giant Enso logo as centerpiece — ATMAN wordmark is inside the circle. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative"
          data-testid="hero-logo"
        >
          {/* Soft gold aura far behind the logo */}
          <div
            className="absolute -inset-32 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(201,162,39,0.22) 0%, rgba(201,162,39,0.06) 45%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <img
            src={LOGO_URL}
            alt="ATMAN"
            style={{
              filter:
                "url(#atman-remove-black) contrast(1.1) drop-shadow(0 0 30px rgba(201,162,39,0.35))",
              mixBlendMode: "lighten",
            }}
            className="relative w-[320px] sm:w-[440px] md:w-[560px] lg:w-[640px] h-auto object-contain select-none pointer-events-none"
            draggable={false}
          />
        </motion.div>

        {/* Tagline — "MUSIC. SOUL. CONNECTION." with SOUL in gold, matches reference */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="-mt-2 sm:mt-2 font-cinzel text-base sm:text-lg md:text-xl tracking-[0.35em] uppercase text-[#F8F6F2]"
          data-testid="hero-tagline"
        >
          <span>Music.</span>
          <span className="ml-3 text-[#C9A227]">Soul.</span>
          <span className="ml-3">Connection.</span>
        </motion.p>

        {/* Single "LISTEN NOW" CTA — gold outlined button like the reference */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10"
        >
          <button
            onClick={() => scrollTo("performances")}
            data-testid="hero-listen-btn"
            className="ghost-btn inline-flex items-center gap-3 border border-[#C9A227] text-[#F8F6F2] hover:text-[#C9A227] font-cinzel tracking-[0.4em] uppercase text-xs sm:text-sm px-12 py-4 rounded-none"
          >
            <PlayCircle size={16} strokeWidth={1.6} />
            Listen Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
