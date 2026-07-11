import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import AtmanLogo from "./AtmanLogo";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "genres", label: "Genres" },
  { id: "performances", label: "Videos" },
  { id: "gallery", label: "Gallery" },
  { id: "testimonials", label: "Reviews" },
  { id: "booking", label: "Contact" },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          ? "backdrop-blur-xl bg-[#121212]/80 border-b border-[#C9A227]/20"
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

        <div className="hidden lg:block">
          <button
            onClick={() => scrollTo("booking")}
            data-testid="nav-book-btn"
            className="gold-btn font-cinzel text-[0.72rem] tracking-[0.28em] uppercase border border-[#C9A227] text-[#C9A227] px-6 py-3 rounded-none"
          >
            Book ATMAN
          </button>
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
          className="lg:hidden bg-[#121212]/95 backdrop-blur-xl border-t border-[#C9A227]/15"
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
            <button
              onClick={() => {
                setOpen(false);
                scrollTo("booking");
              }}
              data-testid="mobile-book-btn"
              className="gold-btn mt-2 font-cinzel text-xs tracking-[0.28em] uppercase border border-[#C9A227] text-[#C9A227] px-6 py-3 rounded-none"
            >
              Book ATMAN
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
