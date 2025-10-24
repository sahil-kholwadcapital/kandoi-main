import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Landing from "./components/Landing.jsx";
import Holdings from "./components/Holdings.jsx";
import About from "./components/About.jsx";
import FamilyTree from "./components/FamilyTree.jsx";
import FamilyAtlas from "./components/FamilyAtlas.jsx";


export default function App() {
  return (
    <BrowserRouter>
      {/* Simple top nav */}
      <nav className="w-full bg-white/95 border-b backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-tight hover:text-teal-600 transition-colors">
            Kholwad Capital
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/" className="hover:text-teal-600 transition-colors">Home</Link>
            <Link to="/holdings" className="hover:text-teal-600 transition-colors">Holdings</Link>
            <Link to="/about" className="hover:text-teal-600 transition-colors">About</Link>
            <Link to="/family-tree" className="hover:text-teal-600 transition-colors"> Kholwad Tree</Link>
            <Link to="/family-atlas" className="hover:text-teal-600 transition-colors"> Atlas</Link>
          </div>
        </div>
      </nav>
      
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/holdings" element={<Holdings />} />
        <Route path="/about" element={<About />} />
        <Route path="/family-tree" element={<FamilyTree />} />
        <Route path="/family-atlas" element={<FamilyAtlas />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
