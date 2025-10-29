import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function About() {
  const title = "Kholwad Capital".split("");
  const subtitle = "Established 2025".split("");

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const smoothX = useSpring(cursorX, { stiffness: 40, damping: 12 });
  const smoothY = useSpring(cursorY, { stiffness: 40, damping: 12 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cursorX.set(e.clientX - (rect.left + rect.width / 2));
    cursorY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const magneticOffset = (baseIndex, total) => {
    const offset = baseIndex - total / 2;

    return {
      x: useTransform(smoothX, (v) => v * 0.08 * offset),
      y: useTransform(smoothY, (v) => v * 0.08 * offset)
    };
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light" />

      <div className="relative text-center px-6 select-none" onMouseMove={handleMouseMove}>
        {/* TITLE */}
        <motion.h1 className="text-6xl font-light uppercase tracking-widest flex justify-center gap-[0.05em]">
          {title.map((char, i) => (
            <motion.span key={i} style={magneticOffset(i, title.length)}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p className="text-gray-500 mt-4 text-sm uppercase tracking-widest flex justify-center gap-[0.15em]">
          {subtitle.map((char, i) => (
            <motion.span key={i} style={magneticOffset(i, subtitle.length)}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </div>
  );
}



     { /* Description 
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Approach</h2>
        <p className="mt-2 text-gray-600 max-w-3xl">
          We prefer opportunities where outcomes are driven more by
          operational execution than by macro forecasts. When we can’t
          operate directly, we take minority positions alongside aligned
          partners.
        </p>
      </section>

      {/* Focus Areas    
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Focus Areas</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          <li className="p-4 bg-white border rounded-xl shadow-sm">
            <div className="font-medium">Real Estate</div>
            <div className="text-sm text-gray-600">
              Income-producing properties and select development with clear
              downside protection.
            </div>
          </li>
          <li className="p-4 bg-white border rounded-xl shadow-sm">
            <div className="font-medium">Operating Businesses</div>
            <div className="text-sm text-gray-600">
              Simple, cash-generative companies where we can add operating leverage.
            </div>
          </li>
          <li className="p-4 bg-white border rounded-xl shadow-sm">
            <div className="font-medium">Passive Stakes</div>
            <div className="text-sm text-gray-600">
              Minority/LP positions with partners who share our time horizon.
            </div>
          </li>
          <li className="p-4 bg-white border rounded-xl shadow-sm">
            <div className="font-medium">Special Situations</div>
            <div className="text-sm text-gray-600">
              Opportunistic mispricings and idiosyncratic events.
            </div>
          </li>
        </ul>
      </section>


      {/* Philosophy 
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Philosophy</h2>
        <ol className="mt-3 list-decimal ml-5 text-gray-700 space-y-2">
          <li>Underwrite to resiliency first; upside second.</li>
          <li>Prefer simplicity, transparency, and alignment.</li>
          <li>Let compounding work—opt for time in, not timing.</li>
        </ol>
      </section>

      {/* Family Background 
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Background</h2>
        <p className="mt-2 text-gray-600 max-w-3xl">
          Kholwad Capital is family-owned. If you’re curious about our roots,
          you can explore a small side project{" "}
          <Link
            to="/family-tree"
            className="underline text-gray-500 hover:text-gray-800"
            title="A small side project"
          >
            here
          </Link>
          .
        </p>
      </section>
      */}

      {/* CTA row 
      <div className="mt-12 flex gap-3">
        <Link
          to="/holdings"
          className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium shadow"
        >
          View Holdings
        </Link>
        <a
          href="mailto:info@kholwadcapital.com"
          className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 font-medium shadow"
        >
          Contact
        </a>
      </div>
      */}
