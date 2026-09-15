import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Search,
  User,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Phone,
  Share2,
  Sparkles,
  Droplets,
  Quote,
  Bookmark,
  Copy,
  Check,
  FileText,
  SlidersHorizontal,
  Info,
} from "lucide-react";

type BlogCategory = "all" | "paints" | "pipes" | "fasteners";

interface ArticleSection {
  heading: string;
  body: string;
}

interface Article {
  id: string;
  title: string;
  category: "paints" | "pipes" | "fasteners";
  categoryLabel: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  image: string;
  summary: string;
  tags: string[];
  featured?: boolean;
  sections: ArticleSection[];
  keyTakeaway: string;
}

const articlesData: Article[] = [
  {
    id: "birla-opus-sheen-guide",
    title: "Birla Opus Sheen Spectrum: Selecting Matte, Satin & High-Gloss for Tropical Indian Climates",
    category: "paints",
    categoryLabel: "BIRLA OPUS GUIDE",
    readTime: "5 min read",
    date: "September 8, 2026",
    author: "S. Rathinam",
    authorRole: "Head of Color Studio",
    image: "/room-sage.jpg",
    summary:
      "A scientific breakdown of light reflectance values (LRV), scrub resistance, and mildew inhibition across Birla Opus interior and exterior collections. Learn which formula prevents monsoon fungus and scuffing in high-traffic halls.",
    tags: ["Birla Opus", "Emulsion Science", "Interior Styling"],
    featured: true,
    keyTakeaway:
      "For living rooms with direct south-facing sunlight, satin finishes balance soft diffuse reflection with 80+ scrub cycles, whereas matte is strictly reserved for ceiling plaster.",
    sections: [
      {
        heading: "The Physics of Sheen vs Scrub Resistance",
        body: "Sheen is governed by the pigment volume concentration (PVC) ratio against acrylic binders. While dead-matte hides minor plaster undulations, its microscopic surface roughness traps oil stains. Birla Opus Satin introduces a cross-linked polymer film that allows over 80 scrub cycles without burnishing or loss of tint vibrancy.",
      },
      {
        heading: "Tropical Humidity & Anti-Fungal Additives",
        body: "During coastal and monsoon cycles, condensation forms on north-facing internal walls. Standard emulsions develop black mould within 12 months. Birla Opus formulations integrate encapsulated biocide chemistry that activates only in the presence of humidity, neutralizing spore germination without leaching toxins into indoor air.",
      },
      {
        heading: "The Recommended Room-by-Room Matrix",
        body: "• Living Rooms & Foyers: Birla Opus Luxury Satin (40% Sheen) for easy damp cloth cleaning.\n• Master Bedrooms: Soft Silk Matte (15% Sheen) for glare-free artificial warm LED lighting.\n• Kitchens & Bath Ceilings: High-Scrub Acrylic Enamel with maximum moisture barrier polymers.",
      },
    ],
  },
  {
    id: "conduit-pvc-vs-metal",
    title: "Rigid PVC vs GI Metal Conduits: Standards, Fire Ratings & When to Use Each (IS:9537)",
    category: "pipes",
    categoryLabel: "ELECTRICAL SAFETY",
    readTime: "6 min read",
    date: "August 28, 2026",
    author: "M. Karthik",
    authorRole: "Senior Electrical Consultant",
    image: "/product-pipes.jpg",
    summary:
      "Understand the Indian electrical safety codes for ceiling slab casting, concealed brick chasing, and exposed industrial wiring. Key differences in mechanical impact resistance and chemical corrosion.",
    tags: ["IS:9537 Standard", "Rigid PVC", "Industrial GI"],
    keyTakeaway:
      "Heavy-duty rigid PVC with FRLS (Fire Retardant Low Smoke) is the gold standard for concrete slab embedment, while galvanized iron is legally required in commercial boiler rooms and exposed parking decks.",
    sections: [
      {
        heading: "Slab Embedment Stress Factors",
        body: "During RCC slab casting, concrete slurry exerts tremendous hydrostatic and mechanical shock. Medium-gauge conduits can flatten under worker foot traffic and vibrator needles, causing wire-pull jams. Akshara stocks heavy-duty IS:9537 Part 3 PVC conduits with certified 1250N compression resistance.",
      },
      {
        heading: "Fire Safety: Zero-Halogen & Low Smoke Evolution",
        body: "In residential fires, toxic smoke causes more fatalities than direct flames. FRLS conduits self-extinguish within 30 seconds of open flame removal and generate minimal dense acidic fumes, preserving optical visibility in emergency stairwells.",
      },
      {
        heading: "When GI Metal Conduit is Mandated",
        body: "Exposed runs subject to vehicle impact (parking basements, industrial machine shops, lift shafts) demand hot-dip galvanized steel conduit with continuous earth ground continuity to prevent dangerous fault voltage leaks.",
      },
    ],
  },
  {
    id: "bolt-grades-explained",
    title: "High-Tensile Bolt Grades: Grade 8.8 vs 10.9 vs Stainless 304 in Structural Framing",
    category: "fasteners",
    categoryLabel: "STRUCTURAL HARDWARE",
    readTime: "7 min read",
    date: "August 10, 2026",
    author: "P. Ramesh",
    authorRole: "Fastener Lab Specialist",
    image: "/product-bolts.jpg",
    summary:
      "Never guess structural fastener integrity. We break down proof load ratings, yield strengths, torque calculations, and the proper selection between zinc plating versus hot-dip galvanizing for industrial sites.",
    tags: ["Grade 8.8", "High-Tensile", "Torque Specs"],
    keyTakeaway:
      "Grade 8.8 medium-carbon quenched steel is standard for structural I-beams, while Grade 10.9 alloy steel is essential for dynamic heavy crane gantry connections.",
    sections: [
      {
        heading: "Decoding the Two Numbers on Bolt Heads",
        body: "In Grade 8.8, the first digit represents 800 MPa minimum ultimate tensile strength. The second digit (.8) signifies that the yield point occurs at 80% of tensile strength (640 MPa). Grade 10.9 provides 1000 MPa tensile strength with a 900 MPa yield threshold.",
      },
      {
        heading: "The Danger of Hydrogen Embrittlement in Plating",
        body: "When high-tensile bolts (especially Grade 10.9) are electro-galvanized, atomic hydrogen can diffuse into the steel lattice, leading to spontaneous catastrophic brittle failure under static tension. Akshara mandates de-embrittlement baking for all structural stock.",
      },
      {
        heading: "Hot-Dip Galvanizing (HDG) for Industrial Longevity",
        body: "For outdoor structural trusses exposed to tropical rainfall, a 65-micron hot-dip galvanized coating forms metallurgical iron-zinc alloy layers that provide cathodic sacrificial protection for over 25 years.",
      },
    ],
  },
  {
    id: "waterproofing-elastomeric-membranes",
    title: "Elastomeric PU vs Acrylic Waterproofing: Crack-Bridging Physics for Monsoon Terraces",
    category: "paints",
    categoryLabel: "WATERPROOFING SCIENCE",
    readTime: "6 min read",
    date: "August 28, 2026",
    author: "M. Selvakumar",
    authorRole: "Senior Waterproofing Consultant",
    image: "/product-waterproofing.jpg",
    summary:
      "Understand polymer elongation, tensile recovery, and UV solar reflectance across polyurethane and acrylic elastomeric membranes for flat RCC roof slabs in South India.",
    tags: ["PU Waterproofing", "Elastomeric Membrane", "Crack Bridging", "RCC Terraces"],
    keyTakeaway:
      "Acrylic membranes excel in UV reflectivity but fail under standing ponding water; polyurethane (PU) hybrid polymers are mandatory for flat RCC terraces subject to monsoonal water stagnation.",
    sections: [
      {
        heading: "Crack-Bridging Dynamics Across Thermal Cycles",
        body: "During May heatwaves in Tamil Nadu, RCC slab surface temperatures exceed 55°C, contracting violently during evening thunderstorms. Standard cementitious slurries possess zero elongation and rupture within one summer. Elastomeric membranes must achieve at least 300% elongation at break under ASTM D412 to bridge hairline slab micro-cracks without shearing.",
      },
      {
        heading: "Resistance to Standing Water & Hydrostatic Ponding",
        body: "Waterproofing failure on Indian rooftops typically occurs at low-gradient drainage gutters. Acrylic polymers undergo polymer hydrolysis when submerged under standing ponding water for longer than 72 hours. Aliphatic polyurethane systems form a non-hydrolyzable cross-linked matrix that resists permanent immersion.",
      },
      {
        heading: "Surface Priming & Geotextile Mesh Protocol",
        body: "• Parapet Wall Fillets: 45-degree angle coving reinforced with 50 GSM non-woven glass-fibre geotextile.\n• Penetration Points: Dual coats of high-solids primer around PVC rainwater drain spouts.\n• Expansion Joints: Polysulphide or MS polymer elastomeric sealant backed by closed-cell polyethylene foam rods.",
      },
    ],
  },
  {
    id: "roller-nap-selection-guide",
    title: "Microfiber vs Polyamide Roller Naps: Eliminating Orange-Peel Texture on Luxury Enamels",
    category: "paints",
    categoryLabel: "APPLICATOR TOOLS",
    readTime: "5 min read",
    date: "August 18, 2026",
    author: "S. Rathinam",
    authorRole: "Head of Color Studio",
    image: "/product-rollers.jpg",
    summary:
      "A master guide to roller core diameters, pile heights (4mm to 18mm), and yarn compositions. Achieve mirror-smooth gloss and zero-splatter emulsion distribution across skim-coated interior walls.",
    tags: ["Roller Naps", "Microfiber", "Paint Applicators", "Orange Peel"],
    keyTakeaway:
      "For low-viscosity Birla Opus luxury emulsions on level-5 putty, high-density 8mm micro-fiber weaves prevent micro-bubbles and orange-peel stippling better than conventional long-pile knitted rollers.",
    sections: [
      {
        heading: "The Fluid Dynamics of Paint Release & Stipple",
        body: "Orange-peel stipple is caused when roller yarn fibers release emulsion droplets unevenly across the paint film. Low-density polyester fabrics create heavy surface drag and turbulent shear. Woven micro-fiber loops hold emulsion through capillary suction and lay down a uniform wet film thickness (WFT) of 75 microns.",
      },
      {
        heading: "Matching Pile Height to Plaster Texture",
        body: "Using a 12mm or 18mm nap on super-smooth gypsum plaster forces excessive paint accumulation into wave-like ridges. Conversely, using a 4mm short nap on sand-faced cement plaster leaves pinholes and unpainted valleys. The applicator must calibrate pile thickness strictly against the surface roughness class.",
      },
      {
        heading: "Core Construction & Solvent Durability",
        body: "• 4mm to 6mm Ultra-Short Weave: High-gloss solvent-borne enamels and epoxy coatings on smooth metal and wood.\n• 8mm to 10mm Woven Microfiber: Premium Birla Opus interior emulsions on lime or gypsum-skimmed plaster.\n• 14mm to 18mm Knitted Polyamide: Exterior heavy-texture acrylic weather-shields and rough brick masonry.",
      },
    ],
  },
  {
    id: "cpvc-vs-upvc-plumbing-codes",
    title: "CPVC vs UPVC Pressure Pipes: Thermal Expansion, Pressure Ratings & Solvent Cementing (IS:15778)",
    category: "pipes",
    categoryLabel: "PLUMBING HYDRAULICS",
    readTime: "7 min read",
    date: "August 02, 2026",
    author: "A. Senthil Kumar",
    authorRole: "Industrial Piping Systems Lead",
    image: "/product-pipes.jpg",
    summary:
      "An engineering comparison of Chlorinated Polyvinyl Chloride (CPVC) versus Unplasticized PVC (UPVC). Learn how temperature derating curves impact solar water heater lines and concealed bathroom risers.",
    tags: ["CPVC", "UPVC", "Plumbing Codes", "IS:15778", "Solvent Weld"],
    keyTakeaway:
      "Standard UPVC loses 60% of its hoop strength above 45°C and must never be piped to solar geysers; SDR 11 CPVC rated to 93°C is mandatory for all domestic hot-water distribution.",
    sections: [
      {
        heading: "Chlorine Molecular Structure & Heat Distortion",
        body: "CPVC is produced by post-chlorinating UPVC resin, increasing chlorine content from 56.7% to approximately 67%. This extra chlorination elevates the glass transition temperature from 80°C to 115°C. At 82°C (the typical discharge temperature of rooftop solar water tanks), UPVC undergoes thermal plastic deformation, while CPVC retains full hydrostatic design pressure.",
      },
      {
        heading: "Chemical Solvent Fusion Chemistry",
        body: "Unlike mechanical threading or push-fit O-rings, solvent welding is not an adhesive glue; it is a molecular chemical cold weld. The primers soften the pipe walls, allowing dissolved polymer chains from the solvent cement to interlock. When the volatile tetrahydrofuran (THF) evaporates, the joint achieves higher burst strength than the pipe itself.",
      },
      {
        heading: "Pressure Derating & Pipe Sizing Matrix",
        body: "• Solar Geyser Inlet/Outlet: SDR 11 CPVC (28.4 kg/cm² @ 23°C, derated to 7.1 kg/cm² @ 82°C).\n• Concealed Bathroom Cold Riser: Schedule 40 UPVC (Class 3 / Class 4) with zero chemical leaching.\n• Outdoor Underground Mains: Heavy-duty Ring-fit UPVC with EPDM elastomeric sealing rings.",
      },
    ],
  },
  {
    id: "underground-electrical-ducting-standards",
    title: "Underground HDPE vs DWC Corrugated Conduits: Soil Loading, Bending Radii & Cable Pulling",
    category: "pipes",
    categoryLabel: "CONDUIT INFRASTRUCTURE",
    readTime: "6 min read",
    date: "July 22, 2026",
    author: "K. Mohanraj",
    authorRole: "Electrical Systems Engineer",
    image: "/product-hardware.jpg",
    summary:
      "Compare Double Wall Corrugated (DWC) HDPE ducts with solid-wall PVC for buried commercial feeder cables. Understand crush resistance (kN/m²), trench bedding, and lubrication to prevent cable jacket friction.",
    tags: ["DWC HDPE", "Cable Ducting", "Underground Electrical", "Soil Load"],
    keyTakeaway:
      "DWC pipes combine a corrugated outer profile for soil load resistance with a glass-smooth inner wall that cuts cable pulling friction by 50% compared to conventional concrete hume pipes.",
    sections: [
      {
        heading: "Static Soil Weight & Dynamic Wheel Load Absorption",
        body: "Under industrial factory access roads and commercial parking driveways, buried ducts encounter both static backfill pressure and axle wheel impact forces. DWC (Double Wall Corrugated) ducts distribute dynamic wheel loads across annular corrugation ribs, achieving ring stiffness ratings exceeding 450 kN/m² without crushing.",
      },
      {
        heading: "Cable Pulling Tension & Friction Coefficients",
        body: "During long feeder runs (exceeding 80 meters between inspection hand-holes), cable jacket friction against rough conduit walls can exceed copper conductor tensile limits. DWC conduits feature a co-extruded smooth inner liner made of virgin PE with an ultra-low friction coefficient (µ < 0.25).",
      },
      {
        heading: "Installation & Trench Bedding Protocol",
        body: "• Trench Depth: 900mm below finished road level, with 100mm stone-dust or screened sand cushioning.\n• Bending Radius: Maintain at least 15 times the conduit outside diameter to prevent cable pinch.\n• Warning Tape: Bury yellow 'Caution: High Voltage Electrical Line' warning tape 300mm above duct.",
      },
    ],
  },
  {
    id: "chemical-anchoring-vs-mechanical-wedge",
    title: "Chemical Resin Anchors vs Mechanical Wedge Bolts: Static & Seismic Shear in Cracked Concrete",
    category: "fasteners",
    categoryLabel: "STRUCTURAL FASTENERS",
    readTime: "7 min read",
    date: "July 10, 2026",
    author: "P. Ramesh",
    authorRole: "Fastener Lab Specialist",
    image: "/product-threaded-rods.jpg",
    summary:
      "When should you specify pure epoxy and vinyl-ester injectable resins over standard steel wedge anchor bolts? An engineering analysis of edge distances, expansion stress, and cracked concrete shear.",
    tags: ["Chemical Anchoring", "Pure Epoxy", "Wedge Anchors", "Cracked Concrete"],
    keyTakeaway:
      "Near concrete edges (less than 5x bolt diameter) or in cracked tension zones, expansion wedge anchors generate outward bursting stress; stress-free chemical resin capsules are strictly required.",
    sections: [
      {
        heading: "Expansion Stress vs Stress-Free Adhesive Bonding",
        body: "Mechanical wedge anchors function by driving a tapered expansion cone into a steel collar, generating extreme radial pressure against the borehole wall. If placed close to a concrete column edge, this radial bursting stress shears the concrete corner. Chemical injectable resins (pure epoxy and vinylester) bond along the entire hole length without exerting internal expansion stress.",
      },
      {
        heading: "Performance in Cracked Concrete (Tension Zones)",
        body: "Ceiling slabs and underside beam flanges exist in permanent flexural tension, developing microscopic hairline cracks (up to 0.3mm) during service loading. Standard mechanical anchors slip as cracks open. ETA-approved pure epoxy chemical anchors flow into surface micro-pores, maintaining pull-out load integrity.",
      },
      {
        heading: "Structural Anchoring Selection Protocol",
        body: "• Heavy Structural Columns: Injection Pure Epoxy Resin with Grade 8.8 / 10.9 Zinc-Flake Threaded Studs.\n• Intermediate Suspended HVAC: Through-Bolt Wedge Anchors with certified expansion torque verification.\n• Brick Masonry & Hollow Blocks: Perforated Nylon Sleeves filled with quick-cure styrene-free vinylester.",
      },
    ],
  },
  {
    id: "stainless-fasteners-galling-prevention",
    title: "Stainless Steel 304 vs 316 Fasteners: Preventing Thread Galling & Cold Welding During High-Torque Tightening",
    category: "fasteners",
    categoryLabel: "METALLURGY & TORQUE",
    readTime: "5 min read",
    date: "June 25, 2026",
    author: "P. Ramesh",
    authorRole: "Fastener Lab Specialist",
    image: "/product-building.jpg",
    summary:
      "Discover why stainless steel nuts seize instantaneously onto bolts during power-tool installation, and learn the metallurgy of anti-seize lubricants, molybdenum disulfide coatings, and 316 marine pitting resistance.",
    tags: ["Stainless 316", "Thread Galling", "Cold Welding", "Anti-Seize"],
    keyTakeaway:
      "Stainless steel fasteners form a microscopic chromium oxide passivation film that rubs off under friction; without nickel-based anti-seize paste, high-speed impact drivers cause instantaneous cold-weld thread galling.",
    sections: [
      {
        heading: "The Metallurgy of Thread Galling (Cold Welding)",
        body: "Stainless steel resists corrosion because chromium atoms react with atmospheric oxygen to form a 2-nanometer protective oxide barrier. When a stainless nut is spun rapidly onto a stainless bolt under pressure, metal-to-metal friction strips this oxide film away. The bare austenitic crystals shear together, fusing into a single solid piece of steel in fractions of a second.",
      },
      {
        heading: "Selecting SS 304 (A2) vs Marine SS 316 (A4)",
        body: "Grade 304 (18% Cr, 8% Ni) provides excellent protection in urban and semi-industrial environments. However, in proximity to dye effluent plants in Erode or salt-air coastal zones, chlorine ions penetrate 304, causing pitting corrosion. Grade 316 adds 2.5% Molybdenum, which increases the Pitting Resistance Equivalent Number (PREN) above 25.",
      },
      {
        heading: "Torque Tightening & Prevention Best Practices",
        body: "• Installation Speed: Limit power driver speed to below 150 RPM; never use high-impact impact wrenches on stainless.\n• Anti-Seize Paste: Apply nickel or copper-flake colloidal paste along the entire engaged thread length.\n• Material Pairing: Specify silicone-bronze or brass nuts on stainless studs where disassemblability is critical.",
      },
    ],
  },
];

