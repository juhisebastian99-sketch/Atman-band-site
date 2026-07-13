import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Genres from "@/components/Genres";
import Performances from "@/components/Performances";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-[#F8F6F2] font-poppins" data-testid="landing-page">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Genres />
        <Performances />
        <Gallery />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      {/* Global SVG color-matrix filter — converts pure-black pixels of any
          image using filter: url(#atman-remove-black) into alpha=0. This lets
          the ATMAN Enso logo JPG render as if it were a transparent PNG on
          any surface, without depending on component-local defs. */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="atman-remove-black" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      4 4 4 0 -1"
            />
          </filter>
        </defs>
      </svg>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#1a1a1a",
            border: "1px solid rgba(201,162,39,0.3)",
            color: "#F8F6F2",
            fontFamily: "Poppins, sans-serif",
          },
        }}
      />
    </div>
  );
}

export default App;
