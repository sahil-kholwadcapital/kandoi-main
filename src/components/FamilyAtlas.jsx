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
  4: "AFG", 8: "ALB", 10: "ATA", 12: "DZA", 16: "ASM", 20: "AND", 24: "AGO",
  28: "ATG", 31: "AZE", 32: "ARG", 36: "AUS", 40: "AUT", 44: "BHS", 48: "BHR",
  50: "BGD", 51: "ARM", 52: "BRB", 56: "BEL", 60: "BMU", 64: "BTN", 68: "BOL",
  70: "BIH", 72: "BWA", 74: "BVT", 76: "BRA", 84: "BLZ", 86: "IOT", 90: "SLB",
  92: "VGB", 96: "BRN", 100: "BGR", 104: "MMR", 108: "BDI", 112: "BLR",
  116: "KHM", 120: "CMR", 124: "CAN", 132: "CPV", 136: "CYM", 140: "CAF",
  144: "LKA", 148: "TCD", 152: "CHL", 156: "CHN", 162: "CXR", 166: "CCK",
  170: "COL", 174: "COM", 175: "MYT", 178: "COG", 180: "COD", 184: "COK",
  188: "CRI", 191: "HRV", 192: "CUB", 196: "CYP", 203: "CZE", 204: "BEN",
  208: "DNK", 212: "DMA", 214: "DOM", 218: "ECU", 222: "SLV", 226: "GNQ",
  231: "ETH", 232: "ERI", 233: "EST", 234: "FRO", 238: "FLK", 239: "SGS",
  242: "FJI", 246: "FIN", 248: "ALA", 250: "FRA", 254: "GUF", 258: "PYF",
  260: "ATF", 262: "DJI", 266: "GAB", 268: "GEO", 270: "GMB", 275: "PSE",
  276: "DEU", 288: "GHA", 292: "GIB", 296: "KIR", 300: "GRC", 304: "GRL",
  308: "GRD", 312: "GLP", 316: "GUM", 320: "GTM", 324: "GIN", 328: "GUY",
  332: "HTI", 334: "HMD", 336: "VAT", 340: "HND", 344: "HKG", 348: "HUN",
  352: "ISL", 356: "IND", 360: "IDN", 364: "IRN", 368: "IRQ", 372: "IRL",
  376: "ISR", 380: "ITA", 384: "CIV", 388: "JAM", 392: "JPN", 398: "KAZ",
  400: "JOR", 404: "KEN", 408: "PRK", 410: "KOR", 414: "KWT", 417: "KGZ",
  418: "LAO", 422: "LBN", 426: "LSO", 430: "LBR", 434: "LBY", 438: "LIE",
  440: "LTU", 442: "LUX", 446: "MAC", 450: "MDG", 454: "MWI", 458: "MYS",
  462: "MDV", 466: "MLI", 470: "MLT", 474: "MTQ", 478: "MRT", 480: "MUS",
  484: "MEX", 492: "MCO", 496: "MNG", 498: "MDA", 499: "MNE", 500: "MSR",
  504: "MAR", 508: "MOZ", 512: "OMN", 516: "NAM", 520: "NRU", 524: "NPL",
  528: "NLD", 531: "CUW", 533: "ABW", 534: "SXM", 535: "BES", 540: "NCL",
  548: "VUT", 554: "NZL", 558: "NIC", 562: "NER", 566: "NGA", 570: "NIU",
  574: "NFK", 578: "NOR", 580: "MNP", 581: "UMI", 583: "FSM", 584: "MHL",
  585: "PLW", 586: "PAK", 591: "PAN", 598: "PNG", 600: "PRY", 604: "PER",
  608: "PHL", 612: "PCN", 616: "POL", 620: "PRT", 624: "GNB", 626: "TLS",
  630: "PRI", 634: "QAT", 638: "REU", 642: "ROU", 643: "RUS", 646: "RWA",
  652: "BLM", 654: "SHN", 659: "KNA", 660: "AIA", 662: "LCA", 663: "MAF",
  666: "SPM", 670: "VCT", 674: "SMR", 678: "STP", 682: "SAU", 686: "SEN",
  688: "SRB", 690: "SYC", 694: "SLE", 702: "SGP", 703: "SVK", 704: "VNM",
  705: "SVN", 706: "SOM", 710: "ZAF", 716: "ZWE", 724: "ESP", 728: "SSD",
  729: "SDN", 732: "ESH", 740: "SUR", 744: "SJM", 748: "SWZ", 752: "SWE",
  756: "CHE", 760: "SYR", 762: "TJK", 764: "THA", 768: "TGO", 772: "TKL",
  776: "TON", 780: "TTO", 784: "ARE", 788: "TUN", 792: "TUR", 795: "TKM",
  796: "TCA", 798: "TUV", 800: "UGA", 804: "UKR", 807: "MKD", 818: "EGY",
  826: "GBR", 831: "GGY", 832: "JEY", 833: "IMN", 834: "TZA", 840: "USA",
  850: "VIR", 854: "BFA", 858: "URY", 860: "UZB", 862: "VEN", 876: "WLF",
  882: "WSM", 887: "YEM", 894: "ZMB"
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
    ringColor: () => "rgba(250, 199, 80, 0.33)",  // soft golden glow
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
    if (c?.highlight === "visited") return "hsla(224, 35%, 70%, 0.23)"; // overlay highlight color
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

  // TripTile subcomponent
  function TripTile({ trip, iso3, flagUrl }) {
    const hasImg = !!trip.coverImg;
    const imgSrc = hasImg ? trip.coverImg : flagUrl;
    const citiesPreview =
      Array.isArray(trip.cities) && trip.cities.length > 0
        ? trip.cities.slice(0, 3).join(", ")
        : "";
    const isLinked = !!trip.link;
    return isLinked ? (
      <a
        href={trip.link}
        className="group block rounded-xl shadow-lg bg-white/90 border border-gray-200 overflow-hidden transition-all duration-200 hover:scale-[1.04] hover:shadow-amber-300/40 hover:z-10 relative"
        style={{ minHeight: 130, height: 150, textDecoration: "none" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className="w-full h-24 bg-gray-100 flex items-center justify-center overflow-hidden"
          style={{
            background: hasImg
              ? `url(${imgSrc}) center/cover`
              : flagUrl
              ? `url(${flagUrl}) center/contain no-repeat, linear-gradient(90deg,#f8fafc,#fef3c7)`
              : "linear-gradient(90deg,#f8fafc,#fef3c7)",
          }}
        >
          {!hasImg && !flagUrl && (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-amber-400" />
            </div>
          )}
        </div>
        <div className="p-3">
          <div className="font-semibold text-gray-900 text-base truncate">{trip.label || "Trip"}</div>
          <div className="text-xs text-gray-500 mb-1">{trip.when}</div>
          <div className="text-sm text-gray-700 truncate">{citiesPreview}</div>
        </div>
        <div className="absolute bottom-2 right-3 text-xs text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
          View Trip &rarr;
        </div>
      </a>
    ) : (
      <div
        className="rounded-xl shadow bg-white/90 border border-gray-200 overflow-hidden transition-all duration-200"
        style={{ minHeight: 130, height: 150 }}
      >
        <div
          className="w-full h-24 bg-gray-100 flex items-center justify-center overflow-hidden"
          style={{
            background: hasImg
              ? `url(${imgSrc}) center/cover`
              : flagUrl
              ? `url(${flagUrl}) center/contain no-repeat, linear-gradient(90deg,#f8fafc,#fef3c7)`
              : "linear-gradient(90deg,#f8fafc,#fef3c7)",
          }}
        >
          {!hasImg && !flagUrl && (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-amber-400" />
            </div>
          )}
        </div>
        <div className="p-3">
          <div className="font-semibold text-gray-900 text-base truncate">{trip.label || "Trip"}</div>
          <div className="text-xs text-gray-500 mb-1">{trip.when}</div>
          <div className="text-sm text-gray-700 truncate">{citiesPreview}</div>
        </div>
      </div>
    );
  }

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

          <div>
            <div className="flex items-center gap-2 mb-3">
              <ListTree className="w-4 h-4 text-green-600" />
              <span className="font-semibold">Trips ({trips.length})</span>
            </div>
            {trips.length === 0 ? (
              <div className="text-center py-5 text-gray-500">
                <MapPin className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                <p>No trips recorded</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {trips.map((t) => (
                  <TripTile
                    trip={t}
                    key={t.id}
                    iso3={selected.iso3}
                    flagUrl={selected.flagUrl}
                  />
                ))}
              </div>
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

  // Cinematic background & atmosphere
  backgroundColor="#050915"
  showAtmosphere
  atmosphereColor="rgba(140,170,255,0.25)"
  atmosphereAltitude={0.3}

  // Surface: use CORS-friendly earth at night texture
  globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
  bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
  cloudsImageUrl="https://unpkg.com/three-globe/example/img/earth-clouds.png"                              // Light, semi-transparent cloud layer



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
  pointColor={() => "#ffae5f"}
  pointResolution={18}
  pointRadius={0.25}
  pointAltitude={0.022}

  ringsData={ringPins.map(r => ({
    ...r,
    ringColor: () => "rgba(250,199,80,0.45)"
  }))}
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

    // Fix: Use globe.globeMaterial() (not globe.globalMaterial)
    if (typeof globe.globeMaterial === "function") {
      const mat = globe.globeMaterial();
      mat.bumpScale = -1.6;
      mat.color.set("#0e0f13");
      mat.shininess = 4;
      mat.specular = new THREE.Color("#111");
      const tex = mat.bumpMap;
      if (tex) {
        tex.minFilter = THREE.NearestFilter;
        tex.magFilter = THREE.NearestFilter;
        tex.needsUpdate = true;
      }
      mat.needsUpdate = true;
    }
  }}
/>
        </Suspense>
      </div>
      <SidePanel />
    </div>
  );
}
