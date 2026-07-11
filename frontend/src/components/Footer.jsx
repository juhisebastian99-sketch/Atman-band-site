import React from "react";
import { Instagram, Youtube, Music2, Mail, MessageCircle, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import AtmanLogo from "./AtmanLogo";
import { useSiteSettings } from "@/hooks/useSiteData";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Footer = () => {
  const s = useSiteSettings();

  const socials = [
    s.instagram && { icon: Instagram, label: "Instagram", href: s.instagram },
    s.youtube && { icon: Youtube, label: "YouTube", href: s.youtube },
    s.spotify && { icon: Music2, label: "Spotify", href: s.spotify },
    s.whatsapp && { icon: MessageCircle, label: "WhatsApp", href: s.whatsapp },
    s.email && { icon: Mail, label: "Email", href: `mailto:${s.email}` },
  ].filter(Boolean);

  return (
    <footer
      data-testid="footer"
      className="relative bg-[#0b0b0b] border-t border-[#C9A227]/15 text-[#F8F6F2]/70"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <AtmanLogo size={44} />
          <p className="mt-6 text-sm text-[#F8F6F2]/60 leading-relaxed max-w-sm">
            A luxury live music collective — Bollywood, Sufi &amp; Rock — crafted
            for weddings, destination weddings, corporate events and private
            celebrations.
          </p>
          {socials.length > 0 && (
            <div className="mt-6 flex items-center flex-wrap gap-4">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-testid={`footer-social-${label.toLowerCase()}`}
                  aria-label={label}
                  className="w-10 h-10 border border-[#C9A227]/25 hover:border-[#C9A227] hover:text-[#C9A227] transition-colors flex items-center justify-center"
                >
                  <Icon size={16} strokeWidth={1.4} />
                </a>
              ))}
            </div>
          )}
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
            {s.email && <li className="break-all">{s.email}</li>}
            {s.phone && <li>{s.phone}</li>}
            {s.location && <li>{s.location}</li>}
            <li className="text-[#F8F6F2]/55 pt-2">
              Available worldwide for destination bookings.
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#C9A227]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[0.7rem] text-[#F8F6F2]/45 tracking-wider">
          <div>© {new Date().getFullYear()} ATMAN Music Collective. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span className="font-cormorant italic text-[#C9A227]/70">
              Music That Touches The Soul
            </span>
            <Link
              to="/admin"
              data-testid="footer-admin-link"
              className="inline-flex items-center gap-1.5 text-[#F8F6F2]/35 hover:text-[#C9A227] transition-colors"
              aria-label="Admin"
            >
              <Lock size={11} />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
