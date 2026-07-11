import React, { useState } from "react";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "ATMAN transformed our wedding sangeet into a cinematic experience. Guests still talk about the Sufi opening — chills, tears, and a dance floor that never emptied.",
    name: "Ananya & Rohan",
    event: "Palace Wedding · Udaipur",
  },
  {
    quote:
      "The most professional, soul-stirring live band we have hosted. They didn't just play — they curated an entire emotional journey for our brand launch.",
    name: "Karan Mehta",
    event: "Brand Launch · Mumbai",
  },
  {
    quote:
      "From soundcheck to encore — pure luxury. Their Bollywood-Rock finale was the most talked-about moment of our destination wedding.",
    name: "Ishita & Vikram",
    event: "Destination Wedding · Goa",
  },
];

export const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];

  const prev = () =>
    setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);

  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="relative bg-[#0f0f0f] py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 gold-radial opacity-30 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <span className="ornament">Kind Words</span>
        <h2 className="mt-6 font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#F8F6F2]">
          Whispers from <span className="italic font-cormorant gold-text">Our Evenings</span>
        </h2>

        <div className="mt-14 relative">
          <Quote
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#C9A227]/40"
            size={44}
            strokeWidth={1}
          />
          <motion.blockquote
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-8 font-cormorant italic text-xl sm:text-2xl lg:text-3xl leading-relaxed text-[#F8F6F2]/90"
            data-testid="testimonial-quote"
          >
            &ldquo;{t.quote}&rdquo;
          </motion.blockquote>

          <div className="mt-10 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />

          <div className="mt-6">
            <div className="font-cinzel tracking-[0.25em] text-sm text-[#F8F6F2]">
              {t.name}
            </div>
            <div className="mt-1 text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A227]/80">
              {t.event}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              data-testid="testimonial-prev"
              className="w-10 h-10 rounded-full border border-[#C9A227]/40 text-[#C9A227] hover:border-[#C9A227] hover:bg-[#C9A227]/10 transition-colors flex items-center justify-center"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  data-testid={`testimonial-dot-${i}`}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-[6px] rounded-full transition-all duration-300 ${
                    i === idx
                      ? "w-8 bg-[#C9A227]"
                      : "w-2 bg-[#C9A227]/30 hover:bg-[#C9A227]/60"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              data-testid="testimonial-next"
              className="w-10 h-10 rounded-full border border-[#C9A227]/40 text-[#C9A227] hover:border-[#C9A227] hover:bg-[#C9A227]/10 transition-colors flex items-center justify-center"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
