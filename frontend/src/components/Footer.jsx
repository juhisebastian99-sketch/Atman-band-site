import React from "react";
import { Instagram, Youtube, Music2, Mail } from "lucide-react";
import AtmanLogo from "./AtmanLogo";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Footer = () => {
  return (
    <footer
      data-testid="footer"
      className="relative bg-[#0b0b0b] border-t border-[#C9A227]/15 text-[#F8F6F2]/70"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <AtmanLogo size={44} />
          <p className="mt-6 text-sm text-[#F8F6F2]/60 leading-relaxed max-w-sm">
            A luxury live music collective — Bollywood, Sufi & Rock — crafted
            for weddings, destination weddings, corporate events and private
            celebrations.
          </p>
          <div className="mt-6 flex items-center gap-4">
            {[
              { icon: Instagram, label: "Instagram", href: "#" },
              { icon: Youtube, label: "YouTube", href: "#" },
              { icon: Music2, label: "Spotify", href: "#" },
              { icon: Mail, label: "Email", href: "mailto:hello@atmanmusic.co" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                data-testid={`footer-social-${label.toLowerCase()}`}
                aria-label={label}
                className="w-10 h-10 border border-[#C9A227]/25 hover:border-[#C9A227] hover:text-[#C9A227] transition-colors flex items-center justify-center"
              >
                <Icon size={16} strokeWidth={1.4} />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A227] mb-5">
            Explore
          </div>
          <ul className="space-y-3 text-sm">
            {[
              ["home", "Home"],
              ["about", "About"],
              ["services", "Services"],
              ["genres", "Genres"],
              ["performances", "Videos"],
              ["gallery", "Gallery"],
            ].map(([id, label]) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  data-testid={`footer-link-${id}`}
                  className="hover:text-[#C9A227] transition-colors"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A227] mb-5">
            Reach ATMAN
          </div>
          <ul className="space-y-3 text-sm">
            <li>hello@atmanmusic.co</li>
            <li>+91 · placeholder</li>
            <li>Mumbai · India</li>
            <li className="text-[#F8F6F2]/55 pt-2">
              Available worldwide for destination bookings.
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#C9A227]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[0.7rem] text-[#F8F6F2]/45 tracking-wider">
          <div>© {new Date().getFullYear()} ATMAN Music Collective. All rights reserved.</div>
          <div className="font-cormorant italic text-[#C9A227]/70">
            Music That Touches The Soul
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
