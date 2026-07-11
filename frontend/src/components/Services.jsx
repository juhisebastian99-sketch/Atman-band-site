import React from "react";
import { motion } from "framer-motion";
import { Gem, Plane, Building2, Sparkles } from "lucide-react";

const services = [
  {
    icon: Gem,
    title: "Luxury Weddings",
    desc: "Bespoke live sets — from mehendi soirées to soulful vidaais — composed around your love story.",
  },
  {
    icon: Plane,
    title: "Destination Weddings",
    desc: "We travel with our sound. Beachfront sangeets, palace receptions, mountaintop pheras — all covered.",
  },
  {
    icon: Building2,
    title: "Corporate Events",
    desc: "Product launches, gala dinners and annual celebrations elevated with cinematic live music.",
  },
  {
    icon: Sparkles,
    title: "Private Celebrations",
    desc: "Intimate anniversaries, birthdays and spiritual evenings crafted as unforgettable moments.",
  },
];

export const Services = () => {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative bg-[#0f0f0f] py-24 lg:py-32 overflow-hidden"
    >
      {/* soft gold vignette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] gold-radial pointer-events-none opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center">
          <span className="ornament">Our Services</span>
          <h2 className="mt-6 font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#F8F6F2]">
            Crafted For <span className="gold-text italic font-cormorant">Every Occasion</span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-[#F8F6F2]/65 text-sm lg:text-base leading-relaxed">
            Four signature experiences — each tailored, rehearsed and staged
            with obsessive attention to detail.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group relative bg-[#1E1E1E] border border-[#C9A227]/15 p-8 flex flex-col min-h-[280px] hover:border-[#C9A227]/60 transition-colors duration-500"
                data-testid={`service-card-${i}`}
              >
                {/* corner accent */}
                <span className="absolute top-0 left-0 w-8 h-px bg-[#C9A227]" />
                <span className="absolute top-0 left-0 w-px h-8 bg-[#C9A227]" />
                <span className="absolute bottom-0 right-0 w-8 h-px bg-[#C9A227] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute bottom-0 right-0 w-px h-8 bg-[#C9A227] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <Icon
                  size={28}
                  strokeWidth={1.4}
                  className="text-[#C9A227] group-hover:scale-110 transition-transform duration-500"
                />
                <h3 className="mt-6 font-cinzel text-lg tracking-wider text-[#F8F6F2]">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-[#F8F6F2]/60 leading-relaxed flex-1">
                  {s.desc}
                </p>

                <div className="mt-6 h-px w-10 bg-[#C9A227]/60 group-hover:w-20 transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
