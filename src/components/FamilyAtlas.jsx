// src/components/FamilyAtlas.jsx
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  Suspense,
  lazy,
} from "react";
import { X, Calendar, ListTree, MapPin, Loader2, AlertTriangle } from "lucide-react";
import seed from "../data/atlasSeed.js";
import * as topojson from "topojson-client";

const isoNumericToAlpha3 = {
  4: "AFG", 8: "ALB", 12: "DZA", 32: "ARG", 36: "AUS", 40: "AUT", 50: "BGD",
  56: "BEL", 68: "BOL", 76: "BRA", 100: "BGR", 124: "CAN", 152: "CHL", 156: "CHN",
  170: "COL", 188: "CRI", 191: "HRV", 196: "CYP", 203: "CZE", 208: "DNK",
  214: "DOM", 218: "ECU", 233: "EST", 246: "FIN", 250: "FRA", 276: "DEU",
  288: "GHA", 300: "GRC", 344: "HKG", 348: "HUN", 356: "IND", 360: "IDN",
  364: "IRN", 372: "IRL", 376: "ISR", 380: "ITA", 392: "JPN", 404: "KEN",
  410: "KOR", 414: "KWT", 422: "LBN", 434: "LBY", 446: "MAC", 458: "MYS",
  466: "MLI", 478: "MRT", 484: "MEX", 504: "MAR", 528: "NLD", 554: "NZL",
  578: "NOR", 586: "PAK", 604: "PER", 608: "PHL", 620: "PRT", 646: "RWA",
  682: "SAU", 686: "SEN", 702: "SGP", 710: "ZAF", 724: "ESP", 752: "SWE",
  756: "CHE", 764: "THA", 784: "ARE", 788: "TUN", 792: "TUR", 800: "UGA",
  804: "UKR", 818: "EGY", 826: "GBR", 840: "USA", 858: "URY", 860: "UZB",
  862: "VEN", 882: "WSM", 894: "ZMB", 716: "ZWE"
};

const Globe = lazy(() => import("react-globe.gl").then((m) => ({ default: m.default })));

const NAV_HEIGHT = 64;

/* -------------------- Loading View -------------------- */
const LoadingView = ({ message = "Loading globe..." }) => (
  <div className="absolute inset-0 flex items-center justify-center bg-[#0b1020]">
    <div className="text-white text-center">
      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
      <p>{message}</p>
    </div>
  </div>
);

export default function FamilyAtlas() {
  const [countriesGeo, setCountriesGeo] = useState(null);
  const [selected, setSelected] = useState(null);
  const [hoveredIso3, setHoveredIso3] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const globeRef = useRef(null);
  const colors = seed.settings.colors;

  /* -------------------- Responsive Sizing -------------------- */
  const [globeSize, setGlobeSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight - NAV_HEIGHT,
  });

  useEffect(() => {
    const onResize = () =>
      setGlobeSize({
        width: window.innerWidth,
        height: window.innerHeight - NAV_HEIGHT,
      });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* -------------------- Fetch Country Data -------------------- */
  useEffect(() => {
  (async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
      );
      if (!res.ok) throw new Error("Failed to load world-atlas");
      const topo = await res.json();

      // Convert TopoJSON → GeoJSON
      const geo = topojson.feature(topo, topo.objects.countries);

      //  Convert numeric IDs → ISO3 codes
     geo.features.forEach(f => {
  const numericId = parseInt(f.id, 10);
  f.properties.ISO_A3 = isoNumericToAlpha3[numericId] || "UNK";
});


      console.log(
        "Sample GeoJSON ISO codes:",
        geo.features.slice(0, 20).map(f => f.properties.ISO_A3)
      );

      setCountriesGeo(geo);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  })();
}, []);