interface BlogSearch {
  article?: string;
}

export const Route = createFileRoute("/blog")({
  validateSearch: (search: Record<string, unknown>): BlogSearch => ({
    article: typeof search.article === "string" ? search.article : undefined,
  }),
  loader: ({ search }) => ({
    articleId: typeof search?.article === "string" ? search.article : undefined,
  }),
  head: ({ search }) => {
    const article = search?.article
      ? articlesData.find((a) => a.id === search.article)
      : null;

    const pageTitle = article
      ? `${article.title} | Akshara Paints & Hardware`
      : "Knowledge & Technical Insights | Birla Opus & Hardware Guides | Akshara Paints";

    const pageDescription = article
      ? article.summary
      : "Expert engineering guides on Birla Opus paint formulations, electrical conduit piping standards (IS:9537), and structural bolt engineering from Akshara Paints in Erode.";

    const pageUrl = article
      ? `https://aksharapaints.in/blog?article=${article.id}`
      : "https://aksharapaints.in/blog";

    const pageImage = article
      ? `https://aksharapaints.in${article.image}`
      : "https://aksharapaints.in/room-sage.jpg";

    const articleSchema = article
      ? {
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: article.title,
          description: article.summary,
          image: pageImage,
          datePublished: "2026-08-15T09:00:00+05:30",
          dateModified: "2026-09-08T10:30:00+05:30",
          author: {
            "@type": "Person",
            name: article.author,
            jobTitle: article.authorRole,
            worksFor: {
              "@type": "Organization",
              name: "Akshara Paints & Hardware",
            },
          },
          publisher: {
            "@type": "Organization",
            name: "Akshara Paints & Hardware",
            logo: {
              "@type": "ImageObject",
              url: "https://aksharapaints.in/favicon.svg",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": pageUrl,
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Akshara Paints & Hardware Knowledge Library",
          description: pageDescription,
          url: pageUrl,
          publisher: {
            "@type": "Organization",
            name: "Akshara Paints & Hardware",
          },
        };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://aksharapaints.in/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Knowledge & Insights",
          item: "https://aksharapaints.in/blog",
        },
        ...(article
          ? [
              {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: pageUrl,
              },
            ]
          : []),
      ],
    };

    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDescription },
        {
          name: "keywords",
          content:
            "Birla Opus paint guide, rigid PVC conduit IS 9537, high tensile bolt grade 8.8 10.9, paint shop Erode, paint sheen guide, Akshara paints blog",
        },
        { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDescription },
        { property: "og:type", content: article ? "article" : "website" },
        { property: "og:url", content: pageUrl },
        { property: "og:image", content: pageImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "675" },
        { property: "og:image:alt", content: article ? article.title : "Akshara Technical Journal" },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: pageTitle },
        { name: "twitter:description", content: pageDescription },
        { name: "twitter:image", content: pageImage },
      ],
      links: [{ rel: "canonical", href: pageUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(articleSchema),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbSchema),
        },
      ],
    };
  },
  component: BlogPage,
});

