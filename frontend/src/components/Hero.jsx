import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, PlayCircle, Calendar } from "lucide-react";

const HERO_BG =
  "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=2400";

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

export const Hero = () => {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden bg-[#121212]"
    >
      {/* Background image with slow scale */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={HERO_BG}
          alt="Concert stage with warm golden lights"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Overlays for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/50 via-[#121212]/55 to-[#121212]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(18,18,18,0.55)_75%)]" />

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
        {/* Ornament label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mb-8"
        >
          <span className="ornament">Est. Live Music Ensemble</span>
        </motion.div>

        {/* Wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35 }}
          className="font-cinzel text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-none tracking-[0.08em] gold-text drop-shadow-[0_2px_20px_rgba(201,162,39,0.35)]"
          data-testid="hero-title"
        >
          ATMAN
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 font-cormorant italic text-2xl sm:text-3xl md:text-4xl text-[#F8F6F2]/90 tracking-wide"
          data-testid="hero-tagline"
        >
          Music That Touches The Soul
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="my-8 h-px w-40 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="max-w-2xl text-sm sm:text-base text-[#F8F6F2]/75 tracking-wide leading-relaxed"
        >
          Luxury Live Music for Weddings, Destination Weddings, Corporate Events
          &amp; Private Celebrations.
        </motion.p>

        {/* Genre pills */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="mt-8 flex flex-wrap justify-center items-center gap-3"
          data-testid="hero-genres"
        >
          {["Bollywood", "Sufi", "Rock"].map((g, i) => (
            <React.Fragment key={g}>
              <span className="font-cinzel text-xs sm:text-sm tracking-[0.35em] uppercase text-[#F8F6F2]/90 px-4 py-2 border border-[#C9A227]/30 rounded-full backdrop-blur-sm bg-[#121212]/30">
                {g}
              </span>
              {i < 2 && (
                <span className="text-[#C9A227]/60 text-xs">◆</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* CTAs */}
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

      {/* Scroll indicator */}
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