/* -------------------- Build Lookup + Pins -------------------- */
const { countryLookup, allPins, ringPins } = useMemo(() => {
  const lookup = new Map();
  const pins = [];

  for (const c of seed.countries || []) {
    lookup.set(c.iso3.toUpperCase(), c);
    for (const t of c.trips || [])
      for (const p of t.pins || [])
        pins.push({ ...p, iso3: c.iso3.toUpperCase(), country: c.label });
  }

  const rings = pins.map((p) => ({
    lat: p.lat,
    lng: p.lng,
    ringColor: () => "rgba(250, 200, 80, 0.25)",  // soft golden glow
    ringMaxRadius: 2.0,                          // smaller rings
    altitude: 0.012,                             // raised slightly above surface
    repeatPeriod: 2500                           // slower pulse

  }));

  // 👇 Add this log line just before the return
  console.log("Loaded countries:", Array.from(lookup.keys()).slice(0, 20));

  return { countryLookup: lookup, allPins: pins, ringPins: rings };
}, []);


  /* -------------------- Helpers -------------------- */
  const getIso3 = (f) => f?.properties?.ISO_A3 ?? null;
  const getCountryName = (f) =>
    f?.properties?.ADMIN || f?.properties?.NAME || getIso3(f) || "Unknown";

  const getCountryColor = useCallback(
  (f) => {
    const iso3 = getIso3(f)?.toUpperCase?.();
    if (!iso3) return "rgba(255,255,255,0)"; // fully transparent by default
    if (hoveredIso3 === iso3) return "rgba(255,255,255,0.4)"; // hover glow
    const c = countryLookup.get(iso3);
    if (c?.highlight === "visited") return "hsla(96, 35%, 59%, 0.37)"; // overlay color
    return "rgba(255,255,255,0)"; // no overlay otherwise
  },
  [countryLookup, hoveredIso3]
);


  const getAltitude = useCallback(
    (f) => {
      const iso3 = getIso3(f)?.toUpperCase?.();
      const c = iso3 ? countryLookup.get(iso3) : null;
      return c?.highlight === "visited" ? 0.02 : 0.01;
    },
    [countryLookup]
  );

  const handleCountryClick = (f) => {
    const iso3 = getIso3(f)?.toUpperCase?.();
    const label = getCountryName(f);
    const c = iso3 ? countryLookup.get(iso3) : null;
    const flagUrl = iso3 ? `https://flagcdn.com/w80/${iso3.toLowerCase()}.png` : null;
    setSelected(c ?? { iso3, label, highlight: "unknown", notes: "", trips: [], flagUrl });
  };

  /* -------------------- Side Panel -------------------- */
  const SidePanel = () => {
    if (!selected) return null;
    const trips = selected.trips || [];
    return (
      <div
        className="fixed right-6 w-[26rem] bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-y-auto"
        style={{ top: `${NAV_HEIGHT + 20}px`, maxHeight: "calc(100vh - 120px)" }}
      >
        <div className="flex justify-between items-start p-5 border-b">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              {selected.flagUrl && (
                <img
                  src={selected.flagUrl}
                  alt={`${selected.label} flag`}
                  className="w-6 h-4 rounded border border-gray-300"
                />
              )}
              <h2 className="text-xl font-bold text-gray-900">
                {selected.label || selected.iso3 || "Unknown"}
              </h2>
            </div>
            <p className="text-sm text-gray-500 capitalize">
              {selected.highlight || "unknown"}
            </p>
          </div>
          <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="bg-amber-50 rounded-lg p-3">
            <div className="text-sm font-medium text-amber-800 mb-1">Notes</div>
            <p className="text-sm text-amber-900">
              {selected.notes || "No notes available."}
            </p>
          </div>

          <div className="border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <ListTree className="w-4 h-4 text-green-600" />
              <span className="font-semibold">Trips ({trips.length})</span>
            </div>
            {trips.length === 0 ? (
              <div className="text-center py-5 text-gray-500">
                <MapPin className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                <p>No trips recorded</p>
              </div>
            ) : (
              trips.map((t) => (
                <div key={t.id} className="border rounded p-2 mb-2">
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>{t.when || "Date unknown"}</span>
                  </div>
                  {t.cities?.length > 0 && (
                    <div className="text-sm text-gray-600">{t.cities.join(" → ")}</div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  /* -------------------- Render -------------------- */
  if (loading) return <LoadingView />;
  if (error)
    return (
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <AlertTriangle className="w-10 h-10 text-yellow-400 mr-3" />
        <span>{error}</span>
      </div>
    );

  return (
    <div className="relative min-h-screen bg-[#0b1020]">
      <div className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-40">
        <h1 className="font-semibold text-lg text-gray-800">{seed.meta.title}</h1>
        <div className="text-sm text-gray-500">Last updated: {seed.meta.lastUpdated}</div>
      </div>

      <div className="relative w-full" style={{ height: `calc(100vh - ${NAV_HEIGHT}px)` }}>
        <Suspense fallback={<LoadingView />}>
<Globe
  ref={globeRef}
  width={globeSize.width}
  height={globeSize.height}

  // 🌌 Background & Atmosphere
  backgroundColor="#000000"
  showAtmosphere
  atmosphereColor="rgba(180, 200, 255, 0.5)"
  atmosphereAltitude={0.25}

  // 🌍 Neutral base + real bump (CORS-safe)
  globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
  bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
  cloudsImageUrl=""

  showGraticules={false}

  polygonsData={countriesGeo?.features || []}
  polygonCapColor={getCountryColor}
  polygonSideColor={() => "rgba(0,0,0,0.25)"}
  polygonStrokeColor={() => "rgba(255,255,255,0.08)"}
  polygonAltitude={getAltitude}
  polygonLabel={(f) =>
    `<div style="padding:6px 10px;background:rgba(0,0,0,0.85);border-radius:6px;color:white;font-size:12px;">
      ${getCountryName(f)}
    </div>`
  }

  onPolygonHover={(f) => setHoveredIso3(f ? getIso3(f)?.toUpperCase?.() : null)}
  onPolygonClick={handleCountryClick}
  enablePointerInteraction={true}

  pointsData={allPins}
  pointLat="lat"
  pointLng="lng"
  pointColor={() => colors.pin}
  pointResolution={18}
  pointRadius={0.35}
  pointAltitude={0.022}

  ringsData={ringPins}
  ringColor="ringColor"
  ringMaxRadius="ringMaxRadius"
  ringAltitude="altitude"
  ringPropagationSpeed={0.8}
  ringRepeatPeriod="repeatPeriod"

  autoRotate={seed.settings.globe.autoRotate}
  autoRotateSpeed={seed.settings.globe.autoRotateSpeed}

  onGlobeReady={() => {
    const globe = globeRef.current;
    if (!globe) return;

    globe.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 0);

    const mat = globe.globeMaterial();
    mat.bumpScale = -1.3; // exaggerate height
    mat.specular = new THREE.Color("#333");
    mat.shininess = 6;

    const tex = mat.bumpMap;
    if (tex) {
      tex.minFilter = THREE.NearestFilter;
      tex.magFilter = THREE.NearestFilter;
      tex.needsUpdate = true;
    }
    mat.needsUpdate = true;
  }}
/>



        </Suspense>
      </div>

      <SidePanel />
    </div>
  );
}