/**
 * Article Technical Factsheets & Specialist Field Tips
 */
const articleFactsheets: Record<
  string,
  {
    specs: { label: string; value: string }[];
    tipAuthor: string;
    tipRole: string;
    tipText: string;
  }
> = {
  "birla-opus-sheen-guide": {
    specs: [
      { label: "Polymer Base", value: "100% Pure Acrylic Cross-Linked" },
      { label: "Scrub Standard", value: "80+ Cycles (ASTM D2486 / IS:15489)" },
      { label: "Anti-Mildew", value: "Encapsulated Biocide V-200" },
      { label: "Coverage", value: "120–140 sq.ft / Litre (2 coats)" },
      { label: "VOC Content", value: "Ultra-Low (< 15 g/L)" },
      { label: "Recoat Window", value: "4 Hours @ 30°C" },
    ],
    tipAuthor: "S. Rathinam",
    tipRole: "Head of Color Studio",
    tipText:
      "Never apply Satin or High-Gloss directly over raw plaster without an acrylic deep-penetrating primer. Moisture entrapped under cross-linked polymers causes micro-blistering during monsoon cycles.",
  },
  "conduit-pvc-vs-metal": {
    specs: [
      { label: "Code Standard", value: "IS:9537 Part 3 (PVC) / Part 2 (GI)" },
      { label: "Impact Class", value: "Heavy Mechanical Stress Rating" },
      { label: "Fire Resistance", value: "Self-Extinguishing UL94 V-0" },
      { label: "Temperature", value: "-5°C to +60°C continuous" },
      { label: "Corrosion", value: "100% Acid & Moisture Proof (PVC)" },
      { label: "Joining Method", value: "Solvent Weld / Threaded Coupler" },
    ],
    tipAuthor: "K. Mohanraj",
    tipRole: "Electrical Systems Engineer",
    tipText:
      "When casting ceiling slabs with RMC (Ready-Mix Concrete), always specify Medium or Heavy Duty IS:9537 conduits. Light conduits collapse under concrete vibrator needles, creating permanently blocked raceways.",
  },
  "pvc-vs-gi-conduits": {
    specs: [
      { label: "Code Standard", value: "IS:9537 Part 3 (PVC) / Part 2 (GI)" },
      { label: "Impact Class", value: "Heavy Mechanical Stress Rating" },
      { label: "Fire Resistance", value: "Self-Extinguishing UL94 V-0" },
      { label: "Temperature", value: "-5°C to +60°C continuous" },
      { label: "Corrosion", value: "100% Acid & Moisture Proof (PVC)" },
      { label: "Joining Method", value: "Solvent Weld / Threaded Coupler" },
    ],
    tipAuthor: "K. Mohanraj",
    tipRole: "Electrical Systems Engineer",
    tipText:
      "When casting ceiling slabs with RMC (Ready-Mix Concrete), always specify Medium or Heavy Duty IS:9537 conduits. Light conduits collapse under concrete vibrator needles, creating permanently blocked raceways.",
  },
  "bolt-grades-explained": {
    specs: [
      { label: "Tensile Strength", value: "Grade 8.8 (800 MPa) / 10.9 (1000 MPa)" },
      { label: "Yield Ratio", value: "80% (640 MPa) vs 90% (900 MPa)" },
      { label: "Standard", value: "IS:1367 / ISO 898-1" },
      { label: "Corrosion Shield", value: "Hot-Dip Galvanized (65µm HDG)" },
      { label: "Safety Process", value: "200°C De-Embrittlement Baked" },
      { label: "Proof Load", value: "Verified on Calibrated Extensometer" },
    ],
    tipAuthor: "P. Ramesh",
    tipRole: "Fastener Lab Specialist",
    tipText:
      "Never use electro-galvanized Grade 10.9 bolts on exposed outdoor trusses without baking certificates. Hydrogen atoms diffuse into the steel lattice and cause sudden brittle snaps under static tension.",
  },
  "waterproofing-elastomeric-membranes": {
    specs: [
      { label: "Elongation", value: "350% @ Break (ASTM D412)" },
      { label: "Crack Bridging", value: "Up to 2.2 mm Static & Dynamic" },
      { label: "Polymer Base", value: "Aliphatic Polyurethane / Pure Acrylic Hybrid" },
      { label: "Solid Content", value: "> 65% High Build by Volume" },
      { label: "Solar Reflectance", value: "SRI 104 (High Albedo Cool Roof)" },
      { label: "Ponding Resistance", value: "Zero Water Absorption @ 72 Hours" },
    ],
    tipAuthor: "M. Selvakumar",
    tipRole: "Senior Waterproofing Consultant",
    tipText:
      "Always round out 90-degree parapet wall corners into smooth 45-degree mortar fillets before membrane application. Sharp right angles experience maximum shear stress and develop micro-tears during thermal expansion.",
  },
  "roller-nap-selection-guide": {
    specs: [
      { label: "Nap Pile Heights", value: "4mm, 8mm, 12mm & 18mm Density" },
      { label: "Fiber Composition", value: "Split Microfiber & Knitted Polyamide" },
      { label: "Core Diameter", value: "38mm Heavy Polypropylene Core" },
      { label: "Release Profile", value: "Capillary Uniform Wet Film (WFT 75µ)" },
      { label: "Solvent Durability", value: "Resin-Bonded / Thermofused Core" },
      { label: "Lint Shedding", value: "Zero-Shed Treated (Level-5 Finish)" },
    ],
    tipAuthor: "S. Rathinam",
    tipRole: "Head of Color Studio",
    tipText:
      "Before dipping a new roller into luxury satin enamel, wrap painter's masking tape firmly around the dry sleeve and peel it off. This removes stray loose manufacturing fibers that would otherwise spoil smooth walls.",
  },
  "cpvc-vs-upvc-plumbing-codes": {
    specs: [
      { label: "Temperature Limit", value: "CPVC (93°C) vs UPVC (45°C continuous)" },
      { label: "Hydrostatic Rating", value: "SDR 11 (28.4 kg/cm² @ 23°C)" },
      { label: "Code Standard", value: "IS:15778 (CPVC) / IS:4985 (UPVC)" },
      { label: "Thermal Expansion", value: "6.8 × 10⁻⁵ m/m/°C (Requires Expansion Loops)" },
      { label: "Fusion Cement", value: "Heavy-Bodied Orange Solvent (ASTM F493)" },
      { label: "Potable Approval", value: "NSF-61 Certified Lead-Free Formulation" },
    ],
    tipAuthor: "A. Senthil Kumar",
    tipRole: "Industrial Piping Systems Lead",
    tipText:
      "Never rotate CPVC pipe fittings after insertion into solvent-primed sockets. Insert with a quarter-turn, hold firmly for 30 seconds to prevent hydrostatic push-out, and leave untouched for full chemical weld cure.",
  },
  "underground-electrical-ducting-standards": {
    specs: [
      { label: "Profile Class", value: "Double Wall Corrugated (DWC) HDPE" },
      { label: "Ring Stiffness", value: "SN 4 (450 kN/m²) & SN 8 Heavy Duty" },
      { label: "Friction Rating", value: "µ < 0.22 Virgin Inner Polyethylene" },
      { label: "Standard", value: "IS:16205 Part 24 / BS EN 61386-24" },
      { label: "Pull Cord", value: "Pre-threaded 300 kg Braided Nylon" },
      { label: "Soil Cover", value: "Min 900mm under Heavy Traffic Roads" },
    ],
    tipAuthor: "K. Mohanraj",
    tipRole: "Electrical Systems Engineer",
    tipText:
      "Always terminate buried conduit ends with bell mouths and rubber end-caps before trench backfilling. Uncapped conduits inevitably fill with stone slurry and fine silt during monsoon downpours.",
  },
  "chemical-anchoring-vs-mechanical-wedge": {
    specs: [
      { label: "Adhesive Matrix", value: "Pure Epoxy 3:1 & Styrene-Free Vinylester" },
      { label: "Embedment Depth", value: "4d to 20d Flexible Engineering Depths" },
      { label: "Edge Proximity", value: "Minimum 1.5d (No Radial Expansion Stress)" },
      { label: "Concrete Class", value: "Cracked C20/25 to C50/60 (ETA Option 1)" },
      { label: "Seismic Rating", value: "C1 & C2 Performance Certified" },
      { label: "Gel / Cure Time", value: "30 Min Gel / 12 Hr Full Load @ 30°C" },
    ],
    tipAuthor: "P. Ramesh",
    tipRole: "Fastener Lab Specialist",
    tipText:
      "Hole cleaning determines 90% of chemical bond capacity. Follow the 2x-Blow, 2x-Steel Brush, 2x-Blow protocol with compressed air. Dust left in boreholes reduces epoxy anchor shear strength by over 60%.",
  },
  "stainless-fasteners-galling-prevention": {
    specs: [
      { label: "Alloys", value: "SS 304 (A2-70) & Marine SS 316 (A4-80)" },
      { label: "Tensile Strength", value: "700 MPa (A2-70) / 800 MPa (A4-80)" },
      { label: "Pitting Index", value: "PREN 25.5 (SS 316 with 2.5% Mo)" },
      { label: "Standard", value: "ISO 3506-1 / DIN 933 Stainless Specs" },
      { label: "Lubrication", value: "Nickel-Based Anti-Seize Paste (MIL-PRF-907F)" },
      { label: "Max Torque RPM", value: "< 150 RPM (Strictly No Impact Wrenches)" },
    ],
    tipAuthor: "P. Ramesh",
    tipRole: "Fastener Lab Specialist",
    tipText:
      "If driving stainless steel bolts with battery impact drivers, slow down speed to low gear. High RPM creates immediate frictional heat spikes that vaporize passivation layers, welding threads permanently.",
  },
};

