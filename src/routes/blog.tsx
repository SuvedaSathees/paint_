import { useState, useEffect } from "react";
import { createFileRoute, Link, useLocation, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Search,
  User,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Zap,
  Layers,
  Phone,
  Share2,
} from "lucide-react";

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
    return {
      meta: [
        {
          title: article
            ? `${article.title} | Akshara Paints & Hardware`
            : "Knowledge & Insights | Akshara Paints & Hardware",
        },
        {
          name: "description",
          content: article
            ? article.summary
            : "Expert technical guides on Birla Opus paints, electrical conduit piping standards (IS:9537), high-tensile fastener engineering, and architectural color trends.",
        },
        {
          property: "og:title",
          content: article ? article.title : "Knowledge & Insights | Akshara Paints & Hardware",
        },
        {
          property: "og:description",
          content: article
            ? article.summary
            : "Technical guides, architectural color palettes, waterproofing SOPs, and fastener engineering from Akshara Paints & Hardware in Erode.",
        },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: BlogPage,
});

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
];

/**
 * Full Page Article Reader Component
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
    const url = window.location.href;
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

  const otherArticles = allArticles.filter((a) => a.id !== article.id);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-foreground flex flex-col selection:bg-accent/20">
      {/* 1. Real-time Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-accent via-[#F59E0B] to-accent z-50 transition-all duration-150 ease-out"
        style={{ width: `${readingProgress}%` }}
      />

      <SiteHeader />

      {/* 2. Top Editorial Utility Bar (Spacious Separation Below Floating Header) */}
      <div className="mt-6 sm:mt-8 sticky top-22 sm:top-24 z-30 bg-[#FAF8F5]/95 border-y border-stone-200/80 backdrop-blur-md shadow-2xs">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 h-14 sm:h-16 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full hover:bg-stone-200/70 text-xs sm:text-[13px] font-bold text-primary hover:text-accent transition-all cursor-pointer group"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform text-accent" />
            <span>Back to Technical Guides</span>
          </button>

          <div className="hidden md:flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
            <span>Akshara Technical Journal</span>
            <span className="opacity-40">&bull;</span>
            <span className="text-primary font-bold truncate max-w-xs">{article.categoryLabel}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-200/80 text-primary px-3.5 py-1.5 text-[11px] font-bold shadow-2xs">
              <Clock className="size-3.5 text-accent" />
              {article.readTime}
            </span>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white hover:bg-stone-50 px-4 py-1.5 text-xs font-semibold text-stone-700 hover:text-primary hover:border-primary/40 transition-all cursor-pointer shadow-2xs"
            >
              <Share2 className="size-3.5" />
              <span>{copied ? "Copied Link!" : "Share"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Editorial Article Stage */}
      <main className="flex-1">
        {/* Magazine Split Hero (Distinctive Architectural Showcase) */}
        <section className="pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 border-b border-stone-200/80 bg-gradient-to-b from-white via-[#FAF8F5] to-[#FAF8F5]">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Editorial Headline & Meta Specs */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-accent text-white px-3 py-0.5 text-[10.5px] font-bold uppercase tracking-wider shadow-2xs">
                    {article.categoryLabel}
                  </span>
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-0.5 text-[10.5px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="size-3 text-emerald-600" />
                    Verified Technical Standard
                  </span>
                  <span className="text-[11px] font-mono text-stone-400">
                    Doc #{article.id.slice(0, 8).toUpperCase()}
                  </span>
                </div>

                <h1 className="font-display font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary leading-[1.14]">
                  {article.title}
                </h1>

                <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal max-w-2xl">
                  {article.summary}
                </p>

                {/* Author & Technical Metadata Card */}
                <div className="pt-3 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-[#0E2838] text-white flex items-center justify-center font-serif font-bold text-sm shadow-md ring-2 ring-accent/30">
                      {article.author.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-primary block text-sm leading-tight">{article.author}</span>
                      <span className="text-[11px] text-stone-500 font-medium">{article.authorRole}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-stone-500 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-accent" />
                      <span>{article.date}</span>
                    </div>
                    <span>&bull;</span>
                    <span>5 Min Read</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Architectural Framed Image Showcase */}
              <div className="lg:col-span-5">
                <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white p-2.5 sm:p-3 border border-stone-200/90 shadow-xl">
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] bg-stone-900">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white/95 text-[10.5px] font-mono backdrop-blur-xs bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                      <span>Field Study · Birla Opus Lab</span>
                      <span>Erode Studio</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Section Quick Jump Pill Navigation */}
        {article.sections && article.sections.length > 0 && (
          <nav aria-label="Table of Contents" className="border-b border-stone-200/70 bg-white/70 backdrop-blur-xs py-2.5 px-4 sm:px-7 lg:px-10 overflow-x-auto">
            <div className="mx-auto max-w-4xl flex items-center gap-2 text-xs">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-stone-400 shrink-0 select-none mr-1">
                Contents:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {article.sections.map((sec, idx) => (
                  <a
                    key={idx}
                    href={`#section-${idx}`}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-100 hover:bg-stone-200/80 text-stone-700 hover:text-primary text-[11px] font-semibold whitespace-nowrap transition-colors"
                  >
                    <span className="text-accent font-mono">0{idx + 1}.</span>
                    <span>{sec.heading.replace(/^\d+\.\s*/, "")}</span>
                  </a>
                ))}
              </div>
            </div>
          </nav>
        )}

        {/* 5. Article Full Content Body */}
        <article className="mx-auto max-w-3xl px-5 sm:px-7 lg:px-8 pt-10 pb-16 space-y-10">
          {/* Executive Summary / Key Takeaway Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E2D6] border-l-4 border-l-accent shadow-xs">
            <div className="flex items-center gap-2 text-[11px] uppercase font-black text-accent tracking-[0.2em] mb-2.5">
              <ShieldCheck className="size-4" />
              <span>Executive Summary &bull; Key Takeaway</span>
            </div>
            <blockquote className="font-serif italic text-base sm:text-lg text-primary leading-relaxed font-normal">
              &ldquo;{article.keyTakeaway}&rdquo;
            </blockquote>
          </div>

          {/* Core Article Sections with Section Numbers */}
          <div className="space-y-12">
            {article.sections.map((sec, idx) => (
              <section key={idx} id={`section-${idx}`} className="scroll-mt-32 space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="font-serif text-accent text-lg sm:text-xl font-bold font-mono select-none">
                    0{idx + 1}.
                  </span>
                  <h2 className="font-display font-serif text-xl sm:text-2xl font-bold text-primary tracking-tight">
                    {sec.heading.replace(/^\d+\.\s*/, "")}
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-stone-700 leading-relaxed space-y-3 whitespace-pre-line pl-0 sm:pl-7 border-l-0 sm:border-l sm:border-stone-200/60">
                  {sec.body}
                </div>
              </section>
            ))}
          </div>

          {/* Tags Strip */}
          <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">
              Tagged:
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white text-stone-700 border border-stone-200 px-3 py-1 text-xs font-semibold shadow-2xs"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Biography Card */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xs">
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
          <div className="p-7 sm:p-8 rounded-3xl bg-[#0E2838] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="font-display font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                Have a Technical Project Inquiry?
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-md leading-relaxed">
                Consult with our engineering desk on specification sheets, Birla Opus color matches, or bulk site delivery schedules.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <Button
                variant="hero"
                size="default"
                asChild
                className="rounded-full px-6 py-2.5 w-full sm:w-auto shadow-md cursor-pointer justify-center"
              >
                <a
                  href={`https://wa.me/919876543210?text=Hello%20Akshara%20Paints,%20I%20have%20a%20question%20about%20your%20technical%20article:%20${encodeURIComponent(
                    article.title
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <span>WhatsApp Specialist</span>
                </a>
              </Button>
              <Button
                variant="outline"
                size="default"
                asChild
                className="rounded-full px-5 py-2.5 w-full sm:w-auto border-white/30 text-white hover:bg-white/10 cursor-pointer justify-center"
              >
                <a href="tel:+919876543210" className="flex items-center gap-2">
                  <Phone className="size-4 text-[#D49E35]" />
                  <span>Call Desk</span>
                </a>
              </Button>
            </div>
          </div>
        </article>

        {/* 6. Read Next: Other Technical Dispatches */}
        {otherArticles.length > 0 && (
          <section className="py-12 sm:py-16 px-4 sm:px-7 lg:px-10 bg-stone-100/70 border-t border-stone-200/80">
            <div className="mx-auto max-w-5xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[0.68rem] sm:text-[0.74rem] font-bold uppercase tracking-[0.24em] text-accent block mb-1">
                    &mdash; CONTINUE READING &mdash;
                  </span>
                  <h2 className="font-display font-serif text-2xl sm:text-3xl text-primary font-bold tracking-tight">
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
                    className="group rounded-3xl border border-stone-200 bg-white p-6 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span className="rounded-full bg-stone-100 text-stone-700 px-3 py-1 font-bold text-[10px] uppercase">
                          {other.categoryLabel}
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="size-3 text-accent" /> {other.readTime}
                        </span>
                      </div>
                      <h3 className="font-display font-serif text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors leading-snug">
                        {other.title}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
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

      {/* 7. Minimalist Article Reader Endcap (NO FULL FOOTER) */}
      <footer className="border-t border-stone-200/80 bg-white py-6 px-4 sm:px-7 lg:px-10">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2.5 select-none">
            <div className="size-6 rounded-full bg-[#0E2838] text-white flex items-center justify-center font-serif font-black text-[11px]">
              A
            </div>
            <span className="font-bold text-primary">Akshara Paints &amp; Hardware</span>
            <span className="opacity-40">&bull;</span>
            <span>Erode Technical Studio</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              type="button"
              onClick={onBack}
              className="font-bold text-accent hover:underline cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="size-3" />
              <span>Back to Library</span>
            </button>
            <span className="text-stone-300">|</span>
            <a
              href="https://wa.me/919876543210?text=Hello%20Akshara%20Paints,%20inquiry%20from%20Technical%20Library"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-emerald-700 hover:underline"
            >
              Instant WhatsApp Desk
            </a>
          </div>
        </div>
      </footer>
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

  const categories: { id: BlogCategory; label: string }[] = [
    { id: "all", label: "All (3)" },
    { id: "paints", label: "Birla Paints" },
    { id: "pipes", label: "Conduit Pipes" },
    { id: "fasteners", label: "Fasteners" },
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
      <section className="relative pt-12 sm:pt-14 pb-14 sm:pb-16 px-4 sm:px-7 lg:px-10 border-b border-primary/10 overflow-hidden bg-gradient-to-b from-stone-50/80 via-white to-background">
        <div className="absolute left-1/2 -top-28 -translate-x-1/2 size-[650px] rounded-full bg-radial from-accent/12 via-primary/5 to-transparent blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-4xl text-center relative z-10">
          {/* Centered Kicker */}
          <span className="text-[0.68rem] sm:text-[0.74rem] font-bold uppercase tracking-[0.26em] text-accent block mb-3.5 select-none">
            &mdash; TECHNICAL DISPATCHES &amp; INDUSTRY INSIGHTS &mdash;
          </span>

          {/* Centered Serif Main Heading */}
          <h1 className="font-display font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-primary font-normal leading-[1.12] mb-4 sm:mb-5">
            Knowledge &amp; Insights
          </h1>

          {/* Centered Subtitle Paragraph */}
          <p className="text-xs sm:text-sm md:text-[15px] text-muted-foreground tracking-wide leading-relaxed max-w-2xl mx-auto">
            Practical engineering guides, Birla Opus shade theory, waterproofing chemistry, and electrical conduit compliance &mdash; authored by Akshara&apos;s technical specialists and site consultants.
          </p>

          {/* Centered Authority Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[11px] sm:text-xs font-semibold text-muted-foreground select-none">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="size-3.5 text-accent" /> 25+ Technical Publications
            </span>
            <span className="hidden sm:inline opacity-40">&bull;</span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-emerald-600" /> IS:9537 Electrical Codes
            </span>
            <span className="hidden sm:inline opacity-40">&bull;</span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="size-3.5 text-primary" /> Birla Opus Color Studio
            </span>
            <span className="hidden sm:inline opacity-40">&bull;</span>
            <span className="inline-flex items-center gap-1.5">
              <Layers className="size-3.5 text-accent" /> Field Tested Applicator SOPs
            </span>
          </div>

          {/* Combined Search & Segmented Category Filter */}
          <div className="mt-7 flex flex-col md:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-5xl mx-auto">
            {/* Search Input Bar */}
            <div className="relative w-full md:w-64 lg:w-72 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides, standards..."
                className="w-full h-[40px] rounded-full border border-stone-200/90 bg-white/95 pl-9 pr-9 text-xs sm:text-[13px] text-foreground placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-2xs hover:border-stone-300"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 cursor-pointer font-medium"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Segmented Category Filter Capsule */}
            <div className="inline-flex items-center p-1 rounded-full bg-stone-100/90 border border-stone-200/80 shadow-2xs max-w-full overflow-x-auto no-scrollbar shrink-0 h-[40px]">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`h-[32px] rounded-full px-3.5 sm:px-4 text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center ${
                      isActive
                        ? "bg-[#0A2234] text-white shadow-xs"
                        : "text-stone-600 hover:text-stone-950 hover:bg-white/60"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Master Guide Showcase (Visible on All without search query) */}
      {selectedCategory === "all" && !searchQuery && (
        <section className="py-12 sm:py-14 px-4 sm:px-7 lg:px-10 mx-auto max-w-[1440px] w-full">
          <div className="relative rounded-[32px] sm:rounded-[36px] border border-[#E7E2D6] bg-[#FAF8F5] overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Left Visual Half */}
              <div className="lg:col-span-6 relative h-72 sm:h-96 lg:h-full min-h-[320px] overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <span className="rounded-full bg-accent text-white px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider shadow-sm">
                    Featured Master Dispatch
                  </span>
                  <span className="rounded-full bg-white/90 backdrop-blur-xs text-primary px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider shadow-sm">
                    {featuredArticle.categoryLabel}
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white/90 text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <User className="size-3.5 text-accent" /> {featuredArticle.author} ({featuredArticle.authorRole})
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" /> {featuredArticle.readTime}
                  </span>
                </div>
              </div>

              {/* Right Editorial Half */}
              <div className="lg:col-span-6 p-8 sm:p-12 space-y-5">
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

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
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
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="rounded-full bg-white/95 backdrop-blur-xs px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-primary shadow-xs">
                      {article.categoryLabel}
                    </span>
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
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-serif text-lg sm:text-xl font-normal text-primary tracking-tight leading-snug group-hover:text-paint-deep transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-[13px] text-muted-foreground leading-relaxed line-clamp-3">
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
