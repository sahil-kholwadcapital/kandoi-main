import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Landing from "./components/Landing.jsx";
import Holdings from "./components/Holdings.jsx";
import About from "./components/About.jsx";
import FamilyTree from "./components/FamilyTree.jsx";
import FamilyAtlas from "./components/FamilyAtlas.jsx";

export default function App() {
  return (
    <BrowserRouter>
      {/* Top Nav */}
      <header className="fixed top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">

          {/* Brand */}
          <NavLink
            to="/"
            className="text-lg font-semibold tracking-tight text-neutral-900 hover:text-red-600 transition-colors"
          >
            KHOLWAD <span className="text-black-600">CAPITAL</span>
          </NavLink>

          {/* Navigation */}
          <nav className="flex items-center gap-8 text-sm font-medium">

            {/* HOME */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative transition-colors duration-200 after:absolute after:bottom-[-6px] after:left-0 after:h-[1.5px] after:bg-teal-600 after:transition-all after:duration-200
                 ${isActive
                   ? "text-teal-600 after:w-full"
                   : "text-neutral-700 hover:text-neutral-900 after:w-0 hover:after:w-full"
                 }`
              }
            >
              Home
            </NavLink>

            {/* HOLDINGS */}
            <NavLink
              to="/holdings"
              className={({ isActive }) =>
                `relative transition-colors duration-200 after:absolute after:bottom-[-6px] after:left-0 after:h-[1.5px] after:bg-teal-600 after:transition-all after:duration-200
                 ${isActive
                   ? "text-teal-600 after:w-full"
                   : "text-neutral-700 hover:text-neutral-900 after:w-0 hover:after:w-full"
                 }`
              }
            >
              Holdings
            </NavLink>

            {/* EXPLORE + DROPDOWN */}
            <div className="relative group inline-block">

              {/* Hover label - Not Clickable */}
              <span
                className="
                  text-neutral-700 group-hover:text-neutral-900 
                  cursor-default 
                  transition-colors duration-200
                "
              >
                Explore
              </span>

              {/* Dropdown */}
              <div
                className="
                  absolute left-1/2 -translate-x-1/2 
                  pt-3 w-44
                  opacity-0 translate-y-1 pointer-events-none
                  group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                  transition-all duration-200 ease-out
                "
              >
                <div
                  className="
                    bg-white border border-neutral-200/70 shadow-sm 
                    rounded-md py-3 px-4 
                    flex flex-col space-y-3 
                    text-[13px] tracking-wide text-neutral-800
                  "
                >

                  {/* ABOUT */}
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `relative transition-colors duration-200 after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:bg-teal-600 after:transition-all after:duration-200
                       ${isActive
                         ? "text-teal-600 after:w-full"
                         : "text-neutral-700 hover:text-neutral-900 after:w-0 hover:after:w-full"
                       }`
                    }
                  >
                    About
                  </NavLink>

                  {/* TREE */}
                  <NavLink
                    to="/family-tree"
                    className={({ isActive }) =>
                      `relative transition-colors duration-200 after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:bg-teal-600 after:transition-all after:duration-200
                       ${isActive
                         ? "text-teal-600 after:w-full"
                         : "text-neutral-700 hover:text-neutral-900 after:w-0 hover:after:w-full"
                       }`
                    }
                  >
                    Kholwad Tree
                  </NavLink>

                  {/* ATLAS */}
                  <NavLink
                    to="/family-atlas"
                    className={({ isActive }) =>
                      `relative transition-colors duration-200 after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:bg-teal-600 after:transition-all after:duration-200
                       ${isActive
                         ? "text-teal-600 after:w-full"
                         : "text-neutral-700 hover:text-neutral-900 after:w-0 hover:after:w-full"
                       }`
                    }
                  >
                    Atlas
                  </NavLink>

                </div>
              </div>
            </div>

          </nav>
        </div>
      </header>

      {/* Routes */}
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/about" element={<About />} />
          <Route path="/family-tree" element={<FamilyTree />} />
          <Route path="/family-atlas" element={<FamilyAtlas />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
