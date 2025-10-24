// src/components/Holdings.jsx
import React from "react";

const HOLDINGS = [
  {
    title: "Rental Property- Desert Fox",
    kind: "Residental Real Estate • Active",
    blurb:
      "Safe, modern living in a prime location. Excellent schools, open green spaces and parks, with easy access to restaurants and grocery stores.",
    img: "https://photos.zillowstatic.com/fp/b640ce1f89d6d65284d3adf39366aa7f-cc_ft_1536.jpg",
  },
  {
    title: "Rental Property - Domingo Baca",
    kind: "Real Estate • Active",
    blurb:
      "Well-located, clean, safe. Excellent school district with large parks, restaurants, and grocery shopping nearby.",
    img: "https://photos.zillowstatic.com/fp/3dd5043ca92996d4c4781a0f7c4ddb83-cc_ft_1536.jpg",
  },
  {
    title: "Hyatt Place Albuquerque Uptown",
    kind: "Investment • Passive",
    blurb:
      "A beautiful hotel in Albuquerque's Uptown",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/47/25/f9/exterior.jpg?w=900&h=500&s=1",
  },
  {
title: "Dual Brand Marriott Fairfield and Towneplace Albuquerque Uptown",
    kind: "Investment • Passive",
    blurb:
      "A beautiful dual-branded Marriott Fairfield and Towneplace located at Albuquerque's Uptown, in the Winrock Town Center.",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/1d/6b/26/caption.jpg?w=900&h=-1&s=1",
  },

];

export default function Holdings() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Holdings</h1>
        <p className="mt-2 text-gray-600 max-w-3xl">
          Speak plainly, invest in what will work, and return capital.                                                    
          We operate and partner.
        </p>
      </header>

      {/* grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {HOLDINGS.map((h) => (
          <article
            key={h.title}
            className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm"
          >
            {/* image */}
            <div
              className="h-40 sm:h-44 bg-cover bg-center"
              style={{ backgroundImage: `url('${h.img}')` }}
            />
            {/* body */}
            <div className="p-5">
              <div className="text-xs uppercase tracking-wide text-gray-500">
                {h.kind}
              </div>
              <h3 className="mt-1 font-semibold text-lg">{h.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{h.blurb}</p>
            </div>

            {/* hover accent */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition">
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          </article>
        ))}
      </div>

      {/* philosophy block */}
      <section className="mt-14">
        <div className="rounded-2xl border bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-semibold">How we think</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 text-gray-700">
            <li className="p-4 rounded-xl border bg-gray-50">
              Underwrite for resiliency first; upside takes care of itself.
            </li>
            <li className="p-4 rounded-xl border bg-gray-50">
              Prefer simple, controllable levers over cleverness.
            </li>
            <li className="p-4 rounded-xl border bg-gray-50">
              Time in the market beats timing the market.
            </li>
            <li className="p-4 rounded-xl border bg-gray-50">
              Alignment and patience compound better than anything else.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
