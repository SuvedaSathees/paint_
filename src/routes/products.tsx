import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Commercial Products & Building Materials | Akshara Paints & Hardware Erode" },
      {
        name: "description",
        content:
          "Browse wholesale and contractor supplies across 6 commercial categories: Birla Opus paints, electrical conduits, high-tensile fasteners, waterproofing solutions, and building supplies in Erode.",
      },
      { property: "og:title", content: "Commercial Products & Building Materials | Akshara Paints & Hardware Erode" },
      {
        property: "og:description",
        content:
          "Explore Birla Opus paints, electrical conduit pipes, structural fasteners, and construction materials with same-day site dispatch across Erode.",
      },
      { property: "og:type", content: "website" },
      {
        name: "keywords",
        content:
          "Birla Opus paints Erode, electrical conduit pipes Erode, high tensile fasteners Erode, foundation bolts, waterproofing chemicals, building materials supplier Erode, Perundurai SIPCOT materials",
      },
    ],
  }),
  component: ProductsPage,
});

export interface SubcategoryItem {
  id: string;
  title: string;
  badge: string;
  highlight: string;
  image: string;
  description: string;
  specs: string;
  ctaLabel: string;
}

export interface CategoryItem {
  id: string;
  title: string;
  shortTitle: string;
  highlight: string;
  image: string;
  description: string;
  subcategoriesCountText: string;
  subcategories: SubcategoryItem[];
}

