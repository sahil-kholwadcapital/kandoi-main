import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header>
        <h1 className="text-3xl font-semibold">About Kholwad Capital</h1>
        <p className="mt-2 text-gray-600 max-w-3xl">
          We’re a privately held real estate company focused on durable assets and
          simple, understandable businesses. Our bias is toward long-term
          ownership, disciplined underwriting, and compounding cash flows.
        </p>
      </header>

      {/* Approach */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Approach</h2>
        <p className="mt-2 text-gray-600 max-w-3xl">
          We prefer opportunities where outcomes are driven more by
          operational execution than by macro forecasts. When we can’t
          operate directly, we take minority positions alongside aligned
          partners.
        </p>
      </section>

      {/* Focus Areas */}
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

      {/* Principles */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Principles</h2>
        <ol className="mt-3 list-decimal ml-5 text-gray-700 space-y-2">
          <li>Underwrite to resiliency first; upside second.</li>
          <li>Prefer simplicity, transparency, and alignment.</li>
          <li>Let compounding work—opt for time in, not timing.</li>
        </ol>
      </section>

      {/* Light, not-obvious link to Family Tree */}
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

      {/* CTA row */}
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
    </div>
  );
}
