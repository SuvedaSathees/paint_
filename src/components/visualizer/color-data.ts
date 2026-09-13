export interface PaintColor {
  id: string;
  name: string;
  code: string;
  hex: string;
  category: "interior" | "exterior" | "accents" | "neutrals" | "pastels";
  sheen: "Matte" | "Satin" | "Silk Sheen" | "High Gloss";
  product: string;
  description: string;
}

export interface SampleRoom {
  id: string;
  name: string;
  category: "Living Room" | "Bedroom" | "Dining & Kitchen" | "Exterior";
  image: string;
  description: string;
}

export const SAMPLE_ROOMS: SampleRoom[] = [
  {
    id: "living-minimalist",
    name: "Modern Minimalist Living",
    category: "Living Room",
    image: "/room-linen.jpg",
    description: "Sunlit open living space with soft natural daylight.",
  },
  {
    id: "living-classic",
    name: "Classic Family Lounge",
    category: "Living Room",
    image: "/akshara-before-room.jpg",
    description: "Standard residential room with neutral wall textures.",
  },
  {
    id: "bedroom-serene",
    name: "Serene Master Bedroom",
    category: "Bedroom",
    image: "/room-sage.jpg",
    description: "Cozy bedroom with ambient lighting and trim accents.",
  },
  {
    id: "suite-contemporary",
    name: "Contemporary Suite",
    category: "Bedroom",
    image: "/room-slate.jpg",
    description: "Modern architectural interior with deep focal wall.",
  },
  {
    id: "dining-warm",
    name: "Warm Dining Space",
    category: "Dining & Kitchen",
    image: "/room-terracotta.jpg",
    description: "Warm-toned dining area with soft daylight reflections.",
  },
  {
    id: "study-ocean",
    name: "Executive Study & Lounge",
    category: "Living Room",
    image: "/room-ocean.jpg",
    description: "Crisp architectural room ideal for bold accent walls.",
  },
];

