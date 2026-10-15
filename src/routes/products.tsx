import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HelpStrip } from "@/components/help-strip";
import { ArrowLeft, Search, Truck } from "lucide-react";
import { whatsappLink } from "@/lib/store-info";

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

type CartItem = {
  id: string;
  title: string;
  categoryTitle: string;
  image: string;
  qty: number;
};

const CART_KEY = "akshara-cart";

function readCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function buildOrderMessage(items: CartItem[], note: string) {
  const lines = items.map((it, i) => `${i + 1}. ${it.title} (${it.categoryTitle}) x ${it.qty}`);
  return [
    "Hello Akshara Paints, I would like to order:",
    "",
    ...lines,
    ...(note.trim() ? ["", `Note: ${note.trim()}`] : []),
    "",
    "Please share price, stock and delivery details.",
  ].join("\n");
}

function ProductsPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartReady, setCartReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [note, setNote] = useState("");

  // Keep the cart between visits (browser storage; safe if unavailable)
  useEffect(() => {
    setCart(readCart());
    setCartReady(true);
  }, []);
  useEffect(() => {
    if (!cartReady) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* storage blocked — cart still works for this visit */
    }
  }, [cart, cartReady]);

  const cartCount = cart.reduce((n, it) => n + it.qty, 0);
  const qtyOf = (id: string) => cart.find((it) => it.id === id)?.qty ?? 0;
  const addToCart = (item: Omit<CartItem, "qty">) =>
    setCart((prev) =>
      prev.some((it) => it.id === item.id)
        ? prev.map((it) => (it.id === item.id ? { ...it, qty: it.qty + 1 } : it))
        : [...prev, { ...item, qty: 1 }],
    );
  const changeQty = (id: string, delta: number) =>
    setCart((prev) =>
      prev.flatMap((it) => (it.id !== id ? [it] : it.qty + delta <= 0 ? [] : [{ ...it, qty: it.qty + delta }])),
    );
  const removeItem = (id: string) => setCart((prev) => prev.filter((it) => it.id !== id));

  const activeCategory = catalogCategories.find((c) => c.id === selectedCategoryId);

  // Every product range, with its category; "All" shows all of them, a chip shows one category
  const q = searchQuery.toLowerCase().trim();
  const visibleProducts = catalogCategories
    .filter((cat) => !activeCategory || cat.id === activeCategory.id)
    .flatMap((cat) => cat.subcategories.map((sub) => ({ cat, sub })))
    .filter(
      ({ cat, sub }) =>
        q === "" ||
        sub.title.toLowerCase().includes(q) ||
        sub.description.toLowerCase().includes(q) ||
        sub.highlight.toLowerCase().includes(q) ||
        sub.specs.toLowerCase().includes(q) ||
        cat.title.toLowerCase().includes(q) ||
        cat.shortTitle.toLowerCase().includes(q),
    );

  // Product cut-outs (.png) are shown whole on a soft backdrop; photos (.jpg) fill the frame
  const imgFit = (src: string) =>
    src.endsWith(".png")
      ? "absolute inset-0 size-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.05]"
      : "absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.05]";
  const dots = (text: string) => text.replace(/\s*\|\s*|\s+\/\s+/g, " · ");
  const openCategory = (id: string | null) => {
    setSelectedCategoryId(id);
    setSearchQuery("");
  };
  const query = searchQuery.trim();
  const gridHeading = query ? `Results for “${query}”` : activeCategory ? activeCategory.shortTitle : "All products";
  const gridCount = `${visibleProducts.length} ${visibleProducts.length === 1 ? "product" : "products"}`;
  const chips = [{ id: null as string | null, label: "All" }, ...catalogCategories.map((c) => ({ id: c.id as string | null, label: c.shortTitle }))];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      {/* Page header: title on the left, search on the right, filters below */}
      <section className="px-4 sm:px-7 lg:px-10 pt-7 sm:pt-14 pb-5 sm:pb-10 border-b border-stone-200/70">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div className="min-w-0 text-center lg:text-left">
              {activeCategory ? (
                <button
                  type="button"
                  onClick={() => openCategory(null)}
                  className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[#F05323] cursor-pointer"
                >
                  <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                  All categories
                </button>
              ) : (
                <p className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#F05323] sm:text-xs sm:tracking-[0.22em]">
                  <span aria-hidden className="h-px w-6 shrink-0 bg-current opacity-50 sm:w-8" />
                  <span className="sm:hidden">Wholesale &amp; retail catalog</span>
                  <span className="hidden sm:inline">Commercial wholesale &amp; retail catalog</span>
                  <span aria-hidden className="h-px w-6 shrink-0 bg-current opacity-50 sm:w-8" />
                </p>
              )}
              <h1 className="mt-1.5 sm:mt-2 font-serif text-[2rem] leading-tight sm:text-[2.6rem] xl:text-5xl text-primary">
                {activeCategory ? activeCategory.title : "All Products"}
              </h1>
            </div>

            <div className="mx-auto flex w-full max-w-xl items-center gap-2 lg:mx-0 lg:w-[480px] lg:max-w-none lg:shrink-0">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-stone-400 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={activeCategory ? `Search ${activeCategory.shortTitle}` : "Search products"}
                aria-label="Search products"
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
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-stone-200 bg-white px-4 text-sm font-semibold text-stone-800 transition hover:border-stone-300 cursor-pointer"
            >
              Cart
              <span
                className={`grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-xs ${
                  cartCount > 0 ? "bg-[#F05323] text-white" : "bg-stone-100 text-stone-500"
                }`}
              >
                {cartCount}
              </span>
            </button>
            </div>
          </div>

          <div className="mt-4 sm:mt-5 flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center sm:overflow-visible lg:justify-start">
            {chips.map((chip) => {
              const isActive = selectedCategoryId === chip.id;
              return (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => openCategory(chip.id)}
                  aria-pressed={isActive}
                  className={`h-9 shrink-0 rounded-full border px-3.5 sm:px-4 text-[13px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#0A2234] text-white border-[#0A2234]"
                      : "bg-white text-stone-600 border-stone-200 hover:text-stone-900 hover:border-stone-300"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 sm:px-7 lg:px-10 pt-4 sm:pt-10 pb-10 mx-auto max-w-[1440px] w-full flex-1">
        <div className="mb-3 sm:mb-5 flex items-end justify-between gap-4">
          <h2 className={`font-serif text-lg sm:text-2xl text-primary ${query ? "" : "hidden sm:block"}`}>{gridHeading}</h2>
          <p className="shrink-0 text-[13px] sm:text-sm text-stone-500">{gridCount}</p>
        </div>

        {visibleProducts.length === 0 ? (
          <div className="rounded-3xl border border-stone-200 bg-white px-6 py-16 text-center">
            <h3 className="font-serif text-xl text-primary">Nothing found</h3>
            <p className="mt-2 text-sm text-stone-500">Try a different word, or clear the search.</p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-5 inline-flex h-10 items-center rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-50 cursor-pointer"
            >
              Clear search
            </button>
          </div>
        ) : (
          /* Shop-style product cards, 4 per row */
          <div className="grid grid-cols-2 gap-2.5 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map(({ cat, sub }) => {
              const id = `${cat.id}:${sub.id}`;
              const qty = qtyOf(id);
              const item = { id, title: sub.title, categoryTitle: cat.title, image: sub.image };
              const isCutout = sub.image.endsWith(".png");
              return (
                <article
                  key={id}
                  className="group flex flex-col overflow-hidden rounded-2xl sm:rounded-xl border border-stone-200 bg-white transition duration-200 hover:border-stone-300 hover:shadow-[0_10px_28px_rgba(14,40,56,0.10)]"
                >
                  {/* Product image */}
                  <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden bg-[#FAF8F5] sm:bg-white">
                    <img
                      src={sub.image}
                      alt={sub.title}
                      loading="lazy"
                      className={`absolute inset-0 size-full transition-transform duration-300 group-hover:scale-[1.05] ${
                        isCutout ? "object-contain p-3 sm:p-6" : "object-cover"
                      }`}
                    />
                    <span className="absolute left-2 top-2 rounded-full bg-[#0A2234]/90 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wide text-white sm:left-3 sm:top-3 sm:rounded-md sm:bg-[#0A2234] sm:text-[11px]">
                      {sub.badge}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col border-t border-stone-100 p-2.5 sm:p-4">
                    <p className="truncate text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#F05323]">{cat.shortTitle}</p>
                    <h3 className="mt-0.5 sm:mt-1 line-clamp-2 min-h-[2.5em] sm:min-h-0 text-[13.5px] font-semibold leading-snug text-stone-900 sm:text-[15px]">
                      {sub.title}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-[11.5px] text-stone-500 sm:text-[13px]">{dots(sub.highlight)}</p>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-stone-500 max-sm:hidden" title={dots(sub.specs)}>
                      {dots(sub.specs)}
                    </p>
                    <p className="mt-1.5 sm:mt-2 text-[11.5px] sm:text-xs font-semibold text-emerald-700">Price on request<span className="hidden sm:inline"> &middot; Site delivery</span></p>

                    <div className="mt-auto grid grid-cols-2 gap-1.5 sm:gap-2 pt-2.5 sm:pt-4">
                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => addToCart(item)}
                          className="h-9 sm:h-10 rounded-full sm:rounded-lg border border-[#F05323] bg-white text-[12.5px] sm:text-[13px] font-semibold text-[#F05323] transition hover:bg-orange-50 cursor-pointer"
                        >
                          <span className="sm:hidden">+ Cart</span>
                          <span className="hidden sm:inline">Add to cart</span>
                        </button>
                      ) : (
                        <div className="flex h-9 sm:h-10 items-center justify-between rounded-full sm:rounded-lg border border-[#F05323] bg-orange-50/60">
                          <button
                            type="button"
                            onClick={() => changeQty(id, -1)}
                            aria-label={`One less ${sub.title}`}
                            className="grid h-full w-7 sm:w-9 place-items-center rounded-l-full sm:rounded-l-lg text-lg font-medium text-[#F05323] hover:bg-orange-100 cursor-pointer"
                          >
                            &minus;
                          </button>
                          <span className="text-sm font-semibold text-stone-900" aria-live="polite">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => changeQty(id, 1)}
                            aria-label={`One more ${sub.title}`}
                            className="grid h-full w-7 sm:w-9 place-items-center rounded-r-full sm:rounded-r-lg text-lg font-medium text-[#F05323] hover:bg-orange-100 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      )}
                      <a
                        href={whatsappLink(buildOrderMessage([{ ...item, qty: Math.max(qty, 1) }], ""))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 sm:h-10 items-center justify-center rounded-full sm:rounded-lg bg-[#F05323] text-[12.5px] sm:text-[13px] font-semibold text-white transition hover:bg-[#dd4615]"
                      >
                        <span className="sm:hidden">Order</span>
                        <span className="hidden sm:inline">Order now</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Help strip */}
      <section className="px-4 sm:px-7 lg:px-10 pb-6 sm:pb-8 mx-auto max-w-[1440px] w-full">
        <HelpStrip
          icon={Truck}
          title="Need a wholesale quote or site delivery?"
          text="Tell us what you need and we’ll share prices, stock and delivery times."
          whatsappText="Hello Akshara Paints, I have a product enquiry for my project in Erode."
        />
      </section>

      <SiteFooter className="mt-0! sm:mt-0!" />

      {/* Floating cart button */}
      {cartCount > 0 && !cartOpen && (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="fixed bottom-5 right-5 z-40 inline-flex h-12 items-center gap-3 rounded-full bg-[#0A2234] pl-5 pr-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(10,34,52,0.3)] transition hover:bg-[#13344d] cursor-pointer"
        >
          View cart
          <span className="grid h-8 min-w-8 place-items-center rounded-full bg-[#F05323] px-2 text-xs">{cartCount}</span>
        </button>
      )}

      {/* Cart drawer */}
      <Dialog.Root open={cartOpen} onOpenChange={setCartOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[70] bg-stone-900/40 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
          <Dialog.Content className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-md flex-col bg-white shadow-2xl outline-none duration-300 data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 px-6 py-5">
              <div>
                <Dialog.Title className="text-lg font-semibold text-stone-900">Your cart</Dialog.Title>
                <Dialog.Description className="mt-0.5 text-sm text-stone-500">
                  {cartCount === 0
                    ? "Nothing added yet."
                    : `${cartCount} ${cartCount === 1 ? "item" : "items"} · we’ll confirm price & stock on WhatsApp`}
                </Dialog.Description>
              </div>
              <Dialog.Close className="rounded-full border border-stone-200 px-3 py-1.5 text-sm font-medium text-stone-600 transition hover:border-stone-300 hover:text-stone-900 cursor-pointer">
                Close
              </Dialog.Close>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <p className="text-base font-semibold text-stone-900">Your cart is empty</p>
                <p className="mt-1 text-sm text-stone-500">Open a category and tap “Add to cart”.</p>
                <Dialog.Close className="mt-5 inline-flex h-10 items-center rounded-full border border-stone-300 px-5 text-sm font-semibold text-stone-800 transition hover:bg-stone-50 cursor-pointer">
                  Browse products
                </Dialog.Close>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-stone-100 overflow-y-auto px-6">
                  {cart.map((it) => (
                    <li key={it.id} className="flex gap-4 py-4">
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#F4F1EC]">
                        <img src={it.image} alt="" className={imgFit(it.image).replace("p-3", "p-1.5")} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold leading-snug text-stone-900">{it.title}</p>
                        <p className="mt-0.5 truncate text-xs text-stone-500">{it.categoryTitle}</p>
                        <div className="mt-2 flex items-center justify-between gap-3">
                          <div className="flex h-8 items-center rounded-full border border-stone-300">
                            <button
                              type="button"
                              onClick={() => changeQty(it.id, -1)}
                              aria-label={`One less ${it.title}`}
                              className="grid h-full w-8 place-items-center rounded-l-full text-stone-700 hover:bg-stone-50 cursor-pointer"
                            >
                              &minus;
                            </button>
                            <span className="w-6 text-center text-sm font-semibold">{it.qty}</span>
                            <button
                              type="button"
                              onClick={() => changeQty(it.id, 1)}
                              aria-label={`One more ${it.title}`}
                              className="grid h-full w-8 place-items-center rounded-r-full text-stone-700 hover:bg-stone-50 cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(it.id)}
                            className="text-xs font-medium text-stone-500 underline-offset-2 hover:text-[#F05323] hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-stone-200 px-6 py-5">
                  <label htmlFor="cart-note" className="block text-sm font-medium text-stone-700">
                    Note <span className="font-normal text-stone-400">(optional)</span>
                  </label>
                  <textarea
                    id="cart-note"
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Pack size, colour, site location…"
                    className="mt-1.5 w-full resize-none rounded-xl border border-stone-200 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-[#F05323] focus:ring-4 focus:ring-[#F05323]/10"
                  />
                  <a
                    href={whatsappLink(buildOrderMessage(cart, note))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#1DAA61] text-sm font-semibold text-white transition hover:bg-[#178F51]"
                  >
                    Order on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setCart([])}
                    className="mt-3 w-full text-center text-sm font-medium text-stone-500 hover:text-stone-900 cursor-pointer"
                  >
                    Clear cart
                  </button>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
