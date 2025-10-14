// src/components/Holdings.jsx
import React from "react";

const HOLDINGS = [
  {
    title: "Property A",
    kind: "Real Estate • Active",
    blurb:
      "Well-located infill with clean downside and simple operations. We favor predictability over flash.",
    img: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Property B",
    kind: "Real Estate • Active",
    blurb:
      "Straightforward income with light value-add. The boring things compound the best.",
    img: "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Business A",
    kind: "Operating • Active",
    blurb:
      "A small, durable company where operations matter more than forecasts.",
    img: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Business B",
    kind: "Operating • Active",
    blurb:
      "Simple unit economics, patient improvements, no heroics required.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Investment A",
    kind: "Passive • Minority",
    blurb:
      "Aligned partner, understandable thesis, long runway. We prefer time in to timing.",
    img: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Investment B",
    kind: "Passive • Fund",
    blurb:
      "Low-friction exposure to quality operators with a similar horizon.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function Holdings() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Holdings</h1>
        <p className="mt-2 text-gray-600 max-w-3xl">
          We like assets that don’t need perfect conditions to work:
          understandable, cash-generative, and hard to break.
          Some we run; others we ride along with partners we trust.
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
