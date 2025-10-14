// Prevent multiple THREE.js instances (needed for react-globe.gl)
import * as THREE from "three";
window.THREE = THREE;

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app.jsx";
import "./index.css";

// Optional: wrap with React.StrictMode if you want extra checks
createRoot(document.getElementById("root")).render(
  <App />
);
