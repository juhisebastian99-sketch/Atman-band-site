import React from "react";
import { motion } from "framer-motion";

const genres = [
  {
    key: "bollywood",
    name: "Bollywood",
    tagline: "Timeless anthems, reborn on stage",
    desc: "From classic Rafi ballads to modern-day chartbusters — high-energy dance floors and cinematic first-dances.",
    accent: "01",
  },
  {
    key: "sufi",
    name: "Sufi",
    tagline: "Whispers of the divine",
    desc: "Qawwali, ghazals and soul-stirring devotional pieces — perfect for mehendi evenings and spiritual soirées.",
    accent: "02",
  },
  {
    key: "rock",
    name: "Rock",
    tagline: "Unforgettable, uncompromising",
    desc: "From soulful acoustic sets to electrifying anthems — crafted for those final unforgettable dance-floor moments.",
    accent: "03",
  },
];

export const Genres = () => {
  return (
    <section
      id="genres"
      data-testid="genres-section"
      className="relative bg-[#121212] py-24 lg:py-32 border-t border-[#C9A227]/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7">
            <span className="ornament">Sonic Palette</span>
            <h2 className="mt-6 font-cinzel text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#F8F6F2]">
              Three Genres.<br />
              <span className="italic font-cormorant gold-text">One Soul.</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-[#F8F6F2]/65 text-sm lg:text-base leading-relaxed">
            Every evening is stitched together across three worlds — a
            devotional opening, a nostalgic Bollywood core, and a rock finale
            that lingers long after the final note.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {genres.map((g, i) => (
            <motion.div
              key={g.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className="group relative overflow-hidden bg-[#1a1a1a] border border-[#C9A227]/15 p-8 min-h-[320px] flex flex-col justify-between hover:border-[#C9A227]/50 transition-colors duration-500"
              data-testid={`genre-card-${g.key}`}
            >
              <div className="absolute -right-6 -top-6 font-cinzel text-[8rem] leading-none text-[#C9A227]/[0.06] group-hover:text-[#C9A227]/10 transition-colors duration-500 select-none">
                {g.accent}
              </div>

              <div className="relative z-10">
                <div className="text-[0.65rem] tracking-[0.35em] uppercase text-[#C9A227]">
                  {g.accent} — Genre
                </div>
                <h3 className="mt-4 font-cinzel text-3xl text-[#F8F6F2] tracking-wide">
                  {g.name}
                </h3>
                <p className="mt-3 font-cormorant italic text-lg text-[#C9A227]/90">
                  {g.tagline}
                </p>
              </div>

              <div className="relative z-10">
                <p className="text-sm text-[#F8F6F2]/60 leading-relaxed">
                  {g.desc}
                </p>
                <div className="mt-6 h-px w-10 bg-[#C9A227] group-hover:w-24 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Genres;
