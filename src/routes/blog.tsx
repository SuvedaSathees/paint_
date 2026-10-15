import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HelpStrip } from "@/components/help-strip";
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
    <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-stone-200 px-4 py-3 sm:px-5 sm:py-3.5">
        <span className="text-sm font-semibold text-stone-900">Sheen &amp; scrub resistance</span>
        <span className="text-[11px] sm:text-xs text-stone-500">ASTM D2486 / IS:15489</span>
      </div>
      {/* Phones: one small card per finish */}
      <ul className="divide-y divide-stone-100 sm:hidden">
        {finishes.map((f) => (
          <li key={f.name} className={`px-4 py-3.5 ${f.highlight ? "bg-orange-50/60" : ""}`}>
            <div className="flex items-center justify-between gap-3">
              <p className={`text-[14.5px] font-semibold ${f.highlight ? "text-[#F05323]" : "text-stone-900"}`}>{f.name}</p>
              <span className="shrink-0 rounded-full bg-stone-100 px-2.5 py-0.5 text-[11.5px] font-semibold text-stone-700">
                {f.sheen} sheen
              </span>
            </div>
            <dl className="mt-2 grid grid-cols-[88px_1fr] gap-x-3 gap-y-1 text-[13px]">
              <dt className="text-stone-500">Scrub</dt>
              <dd className="text-stone-800">{f.scrub}</dd>
              <dt className="text-stone-500">Best for</dt>
              <dd className="text-stone-800">{f.bestFor}</dd>
              <dt className="text-stone-500">Stain barrier</dt>
              <dd className="text-stone-800">{f.stainResistance}</dd>
            </dl>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 text-xs font-semibold uppercase tracking-wider text-stone-500">
              <th className="px-4 py-3">Finish</th>
              <th className="px-4 py-3">Sheen</th>
              <th className="px-4 py-3">Scrub rating</th>
              <th className="px-4 py-3">Best for</th>
              <th className="px-4 py-3">Stain barrier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {finishes.map((f) => (
              <tr key={f.name} className={f.highlight ? "bg-orange-50/60" : ""}>
                <td className={`px-4 py-3.5 font-semibold ${f.highlight ? "text-[#F05323]" : "text-stone-900"}`}>
                  {f.name}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-stone-700">{f.sheen}</td>
                <td className="px-4 py-3.5 text-stone-700">{f.scrub}</td>
                <td className="px-4 py-3.5 text-stone-700">{f.bestFor}</td>
                <td className="px-4 py-3.5 text-stone-700">{f.stainResistance}</td>
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
  const paragraphClass = "text-[15.5px] sm:text-[17px] leading-[1.75] sm:leading-[1.8] text-stone-700";
  const elements: React.ReactNode[] = [];
  let bulletBuffer: string[] = [];

  const flushBuffer = (key: string) => {
    if (bulletBuffer.length === 0) return;
    elements.push(
      <ul key={key} className="divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-200 bg-white">
        {bulletBuffer.map((b, bIdx) => {
          const raw = b.replace(/^[•\-\*]\s*/, "");
          const colonIdx = raw.indexOf(":");
          const title = colonIdx !== -1 ? raw.slice(0, colonIdx).trim() : "";
          const desc = colonIdx !== -1 ? raw.slice(colonIdx + 1).trim() : raw;
          return (
            <li key={bIdx} className="px-4 py-3.5 sm:px-5 sm:py-4">
              {title && <p className="font-semibold text-stone-900">{title}</p>}
              <p className={`${title ? "mt-1 " : ""}text-[14px] sm:text-[15px] leading-relaxed text-stone-600`}>{desc}</p>
            </li>
          );
        })}
      </ul>,
    );
    bulletBuffer = [];
  };

  body.split("\n").forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
      bulletBuffer.push(trimmed);
    } else {
      flushBuffer(`buf-${idx}`);
      if (trimmed) {
        elements.push(
          <p key={`p-${idx}`} className={paragraphClass}>
            {trimmed}
          </p>,
        );
      }
    }
  });
  flushBuffer("buf-final");

  return <div className="space-y-4 sm:space-y-5">{elements}</div>;
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
  // Two suggestions for "Continue reading", same category first
  const otherArticles = allArticles
    .filter((a) => a.id !== article.id)
    .sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category))
    .slice(0, 2);

  const tocItems = [
    ...article.sections.map((sec, idx) => ({
      href: `#section-${idx}`,
      label: sec.heading.replace(/^\d+\.\s*/, ""),
    })),
    ...(article.id === "birla-opus-sheen-guide"
      ? [{ href: "#sheen-matrix", label: "Sheen comparison table" }]
      : []),
  ];
  const num = (n: number) => String(n).padStart(2, "0");
  const openOnKey = (e: React.KeyboardEvent, a: Article) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelectArticle(a);
    }
  };
  const boxClass = "rounded-2xl border border-stone-200 bg-white";
  const labelClass = "text-xs font-bold uppercase tracking-[0.18em]";

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 flex flex-col selection:bg-[#F05323]/15">
      {/* Reading progress */}
      <div
        className="fixed top-0 left-0 z-[60] h-[3px] bg-[#F05323] transition-[width] duration-150 ease-out"
        style={{ width: `${readingProgress}%` }}
      />

      <SiteHeader />

      <main className="flex-1">
        {/* Header: text on the left, cover image on the right */}
        <header className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-12 lg:pt-14">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex h-9 items-center gap-1.5 rounded-full border border-stone-200 bg-white pl-2.5 pr-3.5 text-[13px] font-medium text-stone-600 transition-colors hover:text-stone-900 cursor-pointer sm:h-auto sm:gap-2 sm:border-0 sm:bg-transparent sm:p-0 sm:text-sm sm:text-stone-500"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            All articles
          </button>

          <div className="mt-5 grid items-center gap-5 sm:mt-6 sm:gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            <div>
              <p className={`${labelClass} text-[11px] sm:text-xs text-[#F05323]`}>{article.categoryLabel}</p>
              <h1 className="mt-2 sm:mt-3 font-serif text-[1.6rem] leading-[1.22] text-primary sm:text-[2rem] lg:text-[2.25rem]">
                {article.title}
              </h1>
              <p className="mt-3 sm:mt-4 text-[14.5px] leading-relaxed text-stone-600 sm:text-base">{article.summary}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-stone-200 pt-4 text-[13px] text-stone-500 sm:mt-6 sm:gap-x-2.5 sm:pt-5 sm:text-sm">
                <span className="grid size-7 place-items-center rounded-full bg-[#0E2838] text-[12px] font-semibold text-white sm:hidden">{article.author.charAt(0)}</span>
                <span className="font-semibold text-stone-800">{article.author}</span>
                <span aria-hidden="true">&middot;</span>
                <span className="hidden sm:inline">{article.date}</span>
                <span aria-hidden="true" className="hidden sm:inline">&middot;</span>
                <span>{article.readTime}</span>
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share this article"
                  className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 text-[13px] font-medium text-stone-700 transition hover:border-stone-300 hover:text-stone-900 cursor-pointer sm:px-4 sm:text-sm"
                >
                  <Share2 className="size-3.5 sm:hidden" />
                  {copied ? "Link copied" : "Share"}
                </button>
              </div>
            </div>

            <img
              src={article.image}
              alt={article.title}
              className="aspect-[16/10] w-full rounded-[20px] border border-stone-200 object-cover sm:rounded-2xl lg:aspect-[4/3]"
            />
          </div>
        </header>

        {/* Body */}
        <div className="mx-auto max-w-6xl px-4 pt-6 pb-10 sm:px-6 sm:pt-14 sm:pb-16">
          <div className="grid items-start gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Sidebar */}
            <aside className="space-y-3 sm:space-y-5 lg:sticky lg:top-28 lg:col-span-4">
              {tocItems.length > 0 && (
                <nav aria-label="On this page" className={`${boxClass} p-4 sm:p-5`}>
                  <p className={`${labelClass} text-[11px] sm:text-xs text-stone-900`}>On this page</p>
                  <ol className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
                    {tocItems.map((t, i) => (
                      <li key={t.href}>
                        <a
                          href={t.href}
                          className="flex gap-3 text-[13.5px] sm:text-sm leading-snug text-stone-600 transition-colors hover:text-[#F05323]"
                        >
                          <span className="w-5 shrink-0 font-semibold text-[#F05323]">{num(i + 1)}</span>
                          <span>{t.label}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              {factsheet && (
                <div className={`${boxClass} p-4 sm:p-5`}>
                  <p className={`${labelClass} text-[11px] sm:text-xs text-stone-900`}>Key specifications</p>
                  <dl className="mt-3 grid grid-cols-2 gap-2 sm:mt-2 sm:block sm:gap-0 sm:divide-y sm:divide-stone-100">
                    {factsheet.specs.map((item) => (
                      <div key={item.label} className="rounded-xl bg-[#FAF8F5] p-2.5 sm:rounded-none sm:bg-transparent sm:px-0 sm:py-3">
                        <dt className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                          {item.label}
                        </dt>
                        <dd className="mt-0.5 text-[12.5px] sm:text-sm font-medium leading-snug text-stone-900">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </aside>

            {/* Article */}
            <article className="min-w-0 space-y-9 sm:space-y-12 lg:col-span-8">
              <blockquote className={`${boxClass} border-l-4 border-l-[#F05323] p-4 sm:p-7`}>
                <p className={`${labelClass} text-[11px] sm:text-xs text-[#F05323]`}>Key takeaway</p>
                <p className="mt-2 sm:mt-3 text-[16px] sm:text-lg font-medium leading-relaxed text-primary">
                  {article.keyTakeaway}
                </p>
              </blockquote>

              {article.sections.map((sec, idx) => (
                <section key={idx} id={`section-${idx}`} className="scroll-mt-28">
                  <p className="text-sm font-semibold text-[#F05323]">{num(idx + 1)}</p>
                  <h2 className="mt-1 font-serif text-[20px] leading-snug text-primary sm:text-2xl">
                    {sec.heading.replace(/^\d+\.\s*/, "")}
                  </h2>
                  <div className="mt-3 sm:mt-5">
                    <FormattedSectionContent body={sec.body} />
                  </div>
                </section>
              ))}

              {article.id === "birla-opus-sheen-guide" && (
                <section id="sheen-matrix" className="scroll-mt-28">
                  <p className="text-sm font-semibold text-[#F05323]">{num(article.sections.length + 1)}</p>
                  <h2 className="mt-1 font-serif text-[20px] leading-snug text-primary sm:text-2xl">
                    Sheen comparison table
                  </h2>
                  <SheenSpectrumMatrix />
                </section>
              )}

              {factsheet && (
                <aside className="rounded-2xl border border-orange-100 bg-orange-50/70 p-4 sm:p-6">
                  <p className={`${labelClass} text-[11px] sm:text-xs text-[#F05323]`}>Tip from our site team</p>
                  <p className="mt-2 sm:mt-3 text-[14.5px] sm:text-[15px] leading-relaxed text-stone-800">{factsheet.tipText}</p>
                  <p className="mt-3 text-sm text-stone-500">
                    &mdash; {factsheet.tipAuthor}, {factsheet.tipRole}
                  </p>
                </aside>
              )}

              {/* Tags + author */}
              <div className="space-y-4 border-t border-stone-200 pt-6 sm:space-y-6 sm:pt-8">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className={`${boxClass} flex items-center gap-3 p-4 sm:gap-4 sm:p-6`}>
                  <span className="grid size-11 sm:size-12 shrink-0 place-items-center rounded-full bg-[#0E2838] font-serif text-lg text-white">
                    {article.author.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Written by</p>
                    <p className="mt-0.5 font-semibold text-stone-900">{article.author}</p>
                    <p className="text-sm text-stone-500">{article.authorRole}, Akshara Paints &amp; Hardware</p>
                  </div>
                </div>
              </div>

              {/* Help strip */}
              <HelpStrip
                title="Have a question about this?"
                text="Our team will help with products, shades and site quantities."
                whatsappText={`Hello Akshara Paints, I have a question about your article: ${article.title}`}
              />
            </article>
          </div>
        </div>

        {/* Continue reading — two small cards */}
        {otherArticles.length > 0 && (
          <section className="border-t border-stone-200 px-4 pt-8 pb-8 sm:px-6 sm:pt-10">
            <div className="mx-auto max-w-6xl">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="font-serif text-xl text-primary sm:text-2xl">Continue reading</h2>
                <button
                  type="button"
                  onClick={onBack}
                  className="shrink-0 text-[13px] font-semibold text-[#F05323] transition-colors hover:text-[#dd4615] cursor-pointer sm:text-sm"
                >
                  All articles &rarr;
                </button>
              </div>

              <div className="grid gap-3 md:grid-cols-2 md:gap-4">
                {otherArticles.map((other) => (
                  <article
                    key={other.id}
                    role="link"
                    tabIndex={0}
                    onClick={() => onSelectArticle(other)}
                    onKeyDown={(e) => openOnKey(e, other)}
                    className="group flex cursor-pointer items-stretch overflow-hidden rounded-2xl border border-stone-200 bg-white outline-none transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(14,40,56,0.08)] focus-visible:ring-4 focus-visible:ring-[#F05323]/20"
                  >
                    <div className="relative min-h-[100px] w-[104px] shrink-0 overflow-hidden bg-stone-100 sm:w-36">
                      <img
                        src={other.image}
                        alt={other.title}
                        loading="lazy"
                        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-3 sm:p-4">
                      <p className="truncate text-[10.5px] font-semibold uppercase tracking-wider text-[#F05323] sm:text-[11px]">
                        {other.categoryLabel}
                        <span className="font-medium normal-case tracking-normal text-stone-400">
                          {" "}&middot; {other.readTime}
                        </span>
                      </p>
                      <h3 className="line-clamp-2 font-serif text-[15.5px] leading-snug text-primary transition-colors group-hover:text-[#F05323] sm:text-[17px]">
                        {other.title}
                      </h3>
                      <span className="mt-0.5 inline-flex items-center gap-1 text-[12px] font-semibold text-stone-500 transition-colors group-hover:text-[#F05323]">
                        Read article <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter className="mt-0! sm:mt-0!" />
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

  const showFeatured = selectedCategory === "all" && !searchQuery;
  const gridArticles = showFeatured
    ? filteredArticles.filter((a) => a.id !== featuredArticle.id)
    : filteredArticles;
  const categoryLabel = (id: Article["category"]) => categories.find((c) => c.id === id)?.label ?? "";
  const gridHeading = searchQuery
    ? `Results for “${searchQuery}”`
    : selectedCategory === "all"
      ? "Latest articles"
      : categoryLabel(selectedCategory);
  const openOnKey = (e: React.KeyboardEvent, article: Article) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpenArticle(article);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      {/* Page header: title on the left, search & filters on the right */}
      <section className="px-4 sm:px-7 lg:px-10 pt-7 sm:pt-14 pb-5 sm:pb-10 border-b border-stone-200/70">
        <div className="mx-auto max-w-[1440px] flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          {/* Title */}
          <div className="text-center lg:text-left">
            <p className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#F05323] sm:text-xs sm:tracking-[0.22em]">
              <span aria-hidden className="h-px w-6 shrink-0 bg-current opacity-50 sm:w-8" />
              <span className="sm:hidden">Guides &amp; insights</span>
              <span className="hidden sm:inline">Technical dispatches &amp; industry insights</span>
              <span aria-hidden className="h-px w-6 shrink-0 bg-current opacity-50 sm:w-8" />
            </p>
            <h1 className="mt-1.5 sm:mt-2 font-serif text-[2rem] leading-tight sm:text-5xl lg:text-[2.75rem] xl:text-5xl text-primary">
              Knowledge &amp; Insights
            </h1>
          </div>

          {/* Search & filters */}
          <div className="flex w-full flex-col gap-3 lg:w-auto lg:shrink-0">
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-stone-400 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles"
                aria-label="Search articles"
                className="w-full h-11 rounded-full border border-stone-200 bg-white pl-11 pr-16 text-sm text-foreground placeholder:text-stone-400 outline-none transition focus:border-[#F05323] focus:ring-4 focus:ring-[#F05323]/10 [&::-webkit-search-cancel-button]:hidden"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-800 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center lg:justify-end">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    aria-pressed={isActive}
                    className={`h-9 shrink-0 rounded-full border px-3.5 sm:px-4 text-[13px] font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center ${
                      isActive
                        ? "bg-[#0A2234] text-white border-[#0A2234]"
                        : "bg-white text-stone-600 border-stone-200 hover:text-stone-900 hover:border-stone-300"
                    }`}
                  >
                    {cat.label}
                    <span className={`ml-1.5 text-[11px] ${isActive ? "text-white/70" : "text-stone-400"}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured article */}
      {showFeatured && (
        <section className="px-4 sm:px-7 lg:px-10 pt-5 sm:pt-10">
          <div className="mx-auto max-w-[1440px]">
            <article
              role="link"
              tabIndex={0}
              onClick={() => handleOpenArticle(featuredArticle)}
              onKeyDown={(e) => openOnKey(e, featuredArticle)}
              className="group grid cursor-pointer overflow-hidden rounded-[22px] sm:rounded-3xl border border-stone-200 bg-white outline-none transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(14,40,56,0.08)] focus-visible:ring-4 focus-visible:ring-[#F05323]/20 lg:grid-cols-2"
            >
              <div className="relative h-48 overflow-hidden sm:h-72 lg:h-auto lg:min-h-[360px]">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider text-[#F05323] shadow-sm sm:left-5 sm:top-5">
                  Featured
                </span>
              </div>

              <div className="flex flex-col justify-center p-4 sm:p-8 lg:p-12">
                <p className="text-[10.5px] sm:text-xs font-semibold uppercase tracking-wider text-[#F05323]">
                  {categoryLabel(featuredArticle.category)}
                </p>
                <h2 className="mt-1.5 sm:mt-3 font-serif text-[20px] leading-snug text-primary sm:text-3xl sm:leading-tight lg:text-[2.1rem]">
                  {featuredArticle.title}
                </h2>
                <p className="mt-2 sm:mt-4 line-clamp-2 sm:line-clamp-3 text-[13.5px] sm:text-[15px] leading-relaxed text-stone-600">
                  {featuredArticle.summary}
                </p>
                <p className="mt-3 sm:mt-5 text-[12.5px] sm:text-sm text-stone-500">
                  {featuredArticle.author} &middot; {featuredArticle.date} &middot; {featuredArticle.readTime}
                </p>
                <span className="mt-4 sm:mt-7 inline-flex h-10 sm:h-11 w-full sm:w-fit justify-center items-center gap-2 rounded-full bg-[#F05323] px-6 text-sm font-semibold text-white transition-colors group-hover:bg-[#dd4615]">
                  Read article
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Article grid */}
      <section className="px-4 sm:px-7 lg:px-10 pt-7 sm:pt-14 pb-10 sm:pb-16 mx-auto max-w-[1440px] w-full flex-1">
        <div className="mb-3 sm:mb-6 flex items-end justify-between gap-4">
          <h2 className="font-serif text-xl sm:text-3xl text-primary">{gridHeading}</h2>
          <p className="shrink-0 text-[13px] sm:text-sm text-stone-500">
            {gridArticles.length} {gridArticles.length === 1 ? "article" : "articles"}
          </p>
        </div>

        {gridArticles.length === 0 ? (
          <div className="rounded-3xl border border-stone-200 bg-white px-6 py-16 text-center">
            <h3 className="font-serif text-xl text-primary">No articles found</h3>
            <p className="mt-2 text-sm text-stone-500">
              Try &lsquo;Birla Opus&rsquo;, &lsquo;conduit&rsquo; or &lsquo;fasteners&rsquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-5 inline-flex h-10 items-center rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-50 cursor-pointer"
            >
              Show all articles
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 ${gridArticles.length % 4 === 0 ? "xl:grid-cols-4" : ""}`}
          >
            {gridArticles.map((article) => (
              <article
                key={article.id}
                role="link"
                tabIndex={0}
                onClick={() => handleOpenArticle(article)}
                onKeyDown={(e) => openOnKey(e, article)}
                className="group flex cursor-pointer flex-row sm:flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white outline-none transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(14,40,56,0.08)] focus-visible:ring-4 focus-visible:ring-[#F05323]/20"
              >
                <div className="relative min-h-[108px] w-[112px] shrink-0 self-stretch overflow-hidden bg-stone-100 sm:min-h-0 sm:w-auto sm:aspect-[16/10]">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04] sm:static"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-6">
                  <p className="truncate text-[10.5px] sm:text-xs font-semibold uppercase tracking-wider text-[#F05323]">
                    {categoryLabel(article.category)}
                    <span className="font-medium normal-case tracking-normal text-stone-400">
                      {" "}&middot; {article.readTime}
                    </span>
                  </p>
                  <h3 className="mt-1 sm:mt-2 line-clamp-2 font-serif text-[15.5px] sm:text-xl leading-snug text-primary transition-colors group-hover:text-[#F05323]">
                    {article.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-600 max-sm:hidden">{article.summary}</p>

                  <div className="mt-auto pt-2 sm:pt-5">
                    <div className="flex items-center justify-between gap-3 text-[12px] text-stone-500 sm:border-t sm:border-stone-100 sm:pt-4 sm:text-[13px]">
                      <span className="truncate">
                        {article.author} &middot; {article.date}
                      </span>
                      <ArrowRight className="size-4 shrink-0 text-[#F05323] transition-transform group-hover:translate-x-1" />
                    </div>
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