export const BIRLA_OPUS_COLORS: PaintColor[] = [
  // Neutrals & Whites
  {
    id: "bo-linen-white",
    name: "Silk Linen",
    code: "BO-1002",
    hex: "#F5F3ED",
    category: "neutrals",
    sheen: "Silk Sheen",
    product: "Calista Luxury Interior",
    description: "Soft warm white with understated silk undertones.",
  },
  {
    id: "bo-antique-ivory",
    name: "Antique Ivory",
    code: "BO-1014",
    hex: "#F0EAD6",
    category: "neutrals",
    sheen: "Matte",
    product: "Style Rich Interior Emulsion",
    description: "Classic rich ivory reflecting ambient warmth.",
  },
  {
    id: "bo-cloud-pearl",
    name: "Cloud Pearl",
    code: "BO-1028",
    hex: "#E8E9EA",
    category: "neutrals",
    sheen: "Satin",
    product: "Calista Luxury Interior",
    description: "Modern cool neutral that maximizes interior brightness.",
  },
  {
    id: "bo-ash-stone",
    name: "Erode Ash",
    code: "BO-1045",
    hex: "#C2C6C9",
    category: "neutrals",
    sheen: "Matte",
    product: "AllWood / Calista Interior",
    description: "Sophisticated mineral grey with architectural depth.",
  },

  // Interior Living & Bedroom
  {
    id: "bo-tuscan-sun",
    name: "Tuscan Ochre",
    code: "BO-2041",
    hex: "#E59B38",
    category: "interior",
    sheen: "Silk Sheen",
    product: "Calista Luxury Interior",
    description: "Warm golden architectural tone inspired by Tuscan villas.",
  },
  {
    id: "bo-warm-terracotta",
    name: "Erode Terracotta",
    code: "BO-2058",
    hex: "#C86D51",
    category: "interior",
    sheen: "Matte",
    product: "Calista Luxury Interior",
    description: "Earthy artisan clay hue creating inviting, cozy spaces.",
  },
  {
    id: "bo-velvet-rose",
    name: "Velvet Blush",
    code: "BO-2074",
    hex: "#D88B87",
    category: "interior",
    sheen: "Silk Sheen",
    product: "Calista Luxury Interior",
    description: "Refined pastel rose with soothing ambient warmth.",
  },
  {
    id: "bo-sage-harmony",
    name: "Meadow Sage",
    code: "BO-2112",
    hex: "#8FA38D",
    category: "interior",
    sheen: "Matte",
    product: "Style Rich Interior",
    description: "Calming botanical green that bridges indoor and outdoor living.",
  },
  {
    id: "bo-olive-grove",
    name: "Olive Canopy",
    code: "BO-2125",
    hex: "#6B7B58",
    category: "interior",
    sheen: "Satin",
    product: "Calista Luxury Interior",
    description: "Deep organic olive green perfect for nature-inspired rooms.",
  },

  // Deep Accents
  {
    id: "bo-emerald-rich",
    name: "Emerald Sanctuary",
    code: "BO-3015",
    hex: "#05603A",
    category: "accents",
    sheen: "Silk Sheen",
    product: "Calista Luxury Interior",
    description: "Signature Akshara deep emerald with royal jewel lustre.",
  },
  {
    id: "bo-sapphire-night",
    name: "Midnight Sapphire",
    code: "BO-3042",
    hex: "#1B365D",
    category: "accents",
    sheen: "Silk Sheen",
    product: "Calista Luxury Interior",
    description: "Commanding deep navy blue creating majestic feature walls.",
  },
  {
    id: "bo-royal-indigo",
    name: "Imperial Indigo",
    code: "BO-3068",
    hex: "#2D2F54",
    category: "accents",
    sheen: "Matte",
    product: "Style Rich Interior",
    description: "Moody twilight indigo with dramatic contemporary presence.",
  },
  {
    id: "bo-obsidian-charcoal",
    name: "Obsidian Slate",
    code: "BO-3090",
    hex: "#2B303A",
    category: "accents",
    sheen: "Matte",
    product: "Calista Luxury Interior",
    description: "Ultra-modern architectural graphite for bold statements.",
  },
  {
    id: "bo-crimson-dusk",
    name: "Heritage Maroon",
    code: "BO-3104",
    hex: "#7E2A34",
    category: "accents",
    sheen: "Satin",
    product: "Calista Luxury Interior",
    description: "Regal burgundy with opulent warmth and richness.",
  },

  // Pastels & Refreshing Tones
  {
    id: "bo-coastal-mist",
    name: "Coastal Breeze",
    code: "BO-4012",
    hex: "#9AB5C1",
    category: "pastels",
    sheen: "Silk Sheen",
    product: "Calista Luxury Interior",
    description: "Airy marine blue that expands compact rooms visually.",
  },
  {
    id: "bo-morning-lavender",
    name: "Lilac Mist",
    code: "BO-4034",
    hex: "#C4BDD4",
    category: "pastels",
    sheen: "Matte",
    product: "Style Rich Interior",
    description: "Gentle serene violet with soft light-diffusing pigment.",
  },
  {
    id: "bo-butter-cream",
    name: "Warm Daffodil",
    code: "BO-4061",
    hex: "#F4D37A",
    category: "pastels",
    sheen: "Silk Sheen",
    product: "Style Rich Interior",
    description: "Cheerful luminous yellow bringing bright sunshine indoors.",
  },
  {
    id: "bo-mint-sorbet",
    name: "Crisp Spearmint",
    code: "BO-4082",
    hex: "#A8D5C1",
    category: "pastels",
    sheen: "Satin",
    product: "Calista Luxury Interior",
    description: "Invigorating fresh mint tone for modern kitchens & baths.",
  },

  // Exterior Weatherproof
  {
    id: "bo-granite-shield",
    name: "Perundurai Granite",
    code: "BO-5011",
    hex: "#7A8288",
    category: "exterior",
    sheen: "Matte",
    product: "Aura WeatherDefense Exterior",
    description: "Durable mineral stone hue engineered for harsh sunlight.",
  },
  {
    id: "bo-sandstone-monsoon",
    name: "Bhavani Sandstone",
    code: "BO-5029",
    hex: "#C9B596",
    category: "exterior",
    sheen: "Matte",
    product: "Aura WeatherDefense Exterior",
    description: "Classic South Indian architectural sandstone facade.",
  },
  {
    id: "bo-adobe-dusk",
    name: "Adobe Rust",
    code: "BO-5047",
    hex: "#9E4734",
    category: "exterior",
    sheen: "Matte",
    product: "Aura WeatherDefense Exterior",
    description: "Heavy-duty exterior terracotta resistant to UV fading.",
  },
  {
    id: "bo-kaveri-clay",
    name: "Kaveri Earth",
    code: "BO-5063",
    hex: "#8C6A53",
    category: "exterior",
    sheen: "Matte",
    product: "Aura WeatherDefense Exterior",
    description: "Natural riverbank clay hue for timeless exterior elevations.",
  },
];
