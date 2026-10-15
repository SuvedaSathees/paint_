/**
 * Store contact details & branch list — the single source of truth used by the
 * Contact and Branches pages. Update the real phone numbers, addresses, hours
 * and Google Maps links here and both pages pick them up.
 */

export const STORE_PHONE = {
  display: "+91 94437 22255",
  tel: "+919443722255",
  whatsapp: "919443722255",
};

export const STORE_EMAIL = "info@aksharapaints.in";

export const whatsappLink = (text: string) =>
  `https://wa.me/${STORE_PHONE.whatsapp}?text=${encodeURIComponent(text)}`;

/** Builds a keyless Google Maps embed URL for a place or address. */
const mapEmbed = (query: string) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;

export type StoreHours = { days: string; time: string };

export type StoreBranch = {
  id: string;
  name: string;
  /** Short description of what the branch is for. */
  kind: string;
  image: string;
  /** Full address shown on the pages. */
  address: string;
  /** One-line area, used where space is tight. */
  area: string;
  hours: StoreHours[];
  /** Hours in schema.org format, e.g. "Mo-Sa 08:30-20:30". */
  openingHours: string[];
  mapUrl: string;
  /** Google Maps embed (no API key needed) for showing the branch on a small map. */
  mapEmbedUrl: string;
  schema: {
    type: "PaintStore" | "HardwareStore";
    streetAddress: string;
    locality: string;
    postalCode: string;
    lat: number;
    lng: number;
  };
};

export const BRANCHES: StoreBranch[] = [
  {
    id: "flagship",
    name: "Flagship Showroom & Colour Lab",
    kind: "Showroom & colour tinting",
    image: "/branch-flagship.jpg",
    address: "Plot 42, Highway Bypass Road, Opp. Collectorate Ring, Erode – 638002",
    area: "Bypass Road, Erode",
    hours: [
      { days: "Mon – Sat", time: "8:30 AM – 8:30 PM" },
      { days: "Sunday", time: "9:00 AM – 2:00 PM" },
    ],
    openingHours: ["Mo-Sa 08:30-20:30", "Su 09:00-14:00"],
    mapUrl: "https://maps.google.com/?q=Akshara+Paints+and+Hardware+Erode",
    mapEmbedUrl: mapEmbed("Highway Bypass Road, Collectorate, Erode 638002"),
    schema: {
      type: "PaintStore",
      streetAddress: "Plot 42, Highway Bypass Road, Opp. Collectorate Ring",
      locality: "Erode",
      postalCode: "638002",
      lat: 11.3424,
      lng: 77.7272,
    },
  },
  {
    id: "depot",
    name: "Industrial Conduit & Hardware Depot",
    kind: "Wholesale & bulk site supply",
    image: "/branch-depot.jpg",
    address: "Shed 18-B, SIPCOT Industrial Phase II, Logistics Hub Road, Perundurai, Erode – 638052",
    area: "SIPCOT Phase II, Perundurai",
    hours: [
      { days: "Mon – Sat", time: "8:00 AM – 7:30 PM" },
      { days: "Sunday", time: "Closed" },
    ],
    openingHours: ["Mo-Sa 08:00-19:30"],
    mapUrl: "https://maps.google.com/?q=Akshara+Industrial+Hardware+Depot+Erode",
    mapEmbedUrl: mapEmbed("SIPCOT Industrial Growth Centre, Perundurai, Erode 638052"),
    schema: {
      type: "HardwareStore",
      streetAddress: "Shed 18-B, SIPCOT Industrial Phase II, Logistics Hub Road",
      locality: "Perundurai, Erode",
      postalCode: "638052",
      lat: 11.278,
      lng: 77.584,
    },
  },
  {
    id: "express",
    name: "Market Square Express Outlet",
    kind: "Quick counter in the city centre",
    image: "/branch-express.jpg",
    address: "Shop 7 & 8, Old Market Square, Near Central Clock Tower, Agraharam, Erode – 638001",
    area: "Old Market Square, Erode",
    hours: [{ days: "Every day", time: "9:00 AM – 9:00 PM" }],
    openingHours: ["Mo-Su 09:00-21:00"],
    mapUrl: "https://maps.google.com/?q=Akshara+Paints+Market+Square+Erode",
    mapEmbedUrl: mapEmbed("Clock Tower, Agraharam, Erode 638001"),
    schema: {
      type: "HardwareStore",
      streetAddress: "Shop 7 & 8, Old Market Square, Near Central Clock Tower, Agraharam",
      locality: "Erode",
      postalCode: "638001",
      lat: 11.341,
      lng: 77.717,
    },
  },
];

export const MAIN_BRANCH = BRANCHES[0];
