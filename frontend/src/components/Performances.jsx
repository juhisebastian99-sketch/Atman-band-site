import React from "react";
import { motion } from "framer-motion";

const videos = [
  {
    id: "5qap5aO4i9A", // placeholder embed id — client can swap
    title: "Sufi Evening · Live Set",
    subtitle: "Palace Wedding · Udaipur",
  },
  {
    id: "jfKfPfyJRdk",
    title: "Bollywood Anthems Medley",
    subtitle: "Sangeet Night · Mumbai",
  },
  {
    id: "DWcJFNfaw9c",
    title: "Rock Finale · Encore",
    subtitle: "Corporate Gala · Bengaluru",
  },
];

export const Performances = () => {
  return (
    <section
      id="performances"
      data-testid="performances-section"
      className="relative bg-[#121212] py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="ornament">Live Performances</span>
          <h2 className="mt-6 font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#F8F6F2]">
            Watch the <span className="italic font-cormorant gold-text">Magic</span> Unfold
          </h2>
          <p className="mt-5 text-[#F8F6F2]/65 text-sm lg:text-base leading-relaxed">
            A curated look at signature nights — soulful sets, cinematic
            crescendos and unforgettable encores.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {videos.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group"
              data-testid={`performance-card-${i}`}
            >
              <div className="relative aspect-video overflow-hidden border border-[#C9A227]/20 bg-black shadow-[0_0_0_rgba(201,162,39,0)] group-hover:shadow-[0_0_40px_rgba(201,162,39,0.25)] transition-shadow duration-500">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-5">
                <div className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C9A227]">
                  {v.subtitle}
                </div>
                <h3 className="mt-2 font-cinzel text-lg text-[#F8F6F2] tracking-wide">
                  {v.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Performances;
