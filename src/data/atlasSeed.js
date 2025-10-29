// src/data/atlasSeed.js
const seed = {
  meta: {
    title: "Atlas of Sahil Kholwadwala",
    lastUpdated: "2025-10-28",
  },
  countries: [
    {
      iso3: "ARG",
      label: "Argentina",
      continent: "South America",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "arg-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Buenos Aires", "Ushuaia", "El Calafate"],
          pins: [
            { label: "Buenos Aires", lat: -34.6037, lng: -58.3816 },
            { label: "Ushuaia", lat: -54.8019, lng: -68.3030 },
            { label: "El Calafate", lat: -50.3400, lng: -72.2648 }
          ]
        }
      ]
    },
    {
      iso3: "BRA",
      label: "Brazil",
      continent: "South America",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "bra-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Foz do Iguaçu"],
          pins: [{ label: "Foz do Iguaçu", lat: -25.5460, lng: -54.5880 }]
        }
      ]
    },
    {
      iso3: "KHM",
      label: "Cambodia",
      continent: "Asia",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "khm-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Siem Reap"],
          pins: [{ label: "Siem Reap", lat: 13.3633, lng: 103.8564 }]
        }
      ]
    },
    {
      iso3: "CAN",
      label: "Canada",
      continent: "North America",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "can-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Vancouver", "Montreal", "Arenal Volcano"], // removed Toronto, Victoria; added Arenal Volcano
          pins: [
            { label: "Vancouver", lat: 49.2827, lng: -123.1207 },
            { label: "Montreal", lat: 45.5017, lng: -73.5673 },
            { label: "Arenal Volcano", lat: 10.4631, lng: -84.7035 }
          ]
        }
      ]
    },
    {
      iso3: "CHL",
      label: "Chile",
      continent: "South America",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "chl-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Punta Arenas", "Torres del Paine"],
          pins: [
            { label: "Punta Arenas", lat: -53.1638, lng: -70.9171 },
            { label: "Torres del Paine", lat: -51.2537, lng: -72.3396 }
          ]
        }
      ]
    },
    {
      iso3: "CHN",
      label: "China",
      continent: "Asia",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "chn-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Beijing", "Shanghai"], // removed Hong Kong
          pins: [
            { label: "Beijing", lat: 39.9042, lng: 116.4074 },
            { label: "Shanghai", lat: 31.2304, lng: 121.4737 }
          ]
        }
      ]
    },
    {
      iso3: "CRI",
      label: "Costa Rica",
      continent: "North America",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "cri-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["San José", "Playa Flamingo", "Arenal Volcano"], // added Arenal Volcano
          pins: [
            { label: "San José", lat: 9.9281, lng: -84.0907 },
            { label: "Playa Flamingo", lat: 10.4300, lng: -85.7900 },
            { label: "Arenal Volcano", lat: 10.4631, lng: -84.7035 }
          ]
        }
      ]
    },
    {
      iso3: "DOM",
      label: "Dominican Republic",
      continent: "North America",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "dom-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Punta Cana", "Santo Domingo"],
          pins: [
            { label: "Punta Cana", lat: 18.5818, lng: -68.4055 },
            { label: "Santo Domingo", lat: 18.4861, lng: -69.9312 }
          ]
        }
      ]
    },
    {
      iso3: "ECU",
      label: "Ecuador",
      continent: "South America",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "ecu-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Guayaquil", "Galápagos Islands"], // removed Quito
          pins: [
            { label: "Guayaquil", lat: -2.1700, lng: -79.9224 },
            { label: "Galápagos Islands", lat: -0.9538, lng: -90.9656 }
          ]
        }
      ]
    },
    {
      iso3: "FJI",
      label: "Fiji",
      continent: "Oceania",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "fji-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Nadi"],
          pins: [{ label: "Nadi", lat: -17.7765, lng: 177.4350 }]
        }
      ]
    },
    {
      iso3: "FRA",
      label: "France",
      continent: "Europe",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "fra-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Paris", "Chamonix"],
          pins: [
            { label: "Paris", lat: 48.8566, lng: 2.3522 },
            { label: "Chamonix", lat: 45.9237, lng: 6.8694 }
          ]
        }
      ]
    },
    {
      iso3: "SJM",
      label: "Svalbard",
      continent: "Europe",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "sjm-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Longyearbyen"],
          pins: []
        }
      ]
    },
    {
      iso3: "DEU",
      label: "Germany",
      continent: "Europe",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "deu-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: [], // removed Frankfurt
          pins: []
        }
      ]
    },
    {
      iso3: "GRC",
      label: "Greece",
      continent: "Europe",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "grc-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Athens", "Santorini", "Mykonos"],
          pins: [
            { label: "Athens", lat: 37.9838, lng: 23.7275 },
            { label: "Santorini", lat: 36.3932, lng: 25.4615 },
            { label: "Mykonos", lat: 37.4467, lng: 25.3289 }
          ]
        }
      ]
    },
    {
      iso3: "IND",
      label: "India",
      continent: "Asia",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "ind-trip-1",
          label: "Golden Triangle & Goa",
          when: "December 2023",
          link: "/country/india/trip-1",
          coverImg: "/images/india-trip1.jpg",
          cities: ["Delhi", "Agra", "Jaipur", "Goa", "Varanasi"], // added Varanasi
          pins: [
            { label: "Mumbai", lat: 19.0760, lng: 72.8777 },
            { label: "Delhi", lat: 28.6139, lng: 77.2090 },
            { label: "Jaipur", lat: 26.9124, lng: 75.7873 },
            { label: "Udaipur", lat: 24.5854, lng: 73.7125 },
            { label: "Surat", lat: 21.1702, lng: 72.8311 },
            { label: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
            { label: "Goa", lat: 15.4909, lng: 73.8278 },
            { label: "Agra", lat: 27.1767, lng: 78.0081 },
            { label: "Jodhpur", lat: 26.2389, lng: 73.0243 },
            { label: "Varanasi", lat: 25.3176, lng: 82.9739 }
          ]
        }
      ]
    },
    {
      iso3: "ITA",
      label: "Italy",
      continent: "Europe",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "ita-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Rome", "Florence", "Venice", "Naples", "Pisa", "Amalfi"],
          pins: [
            { label: "Rome", lat: 41.9028, lng: 12.4964 },
            { label: "Florence", lat: 43.7696, lng: 11.2558 },
            { label: "Venice", lat: 45.4408, lng: 12.3155 },
            { label: "Naples", lat: 40.8518, lng: 14.2681 },
            { label: "Pisa", lat: 43.7228, lng: 10.4017 },
            { label: "Amalfi", lat: 40.6340, lng: 14.6020 }
          ]
        }
      ]
    },
    {
      iso3: "JAM",
      label: "Jamaica",
      continent: "North America",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "jam-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Montego Bay", "Ocho Rios"], // added Ocho Rios
          pins: [
            { label: "Montego Bay", lat: 18.4762, lng: -77.8939 },
            { label: "Ocho Rios", lat: 18.4057, lng: -77.1030 }
          ]
        }
      ]
    },
    {
      iso3: "JPN",
      label: "Japan",
      continent: "Asia",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "jpn-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Tokyo", "Kyoto", "Hakone", "Kobe"],
          pins: [
            { label: "Tokyo", lat: 35.6762, lng: 139.6503 },
            { label: "Kyoto", lat: 35.0116, lng: 135.7681 },
            { label: "Hakone", lat: 35.2324, lng: 139.1060 },
            { label: "Kobe", lat: 34.6901, lng: 135.1955 }
          ]
        }
      ]
    },
    {
      iso3: "KEN",
      label: "Kenya",
      continent: "Africa",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "ken-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: [], // removed Nairobi
          pins: []
        }
      ]
    },
    {
      iso3: "MEX",
      label: "Mexico",
      continent: "North America",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "mex-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Cancún", "Cabo San Lucas", "Puerto Vallarta", "Puerto Peñasco"], // removed Mexico City, added Puerto Peñasco
          pins: [
            { label: "Cancún", lat: 21.1619, lng: -86.8515 },
            { label: "Cabo San Lucas", lat: 22.8905, lng: -109.9167 },
            { label: "Puerto Vallarta", lat: 20.6534, lng: -105.2253 },
            { label: "Puerto Peñasco", lat: 31.3267, lng: -113.5311 }
          ]
        }
      ]
    },
    {
      iso3: "NZL",
      label: "New Zealand",
      continent: "Oceania",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "nzl-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Queenstown", "Wellington", "Milford Sound", "Punakaiki"], // removed Auckland, added Punakaiki
          pins: [
            { label: "Queenstown", lat: -45.0312, lng: 168.6626 },
            { label: "Wellington", lat: -41.2865, lng: 174.7762 },
            { label: "Milford Sound", lat: -44.6167, lng: 167.8667 },
            { label: "Punakaiki", lat: -42.1167, lng: 171.3269 }
          ]
        }
      ]
    },
    {
      iso3: "NOR",
      label: "Norway",
      continent: "Europe",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "nor-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Bergen", "Flåm", "Kristiansund", "Longyearbyen", "Åndalsnes"], // replaced Andenes with Åndalsnes
          pins: [
            { label: "Bergen", lat: 60.3913, lng: 5.3221 },
            { label: "Flåm", lat: 60.8610, lng: 7.1129 },
            { label: "Kristiansund", lat: 63.1106, lng: 7.7270 },
            { label: "Longyearbyen", lat: 78.2232, lng: 15.6469 },
            { label: "Åndalsnes", lat: 62.5646, lng: 7.6947 }
          ]
        }
      ]
    },
    {
      iso3: "PAN",
      label: "Panama",
      continent: "North America",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "pan-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Panama City", "Small Town"], // added small town
          pins: [
            { label: "Panama City", lat: 8.9824, lng: -79.5199 },
            { label: "Small Town", lat: 8.5, lng: -80.0 }
          ]
        }
      ]
    },
    {
      iso3: "PER",
      label: "Peru",
      continent: "South America",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "per-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Cusco", "Machu Picchu", "Sacred Valley", "Iquitos", "Yanque Canyon"], // removed Lima, added Yanque Canyon
          pins: [
            { label: "Cusco", lat: -13.5319, lng: -71.9675 },
            { label: "Machu Picchu", lat: -13.1631, lng: -72.5450 },
            { label: "Sacred Valley (Urubamba)", lat: -13.3040, lng: -72.1160 },
            { label: "Iquitos", lat: -3.7437, lng: -73.2516 },
            { label: "Yanque Canyon", lat: -15.6425, lng: -71.6131 }
          ]
        }
      ]
    },
    {
      iso3: "PRT",
      label: "Portugal",
      continent: "Europe",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "prt-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Lisbon", "Lagos", "Sintra"], // added Sintra
          pins: [
            { label: "Lisbon", lat: 38.7223, lng: -9.1393 },
            { label: "Lagos", lat: 37.1020, lng: -8.6739 },
            { label: "Sintra", lat: 38.8039, lng: -9.3817 }
          ]
        }
      ]
    },
    {
      iso3: "ZAF",
      label: "South Africa",
      continent: "Africa",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "zaf-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Cape Town"],
          pins: [{ label: "Cape Town", lat: -33.9249, lng: 18.4241 }]
        }
      ]
    },
    {
      iso3: "ESP",
      label: "Spain",
      continent: "Europe",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "esp-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Barcelona", "Seville", "Granada"], // removed Madrid, added Granada
          pins: [
            { label: "Barcelona", lat: 41.3874, lng: 2.1686 },
            { label: "Seville", lat: 37.3891, lng: -5.9845 },
            { label: "Granada", lat: 37.1773, lng: -3.5986 }
          ]
        }
      ]
    },
    {
      iso3: "CHE",
      label: "Switzerland",
      continent: "Europe",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "che-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Zurich", "Interlaken", "Grindelwald", "Lauterbrunnen", "Geneva", "Mürren", "Wengen", "Bern"], // removed Lucerne, added Geneva, Mürren, Wengen, Bern
          pins: [
            { label: "Zurich", lat: 47.3769, lng: 8.5417 },
            { label: "Interlaken", lat: 46.6863, lng: 7.8632 },
            { label: "Grindelwald", lat: 46.6240, lng: 8.0410 },
            { label: "Lauterbrunnen", lat: 46.5930, lng: 7.9090 },
            { label: "Geneva", lat: 46.2044, lng: 6.1432 },
            { label: "Mürren", lat: 46.5622, lng: 7.8926 },
            { label: "Wengen", lat: 46.6065, lng: 7.9226 },
            { label: "Bern", lat: 46.9480, lng: 7.4474 }
          ]
        }
      ]
    },
    {
      iso3: "TZA",
      label: "Tanzania",
      continent: "Africa",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "tza-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Serengeti National Park", "Ngorongoro Crater"],
          pins: [
            { label: "Serengeti National Park", lat: -2.3333, lng: 34.8333 },
            { label: "Ngorongoro Crater", lat: -3.1616, lng: 35.5870 }
          ]
        }
      ]
    },
    {
      iso3: "THA",
      label: "Thailand",
      continent: "Asia",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "tha-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Bangkok", "Chiang Mai", "Chiang Rai", "Phuket", "Ko Yao Noi", "Golden Triangle"], // removed Ayutthaya
          pins: [
            { label: "Bangkok", lat: 13.7563, lng: 100.5018 },
            { label: "Chiang Mai", lat: 18.7883, lng: 98.9853 },
            { label: "Chiang Rai", lat: 19.9105, lng: 99.8406 },
            { label: "Phuket", lat: 7.8804, lng: 98.3923 },
            { label: "Ko Yao Noi", lat: 8.1410, lng: 98.6480 },
            { label: "Golden Triangle (Sop Ruak)", lat: 20.3530, lng: 100.0850 }
          ]
        }
      ]
    },
    {
      iso3: "BHS",
      label: "The Bahamas",
      continent: "North America",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "bhs-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Nassau"],
          pins: [{ label: "Nassau", lat: 25.0443, lng: -77.3504 }]
        }
      ]
    },
    {
      iso3: "TUR",
      label: "Turkey",
      continent: "Asia",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "tur-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Istanbul", "Cappadocia", "Göreme", "Ürgüp", "Uçhisar", "Izmir", "Ephesus"], // added Izmir, Ephesus
          pins: [
            { label: "Istanbul", lat: 41.0082, lng: 28.9784 },
            { label: "Cappadocia", lat: 38.6430, lng: 34.8270 },
            { label: "Göreme", lat: 38.6431, lng: 34.8310 },
            { label: "Ürgüp", lat: 38.6280, lng: 34.9120 },
            { label: "Uçhisar", lat: 38.6310, lng: 34.8059 },
            { label: "Izmir", lat: 38.4192, lng: 27.1287 },
            { label: "Ephesus", lat: 37.9390, lng: 27.3416 }
          ]
        }
      ]
    },
    {
      iso3: "GBR",
      label: "United Kingdom",
      continent: "Europe",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "gbr-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["London", "Edinburgh", "Bath"], // added Bath
          pins: [
            { label: "London", lat: 51.5074, lng: -0.1278 },
            { label: "Edinburgh", lat: 55.9533, lng: -3.1883 },
            { label: "Bath", lat: 51.3758, lng: -2.3599 }
          ]
        }
      ]
    },
    {
      iso3: "USA",
      label: "United States",
      continent: "North America",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "usa-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: [
            "New York City", "Washington DC", "Honolulu", "Albuquerque", "Columbus",
            "Los Angeles", "San Francisco", "San Diego", "Santa Barbara", "Monterey", "Big Sur", "Yosemite", "Malibu", "San Jose", "Death Valley", "Las Vegas", "Pahrump", "Phoenix", "Scottsdale", "Lake Powell", "Salt Lake City", "Santa Fe", "Taos", "Las Cruces", "White Sands", "Roswell", "Carlsbad Caverns", "Ruidoso", "Silver City", "Truth or Consequences", "Elephant Butte", "Farmington", "Española", "Denver", "Boulder", "Colorado Springs", "Durango", "Grand Junction", "Portland", "Seattle", "Bellevue", "Bozeman", "North Fork Salmon River", "Yellowstone", "Dallas", "Austin", "San Antonio", "St. Louis", "Chicago", "Detroit", "Ann Arbor", "Cleveland", "Cincinnati", "Philadelphia", "Long Island", "Niagara Falls", "Boston", "Providence", "New Haven", "Cape Cod", "Baltimore", "Charleston", "Atlanta", "Greensboro", "Miami", "Orlando", "Ocala", "Key West", "Fort Lauderdale", "New Orleans", "Gatlinburg", "Kona", "Hilo", "Lahaina"
          ],
          pins: [
            { label: "New York City", lat: 40.7128, lng: -74.0060 },
            { label: "Washington DC", lat: 38.9072, lng: -77.0369 },
            { label: "Honolulu", lat: 21.3069, lng: -157.8583 },
            { label: "Albuquerque", lat: 35.0844, lng: -106.6504 },
            { label: "Columbus", lat: 39.9612, lng: -82.9988 },
            { label: "Los Angeles", lat: 34.0522, lng: -118.2437 },
            { label: "San Francisco", lat: 37.7749, lng: -122.4194 },
            { label: "San Diego", lat: 32.7157, lng: -117.1611 },
            { label: "Santa Barbara", lat: 34.4208, lng: -119.6982 },
            { label: "Monterey", lat: 36.6002, lng: -121.8947 },
            { label: "Big Sur", lat: 36.3615, lng: -121.8563 },
            { label: "Yosemite", lat: 37.8651, lng: -119.5383 },
            { label: "Malibu", lat: 34.0259, lng: -118.7798 },
            { label: "San Jose", lat: 37.3382, lng: -121.8863 },
            { label: "Death Valley", lat: 36.5323, lng: -116.9325 },
            { label: "Las Vegas", lat: 36.1699, lng: -115.1398 },
            { label: "Pahrump", lat: 36.2083, lng: -116.0089 },
            { label: "Phoenix", lat: 33.4484, lng: -112.0740 },
            { label: "Scottsdale", lat: 33.4942, lng: -111.9261 },
            { label: "Lake Powell", lat: 36.9981, lng: -111.4867 },
            { label: "Salt Lake City", lat: 40.7608, lng: -111.8910 },
            { label: "Santa Fe", lat: 35.6870, lng: -105.9378 },
            { label: "Taos", lat: 36.4072, lng: -105.5731 },
            { label: "Las Cruces", lat: 32.3199, lng: -106.7637 },
            { label: "White Sands", lat: 32.7791, lng: -106.1719 },
            { label: "Roswell", lat: 33.3943, lng: -104.5230 },
            { label: "Carlsbad Caverns", lat: 32.1479, lng: -104.5567 },
            { label: "Ruidoso", lat: 33.3318, lng: -105.6730 },
            { label: "Silver City", lat: 32.7701, lng: -108.2803 },
            { label: "Truth or Consequences", lat: 33.1284, lng: -107.2528 },
            { label: "Elephant Butte", lat: 33.1915, lng: -107.1795 },
            { label: "Farmington", lat: 36.7281, lng: -108.2187 },
            { label: "Española", lat: 35.9917, lng: -106.0817 },
            { label: "Denver", lat: 39.7392, lng: -104.9903 },
            { label: "Boulder", lat: 40.0150, lng: -105.2705 },
            { label: "Colorado Springs", lat: 38.8339, lng: -104.8214 },
            { label: "Durango", lat: 37.2753, lng: -107.8801 },
            { label: "Grand Junction", lat: 39.0639, lng: -108.5506 },
            { label: "Portland", lat: 45.5051, lng: -122.6750 },
            { label: "Seattle", lat: 47.6062, lng: -122.3321 },
            { label: "Bellevue", lat: 47.6104, lng: -122.2007 },
            { label: "Bozeman", lat: 45.6770, lng: -111.0429 },
            { label: "North Fork Salmon River", lat: 45.3870, lng: -113.9980 },
            { label: "Yellowstone", lat: 44.4280, lng: -110.5885 },
            { label: "Dallas", lat: 32.7767, lng: -96.7970 },
            { label: "Austin", lat: 30.2672, lng: -97.7431 },
            { label: "San Antonio", lat: 29.4241, lng: -98.4936 },
            { label: "St. Louis", lat: 38.6270, lng: -90.1994 },
            { label: "Chicago", lat: 41.8781, lng: -87.6298 },
            { label: "Detroit", lat: 42.3314, lng: -83.0458 },
            { label: "Ann Arbor", lat: 42.2808, lng: -83.7430 },
            { label: "Cleveland", lat: 41.4993, lng: -81.6944 },
            { label: "Cincinnati", lat: 39.1031, lng: -84.5120 },
            { label: "Philadelphia", lat: 39.9526, lng: -75.1652 },
            { label: "Long Island", lat: 40.7891, lng: -73.1350 },
            { label: "Niagara Falls", lat: 43.0962, lng: -79.0377 },
            { label: "Boston", lat: 42.3601, lng: -71.0589 },
            { label: "Providence", lat: 41.8240, lng: -71.4128 },
            { label: "New Haven", lat: 41.3083, lng: -72.9279 },
            { label: "Cape Cod", lat: 41.6688, lng: -70.2962 },
            { label: "Baltimore", lat: 39.2904, lng: -76.6122 },
            { label: "Charleston", lat: 32.7765, lng: -79.9311 },
            { label: "Atlanta", lat: 33.7490, lng: -84.3880 },
            { label: "Greensboro", lat: 36.0726, lng: -79.7920 },
            { label: "Miami", lat: 25.7617, lng: -80.1918 },
            { label: "Orlando", lat: 28.5383, lng: -81.3792 },
            { label: "Ocala", lat: 29.1872, lng: -82.1401 },
            { label: "Key West", lat: 24.5551, lng: -81.7800 },
            { label: "Fort Lauderdale", lat: 26.1224, lng: -80.1373 },
            { label: "New Orleans", lat: 29.9511, lng: -90.0715 },
            { label: "Gatlinburg", lat: 35.7143, lng: -83.5102 },
            { label: "Kona", lat: 19.6400, lng: -155.9950 },
            { label: "Hilo", lat: 19.7297, lng: -155.0900 },
            { label: "Lahaina", lat: 20.8783, lng: -156.6825 }
          ]
        }
      ]
    },
    {
      iso3: "ZWE",
      label: "Zimbabwe",
      continent: "Africa",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "zwe-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Victoria Falls", "Livingstone"], // added Livingstone
          pins: [
            { label: "Victoria Falls", lat: -17.9243, lng: 25.8567 },
            { label: "Livingstone", lat: -17.8582, lng: 25.8542 }
          ]
        }
      ]
    },
    {
      iso3: "BWA",
      label: "Botswana",
      continent: "Africa",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "bwa-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Okavango Delta"],
          pins: [
            { label: "Okavango Delta", lat: -19.5, lng: 22.5 }
          ]
        }
      ]
    },
    {
      iso3: "ABW",
      label: "Aruba",
      continent: "North America",
      highlight: "visited",
      notes: "",
      trips: [
        {
          id: "abw-trip-1",
          label: "",
          when: "",
          link: "",
          coverImg: "",
          cities: ["Oranjestad"],
          pins: [{ label: "Oranjestad", lat: 12.5246, lng: -70.0270 }]
        }
      ]
    }
  ],
  settings: {
  defaultView: "globe",
colors: {
  baseLand: "#1e1e1e",     // dark asphalt gray for continents
  baseOcean: "#030617",    // deep space navy
  visited: "#a37621ff",      // vivid cool blue (LED-like)
  hover: "#33965cff",        // pale neon blue when hovered
  border: "#ffffffff",       // near-black subtle outline
pin: "#ca5656ff", // light cyan — looks like digital LEDs
},

  globe: {
    autoRotate: true,
    autoRotateSpeed: 0.4
  }
}
};

export default seed;
