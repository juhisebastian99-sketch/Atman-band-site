import React, { useEffect, useState } from "react";
import { Menu, X, Instagram, Youtube, Music2, Facebook } from "lucide-react";
import AtmanLogo from "./AtmanLogo";
import { useSiteSettings } from "@/hooks/useSiteData";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "music", label: "Music" },
  { id: "shows", label: "Shows" },
  { id: "gallery", label: "Gallery" },
  { id: "booking", label: "Contact" },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const settings = useSiteSettings();

  const socials = [
    { href: settings.instagram || "https://instagram.com/", label: "Instagram", Icon: Instagram },
    { href: settings.youtube || "https://youtube.com/", label: "YouTube", Icon: Youtube },
    { href: settings.spotify || "https://open.spotify.com/", label: "Spotify", Icon: Music2 },
    { href: settings.facebook || "https://facebook.com/", label: "Facebook", Icon: Facebook },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="atman-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-black/80 border-b border-[#C9A227]/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollTo("home")}
          data-testid="nav-logo-btn"
          className="flex items-center"
        >
          <AtmanLogo size={40} />
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              data-testid={`nav-link-${l.id}`}
              className="text-[0.72rem] tracking-[0.28em] uppercase text-[#F8F6F2]/80 hover:text-[#C9A227] transition-colors duration-300"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Social icons — populated from admin settings */}
        <div className="hidden lg:flex items-center gap-5" data-testid="nav-socials">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              data-testid={`nav-social-${label.toLowerCase()}`}
              className="text-[#F8F6F2]/75 hover:text-[#C9A227] transition-colors"
            >
              <Icon size={18} strokeWidth={1.6} />
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen((s) => !s)}
          className="lg:hidden text-[#F8F6F2] p-2"
          data-testid="nav-menu-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-[#C9A227]/15"
          data-testid="mobile-menu"
        >
          <div className="flex flex-col px-6 py-6 gap-5">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  setOpen(false);
                  scrollTo(l.id);
                }}
                data-testid={`mobile-nav-${l.id}`}
                className="text-left text-sm tracking-[0.25em] uppercase text-[#F8F6F2]/85 hover:text-[#C9A227] transition-colors"
              >
                {l.label}
              </button>
            ))}
            <div className="flex items-center gap-6 pt-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-[#F8F6F2]/75 hover:text-[#C9A227] transition-colors"
                >
                  <Icon size={20} strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
