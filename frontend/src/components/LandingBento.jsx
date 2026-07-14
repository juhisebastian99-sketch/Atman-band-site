import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PlayCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Instagram,
  Youtube,
  Music2,
  Facebook,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Booking from "@/components/Booking";
import AtmanLogo, { AtmanLogoLarge } from "@/components/AtmanLogo";
import { useSiteSettings, useVideos, useShows, useGallery } from "@/hooks/useSiteData";

const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_atman-events/artifacts/4eycqdw3_IMG-20260713-WA0003.jpg";

// Hero band-silhouettes-on-stage — musicians with instruments, dramatic smoke + spotlights
const HERO_BG =
  "https://images.unsplash.com/photo-1508973265221-b03b71c14eab?auto=format&fit=crop&w=2000&q=80";

// "We Are ATMAN" band group portrait — 4-piece band silhouettes on stage
const BAND_PORTRAIT =
  "https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?auto=format&fit=crop&w=1400&q=80";

// Blurred concert crowd (used behind Upcoming Shows panel)
const SHOWS_BG =
  "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1600&q=80";

// Music album cover art — 4 releases
const ALBUMS = [
  {
    title: "Awaken",
    year: "2024 · 5 Tracks",
    latest: true,
    art: null, // uses Enso logo
  },
  {
    title: "Reflections",
    year: "2023",
    art: "https://images.unsplash.com/photo-1509909756405-be0199881695?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Beyond",
    year: "2022",
    art: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Live Sessions",
    year: "2021",
    art: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80",
  },
];

const SHOWS = [
  { day: "24", month: "Jun", title: "Live at Blue Frog", city: "Mumbai, India" },
  { day: "05", month: "Jul", title: "Rock Night Fest", city: "Pune, India" },
  { day: "19", month: "Jul", title: "Sounds of Soul", city: "Bangalore, India" },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
];

const SOCIALS = [
  { href: "https://instagram.com/", label: "Instagram", Icon: Instagram },
  { href: "https://youtube.com/", label: "YouTube", Icon: Youtube },
  { href: "https://open.spotify.com/", label: "Spotify", Icon: Music2 },
  { href: "https://facebook.com/", label: "Facebook", Icon: Facebook },
];

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* Reusable "clean Enso logo" element — uses canvas-processed transparent PNG */
const EnsoLogo = ({ className = "" }) => (
  <AtmanLogoLarge className={className} />
);

/* Diagonal parallel gold brush strokes — decorative */
const DiagonalBrushStrokes = ({ position = "bl" }) => {
  const posClass = {
    bl: "bottom-0 left-0",
    tr: "top-0 right-0 rotate-180",
    br: "bottom-0 right-0 -scale-x-100",
  }[position];
  return (
    <svg
      className={`absolute ${posClass} pointer-events-none select-none hidden md:block`}
      width="360"
      height="300"
      viewBox="0 0 360 300"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`bento-brush-${position}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#E9CB6C" stopOpacity="1" />
          <stop offset="55%" stopColor="#C9A227" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#8F6F18" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g fill={`url(#bento-brush-${position})`} transform="translate(0 300) rotate(-30)">
        <rect x="0" y="0" width="320" height="9" rx="2" />
        <rect x="20" y="28" width="260" height="6" rx="2" opacity="0.85" />
        <rect x="0" y="52" width="300" height="8" rx="2" opacity="0.9" />
        <rect x="30" y="76" width="220" height="5" rx="2" opacity="0.75" />
        <rect x="0" y="100" width="280" height="8" rx="2" opacity="0.85" />
        <rect x="20" y="128" width="200" height="4" rx="2" opacity="0.65" />
      </g>
    </svg>
  );
};

/* ------------------------------- SECTIONS -------------------------------- */

const HeroCard = () => (
  <section
    id="home"
    data-testid="bento-hero"
    className="relative overflow-hidden bg-black rounded-none border border-[#C9A227]/10 min-h-[560px] lg:min-h-[720px] flex flex-col justify-center items-center"
  >
    {/* Grayscale band silhouette background */}
    <motion.div
      initial={{ scale: 1.06 }}
      animate={{ scale: 1 }}
      transition={{ duration: 14, ease: "easeOut" }}
      className="absolute inset-0"
    >
      <img
        src={HERO_BG}
        alt="ATMAN performing live under stage spotlights"
        className="w-full h-full object-cover object-center"
        style={{ filter: "grayscale(100%) contrast(1.15) brightness(0.55)" }}
      />
    </motion.div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_78%)]" />

    <DiagonalBrushStrokes position="bl" />
    <DiagonalBrushStrokes position="tr" />

    <div className="grain absolute inset-0 opacity-60" />

    <div className="relative z-10 flex flex-col items-center text-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="relative"
        data-testid="hero-enso-logo"
      >
        <div
          className="absolute -inset-32 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(201,162,39,0.22) 0%, rgba(201,162,39,0.06) 45%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <EnsoLogo className="relative w-[280px] sm:w-[400px] md:w-[520px] lg:w-[600px] h-auto drop-shadow-[0_0_30px_rgba(201,162,39,0.35)]" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.9 }}
        className="mt-3 font-cinzel text-sm sm:text-base md:text-lg tracking-[0.35em] uppercase text-[#F8F6F2]"
        data-testid="hero-tagline"
      >
        <span>Music.</span>
        <span className="ml-3 text-[#C9A227]">Soul.</span>
        <span className="ml-3">Connection.</span>
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.15 }}
        onClick={() => scrollToId("music")}
        data-testid="hero-listen-btn"
        className="ghost-btn mt-8 inline-flex items-center gap-3 border border-[#C9A227] text-[#F8F6F2] hover:text-[#C9A227] font-cinzel tracking-[0.4em] uppercase text-xs sm:text-sm px-10 py-3.5 rounded-none"
      >
        <PlayCircle size={16} strokeWidth={1.6} />
        Listen Now
      </motion.button>
    </div>
  </section>
);