/**
 * Interactive Sheen Spectrum & Scrub Resistance Matrix Table
 */
function SheenSpectrumMatrix() {
  const finishes = [
    {
      name: "Dead Matte",
      sheen: "0 – 5%",
      scrub: "20+ Cycles",
      bestFor: "Ceilings & Low-Touch Plaster",
      lightReflectance: "Non-reflective (diffuse)",
      stainResistance: "Low (absorbs oil)",
    },
    {
      name: "Soft Silk / Eggshell",
      sheen: "10 – 20%",
      scrub: "50+ Cycles",
      bestFor: "Master Bedrooms & Living Rooms",
      lightReflectance: "Gentle warm glow",
      stainResistance: "Medium (wipeable)",
    },
    {
      name: "Birla Opus Luxury Satin",
      sheen: "35 – 45%",
      scrub: "80+ Cycles (Washable)",
      bestFor: "High-Traffic Halls & Foyers",
      lightReflectance: "Balanced diffuse sheen",
      stainResistance: "High (scrubbable)",
      highlight: true,
    },
    {
      name: "High-Gloss Enamel",
      sheen: "70%+",
      scrub: "120+ Cycles (Heavy Scrub)",
      bestFor: "Kitchens, Bathrooms & Trim",
      lightReflectance: "Specular reflection",
      stainResistance: "Maximum moisture barrier",
    },
  ];

  return (
    <div className="my-8 rounded-2xl border border-[#E7E2D6] bg-white overflow-hidden shadow-2xs">
      <div className="px-5 py-4 border-b border-[#E7E2D6] bg-stone-50/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-accent" />
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Sheen Spectrum &amp; Scrub Resistance Matrix
          </span>
        </div>
        <span className="text-[11px] font-medium text-stone-500 font-mono">
          ASTM D2486 / IS:15489
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-stone-200/80 bg-stone-50/40 text-stone-600 font-semibold text-[11px] uppercase tracking-wider">
              <th className="py-3 px-4">Finish</th>
              <th className="py-3 px-4">Sheen %</th>
              <th className="py-3 px-4">Scrub Rating</th>
              <th className="py-3 px-4">Best Suited Room</th>
              <th className="py-3 px-4">Stain Barrier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {finishes.map((f, i) => (
              <tr
                key={i}
                className={f.highlight ? "bg-amber-50/50 font-medium" : "hover:bg-stone-50/50"}
              >
                <td className="py-3.5 px-4 font-bold text-primary flex items-center gap-2">
                  {f.highlight && (
                    <span className="size-2 rounded-full bg-accent shrink-0 animate-pulse" />
                  )}
                  {f.name}
                </td>
                <td className="py-3.5 px-4 font-mono text-stone-700">{f.sheen}</td>
                <td className="py-3.5 px-4 text-stone-700">{f.scrub}</td>
                <td className="py-3.5 px-4 text-stone-700">{f.bestFor}</td>
                <td className="py-3.5 px-4 text-stone-700">{f.stainResistance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Intelligent Section Body Renderer with Dynamic Bullet Card Formatting
 */
function FormattedSectionContent({ body }: { body: string }) {
  const lines = body.split("\n");
  const hasBullets = lines.some((l) => l.trim().startsWith("•") || l.trim().startsWith("-"));

  if (!hasBullets) {
    return (
      <div className="space-y-4 text-[16px] sm:text-[17px] text-stone-700 leading-[1.85] font-normal">
        {lines.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    );
  }

  const elements: React.ReactNode[] = [];
  let bulletBuffer: string[] = [];

  const flushBuffer = (key: string) => {
    if (bulletBuffer.length === 0) return;
    elements.push(
      <div key={key} className="grid grid-cols-1 gap-3.5 my-6">
        {bulletBuffer.map((b, bIdx) => {
          const raw = b.replace(/^[•\-\*]\s*/, "");
          const colonIdx = raw.indexOf(":");
          const title = colonIdx !== -1 ? raw.slice(0, colonIdx).trim() : "";
          const desc = colonIdx !== -1 ? raw.slice(colonIdx + 1).trim() : raw;

          return (
            <div
              key={bIdx}
              className="group rounded-2xl bg-white border border-[#E7E2D6] p-5 shadow-2xs hover:border-accent/50 hover:shadow-xs transition-all duration-200 flex items-start gap-4"
            >
              <div className="size-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/70 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent group-hover:text-white transition-colors duration-200">
                <CheckCircle2 className="size-4.5" />
              </div>
              <div className="space-y-1">
                {title && (
                  <h4 className="font-bold text-primary text-[15px] sm:text-base leading-snug">
                    {title}
                  </h4>
                )}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
    bulletBuffer = [];
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
      bulletBuffer.push(trimmed);
    } else {
      flushBuffer(`buf-${idx}`);
      if (trimmed) {
        elements.push(
          <p key={`p-${idx}`} className="text-[16px] sm:text-[17px] text-stone-700 leading-[1.85] font-normal">
            {trimmed}
          </p>
        );
      }
    }
  });
  flushBuffer("buf-final");

  return <div className="space-y-4">{elements}</div>;
}

/**
 * Full Page Article Reader Component - Luxury Editorial Architecture
 */
function FullArticlePage({
  article,
  allArticles,
  onBack,
  onSelectArticle,
}: {
  article: Article;
  allArticles: Article[];
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, current)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const factsheet = articleFactsheets[article.id];
  const otherArticles = allArticles.filter((a) => a.id !== article.id);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-foreground flex flex-col selection:bg-accent/20">
      {/* Real-time Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-accent via-[#F59E0B] to-accent z-50 transition-all duration-150 ease-out"
        style={{ width: `${readingProgress}%` }}
      />

      <SiteHeader />

      {/* Main Editorial Article Stage */}
      <main className="flex-1 pt-2 sm:pt-4">
        {/* Clean Editorial Back & Share Strip */}
        <div className="mx-auto max-w-6xl px-[15px] pt-4 pb-2 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-stone-500 hover:text-accent transition-colors cursor-pointer group"
          >
            <ArrowLeft className="size-4 text-accent group-hover:-translate-x-1 transition-transform" />
            <span>Back to Technical Guides</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-stone-500 font-medium">
              <Clock className="size-3 text-accent" />
              {article.readTime}
            </span>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white hover:bg-stone-50 px-3.5 py-1 text-xs font-semibold text-stone-700 hover:text-primary transition-all cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="size-3 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="size-3 text-accent" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>
        {/* Article Header (Centered Luxury Editorial Showcase) */}
        <header className="pt-10 sm:pt-14 pb-8 px-[15px] max-w-6xl mx-auto text-center">
          <span className="text-[0.68rem] sm:text-[0.74rem] font-bold uppercase tracking-[0.26em] text-accent block mb-3.5 select-none">
            &mdash; {article.categoryLabel} &mdash;
          </span>

          <h1 className="font-display font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-normal tracking-tight text-primary leading-tight mb-5 max-w-5xl mx-auto">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base md:text-[17px] text-stone-600 leading-relaxed font-normal max-w-2xl mx-auto mb-7 line-clamp-2">
            {article.summary}
          </p>

          {/* Clean Author Byline Strip */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-2.5 px-5 sm:px-7 rounded-full bg-white border border-[#E7E2D6] shadow-2xs text-xs">
            <div className="flex items-center gap-2.5 text-left">
              <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-serif font-bold text-xs shadow-xs">
                {article.author.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-primary block leading-tight">{article.author}</span>
                <span className="text-[10.5px] text-stone-500 font-medium">{article.authorRole}</span>
              </div>
            </div>
            <span className="hidden sm:inline text-stone-300">&bull;</span>
            <div className="flex items-center gap-1.5 text-stone-600 font-mono text-[11px]">
              <Calendar className="size-3.5 text-accent" />
              <span>{article.date}</span>
            </div>
            <span className="hidden sm:inline text-stone-300">&bull;</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
              <CheckCircle2 className="size-3 text-emerald-600" /> Lab Verified Standard
            </span>
          </div>
        </header>

        {/* Cinematic Featured Image Showcase */}
        <div className="max-w-5xl mx-auto px-[15px] mb-12">
          <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-stone-900 border border-[#E7E2D6] shadow-sm group">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3.5 left-5 right-5 flex items-center justify-between text-white/90 text-[11px] font-mono">
              <span className="flex items-center gap-1.5">
                <Sparkles className="size-3 text-amber-300" /> Akshara Technical Research Lab
              </span>
              <span className="hidden sm:inline">Erode Central Experience Center</span>
            </div>
          </div>
        </div>

        {/* 2-Column Editorial Grid: Left Sticky Sidebar + Right Main Content */}
        <div className="max-w-6xl mx-auto px-[15px] pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Sticky Table of Contents, Factsheet & Specialist Card */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
              {/* Table of Contents Card */}
              {article.sections && article.sections.length > 0 && (
                <div className="rounded-2xl border border-[#E7E2D6] bg-white p-5 shadow-2xs">
                  <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-stone-100">
                    <Bookmark className="size-3.5 text-accent" />
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-primary">
                      IN THIS GUIDE
                    </span>
                  </div>
                  <nav className="space-y-2.5">
                    {article.sections.map((sec, idx) => (
                      <a
                        key={idx}
                        href={`#section-${idx}`}
                        className="flex items-baseline gap-2.5 text-xs text-stone-600 hover:text-accent transition-colors group"
                      >
                        <span className="font-mono text-accent font-bold text-xs shrink-0">0{idx + 1}.</span>
                        <span className="group-hover:underline leading-snug">{sec.heading.replace(/^\d+\.\s*/, "")}</span>
                      </a>
                    ))}
                    {article.id === "birla-opus-sheen-guide" && (
                      <a
                        href="#sheen-matrix"
                        className="flex items-baseline gap-2.5 text-xs text-stone-600 hover:text-accent transition-colors group"
                      >
                        <span className="font-mono text-accent font-bold text-xs shrink-0">04.</span>
                        <span className="group-hover:underline leading-snug">Sheen Spectrum &amp; Scrub Matrix</span>
                      </a>
                    )}
                  </nav>
                </div>
              )}

              {/* Technical Factsheet Card */}
              {factsheet && (
                <div className="rounded-2xl border border-[#E7E2D6] bg-white p-5 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-primary">
                        TECHNICAL SPECIFICATIONS
                      </span>
                    </div>
                    <span className="text-[9.5px] font-mono font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                      VERIFIED
                    </span>
                  </div>
                  <div className="space-y-2">
                    {factsheet.specs.map((item, sIdx) => (
                      <div
                        key={sIdx}
                        className="rounded-xl bg-stone-50/70 border border-stone-200/60 p-2.5 transition-all hover:bg-stone-50 hover:border-accent/40"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-0.5 select-none">
                          {item.label}
                        </span>
                        <span className="text-xs sm:text-[12.5px] font-bold text-primary block leading-snug">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick WhatsApp Consultation Mini-Card */}
              <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/70 to-orange-50/40 p-5 shadow-2xs space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent block">
                  SPECIALIST CONSULTATION
                </span>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Need contractor shade matching, bulk procurement, or IS compliance certificates?
                </p>
                <Button
                  variant="hero"
                  size="sm"
                  asChild
                  className="w-full rounded-xl text-xs font-semibold py-2 h-9 cursor-pointer justify-center shadow-2xs"
                >
                  <a
                    href={`https://wa.me/919876543210?text=Hello%20Akshara%20Paints,%20I%20have%20a%20project%20inquiry%20regarding:%20${encodeURIComponent(
                      article.title
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center"
                  >
                    <span>WhatsApp Desk</span>
                  </a>
                </Button>
              </div>
            </aside>

            {/* Right Column: Main Article Body Content */}
            <article className="lg:col-span-8 space-y-9">
              {/* Executive Summary / Key Takeaway Card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E7E2D6] border-l-4 border-l-accent shadow-2xs">
                <div className="flex items-center gap-2 mb-2.5">
                  <Quote className="size-4 text-accent" />
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent">
                    EXECUTIVE SUMMARY &bull; KEY TAKEAWAY
                  </span>
                </div>
                <blockquote className="font-serif italic text-base sm:text-[18px] text-primary leading-relaxed font-normal">
                  &ldquo;{article.keyTakeaway}&rdquo;
                </blockquote>
              </div>

              {/* Core Article Sections with Section Numbers */}
              <div className="space-y-12">
                {article.sections.map((sec, idx) => (
                  <section key={idx} id={`section-${idx}`} className="scroll-mt-24 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-accent text-xl sm:text-2xl font-bold font-mono select-none">
                        0{idx + 1}.
                      </span>
                      <h2 className="font-display font-serif text-2xl sm:text-3xl text-primary font-normal tracking-tight">
                        {sec.heading.replace(/^\d+\.\s*/, "")}
                      </h2>
                    </div>
                    <div className="border-l-2 border-stone-200/80 pl-4 sm:pl-6 ml-2 sm:ml-3">
                      <FormattedSectionContent body={sec.body} />
                    </div>
                  </section>
                ))}
              </div>

              {/* Interactive Sheen Comparison Matrix Table (Birla Opus specific) */}
              {article.id === "birla-opus-sheen-guide" && (
                <div id="sheen-matrix" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-serif text-accent text-xl sm:text-2xl font-bold font-mono select-none">
                      04.
                    </span>
                    <h2 className="font-display font-serif text-2xl sm:text-3xl text-primary font-normal tracking-tight">
                      Technical Sheen Comparison Matrix
                    </h2>
                  </div>
                  <SheenSpectrumMatrix />
                </div>
              )}

              {/* Pro Specialist Tip Callout */}
              {factsheet && (
                <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/10 border border-amber-200/80 shadow-2xs">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                      AKSHARA SITE SPECIALIST TIP &bull; {factsheet.tipAuthor} ({factsheet.tipRole})
                    </span>
                    <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-normal">
                      {factsheet.tipText}
                    </p>
                  </div>
                </div>
              )}

              {/* Tags Strip */}
              <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">
                  Tagged:
                </span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white text-stone-700 border border-stone-200 px-3.5 py-1 text-xs font-semibold shadow-2xs hover:border-accent/50 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author Biography Card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E7E2D6] flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xs">
                <div className="size-14 rounded-2xl bg-[#0E2838] text-white flex items-center justify-center font-serif font-black text-xl shrink-0 shadow-md">
                  {article.author.charAt(0)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-primary text-base">{article.author}</h3>
                    <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[10px] font-bold uppercase">
                      Verified Specialist
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {article.authorRole} at Akshara Paints &amp; Hardware Erode. Specializing in Birla Opus formulations, IS standard compliance, and contractor material logistics.
                  </p>
                </div>
              </div>

              {/* Action CTA Banner */}
              <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-[#111827] via-[#0F172A] to-[#0A0F1A] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10">
                <div className="space-y-1.5 text-center sm:text-left">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 block">
                    ENGINEERING DESK SUPPORT
                  </span>
                  <h3 className="font-display font-serif text-xl sm:text-2xl font-normal tracking-tight text-white">
                    Have a Technical Project Inquiry?
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 max-w-md leading-relaxed">
                    Consult with our engineering desk on specification sheets, Birla Opus color matches, or bulk site delivery schedules.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <a
                    href={`https://wa.me/919876543210?text=Hello%20Akshara%20Paints,%20I%20have%20a%20question%20about%20your%20technical%20article:%20${encodeURIComponent(
                      article.title
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20ba59] text-[#0A2616] px-6 py-2.5 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/40 transition-all hover:scale-102 cursor-pointer w-full sm:w-auto"
                  >
                    <span>WhatsApp Specialist</span>
                  </a>

                  <a
                    href="tel:+919876543210"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 text-xs sm:text-sm font-semibold backdrop-blur-xs transition-all hover:scale-102 cursor-pointer w-full sm:w-auto shadow-sm"
                  >
                    <Phone className="size-4 text-amber-300" />
                    <span className="text-white">Call Desk</span>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Continue Reading: Other Technical Dispatches */}
        {otherArticles.length > 0 && (
          <section className="py-14 sm:py-16 px-4 sm:px-7 lg:px-10 bg-stone-100/70 border-t border-[#E7E2D6]">
            <div className="mx-auto max-w-6xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[0.68rem] sm:text-[0.74rem] font-bold uppercase tracking-[0.24em] text-accent block mb-1">
                    &mdash; CONTINUE READING &mdash;
                  </span>
                  <h2 className="font-display font-serif text-2xl sm:text-3xl text-primary font-normal tracking-tight">
                    More Technical Dispatches
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onBack}
                  className="text-xs sm:text-sm font-bold text-accent hover:underline cursor-pointer"
                >
                  View All Guides &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {otherArticles.map((other) => (
                  <div
                    key={other.id}
                    onClick={() => onSelectArticle(other)}
                    className="group rounded-3xl border border-[#E7E2D6] bg-white px-[15px] py-5 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-end text-xs text-muted-foreground mb-2.5">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="size-3 text-accent" /> {other.readTime}
                        </span>
                      </div>
                      <h3
                        className="font-display font-serif text-base sm:text-lg font-normal text-primary group-hover:text-accent transition-colors leading-snug truncate"
                        title={other.title}
                      >
                        {other.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-[13px] text-muted-foreground line-clamp-2 leading-relaxed">
                        {other.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-primary">
                      <span>Read Full Guide</span>
                      <ArrowRight className="size-4 text-accent group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

/**
 * Main Blog Directory Page Component
 */
function BlogPage() {
  const search = Route.useSearch();
  const loaderData = Route.useLoaderData();
  const articleId = search?.article || loaderData?.articleId;
  const navigate = Route.useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const activeArticle = articleId
    ? articlesData.find((a) => a.id === articleId) ?? null
    : null;

  const handleOpenArticle = (article: Article) => {
    navigate({ search: { article: article.id } });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const handleBackToDirectory = () => {
    navigate({ search: {} });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  // If an article is active, render the dedicated Full-Page Reader
  if (activeArticle) {
    return (
      <FullArticlePage
        article={activeArticle}
        allArticles={articlesData}
        onBack={handleBackToDirectory}
        onSelectArticle={handleOpenArticle}
      />
    );
  }

  const categories = [
    { id: "all" as const, label: "All", count: articlesData.length },
    {
      id: "paints" as const,
      label: "Birla Paints",
      count: articlesData.filter((a) => a.category === "paints").length,
    },
    {
      id: "pipes" as const,
      label: "Conduit Pipes",
      count: articlesData.filter((a) => a.category === "pipes").length,
    },
    {
      id: "fasteners" as const,
      label: "Fasteners",
      count: articlesData.filter((a) => a.category === "fasteners").length,
    },
  ];

  const featuredArticle: Article = articlesData.find((a) => a.featured) ?? articlesData[0]!;

  const filteredArticles = articlesData.filter((a) => {
    const matchesCategory = selectedCategory === "all" || a.category === selectedCategory;
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      {/* Hero Header Section - Centered Luxury Architectural Showcase */}
      <section className="relative pt-10 sm:pt-16 pb-5 sm:pb-16 px-3 sm:px-7 lg:px-10 border-b border-primary/10 overflow-hidden bg-gradient-to-b from-stone-50/80 via-white to-background">
        <div className="absolute left-1/2 -top-28 -translate-x-1/2 size-[650px] rounded-full bg-radial from-accent/12 via-primary/5 to-transparent blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-4xl text-center relative z-10">
          {/* Centered Kicker */}
          <span className="text-[9px] sm:text-[0.74rem] font-bold uppercase tracking-[0.22em] text-accent block mb-1.5 sm:mb-3.5 select-none">
            &mdash; TECHNICAL DISPATCHES &amp; INDUSTRY INSIGHTS &mdash;
          </span>

          {/* Centered Serif Main Heading */}
          <h1 className="font-display font-serif text-2xl sm:text-5xl lg:text-6xl tracking-tight text-primary font-normal leading-tight mb-1.5 sm:mb-4">
            Knowledge &amp; Insights
          </h1>

          {/* Centered Subtitle Paragraph */}
          <p className="text-xs sm:text-sm md:text-[15px] text-muted-foreground tracking-wide leading-relaxed max-w-2xl mx-auto">
            Practical engineering guides, Birla Opus shade theory, waterproofing chemistry, and electrical conduit compliance &mdash; authored by Akshara&apos;s technical specialists and site consultants.
          </p>

          {/* Clean Authority Metadata Strip */}
          <div className="hidden sm:flex items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-semibold text-stone-500 mt-4 select-none">
            <span>25+ Technical Publications</span>
            <span className="opacity-30">&bull;</span>
            <span>IS:9537 Electrical Codes</span>
            <span className="opacity-30">&bull;</span>
            <span>Birla Opus Color Studio</span>
            <span className="opacity-30">&bull;</span>
            <span>Field-Tested Applicator SOPs</span>
          </div>

          {/* Controls Level 1: Centered Luxury Search Bar */}
          <div className="mt-5 sm:mt-7 max-w-lg mx-auto w-full">
            <div className="relative w-full">
              <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 size-3.5 sm:size-4 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search technical guides, standards, or materials..."
                className="w-full h-10 sm:h-11 rounded-full border border-stone-200/90 bg-white/95 pl-10 sm:pl-11 pr-10 text-xs sm:text-sm text-foreground placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-2xs hover:border-stone-300"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-800 cursor-pointer p-1"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Controls Level 2: Discrete Category Filter Chips (Single-Row Horizontal Scroll on Mobile) */}
          <div className="mt-3 sm:mt-4 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 px-1 justify-start sm:justify-center max-w-4xl mx-auto">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`h-[30px] sm:h-[34px] rounded-full px-3.5 sm:px-4 text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center shrink-0 border ${
                    isActive
                      ? "bg-[#0A2234] text-white border-[#0A2234] shadow-xs"
                      : "bg-white/95 text-stone-600 border-stone-200/90 hover:text-stone-950 hover:bg-stone-50 hover:border-stone-300 shadow-2xs"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`ml-1.5 text-[10px] font-mono ${
                      isActive ? "text-white/80 font-bold" : "text-stone-400"
                    }`}
                  >
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Master Guide Showcase (Hidden on Mobile, Visible on Desktop) */}
      {selectedCategory === "all" && !searchQuery && (
        <section className="hidden md:block py-6 sm:py-14 px-3 sm:px-7 lg:px-10 mx-auto max-w-[1440px] w-full">
          <div className="relative rounded-2xl sm:rounded-[36px] border border-[#E7E2D6] bg-[#FAF8F5] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Left Visual Half */}
              <div className="lg:col-span-6 relative h-48 sm:h-96 lg:h-full min-h-[220px] sm:min-h-[320px] overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 sm:top-5 left-3 sm:left-5">
                  <span className="rounded-full bg-accent text-white px-2.5 sm:px-3 py-0.5 sm:py-1 text-[0.62rem] sm:text-[0.68rem] font-bold uppercase tracking-wider shadow-sm">
                    Featured Master Dispatch
                  </span>
                </div>
                <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 text-white/90 text-[10px] sm:text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <User className="size-3 sm:size-3.5 text-accent" /> {featuredArticle.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3 sm:size-3.5" /> {featuredArticle.readTime}
                  </span>
                </div>
              </div>

              {/* Right Editorial Half */}
              <div className="lg:col-span-6 p-4 sm:p-12 space-y-3 sm:space-y-5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="size-3.5 text-accent" /> {featuredArticle.date}
                  </span>
                  <span>&bull;</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Peer Reviewed by Field Applicators
                  </span>
                </div>

                <h2 className="font-display font-serif text-2xl sm:text-3xl lg:text-[34px] text-primary font-normal leading-tight group-hover:text-paint-deep transition-colors">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {featuredArticle.summary}
                </p>

                {/* Key Takeaway Quote Card */}
                <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-accent mb-1">
                    Key Technical Takeaway:
                  </p>
                  <p className="text-xs font-medium text-foreground/90 leading-relaxed italic">
                    &ldquo;{featuredArticle.keyTakeaway}&rdquo;
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {featuredArticle.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-stone-100 text-stone-700 border border-stone-200 px-3 py-1 text-[11px] font-semibold"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <Button
                    variant="hero"
                    size="default"
                    onClick={() => handleOpenArticle(featuredArticle)}
                    className="rounded-full px-6 py-2.5 cursor-pointer shadow-md"
                  >
                    <span>Read Full Dispatch</span>
                    <ArrowRight className="size-4 ml-1.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3x3 Architectural Article Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-7 lg:px-10 mx-auto max-w-[1440px] w-full flex-1">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-[0.68rem] sm:text-[0.74rem] font-bold uppercase tracking-[0.24em] text-accent block mb-1 select-none">
              &mdash; CURATED ARCHITECTURAL JOURNAL &mdash;
            </span>
            <h2 className="font-display font-serif text-2xl sm:text-3xl text-primary font-normal tracking-tight">
              {selectedCategory === "all"
                ? "All Technical Dispatches & Engineering Guides"
                : categories.find((c) => c.id === selectedCategory)?.label}
            </h2>
          </div>
          <span className="text-xs text-muted-foreground font-semibold bg-white border border-stone-200 px-3.5 py-1.5 rounded-full shadow-xs">
            Showing {filteredArticles.length} guides
          </span>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 rounded-[28px] border border-stone-200 bg-white p-8">
            <BookOpen className="size-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-display text-lg font-bold text-primary">No articles match your query</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              Try searching for &apos;Birla Opus&apos;, &apos;conduit&apos;, or &apos;fasteners&apos;.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 rounded-full"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => handleOpenArticle(article)}
                className="group relative flex flex-col justify-between rounded-[28px] sm:rounded-[32px] border border-[#E7E2D6] bg-[#FAF8F5] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
              >
                {/* Visual Header */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="rounded-full bg-black/60 backdrop-blur-xs px-2.5 py-1 text-[0.65rem] font-bold text-white flex items-center gap-1 shadow-xs">
                      <Clock className="size-3" /> {article.readTime}
                    </span>
                  </div>

                  {/* Bottom Author Bar */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-white/90">
                    <span className="flex items-center gap-1.5 font-medium truncate">
                      <User className="size-3 text-accent" /> {article.author}
                    </span>
                    <span className="text-white/80 shrink-0">{article.date}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-[15px] py-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className="font-display font-serif text-base sm:text-lg font-normal text-primary tracking-tight leading-snug group-hover:text-paint-deep transition-colors truncate"
                      title={article.title}
                    >
                      {article.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-[13px] text-muted-foreground leading-relaxed line-clamp-2">
                      {article.summary}
                    </p>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-stone-200/70">
                      {article.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white border border-stone-200/80 px-2.5 py-0.5 text-[10.5px] font-semibold text-muted-foreground"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Read Article Action */}
                  <div className="mt-6 pt-4 border-t border-stone-200/80 flex items-center justify-between text-xs font-semibold text-primary">
                    <span className="group-hover:text-accent transition-colors">Read Full Guide</span>
                    <ArrowRight className="size-4 text-accent group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
