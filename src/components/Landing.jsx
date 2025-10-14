import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

// Move headline/tagline lower by changing this value (e.g. "55%", "62%")
const TOP_PERCENT = "58%";

// Architecture-only hero images (exteriors only)
const HERO = [
  "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?q=80&w=2000&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1676496046182-356a6a0ed002?q=80&w=2000&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1696320012154-8a580815d376?q=80&w=2000&auto=format&fit=crop",
];

export default function Landing() {
  const [i, setI] = useState(0);
  const next = () => setI((n) => (n + 1) % HERO.length);
  const prev = () => setI((n) => (n - 1 + HERO.length) % HERO.length);

  useEffect(() => {
    const id = setInterval(next, 6500);
    return () => clearInterval(id);
  }, []);

  const preloadSrc = useMemo(() => HERO[(i + 1) % HERO.length], [i]);
  useEffect(() => {
    const img = new Image();
    img.src = preloadSrc;
  }, [preloadSrc]);

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Slides */}
        <div className="absolute inset-0">
          {HERO.map((src, idx) => (
            <div
              key={src}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
                idx === i ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url('${src}')` }}
            />
          ))}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Copy anchored a bit below center */}
        <div
          className="absolute inset-x-0 -translate-y-1/2 z-10"
          style={{ top: TOP_PERCENT }}
        >
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-wide text-white drop-shadow">
              Kholwad Capital
            </h1>
            <p className="mt-3 sm:mt-4 text-white/90 text-lg sm:text-xl">
              Building, owning, and holding for the long term.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/holdings"
                className="px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium shadow"
              >
                Portfolio
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 rounded-lg bg-white/85 hover:bg-white text-gray-800 font-medium shadow"
              >
                About
              </Link>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button
          aria-label="Previous"
          onClick={prev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-white/70 hover:bg-white shadow z-10"
        >
          ‹
        </button>
        <button
          aria-label="Next"
          onClick={next}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-white/70 hover:bg-white shadow z-10"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`w-2.5 h-2.5 rounded-full border border-white ${
                idx === i ? "bg-white" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section id="about" className="py-12 bg-white border-t">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-semibold">About</h2>
          <p className="mt-2 max-w-3xl text-gray-600">
            Explore the portfolio—or step into a private project that reflects
            our more personal vision.
          </p>
          <div className="mt-4">
            <Link to="/holdings" className="text-teal-700 hover:underline font-medium">
              View Holdings →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