const AboutCard = () => (
  <section
    id="about"
    data-testid="bento-about"
    className="relative overflow-hidden bg-[#050505] border border-[#C9A227]/10 p-8 lg:p-10 flex flex-col lg:flex-row items-stretch gap-6"
  >
    <div className="flex-1 flex flex-col justify-center relative z-10">
      <span className="text-[0.65rem] tracking-[0.35em] uppercase text-[#C9A227] font-cinzel">
        About Us
      </span>
      <h3
        className="mt-3 font-cinzel text-2xl lg:text-3xl tracking-wide text-[#F8F6F2]"
        data-testid="about-heading"
      >
        We Are <span className="text-[#C9A227]">ATMAN</span>
      </h3>
      <p className="mt-4 text-sm text-[#F8F6F2]/70 leading-relaxed max-w-md">
        A fusion of rock, soul and storytelling. We create experiences that
        connect, inspire and stay with you long after the music fades.
      </p>
      <button
        onClick={() => scrollToId("booking")}
        data-testid="about-know-more"
        className="ghost-btn mt-6 self-start inline-flex items-center gap-2 border border-[#C9A227]/70 text-[#F8F6F2] hover:text-[#C9A227] font-cinzel tracking-[0.3em] uppercase text-[0.65rem] px-6 py-3 rounded-none"
      >
        Know More
        <ArrowRight size={12} strokeWidth={1.8} />
      </button>
    </div>

    <div className="relative flex-1 min-h-[220px] overflow-hidden">
      <img
        src={BAND_PORTRAIT}
        alt="ATMAN band portrait"
        className="w-full h-full object-cover object-center"
        style={{ filter: "grayscale(100%) contrast(1.1) brightness(0.75)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/30 to-[#050505]" />
    </div>

    <DiagonalBrushStrokes position="br" />
  </section>
);

const MusicCard = ({ videos = [] }) => {
  const items = videos.length
    ? videos.map((v, i) => ({
        id: v.id,
        title: v.title,
        year: v.subtitle || "",
        art: `https://img.youtube.com/vi/${v.youtube_id}/hqdefault.jpg`,
        youtube_id: v.youtube_id,
        latest: i === 0,
      }))
    : ALBUMS;

  const open = (a) => {
    if (a.youtube_id) window.open(`https://youtube.com/watch?v=${a.youtube_id}`, "_blank");
  };

  return (
  <section
    id="music"
    data-testid="bento-music"
    className="relative bg-[#050505] border border-[#C9A227]/10 p-8 lg:p-10"
  >
    <div className="flex items-center justify-between">
      <span className="text-[0.65rem] tracking-[0.35em] uppercase text-[#C9A227] font-cinzel">
        Music
      </span>
      <div className="flex items-center gap-3">
        <button
          data-testid="music-view-all"
          className="text-[0.6rem] tracking-[0.3em] uppercase text-[#F8F6F2]/70 hover:text-[#C9A227] transition-colors font-cinzel"
        >
          View All
        </button>
        <button
          aria-label="Previous"
          className="w-7 h-7 border border-[#C9A227]/50 text-[#C9A227] hover:bg-[#C9A227]/10 transition-colors flex items-center justify-center"
        >
          <ChevronLeft size={14} strokeWidth={1.8} />
        </button>
        <button
          aria-label="Next"
          className="w-7 h-7 border border-[#C9A227]/50 text-[#C9A227] hover:bg-[#C9A227]/10 transition-colors flex items-center justify-center"
        >
          <ChevronRight size={14} strokeWidth={1.8} />
        </button>
      </div>
    </div>

    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
      {items.slice(0, 4).map((a) => (
        <div
          key={a.id || a.title}
          onClick={() => open(a)}
          className="group cursor-pointer"
          data-testid={`album-${(a.title || "album").toLowerCase().replace(/\s+/g, "-")}`}
        >
          <div className="relative aspect-square overflow-hidden border border-[#C9A227]/15 bg-[#0a0a0a] flex items-center justify-center group-hover:border-[#C9A227]/50 transition-colors">
            {a.art ? (
              <img
                src={a.art}
                alt={a.title}
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(100%) contrast(1.1) brightness(0.75)" }}
              />
            ) : (
              <EnsoLogo className="w-24 h-auto" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {a.youtube_id && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-11 h-11 rounded-full border border-[#C9A227] bg-black/60 flex items-center justify-center">
                  <Play size={16} strokeWidth={2} className="text-[#C9A227] ml-0.5" />
                </div>
              </div>
            )}
          </div>
          {a.latest && (
            <p className="mt-3 text-[0.55rem] tracking-[0.3em] uppercase text-[#C9A227] font-cinzel">
              Latest Release
            </p>
          )}
          <p
            className={`${
              a.latest ? "mt-0" : "mt-3"
            } font-cinzel text-sm tracking-wide text-[#F8F6F2] uppercase`}
          >
            {a.title}
          </p>
          <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#F8F6F2]/50 mt-0.5">
            {a.year}
          </p>
        </div>
      ))}
    </div>

    {/* Waveform + play indicator strip */}
    <div className="mt-6 flex items-center gap-4">
      <button
        aria-label="Play latest release"
        onClick={() => items[0] && open(items[0])}
        data-testid="music-play-latest"
        className="w-9 h-9 rounded-full border border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-black transition-colors flex items-center justify-center"
      >
        <Play size={13} strokeWidth={2} className="ml-0.5" />
      </button>
      <div className="flex-1 flex items-end gap-[3px] h-8">
        {Array.from({ length: 60 }).map((_, i) => {
          const h = 20 + Math.abs(Math.sin(i * 0.6)) * 65 + Math.random() * 15;
          return (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className={`flex-1 ${i < 22 ? "bg-[#C9A227]" : "bg-[#F8F6F2]/25"}`}
            />
          );
        })}
      </div>
    </div>
  </section>
  );
};

const ShowsCard = ({ shows = [] }) => {
  const list = shows;
  return (
  <section
    id="shows"
    data-testid="bento-shows"
    className="relative overflow-hidden bg-[#050505] border border-[#C9A227]/10 p-8 lg:p-10 min-h-[380px]"
  >
    {/* Blurred concert-crowd background */}
    <img
      src={SHOWS_BG}
      alt=""
      className="absolute inset-0 w-full h-full object-cover object-center"
      style={{ filter: "grayscale(100%) contrast(1.1) brightness(0.32) blur(3px)" }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/85 to-transparent" />

    <div className="relative z-10 flex items-start justify-between mb-6">
      <span className="text-[0.65rem] tracking-[0.35em] uppercase text-[#C9A227] font-cinzel">
        Upcoming Shows
      </span>
      {list.length > 0 && (
        <button
          data-testid="shows-view-all"
          className="text-[0.6rem] tracking-[0.3em] uppercase text-[#F8F6F2]/70 hover:text-[#C9A227] transition-colors font-cinzel"
        >
          View All
        </button>
      )}
    </div>

    {list.length === 0 ? (
      <div
        data-testid="shows-empty-state"
        className="relative z-10 flex flex-col items-center justify-center py-16 text-center max-w-md mx-auto"
      >
        <div className="w-14 h-14 border border-[#C9A227]/40 rounded-full flex items-center justify-center mb-5">
          <span className="font-cinzel text-lg text-[#C9A227]">·</span>
        </div>
        <p className="font-cinzel text-sm tracking-[0.28em] uppercase text-[#F8F6F2]/70">
          No shows scheduled
        </p>
        <p className="mt-3 text-xs text-[#F8F6F2]/50 max-w-xs leading-relaxed">
          Follow us on socials or subscribe below to be the first to know when
          the next date drops.
        </p>
      </div>
    ) : (
      <div className="relative z-10 space-y-5 max-w-md">
        {list.map((s, i) => (
          <div
            key={s.id || s.title}
            data-testid={`show-${i}`}
            className="group flex items-center gap-5 border-b border-[#C9A227]/15 pb-5 last:border-b-0"
          >
            <div className="border border-[#C9A227]/40 px-3 py-2 text-center min-w-[52px]">
              <div className="font-cinzel text-lg text-[#F8F6F2] leading-none">
                {s.day}
              </div>
              <div className="text-[0.55rem] tracking-[0.3em] uppercase text-[#C9A227] mt-1">
                {s.month}
              </div>
            </div>
            <div className="flex-1">
              <div className="font-cinzel text-sm sm:text-base uppercase tracking-[0.15em] text-[#F8F6F2]">
                {s.title}
              </div>
              <div className="text-[0.7rem] text-[#F8F6F2]/55 mt-1">{s.city}</div>
            </div>
            <button
              onClick={() => {
                if (s.ticket_url) window.open(s.ticket_url, "_blank");
                else scrollToId("booking");
              }}
              className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C9A227] hover:underline underline-offset-4 font-cinzel"
            >
              Book Tickets
            </button>
          </div>
        ))}
      </div>
    )}
  </section>
  );
};

const GalleryCard = ({ gallery = [] }) => {
  const list = gallery.length ? gallery.map((g) => g.url) : GALLERY;
  return (
  <section
    id="gallery"
    data-testid="bento-gallery"
    className="relative bg-[#050505] border border-[#C9A227]/10 p-8 lg:p-10"
  >
    <div className="flex items-center justify-between mb-6">
      <span className="text-[0.65rem] tracking-[0.35em] uppercase text-[#C9A227] font-cinzel">
        Gallery
      </span>
      {list.length > 0 && (
        <button
          data-testid="gallery-view-all"
          className="text-[0.6rem] tracking-[0.3em] uppercase text-[#F8F6F2]/70 hover:text-[#C9A227] transition-colors font-cinzel"
        >
          View All
        </button>
      )}
    </div>
    {list.length === 0 ? (
      <div className="text-center py-16 text-[#F8F6F2]/50 text-xs tracking-[0.25em] uppercase font-cinzel">
        Gallery coming soon
      </div>
    ) : (
      <div className="grid grid-cols-3 gap-3">
        {list.slice(0, 6).map((src, i) => (
          <div
            key={i}
            data-testid={`gallery-item-${i}`}
            className="group relative aspect-square overflow-hidden border border-[#C9A227]/15 hover:border-[#C9A227]/60 transition-colors cursor-pointer"
          >
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              style={{ filter: "grayscale(100%) contrast(1.1) brightness(0.8)" }}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
          </div>
        ))}
      </div>
    )}
  </section>
  );
};

const FooterBento = ({ settings }) => {
  const [email, setEmail] = useState("");

  const socials = [
    { href: settings?.instagram || "https://instagram.com/", label: "Instagram", Icon: Instagram },
    { href: settings?.youtube || "https://youtube.com/", label: "YouTube", Icon: Youtube },
    { href: settings?.spotify || "https://open.spotify.com/", label: "Spotify", Icon: Music2 },
    { href: settings?.facebook || "https://facebook.com/", label: "Facebook", Icon: Facebook },
  ];

  return (
    <section
      data-testid="bento-footer"
      className="relative overflow-hidden bg-black border-t border-[#C9A227]/15 pt-14 pb-8"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + tagline */}
        <div className="flex flex-col items-start gap-4">
          <EnsoLogo className="w-32 h-auto" />
          <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#F8F6F2]/55 font-cinzel leading-relaxed">
            Dark. Bold. Timeless.
            <br />
            Energy with Elegance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-[0.65rem] tracking-[0.35em] uppercase text-[#C9A227] font-cinzel mb-4">
            Quick Links
          </h5>
          <ul className="space-y-2 text-sm text-[#F8F6F2]/70">
            {[
              { id: "home", l: "Home" },
              { id: "about", l: "About" },
              { id: "music", l: "Music" },
              { id: "shows", l: "Shows" },
              { id: "gallery", l: "Gallery" },
              { id: "booking", l: "Contact" },
            ].map((x) => (
              <li key={x.id}>
                <button
                  onClick={() => scrollToId(x.id)}
                  className="hover:text-[#C9A227] transition-colors"
                >
                  {x.l}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h5 className="text-[0.65rem] tracking-[0.35em] uppercase text-[#C9A227] font-cinzel mb-4">
            Follow Us
          </h5>
          <div className="flex items-center gap-5">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-[#F8F6F2]/70 hover:text-[#C9A227] transition-colors"
              >
                <Icon size={20} strokeWidth={1.6} />
              </a>
            ))}
          </div>
        </div>

        {/* Subscribe */}
        <div>
          <h5 className="text-[0.65rem] tracking-[0.35em] uppercase text-[#C9A227] font-cinzel mb-4">
            Subscribe
          </h5>
          <p className="text-xs text-[#F8F6F2]/60 mb-4">
            Be the first to know about new music and upcoming shows.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Booking form handles inquiry; this is just visual for now
            }}
            className="flex items-stretch"
            data-testid="subscribe-form"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 bg-[#0a0a0a] border border-[#C9A227]/25 focus:border-[#C9A227] outline-none px-3 py-2 text-sm text-[#F8F6F2] placeholder:text-[#F8F6F2]/40"
              data-testid="subscribe-email"
            />
            <button
              type="submit"
              data-testid="subscribe-submit"
              className="gold-btn bg-[#C9A227] text-black font-cinzel tracking-[0.25em] uppercase text-[0.65rem] px-5"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <DiagonalBrushStrokes position="br" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-10 mt-10 border-t border-[#C9A227]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#F8F6F2]/40 font-cinzel">
          © {new Date().getFullYear()} ATMAN — All Rights Reserved
        </p>
        <div className="flex items-center gap-6">
          <a
            href="/admin"
            data-testid="footer-admin-link"
            className="text-[0.6rem] tracking-[0.3em] uppercase text-[#F8F6F2]/40 hover:text-[#C9A227] font-cinzel transition-colors"
          >
            Admin
          </a>
          <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#F8F6F2]/40 font-cinzel">
            Crafted with soul
          </p>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------- LAYOUT --------------------------------- */

export const LandingBento = () => {
  const settings = useSiteSettings();
  const videos = useVideos();
  const shows = useShows();
  const gallery = useGallery();

  return (
    <div
      className="min-h-screen bg-black text-[#F8F6F2] font-poppins"
      data-testid="landing-bento"
    >
      <Navbar />

      {/* Bento grid: hero left, about + music stacked right */}
      <main className="pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-3 p-2 lg:p-3">
          {/* Hero — spans 7 cols on desktop */}
          <div className="lg:col-span-7">
            <HeroCard />
          </div>

          {/* Right column — About on top, Music below */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-2 lg:gap-3">
            <AboutCard />
            <MusicCard videos={videos} />
          </div>

          {/* Middle row: Shows (7) + Gallery (5) */}
          <div className="lg:col-span-7">
            <ShowsCard shows={shows} />
          </div>
          <div className="lg:col-span-5">
            <GalleryCard gallery={gallery} />
          </div>
        </div>
      </main>

      {/* Booking form (Contact section — anchored by nav) */}
      <div id="booking-anchor" />
      <Booking />

      <FooterBento settings={settings} />
    </div>
  );
};

export default LandingBento;