const catalogCategories: CategoryItem[] = [
  {
    id: "paints",
    title: "Birla Opus Decorative Paints",
    shortTitle: "Birla Paints",
    highlight: "2,200+ Shades | Computerized Tinting",
    image: "/product-paints.jpg",
    description:
      "Architectural interior emulsions, exterior weatherproof coatings, wood finishes, and computerized custom color dispensing.",
    subcategoriesCountText: "9 Subcategories / 50+ Products",
    subcategories: [
      {
        id: "interior-luxury-emulsions",
        title: "Interior Luxury Emulsions",
        badge: "15+ Products",
        highlight: "Opus Calista & Style | Ultra Sheen",
        image: "/akshara-paint-can-emerald.png",
        description:
          "High-durability washable emulsions with zero volatile organic compounds and stain-resistant acrylic formulations.",
        specs: "Packs: 1L, 4L, 10L, 20L | Coverage: 140 sq.ft per Liter",
        ctaLabel: "Inquire Interior Paints",
      },
      {
        id: "exterior-weatherproof-coatings",
        title: "Exterior Weatherproof Coatings",
        badge: "12+ Products",
        highlight: "AllDry Rain-Shield | 10-Yr Guard",
        image: "/akshara-paint-can-navy.png",
        description:
          "UV-stable elastomeric exterior paints designed to withstand tropical monsoon rains and prevent fungus buildup.",
        specs: "Packs: 4L, 10L, 20L | Coverage: 65 sq.ft per Liter",
        ctaLabel: "Inquire Exterior Paints",
      },
      {
        id: "wood-finishes-polyurethane",
        title: "Wood Finishes & Polyurethane Enamels",
        badge: "8+ Products",
        highlight: "High Gloss & Satin | Teak Certified",
        image: "/akshara-paint-can-obsidian.png",
        description:
          "Mirror-sheen protective enamels and clear polyurethane coats for architectural doors, trims, and metal fabrication.",
        specs: "Packs: 500ml, 1L, 4L | Application: Spray & Brush",
        ctaLabel: "Inquire Wood Finishes",
      },
      {
        id: "undercoats-primers-putty",
        title: "Undercoats, Primers & Wall Putty",
        badge: "10+ Products",
        highlight: "Damp-Block Sealer | Acrylic Formula",
        image: "/product-paints.jpg",
        description:
          "Substrate preparation primers and white cement acrylic putties ensuring uniform adhesion and flawless topcoat sheen.",
        specs: "Packs: 5kg, 20kg, 40kg Bags & Buckets",
        ctaLabel: "Inquire Undercoats",
      },
      {
        id: "interior-satin-smooth",
        title: "Interior Satin & Smooth Emulsions",
        badge: "10+ Products",
        highlight: "Elegance & Style | Soft Sheen",
        image: "/akshara-paint-can.png",
        description:
          "Silky smooth washable wall paints offering class 1 scrub resistance, low odor, and uniform coverage for bedrooms and living spaces.",
        specs: "Packs: 1L, 4L, 10L, 20L | Coverage: 130-150 sq.ft per Liter",
        ctaLabel: "Inquire Satin Paints",
      },
      {
        id: "terrace-roof-waterproofing",
        title: "Terrace & Roof Waterproofing",
        badge: "6+ Products",
        highlight: "SmartProof Liquid | 7-Bar Seal",
        image: "/product-waterproofing.jpg",
        description:
          "Heavy-duty elastomeric liquid waterproofing membranes providing seamless moisture protection across roof slabs and parapets.",
        specs: "Packs: 1L, 4L, 10L, 20L | 300% Elongation Capacity",
        ctaLabel: "Inquire Waterproofing",
      },
      {
        id: "polyurethane-metal-enamels",
        title: "Polyurethane & Synthetic Enamels",
        badge: "8+ Products",
        highlight: "Mirror Gloss | Anti-Rust Shield",
        image: "/akshara-paint-can-clean.png",
        description:
          "High-gloss enamel topcoats providing chip-resistant protection on architectural steel grills, iron gates, and wooden fixtures.",
        specs: "Packs: 500ml, 1L, 4L, 10L | High Gloss Finish",
        ctaLabel: "Inquire Metal Enamels",
      },
      {
        id: "computerized-color-tinting",
        title: "Computerized Tinting & Custom Shades",
        badge: "2,200+ Shades",
        highlight: "Instant In-Store | Spectrophotometer",
        image: "/akshara-swatch-fan.png",
        description:
          "Automated digital color dispensing matching architect fandecks, RAL codes, and custom color swatches in under 5 minutes.",
        specs: "Precision: 0.01ml Batch Accuracy | 5-Minute In-Store Tinting",
        ctaLabel: "Inquire Custom Shades",
      },
      {
        id: "contractor-rollers-applicators",
        title: "Contractor Rollers & Applicator Gear",
        badge: "12+ Tools",
        highlight: "Lint-Free Microfiber | Stainless Cage",
        image: "/product-rollers.jpg",
        description:
          "Professional high-density microfiber rollers, aluminum extension poles, sash cutting brushes, and paint trays.",
        specs: "Rollers: 7-inch & 9-inch | Extension Poles: 2m to 4m",
        ctaLabel: "Inquire Applicator Gear",
      },
    ],
  },
  {
    id: "pipes",
    title: "Electrical Conduit Systems",
    shortTitle: "Conduit Pipes",
    highlight: "IS:9537 Part 3 | High Impact Rigid PVC",
    image: "/product-pipes.jpg",
    description:
      "Commercial-grade electrical raceways, fire-retardant conduit pipes, inspection bends, and junction accessories.",
    subcategoriesCountText: "9 Subcategories / 40+ Products",
    subcategories: [
      {
        id: "rigid-conduits",
        title: "Heavy Duty Rigid PVC Conduits",
        badge: "10+ Products",
        highlight: "20mm to 32mm | Fire Retardant",
        image: "/product-pipes.jpg",
        description:
          "Crush-resistant conduit pipes designed for concealed concrete slab casting and surface-mounted wiring runs.",
        specs: "Standard 3-Meter Lengths | Medium & Heavy Duty",
        ctaLabel: "Inquire Rigid Conduits",
      },
      {
        id: "conduit-fittings",
        title: "Conduit Junction Boxes & Bends",
        badge: "12+ Products",
        highlight: "Inspection Covers | Brass Inserts",
        image: "/akshara-real-pipe.png",
        description:
          "Deep circular junction boxes, factory 90-degree saddle bends, and solvent-weld male/female conduit couplers.",
        specs: "1-Way, 2-Way Angle, 3-Way & 4-Way Junctions",
        ctaLabel: "Inquire Conduit Fittings",
      },
      {
        id: "flexible-pipes",
        title: "Flexible Corrugated Conduit Pipes",
        badge: "6+ Products",
        highlight: "Flame Resistant | Easy Pull",
        image: "/product-pipes.jpg",
        description:
          "Continuous flexible piping for false ceilings, modular partitions, and complex multi-switchboard connections.",
        specs: "Coils: 25m & 50m | Diameters: 20mm & 25mm",
        ctaLabel: "Inquire Flexible Conduits",
      },
      {
        id: "metal-conduits",
        title: "Galvanized Metal Conduits & Saddles",
        badge: "8+ Products",
        highlight: "GI Raceways | Industrial Spec",
        image: "/akshara-silver-pipe.png",
        description:
          "Hot-dip galvanized steel conduit systems for exposed industrial plants, factories, and commercial switchrooms.",
        specs: "Heavy Gauge Steel | Complete with GI Spacers",
        ctaLabel: "Inquire Metal Conduits",
      },
      {
        id: "pvc-solvent-cement",
        title: "Heavy-Duty PVC Solvent Cements",
        badge: "Instant Weld",
        highlight: "Leak-Proof Fusion | Rapid Set",
        image: "/akshara-paint-can.png",
        description:
          "High-strength chemical welding cement providing permanent pressure-tight seals on PVC conduit joints and fittings.",
        specs: "Packs: 100ml, 250ml, 500ml, 1 Liter Tins",
        ctaLabel: "Inquire Solvent Cement",
      },
      {
        id: "inspection-long-bends",
        title: "Factory 90° Inspection Long Bends",
        badge: "Easy Pull",
        highlight: "Smooth Sweep | Removable Port",
        image: "/product-pipes.jpg",
        description:
          "Precision-engineered long sweep conduit bends allowing electricians to navigate wall corners without wire friction.",
        specs: "Sizes: 20mm & 25mm | Packs of 50 Units",
        ctaLabel: "Inquire Inspection Bends",
      },
      {
        id: "unistrut-pipe-clamps",
        title: "Conduit Saddle Clamps & Channel Straps",
        badge: "Zinc Plated",
        highlight: "Corrosion Resistant | Vibration Proof",
        image: "/akshara-real-pipe.png",
        description:
          "Two-hole steel base saddles and unistrut channel clamps for rigidly anchoring exposed conduit raceways.",
        specs: "Packs of 100 | Sized for 20mm, 25mm, 32mm",
        ctaLabel: "Inquire Saddle Clamps",
      },
      {
        id: "modular-metal-boxes",
        title: "Concealed Modular Switch Boxes",
        badge: "GI Metal",
        highlight: "1 to 18 Modules | Heavy Gauge",
        image: "/product-pipes.jpg",
        description:
          "Galvanized iron flush wall boxes with brass earth terminals engineered for concealed modular electrical plates.",
        specs: "Module Sizes: 2M, 3M, 4M, 6M, 8M, 12M, 18M",
        ctaLabel: "Inquire Switch Boxes",
      },
      {
        id: "conduit-couplers-spacers",
        title: "Couplers, Reducers & Conduit Spacers",
        badge: "High Precision",
        highlight: "Snap-Fit Grip | Virgin PVC",
        image: "/akshara-real-pipe.png",
        description:
          "Heavy-gauge precision conduit couplers, female adaptors, and bar saddles ensuring aligned raceway lines.",
        specs: "Boxes of 100 | 20mm & 25mm Standard Sizing",
        ctaLabel: "Inquire Conduit Couplers",
      },
    ],
  },
  {
    id: "fasteners",
    title: "High-Tensile Fasteners & Anchor Bolts",
    shortTitle: "Fasteners",
    highlight: "Grade 8.8 & 10.9 | M6 to M36 Sizing",
    image: "/product-bolts.jpg",
    description:
      "Structural steel hex bolts, foundation anchor studs, unistrut hardware, and corrosion-resistant fasteners.",
    subcategoriesCountText: "9 Subcategories / 60+ Products",
    subcategories: [
      {
        id: "hex-bolts",
        title: "High-Tensile Hex Bolts & Heavy Nuts",
        badge: "20+ Sizes",
        highlight: "Grade 8.8 & 10.9 | ISO 898-1",
        image: "/product-bolts.jpg",
        description:
          "Black oxide and zinc-coated structural bolts engineered for heavy machinery, steel trusses, and PEB sheds.",
        specs: "M6 to M36 | Lengths up to 300mm in Stock",
        ctaLabel: "Inquire Structural Bolts",
      },
      {
        id: "foundation-anchors",
        title: "Foundation Anchor J-Bolts & L-Bolts",
        badge: "Custom M12-M42",
        highlight: "Custom Sized | Hot-Dip Galvanized",
        image: "/akshara-real-bolt.png",
        description:
          "Foundation anchor bolts manufactured to custom civil blueprint specifications for concrete column embedding.",
        specs: "Diameters: M12 to M42 | Straight, J, and L Shapes",
        ctaLabel: "Inquire Foundation Anchors",
      },
      {
        id: "chemical-anchors",
        title: "Chemical Anchors & Threaded Studs",
        badge: "8+ Products",
        highlight: "Epoxy Capsule | Extreme Pull-Out",
        image: "/product-threaded-rods.jpg",
        description:
          "High-load chemical anchor studs, dispensing nozzles, and all-thread zinc rods for post-installed concrete anchoring.",
        specs: "Grade 5.8 & 8.8 Rods | Pure Epoxy Cartridges",
        ctaLabel: "Inquire Chemical Anchors",
      },
      {
        id: "stainless-fasteners",
        title: "Stainless Steel Fasteners (SS 304 / 316)",
        badge: "15+ Products",
        highlight: "Marine Grade | Zero Corrosion",
        image: "/akshara-real-nuts.png",
        description:
          "Austenitic stainless steel allen cap screws, carriage bolts, plain washers, and nyloc lock nuts.",
        specs: "A2-70 & A4-80 Specs | Bulk Contractor Bags",
        ctaLabel: "Inquire Stainless Fasteners",
      },
      {
        id: "flange-bolts-serrated",
        title: "Grade 10.9 Heavy Flange Bolts",
        badge: "High Torque",
        highlight: "Integrated Washer | Vibration Proof",
        image: "/akshara-real-bolt.png",
        description:
          "High-tensile serrated flange bolts distributing clamping load uniformly across high-vibration motors and steel brackets.",
        specs: "M8 to M24 Diameters | High Salt-Spray Zinc Flake",
        ctaLabel: "Inquire Flange Bolts",
      },
      {
        id: "concrete-wedge-anchors",
        title: "Concrete Expansion Wedge Anchors",
        badge: "Heavy Shear",
        highlight: "Through-Bolt Anchor | Seismic Rated",
        image: "/akshara-real-bolt.png",
        description:
          "Wedge anchor studs with stainless steel expansion collars for anchoring pallet racking and structural baseplates.",
        specs: "Diameters: M10 to M24 | Lengths 60mm to 200mm",
        ctaLabel: "Inquire Wedge Anchors",
      },
      {
        id: "unistrut-channel-nuts",
        title: "Unistrut Spring Channel Nuts",
        badge: "Zinc Plated",
        highlight: "Instant Locking | Grooved Teeth",
        image: "/akshara-real-nuts.png",
        description:
          "Spring channel nuts for strut channels, cable tray suspensions, solar panel framing, and MEP brackets.",
        specs: "Thread Tappings: M6, M8, M10, M12 | Packs of 100",
        ctaLabel: "Inquire Channel Nuts",
      },
      {
        id: "spring-flat-washers",
        title: "DIN 127 Spring & Flat Washers",
        badge: "DIN Standard",
        highlight: "Spring Steel | Dynamic Anti-Backing",
        image: "/akshara-real-nuts.png",
        description:
          "Split helical spring lock washers and hardened structural flat washers for vibration-resistant bolt fastening.",
        specs: "Boxes of 200, 500, 1000 Units | M6 to M36 Sizing",
        ctaLabel: "Inquire Washers",
      },
      {
        id: "threaded-stud-rods",
        title: "Full Threaded Steel Rods (1m & 2m)",
        badge: "Continuous Thread",
        highlight: "Grade 8.8 High Pull-Out Strength",
        image: "/product-threaded-rods.jpg",
        description:
          "High-strength threaded steel studs for false ceiling framing, mechanical hanging systems, and concrete anchoring.",
        specs: "Lengths: 1m & 2m | Diameters: M8 to M24",
        ctaLabel: "Inquire Threaded Rods",
      },
    ],
  },
  {
    id: "waterproofing",
    title: "Moisture & Waterproofing Solutions",
    shortTitle: "Waterproofing",
    highlight: "Dr Fixit & Birla Opus | Site Guaranteed",
    image: "/product-waterproofing.jpg",
    description:
      "High-performance terrace coatings, dampness barrier slurries, structural crack fillers, and mortar admixtures.",
    subcategoriesCountText: "9 Subcategories / 30+ Products",
    subcategories: [
      {
        id: "terrace-waterproofing",
        title: "Terrace & Roof Waterproofing Membranes",
        badge: "6+ Products",
        highlight: "Heat Reflective | Elastomeric",
        image: "/product-waterproofing.jpg",
        description:
          "Seamless solar-reflective liquid membranes bridging thermal micro-cracks and keeping roof slabs watertight.",
        specs: "Packs: 10L, 20L | Elongation Capacity: > 300%",
        ctaLabel: "Inquire Roof Membranes",
      },
      {
        id: "basement-barriers",
        title: "Basement & Retaining Wall Barriers",
        badge: "5+ Products",
        highlight: "Crystalline Slurry | Negative Side",
        image: "/akshara-paint-can-obsidian.png",
        description:
          "Two-component polymer-modified cementitious coatings stopping positive and negative water pressure in basements.",
        specs: "Packs: 15kg & 30kg Kits | Direct Brush Coat",
        ctaLabel: "Inquire Basement Coatings",
      },
      {
        id: "integral-admixtures",
        title: "Integral Waterproofing Admixtures",
        badge: "4+ Products",
        highlight: "IS:2645 Certified | Zero Porosity",
        image: "/akshara-paint-can.png",
        description:
          "Concentrated liquid plasticizers mixed directly into concrete and plaster mortars to eliminate capillary dampness.",
        specs: "Dosage: 200ml per 50kg Cement Bag",
        ctaLabel: "Inquire Integral Admixtures",
      },
      {
        id: "crack-sealants",
        title: "Masonry Crack Fillers & PU Sealants",
        badge: "8+ Products",
        highlight: "Non-Shrink | High Elasticity",
        image: "/product-building.jpg",
        description:
          "Polyurethane gun-grade sealants and acrylic pastes for sealing external wall expansion joints and window frames.",
        specs: "Cartridges: 600ml Sausages & 310ml Tubes",
        ctaLabel: "Inquire Crack Sealants",
      },
      {
        id: "sunken-slab-barriers",
        title: "Sunken Bathroom & Wet Area Slurries",
        badge: "Zero Leaks",
        highlight: "Submerged Resistance | Seamless Membrane",
        image: "/product-waterproofing.jpg",
        description:
          "High-flexibility polymer-cement slurry providing permanent waterproofing under tile beds in bathrooms and utility balconies.",
        specs: "Packs: 10kg & 20kg Buckets | Two-Coat Application",
        ctaLabel: "Inquire Bathroom Slurries",
      },
      {
        id: "silicone-water-repellent",
        title: "Silicone Masonry Water Repellents",
        badge: "Natural Look",
        highlight: "Invisible Protection | Breathable Guard",
        image: "/akshara-paint-can-clean.png",
        description:
          "Clear penetrating siloxane impregnator shielding exposed brickwork, natural stone cladding, and porous plaster from water absorption.",
        specs: "Packs: 1L, 5L, 20L | Direct Brush & Spray Coat",
        ctaLabel: "Inquire Silicone Guards",
      },
      {
        id: "structural-bonding-epoxy",
        title: "Structural Bonding Agents & SBR Latex",
        badge: "High Adhesion",
        highlight: "Old to New Concrete | Polymer Enriched",
        image: "/product-building.jpg",
        description:
          "Styrene-butadiene latex bonding slurries ensuring crack-free cold joint bonding, polymer concrete repairs, and screed coats.",
        specs: "Packs: 1L, 5L, 20L, 50L Containers",
        ctaLabel: "Inquire Bonding Latex",
      },
      {
        id: "expansion-joint-tapes",
        title: "Expansion Joint Tapes & Flashing Rolls",
        badge: "Extreme Movement",
        highlight: "Hypalon Membrane | Heavy Duty",
        image: "/product-waterproofing.jpg",
        description:
          "High-elongation thermoplastic elastomeric tapes bonded over building expansion joints and parapet construction cracks.",
        specs: "Rolls: 20-Meter Lengths | Widths: 150mm & 200mm",
        ctaLabel: "Inquire Joint Tapes",
      },
      {
        id: "damp-proof-primer-sealer",
        title: "Efflorescence & Anti-Damp Primers",
        badge: "Deep Sealer",
        highlight: "Locks Plaster Salts | Alkali Resistant",
        image: "/product-paints.jpg",
        description:
          "Substrate stabilizing primers blocking salt efflorescence and damp moisture migration prior to exterior paint application.",
        specs: "Packs: 1L, 4L, 10L, 20L | Spreading: 110 sq.ft/L",
        ctaLabel: "Inquire Anti-Damp Primers",
      },
    ],
  },
  {
    id: "tools",
    title: "Power Tools & Airless Sprayers",
    shortTitle: "Power Tools",
    highlight: "Commercial Grade | Sales & Rental",
    image: "/product-rollers.jpg",
    description:
      "Professional airless paint spray rigs, rotary demolition hammers, angle grinders, and applicator accessories.",
    subcategoriesCountText: "9 Subcategories / 45+ Products",
    subcategories: [
      {
        id: "airless-sprayers",
        title: "Commercial Airless Paint Sprayers",
        badge: "3+ Models",
        highlight: "Graco & Wagner | Piston Duty",
        image: "/product-rollers.jpg",
        description:
          "High-pressure electric airless paint pumps delivering rapid, uniform coverage on commercial and industrial walls.",
        specs: "Flow Rates: 1.8 to 4.2 L/min | 220V Electric",
        ctaLabel: "Inquire Spray Equipment",
      },
      {
        id: "rotary-hammers",
        title: "Rotary Hammers & SDS Drills",
        badge: "5+ Models",
        highlight: "Heavy Impact | Bosch & Makita",
        image: "/akshara-tools.png",
        description:
          "Multi-mode rotary hammer drills designed for concrete anchor drilling, core cutting, and light chiseling work.",
        specs: "Capacities: 20mm to 32mm | SDS Plus & Max",
        ctaLabel: "Inquire Rotary Drills",
      },
      {
        id: "roller-brush-kits",
        title: "Master Rollers & Precision Brushes",
        badge: "12+ Products",
        highlight: "Microfiber Core | Shed-Resistant",
        image: "/product-rollers.jpg",
        description:
          "Pro-finish paint roller sleeves, aluminum extension poles, sash angle brushes, and paint trays for painters.",
        specs: "Rollers: 4-inch & 9-inch | Poles up to 12ft",
        ctaLabel: "Inquire Applicator Kits",
      },
      {
        id: "grinders-cutters",
        title: "Angle Grinders & Metal Cutters",
        badge: "4+ Models",
        highlight: "High Torque | Safety Clutch",
        image: "/akshara-tools.png",
        description:
          "Heavy-duty 4-inch and 7-inch angle grinders with diamond cutting wheels for steel rebar and masonry chasing.",
        specs: "Power: 850W to 2200W | Heavy Industrial Duty",
        ctaLabel: "Inquire Power Grinders",
      },
      {
        id: "cordless-impact-drivers",
        title: "20V Cordless Brushless Impact Drivers",
        badge: "Brushless Motor",
        highlight: "High Torque 65 Nm | Dual 4.0Ah Batteries",
        image: "/akshara-tools.png",
        description:
          "Heavy-duty cordless hammer drills engineered for fast metal roof self-drilling screws and electrical panel mounting.",
        specs: "Variable 2-Speed Gearbox | LED Worklight Integrated",
        ctaLabel: "Inquire Cordless Tools",
      },
      {
        id: "telescopic-extension-poles",
        title: "Anodized Telescopic Extension Poles",
        badge: "Heavy Gauge",
        highlight: "2m to 4m Reach | Universal Acme Thread",
        image: "/product-rollers.jpg",
        description:
          "Lightweight fluted aluminum extension poles with twist-lock collar for painting high ceilings, atriums, and stairwells.",
        specs: "Collapsible 1.5m to 3.6m | Anti-Slip Grip",
        ctaLabel: "Inquire Extension Poles",
      },
      {
        id: "precision-trim-sash-brushes",
        title: "Professional Sash & Angle Cut Brushes",
        badge: "Zero Shedding",
        highlight: "Pure Bristle & Synthetic Blend",
        image: "/akshara-real-brush.png",
        description:
          "Contractor-grade angled sash brushes for crisp straight cutting lines along baseboards, door frames, and cornices.",
        specs: "Sizes: 1-inch, 1.5-inch, 2-inch, 3-inch, 4-inch",
        ctaLabel: "Inquire Trim Brushes",
      },
      {
        id: "power-paint-mortar-mixers",
        title: "Electric Paint & Putty Stirrer Mixers",
        badge: "Dual Speed",
        highlight: "1200W High Torque | Spiral Paddle",
        image: "/akshara-tools.png",
        description:
          "Heavy-duty double-handled electric paddles for lump-free mixing of acrylic putties, cementitious grouts, and thick paints.",
        specs: "140mm Spiral Stirrer Rod Included | 220V Heavy Duty",
        ctaLabel: "Inquire Power Mixers",
      },
      {
        id: "heavy-duty-surface-sanders",
        title: "Wall Putty Drywall Sanders with Vacuum",
        badge: "Dustless Tech",
        highlight: "800W Rotary Head | LED Ring Light",
        image: "/akshara-tools.png",
        description:
          "Electric telescopic drywall sanders connecting directly to industrial dust extractors for ultra-smooth wall leveling.",
        specs: "Disc Diameter: 225mm | Variable Speed 800-1750 RPM",
        ctaLabel: "Inquire Drywall Sanders",
      },
    ],
  },
  {
    id: "materials",
    title: "Core Building & Structural Materials",
    shortTitle: "Building Materials",
    highlight: "Wholesale Supplies | Direct Site Dispatch",
    image: "/product-building.jpg",
    description:
      "Heavy structural steel channels, TMT binding wires, high-pressure PVC plumbing, and tile bonding adhesives.",
    subcategoriesCountText: "9 Subcategories / 50+ Products",
    subcategories: [
      {
        id: "structural-steel",
        title: "Structural Steel Sections & Channels",
        badge: "Prime Mill",
        highlight: "MS Angle, C-Channel & Box Pipes",
        image: "/product-building.jpg",
        description:
          "Prime quality mild steel channels, angles, and hollow rectangular tubes for fabrication and canopy framing.",
        specs: "Lengths: 6 Meters | Prime Tested Mill Material",
        ctaLabel: "Inquire Structural Steel",
      },
      {
        id: "binding-nails",
        title: "TMT Binding Wire & Wire Nails",
        badge: "Site Dispatch",
        highlight: "Annealed Mild Steel | High Ductility",
        image: "/product-building.jpg",
        description:
          "Rust-resistant soft annealed 18-gauge binding wire bundles and hardened concrete steel nails for formwork.",
        specs: "Wire Bundles: 25kg | Nails: 1-inch to 4-inch",
        ctaLabel: "Inquire Binding Wire",
      },
      {
        id: "pvc-plumbing",
        title: "PVC Plumbing & Drainage Pipes",
        badge: "10+ Sizes",
        highlight: "Schedule 40 & 80 | Lead-Free",
        image: "/product-pipes.jpg",
        description:
          "Rigid UPVC and CPVC potable water supply pipes, solvent cements, and sanitary multi-floor drainage fittings.",
        specs: "Sizes: 1/2-inch to 4-inch | Complete Fittings",
        ctaLabel: "Inquire Plumbing Pipes",
      },
      {
        id: "tile-adhesives",
        title: "Polymer Tile Adhesives & Epoxy Grouts",
        badge: "Type 2 & 4",
        highlight: "Type 2 & Type 4 | Zero Slip",
        image: "/product-building.jpg",
        description:
          "High-adhesion cementitious tile glues for vitrified floor tiles, granite cladding, and anti-fungal epoxy grout joints.",
        specs: "Bags: 20kg & 50kg | Epoxy Resin Kits",
        ctaLabel: "Inquire Tile Adhesives",
      },
      {
        id: "portland-cement-53",
        title: "53 Grade Ordinary Portland Cement",
        badge: "IS:12269 Certified",
        highlight: "High Early Strength | Tested Quality",
        image: "/product-building.jpg",
        description:
          "Prime 53 Grade Portland cement for RCC column casting, heavy foundation footings, and structural engineering projects.",
        specs: "50kg HDPE Tamper-Evident Bags | Truckload Dispatch",
        ctaLabel: "Inquire Cement Supply",
      },
      {
        id: "cpvc-hot-water-pipes",
        title: "CPVC Hot & Cold Pressure Plumbing",
        badge: "SDR 11 & 13.5",
        highlight: "Withstands up to 93°C | Zero Corrosion",
        image: "/product-pipes.jpg",
        description:
          "Chlorinated PVC hot and cold drinking water pipes and brass-threaded fittings for solar heaters and geyser lines.",
        specs: "Standard 3-Meter & 5-Meter Commercial Lengths",
        ctaLabel: "Inquire CPVC Systems",
      },
      {
        id: "concrete-hardware-nails",
        title: "Hardened Carbon Steel Concrete Nails",
        badge: "High Impact",
        highlight: "Zinc Coated | Shatter-Proof",
        image: "/akshara-real-bolt.png",
        description:
          "Tempered carbon steel grooved nails designed to pierce high-strength concrete slabs, brick masonry, and timber framing.",
        specs: "Sizes: 1-inch, 1.5-inch, 2-inch, 3-inch | 1kg & 25kg Boxes",
        ctaLabel: "Inquire Concrete Nails",
      },
      {
        id: "steel-trowels-floats",
        title: "Plastering Steel Trowels & Finishing Floats",
        badge: "Pro Mason",
        highlight: "Spring Steel Blade | Ergonomic Handle",
        image: "/akshara-real-trowel.png",
        description:
          "Precision balanced notched and flat stainless steel trowels for plastering walls, leveling screeds, and laying floor tiles.",
        specs: "Sizes: 10-inch, 12-inch, 14-inch | Flat & Notched",
        ctaLabel: "Inquire Masonry Tools",
      },
      {
        id: "tmt-steel-rebar",
        title: "High-Yield Fe-550D TMT Reinforcement Bars",
        badge: "BIS Certified",
        highlight: "Seismic Resistant | High Ductility",
        image: "/product-building.jpg",
        description:
          "Thermo-mechanically treated reinforcement steel bars engineered for residential, commercial, and industrial RCC structures.",
        specs: "Diameters: 8mm, 10mm, 12mm, 16mm, 20mm, 25mm",
        ctaLabel: "Inquire TMT Rebar",
      },
    ],
  },
];

function ProductsPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const activeCategory = catalogCategories.find((c) => c.id === selectedCategoryId);

  // Top-level categories filtering for State A
  const filteredCategories = catalogCategories.filter((cat) => {
    const q = searchQuery.toLowerCase().trim();
    if (q === "") return true;

    const matchesCat =
      cat.title.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q) ||
      cat.highlight.toLowerCase().includes(q);

    const matchesSub = cat.subcategories.some(
      (sub) =>
        sub.title.toLowerCase().includes(q) ||
        sub.description.toLowerCase().includes(q) ||
        sub.highlight.toLowerCase().includes(q) ||
        sub.specs.toLowerCase().includes(q)
    );

    return matchesCat || matchesSub;
  });

  // Active category's subcategories filtering for State B
  const filteredSubcategories = activeCategory
    ? activeCategory.subcategories.filter((sub) => {
        const q = searchQuery.toLowerCase().trim();
        if (q === "") return true;
        return (
          sub.title.toLowerCase().includes(q) ||
          sub.description.toLowerCase().includes(q) ||
          sub.highlight.toLowerCase().includes(q) ||
          sub.specs.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      {/* Hero Header Section */}
      <section className="relative pt-10 sm:pt-16 pb-5 sm:pb-14 px-3 sm:px-6 border-b border-primary/10 overflow-hidden bg-gradient-to-b from-stone-50/80 via-white to-background">
        <div className="absolute left-1/2 -top-28 -translate-x-1/2 size-[650px] rounded-full bg-radial from-accent/12 via-primary/5 to-transparent blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-4xl text-center relative z-10">
          <span className="text-[9px] sm:text-[0.74rem] font-bold uppercase tracking-[0.22em] text-accent block mb-1.5 sm:mb-3 select-none">
            &mdash; COMMERCIAL WHOLESALE &amp; RETAIL CATALOG &mdash;
          </span>

          <h1 className="font-display font-serif text-2xl sm:text-5xl lg:text-6xl tracking-tight text-primary font-normal leading-tight mb-1.5 sm:mb-4">
            {activeCategory ? activeCategory.title : "Product Categories"}
          </h1>

          <p className="text-xs sm:text-sm md:text-[15px] text-muted-foreground tracking-wide leading-relaxed max-w-xl mx-auto">
            {activeCategory
              ? activeCategory.description
              : "Certified wholesale showroom inventory across 6 product divisions with same-day site dispatch across Erode."}
          </p>

          <p className="hidden sm:block mt-3 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-accent/90">
            Same-Day Site Dispatch across Erode / Perundurai SIPCOT / Bhavani
          </p>

          {/* Controls Level 1: Centered Luxury Search Bar */}
          <div className="mt-4 sm:mt-7 max-w-lg mx-auto w-full">
            <div className="relative w-full">
              <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 size-3.5 sm:size-4 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeCategory
                    ? `Search in ${activeCategory.title}`
                    : "Search categories, products, or technical specs"
                }
                className="w-full h-9 sm:h-11 rounded-full border border-stone-200/90 bg-white/95 pl-9 sm:pl-11 pr-10 text-xs sm:text-sm text-foreground placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-800 cursor-pointer p-1"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Discrete Category Filter Chips (Single-Row Horizontal Scroll on Mobile) */}
          <div className="mt-3 sm:mt-4 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 px-1 justify-start sm:justify-center max-w-4xl mx-auto">
            {catalogCategories.map((cat) => {
              const isActive = selectedCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategoryId(isActive ? null : cat.id);
                    setSearchQuery("");
                  }}
                  className={`h-[30px] sm:h-[34px] rounded-full px-3.5 sm:px-4 text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center shrink-0 border ${
                    isActive
                      ? "bg-[#0A2234] text-white border-[#0A2234] shadow-xs"
                      : "bg-white/95 text-stone-600 border-stone-200/90 hover:text-stone-950 hover:bg-stone-50 hover:border-stone-300 shadow-2xs"
                  }`}
                >
                  {cat.shortTitle}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 mx-auto max-w-[1200px] w-full flex-1">
        {/* State A: Top-Level Category Grid (selectedCategoryId === null) */}
        {selectedCategoryId === null && (
          <div>
            <div className="flex items-center justify-between mb-7">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                Displaying {filteredCategories.length} Primary Categories
              </span>
            </div>

            {filteredCategories.length === 0 ? (
              <div className="text-center py-16 rounded-[28px] border border-stone-200 bg-[#FAF8F5] p-8 max-w-md mx-auto">
                <h3 className="font-display font-serif text-lg font-normal text-primary">No categories found</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Try another search term or reset your filter
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="mt-4 rounded-full cursor-pointer"
                >
                  Reset Search
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 justify-items-center">
                {filteredCategories.map((cat) => (
                  <article
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategoryId(cat.id);
                      setSearchQuery("");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group relative flex flex-col justify-between rounded-[18px] sm:rounded-[28px] border border-[#E7E2D6] bg-[#FAF8F5] overflow-hidden shadow-2xs sm:shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer max-w-[370px] w-full"
                  >
                    {/* Visual Header */}
                    <div className="relative h-32 sm:h-52 w-full overflow-hidden bg-stone-100">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                      {/* Badge count on image */}
                      <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3.5 z-10 pointer-events-none">
                        <span className="inline-block rounded-md bg-black/65 px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
                          {cat.subcategoriesCountText}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="px-2.5 sm:px-[15px] py-2.5 sm:py-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Highlight Tag */}
                        <span className="text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-accent block mb-0.5 sm:mb-1">
                          {cat.highlight}
                        </span>

                        <h3 className="font-display font-serif text-xs sm:text-xl font-bold sm:font-normal text-primary tracking-tight leading-tight sm:leading-snug group-hover:text-paint-deep transition-colors">
                          {cat.title}
                        </h3>

                        <p className="mt-1 sm:mt-2 text-[9.5px] sm:text-[13px] text-muted-foreground leading-snug sm:leading-relaxed">
                          {cat.description}
                        </p>
                      </div>

                      {/* Card Action */}
                      <div className="mt-2.5 sm:mt-5 pt-2 sm:pt-3.5 border-t border-stone-200/80">
                        <div className="flex items-center justify-between text-[10px] sm:text-xs font-semibold text-primary group-hover:text-accent transition-colors">
                          <span className="tracking-wide">Explore Range</span>
                          <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* State B: Active Category Subcategories Drilldown (selectedCategoryId !== null) */}
        {selectedCategoryId !== null && activeCategory && (
          <div className="w-full">
            {/* Breadcrumb & Return Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-7 pb-4 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCategoryId(null);
                    setSearchQuery("");
                  }}
                  className="rounded-full text-xs font-semibold cursor-pointer shadow-2xs hover:bg-stone-100"
                >
                  <span>&larr; Back to All Categories</span>
                </Button>
                <span className="text-stone-300 font-light text-sm">/</span>
                <span className="text-xs sm:text-sm font-serif font-bold text-primary">
                  {activeCategory.title}
                </span>
              </div>

              <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                Showing {filteredSubcategories.length} Subcategories
              </span>
            </div>

            {filteredSubcategories.length === 0 ? (
              <div className="text-center py-16 rounded-[28px] border border-stone-200 bg-[#FAF8F5] p-8 max-w-md mx-auto">
                <h3 className="font-display font-serif text-lg font-normal text-primary">No subcategories match</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Try another search query or clear your keyword
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="mt-4 rounded-full cursor-pointer"
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 justify-items-center">
                {filteredSubcategories.map((sub) => {
                  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
                    `Hello Akshara Paints, I would like to inquire about ${activeCategory.title} - ${sub.title}. Please share available grades and pricing.`
                  )}`;

                  return (
                    <article
                      key={sub.id}
                      className="group relative flex flex-col justify-between rounded-[18px] sm:rounded-[28px] border border-[#E7E2D6] bg-[#FAF8F5] overflow-hidden shadow-2xs sm:shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 max-w-[370px] w-full"
                    >
                      {/* Visual Header with Image and Badge */}
                      <div className="relative h-32 sm:h-52 w-full overflow-hidden bg-stone-100 flex items-center justify-center">
                        <img
                          src={sub.image}
                          alt={sub.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                        {/* Subcategory Count Badge on bottom-left */}
                        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3.5 z-10 pointer-events-none">
                          <span className="inline-block rounded-md bg-black/65 px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
                            {sub.badge}
                          </span>
                        </div>
                      </div>

                      {/* Card Body with Full Content */}
                      <div className="px-2.5 sm:px-[15px] py-2.5 sm:py-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Highlight Tag */}
                          <span className="text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-accent block mb-0.5 sm:mb-1">
                            {sub.highlight}
                          </span>

                          {/* Subcategory Title */}
                          <h3 className="font-display font-serif text-xs sm:text-xl font-bold sm:font-normal text-primary tracking-tight leading-tight sm:leading-snug group-hover:text-paint-deep transition-colors">
                            {sub.title}
                          </h3>

                          {/* Description */}
                          <p className="mt-1 sm:mt-2 text-[9.5px] sm:text-[13px] text-muted-foreground leading-snug sm:leading-relaxed">
                            {sub.description}
                          </p>

                          {/* Specifications Ribbon */}
                          <div className="mt-2 sm:mt-3.5 rounded-lg sm:rounded-xl border border-stone-200/90 bg-stone-100/70 p-1.5 sm:p-3 text-[9px] sm:text-[11px] leading-snug sm:leading-relaxed text-stone-700">
                            <span className="font-mono font-bold text-[8px] sm:text-[10px] uppercase tracking-wider text-stone-500 block mb-0.5">
                              Technical Scope
                            </span>
                            <span className="font-medium text-stone-900 line-clamp-1 sm:line-clamp-none">
                              {sub.specs}
                            </span>
                          </div>
                        </div>

                        {/* Card Action Button */}
                        <div className="mt-2.5 sm:mt-5 pt-2 sm:pt-3.5 border-t border-stone-200/80">
                          <Button
                            variant="hero"
                            size="sm"
                            asChild
                            className="w-full h-7 sm:h-9 rounded-full text-[10px] sm:text-xs font-semibold cursor-pointer shadow-xs justify-center"
                          >
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-center"
                            >
                              <span>{sub.ctaLabel}</span>
                            </a>
                          </Button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Streamlined Bottom Consultation Strip */}
      <section className="pb-12 sm:pb-16 px-3 sm:px-6 mx-auto max-w-[1200px] w-full">
        <div className="rounded-2xl sm:rounded-[28px] border border-stone-200/90 bg-gradient-to-br from-white via-stone-50/90 to-amber-50/40 p-4 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Wholesale Trade Desk Active
            </span>
            <h3 className="font-display font-serif text-lg sm:text-xl font-normal text-primary leading-snug">
              Looking for Wholesale Contractor Quotes or Direct Site Dispatch?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
              Contact our trade materials desk for volume estimates, mill test reports, and scheduled site drops across Erode district.
            </p>
          </div>
          <Button
            variant="hero"
            size="default"
            asChild
            className="rounded-full px-6 sm:px-8 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold cursor-pointer shadow-md shrink-0 w-full sm:w-auto"
          >
            <a
              href="https://wa.me/919443722255?text=Hello%20Akshara%20Paints,%20I%20have%20a%20commercial%20materials%20inquiry%20regarding%20products%20in%20Erode"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5"
            >
              <span>Chat with Technical Desk</span>
              <span className="text-accent-foreground font-bold">&rarr;</span>
            </a>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
