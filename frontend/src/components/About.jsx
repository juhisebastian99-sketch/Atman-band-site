import React from "react";
import { motion } from "framer-motion";

const ABOUT_IMG =
  "https://images.pexels.com/photos/7715356/pexels-photo-7715356.jpeg";

export const About = () => {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative bg-[#121212] py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-6"
        >
          <span className="ornament mb-6">About ATMAN</span>

          <h2 className="mt-6 font-cinzel text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight text-[#F8F6F2]">
            We Don&apos;t Just <span className="italic font-cormorant text-[#C9A227]">Play</span> Music,
            <br />
            We <span className="gold-text">Create Memories.</span>
          </h2>

          <div className="mt-8 h-px w-24 bg-gradient-to-r from-[#C9A227] to-transparent" />

          <p className="mt-8 text-[#F8F6F2]/75 text-base lg:text-lg leading-relaxed max-w-xl">
            ATMAN is a collective of passionate musicians blending{" "}
            <span className="text-[#C9A227]">Bollywood</span>,{" "}
            <span className="text-[#C9A227]">Sufi</span> and{" "}
            <span className="text-[#C9A227]">Rock</span> to create unforgettable
            live performances for weddings, destination weddings, corporate
            events and spiritual evenings.
          </p>

          <p className="mt-6 text-[#F8F6F2]/60 text-sm lg:text-base leading-relaxed max-w-xl">
            Every set is composed like a chapter — soulful preludes, cinematic
            crescendos, and the kind of moments guests remember for a lifetime.
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { n: "12+", l: "Years On Stage" },
              { n: "480+", l: "Events Performed" },
              { n: "40+", l: "Cities & Destinations" },
            ].map((s) => (
              <div key={s.l} className="border-l border-[#C9A227]/30 pl-4">
                <div className="font-cinzel text-2xl lg:text-3xl gold-text">
                  {s.n}
                </div>
                <div className="mt-1 text-[0.65rem] tracking-[0.25em] uppercase text-[#F8F6F2]/55">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.15 }}
          className="lg:col-span-6 relative"
        >
          <div className="relative aspect-[4/5] w-full max-w-lg mx-auto">
            {/* Frame */}
            <div className="absolute -inset-3 border border-[#C9A227]/30 pointer-events-none" />
            <div className="absolute -inset-6 border border-[#C9A227]/10 pointer-events-none" />

            <img
              src={ABOUT_IMG}
              alt="Close up of acoustic guitar in dramatic warm lighting"
              className="w-full h-full object-cover"
              data-testid="about-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/70 via-transparent to-transparent" />

            {/* Floating badge */}
            <div className="absolute -bottom-8 -left-6 sm:-left-10 backdrop-blur-lg bg-[#121212]/80 border border-[#C9A227]/25 px-6 py-4">
              <div className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#C9A227]">
                Ensemble
              </div>
              <div className="mt-1 font-cormorant italic text-lg text-[#F8F6F2]">
                Vocals · Guitar · Keys · Percussion
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
