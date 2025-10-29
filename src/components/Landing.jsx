// src/components/Home.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const IMAGES = [
  "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1750779940369-2b817adea9d7?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1761375002691-c86d054e96be?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2000&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1760426112410-9e6cd0f38219?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1375",
  
  "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?q=80&w=2000&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1696320012154-8a580815d376?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop",
];

export default function Home() {
  // start on a random index
  const [i, setI] = useState(() => Math.floor(Math.random() * IMAGES.length));

  // rotate every 6 seconds
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % IMAGES.length), 6000);
    return () => clearInterval(id);
  }, []);

  // preload next image
  const preloadSrc = useMemo(() => IMAGES[(i + 1) % IMAGES.length], [i]);
  useEffect(() => {
    const img = new Image();
    img.src = preloadSrc;
  }, [preloadSrc]);

  // click handler to skip to next image
  const handleClick = useCallback(() => {
    setI((n) => (n + 1) % IMAGES.length);
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden cursor-pointer"
      onClick={handleClick}
      title="Click to change image"
    >
      {/* Rotating background */}
      <div className="absolute inset-0">
        {IMAGES.map((src, idx) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${src}')` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Overlay text */}
      <div className="relative z-10 text-center text-white px-4 select-none">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight drop-shadow">
          Kholwad Capital
        </h1>
        <p className="mt-2 text-white/80 text-sm uppercase tracking-wide">
          Established 2025
        </p>

        <div className="mt-10">
          <Link
            to="/holdings"
            className="text-gray-100 hover:text-teal-400 font-medium underline"
          >
            Portfolio →
          </Link>
        </div>
      </div>
    </div>
  );
}
