import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, PlayCircle, Calendar } from "lucide-react";

const HERO_BG =
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=2400&q=80";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const beams = [
  { left: "8%", rot: -18 },
  { left: "22%", rot: -10 },
  { left: "38%", rot: -4 },
  { left: "52%", rot: 4 },
  { left: "68%", rot: 10 },
  { left: "84%", rot: 18 },
];

// Decorative gold brush stroke SVG (used on left/right edges of hero)
const BrushStroke = ({ side = "left" }) => (
  <svg
    className={`absolute top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block ${
      side === "left" ? "left-0 -translate-x-1/3" : "right-0 translate-x-1/3 scale-x-[-1]"
    }`}
    width="360"
    height="600"
    viewBox="0 0 360 600"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id={`brush-${side}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E9CB6C" stopOpacity="0.85" />
        <stop offset="60%" stopColor="#C9A227" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#8F6F18" stopOpacity="0.05" />
      </linearGradient>
    </defs>
    <g fill={`url(#brush-${side})`} opacity="0.9">
      <path d="M0 120 L180 60 L240 90 L200 140 L60 200 L20 180 Z" />
      <path d="M0 340 L220 270 L280 300 L200 360 L40 420 L10 400 Z" opacity="0.7" />
      <path d="M0 500 L160 460 L200 480 L120 520 L20 560 Z" opacity="0.5" />
    </g>
  </svg>
);

export const Hero = () => {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background image with slow zoom */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={HERO_BG}
          alt="Live concert stage with musician silhouettes and warm stage lights"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Overlays for contrast — darker to match the template's dramatic look */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/60 to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.7)_75%)]" />

      {/* Gold brush strokes on the edges (matches reference template) */}
      <BrushStroke side="left" />
      <BrushStroke side="right" />

      {/* Stage light beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {beams.map((b, i) => (
          <div
            key={i}
            className="stage-beam light-flicker"
            style={{ left: b.left, transform: `rotate(${b.rot}deg)` }}
          />
        ))}
      </div>

      {/* Grain */}
      <div className="absolute inset-0 grain" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 min-h-screen flex flex-col items-center justify-center text-center pt-28 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mb-8"
        >
          <span className="ornament">Est. Live Music Ensemble</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35 }}
          className="font-cinzel text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-none tracking-[0.08em] gold-text drop-shadow-[0_2px_20px_rgba(201,162,39,0.35)]"
          data-testid="hero-title"
        >
          ATMAN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 font-cormorant italic text-2xl sm:text-3xl md:text-4xl text-[#F8F6F2]/90 tracking-wide"
          data-testid="hero-tagline"
        >
          Music That Touches The Soul
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="my-8 h-px w-40 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="max-w-2xl text-sm sm:text-base text-[#F8F6F2]/75 tracking-wide leading-relaxed"
        >
          Luxury Live Music for Weddings, Destination Weddings, Corporate Events
          &amp; Private Celebrations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="mt-8 flex flex-wrap justify-center items-center gap-3"
          data-testid="hero-genres"
        >
          {["Bollywood", "Sufi", "Rock"].map((g, i) => (
            <React.Fragment key={g}>
              <span className="font-cinzel text-xs sm:text-sm tracking-[0.35em] uppercase text-[#F8F6F2]/90 px-4 py-2 border border-[#C9A227]/30 rounded-full backdrop-blur-sm bg-[#0a0a0a]/40">
                {g}
              </span>
              {i < 2 && <span className="text-[#C9A227]/60 text-xs">◆</span>}
            </React.Fragment>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => scrollTo("booking")}
            data-testid="hero-book-btn"
            className="gold-btn group inline-flex items-center gap-3 bg-[#C9A227] text-[#121212] font-cinzel tracking-[0.25em] uppercase text-xs sm:text-sm px-8 py-4 rounded-none"
          >
            <Calendar size={16} strokeWidth={2} />
            Book ATMAN
          </button>
          <button
            onClick={() => scrollTo("performances")}
            data-testid="hero-watch-btn"
            className="ghost-btn inline-flex items-center gap-3 border border-[#C9A227]/70 text-[#F8F6F2] font-cinzel tracking-[0.25em] uppercase text-xs sm:text-sm px-8 py-4 rounded-none"
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
