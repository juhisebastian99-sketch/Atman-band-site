import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, PlayCircle, Calendar } from "lucide-react";

// Dark, gritty band silhouettes on stage — matches the "dark. bold. timeless." reference
const HERO_BG =
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=2400&q=80";

// Enso brush-stroke ATMAN logo (transparent-friendly via mix-blend-mode)
const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_atman-events/artifacts/4eycqdw3_IMG-20260713-WA0003.jpg";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Gold brush stroke SVG (bottom-left + top-right corner accents, like the reference)
const BrushCorner = ({ position = "bl" }) => {
  const positionClasses = {
    bl: "bottom-0 left-0",
    tr: "top-0 right-0 rotate-180",
  };
  return (
    <svg
      className={`absolute ${positionClasses[position]} pointer-events-none select-none hidden md:block`}
      width="360"
      height="280"
      viewBox="0 0 360 280"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`brush-corner-${position}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#E9CB6C" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#C9A227" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8F6F18" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g fill={`url(#brush-corner-${position})`}>
        <path d="M0 260 L120 200 L180 220 L60 270 L10 275 Z" />
        <path d="M0 200 L200 130 L260 150 L140 210 L40 245 Z" opacity="0.75" />
        <path d="M0 140 L240 60 L300 80 L200 140 L60 190 Z" opacity="0.55" />
        <path d="M0 80 L260 20 L320 40 L220 90 L80 130 Z" opacity="0.35" />
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
      {/* SVG color-matrix filter — converts pure black pixels of the logo JPG
          into transparent alpha, giving us a properly cut-out Enso mark. */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="atman-remove-black">
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

      {/* Grayscale band silhouette background — heavily darkened + blurred so the
          logo JPG's black bg blends invisibly with the surrounding hero. */}
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
          style={{ filter: "grayscale(100%) contrast(1.15) brightness(0.4)" }}
        />
      </motion.div>

      {/* Deep black overlays for dramatic contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.88)_85%)]" />

      {/* Gold brush corner accents (matches the "dark bold timeless" reference) */}
      <BrushCorner position="bl" />
      <BrushCorner position="tr" />

      {/* Subtle film grain */}
      <div className="absolute inset-0 grain opacity-70" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 min-h-screen flex flex-col items-center justify-center text-center pt-24 pb-40">
        {/* Giant Enso logo as centerpiece — ATMAN wordmark is inside the circle.
            Using mix-blend-mode: lighten so the JPG's pure-black bg has zero
            visible impact on the underlying dark hero. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative"
          data-testid="hero-logo"
        >
          {/* Soft gold glow far behind the logo */}
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
              filter: "url(#atman-remove-black) drop-shadow(0 0 30px rgba(201,162,39,0.35))",
            }}
            className="relative w-[320px] sm:w-[440px] md:w-[560px] lg:w-[640px] h-auto object-contain select-none pointer-events-none"
            draggable={false}
          />
        </motion.div>

        {/* Tagline — matches "MUSIC. SOUL. CONNECTION." style from reference */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-2 sm:mt-4 font-cinzel text-sm sm:text-base md:text-lg tracking-[0.5em] uppercase text-[#F8F6F2]/90"
          data-testid="hero-tagline"
        >
          <span>Music</span>
          <span className="mx-3 text-[#C9A227]">·</span>
          <span className="text-[#C9A227]">Soul</span>
          <span className="mx-3 text-[#C9A227]">·</span>
          <span>Connection</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="my-8 h-px w-40 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.35 }}
          className="max-w-xl text-xs sm:text-sm text-[#F8F6F2]/60 tracking-[0.25em] uppercase leading-relaxed"
        >
          Dark · Bold · Timeless — Live Music for Weddings, Destination Weddings,
          Corporate Events &amp; Private Celebrations
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.55 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => scrollTo("booking")}
            data-testid="hero-book-btn"
            className="gold-btn group inline-flex items-center gap-3 bg-[#C9A227] text-black font-cinzel tracking-[0.3em] uppercase text-xs sm:text-sm px-8 py-4 rounded-none"
          >
            <Calendar size={16} strokeWidth={2} />
            Book ATMAN
          </button>
          <button
            onClick={() => scrollTo("performances")}
            data-testid="hero-watch-btn"
            className="ghost-btn inline-flex items-center gap-3 border border-[#C9A227]/70 text-[#F8F6F2] font-cinzel tracking-[0.3em] uppercase text-xs sm:text-sm px-8 py-4 rounded-none"
          >
            <PlayCircle size={16} strokeWidth={1.6} />
            Watch Performances
          </button>
        </motion.div>
      </div>

      <button
        onClick={() => scrollTo("about")}
        data-testid="scroll-indicator"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#C9A227]/80 hover:text-[#C9A227] transition-colors"
        aria-label="Scroll to explore"
      >
        <span className="text-[0.65rem] tracking-[0.35em] uppercase font-cinzel">
          Scroll to explore
        </span>
        <div className="relative h-10 w-6 rounded-full border border-[#C9A227]/60 flex items-start justify-center pt-2">
          <span className="scroll-dot block w-1 h-2 rounded-full bg-[#C9A227]" />
        </div>
        <ChevronDown size={14} className="slow-float" />
      </button>
    </section>
  );
};

export default Hero;
