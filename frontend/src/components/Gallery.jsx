import React from "react";
import { motion } from "framer-motion";

const GALLERY = [
  {
    url: "https://images.unsplash.com/photo-1689506422730-6a8e09038b1b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwyfHxwaWFubyUyMGRhcmslMjBsaWdodGluZyUyMGNpbmVtYXRpY3xlbnwwfHx8fDE3ODIyODQ0MDV8MA&ixlib=rb-4.1.0&q=85",
    label: "Keys · Warm cinematic",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    url: "https://images.unsplash.com/photo-1453090927415-5f45085b65c0",
    label: "Microphone · Golden fog",
    span: "",
  },
  {
    url: "https://images.pexels.com/photos/7551983/pexels-photo-7551983.jpeg",
    label: "Drums · Backlit stage",
    span: "",
  },
  {
    url: "https://images.pexels.com/photos/7715356/pexels-photo-7715356.jpeg",
    label: "Guitar · Warm strings",
    span: "md:col-span-2",
  },
  {
    url: "https://customer-assets.emergentagent.com/job_atman-events/artifacts/5kg4cylo_file_00000000b4e4720b9560f68de86a5953.png",
    label: "ATMAN · Signature stage",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    url: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=1200&q=80",
    label: "Concert lights",
    span: "",
  },
  {
    url: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=1200&q=80",
    label: "Percussion · Detail",
    span: "",
  },
];

export const Gallery = () => {
  return (
    <section
      id="gallery"
      data-testid="gallery-section"
      className="relative bg-[#0f0f0f] py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <span className="ornament">Gallery</span>
            <h2 className="mt-6 font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#F8F6F2]">
              Moments <span className="italic font-cormorant gold-text">Etched</span> in Gold
            </h2>
          </div>
          <p className="max-w-md text-[#F8F6F2]/60 text-sm lg:text-base leading-relaxed">
            A quiet look at instruments, stages and the golden light that
            surrounds every ATMAN evening.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3 md:gap-4">
          {GALLERY.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08 }}
              className={`group relative overflow-hidden bg-[#1a1a1a] border border-[#C9A227]/15 ${g.span}`}
              data-testid={`gallery-item-${i}`}
            >
              <img
                src={g.url}
                alt={g.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[900ms] ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/85 via-[#121212]/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C9A227]">
                  ATMAN
                </div>
                <div className="mt-1 font-cormorant italic text-base text-[#F8F6F2]">
                  {g.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
