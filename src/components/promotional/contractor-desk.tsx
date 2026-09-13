import { useState, type FormEvent } from "react";
import { 
  Truck, 
  PhoneCall, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Paintbrush, 
  Hammer, 
  Building2,
  Clock,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

interface TradeOption {
  id: string;
  label: string;
  subtitle: string;
  icon: typeof Zap;
  color: string;
  popularItems: string[];
}

const TRADES: TradeOption[] = [
  {
    id: "electrical",
    label: "Electrical Contractor",
    subtitle: "Conduits, Junctions & Bends",
    icon: Zap,
    color: "#2563eb",
    popularItems: [
      "Rigid PVC Conduit Pipes (20mm / 25mm)",
      "Deep Junction Boxes & Couplers",
      "Conduit Elbows & Flexible Bends",
      "MCB Distribution Boxes & Accessories",
      "Modular Switch Boxes & Accessories",
      "Conduit Solvent Cement & Saddles",
    ],
  },
  {
    id: "painting",
    label: "Painting Contractor",
    subtitle: "Birla Opus 20L Drums & Primers",
    icon: Paintbrush,
    color: "#f26522",
    popularItems: [
      "Birla Opus Luxury Emulsion (20L Drums)",
      "Exterior Weather Guard & Damp Proof",
      "Acrylic Wall Primer & Water Putty",
      "Professional Roller Frames & Brushes",
      "Masking Tapes & Drop Sheets",
      "Waterproofing Base Coats",
    ],
  },
  {
    id: "fabrication",
    label: "Fabrication & Fasteners",
    subtitle: "Hex Bolts, Nuts & Studs",
    icon: Hammer,
    color: "#7c3aed",
    popularItems: [
      "Hex Bolts & Nuts (M8 to M24 Grade 8.8)",
      "Zinc-Plated & SS 304 Washers",
      "Heavy-Duty Anchor Fasteners",
      "Threaded Rods & Structural Studs",
      "Self-Drilling & Drywall Screws",
      "Metal Cutting Wheels & Accessories",
    ],
  },
  {
    id: "civil",
    label: "Civil & Building Site",
    subtitle: "Cement, Steel & Blocks",
    icon: Building2,
    color: "#059669",
    popularItems: [
      "53-Grade / 43-Grade Cement Bags",
      "GI Binding Wire & Construction Nails",
      "TMT Reinforcement Steel Rods",
      "Solid & Hollow Concrete Blocks",
      "Waterproofing Chemical Admixtures",
      "Scaffolding Clamps & Hardware",
    ],
  },
];

const ERODE_LOCALITIES = [
  "Perundurai Road",
  "Thindal",
  "Solar / Karur Road",
  "Bhavani Road",
  "Sathy Road / Veerappanchatram",
  "Kollampalayam",
  "Chithode / Industrial Estate",
  "Other Erode Location",
];

const URGENCY_OPTIONS = [
  { id: "urgent", label: "Same-Day Dispatch", desc: "Under 4 Hrs in Erode" },
  { id: "bulk", label: "Full Truckload", desc: "Direct to Project Site" },
  { id: "regular", label: "Trade Account", desc: "Monthly Wholesale Supply" },
];

export function ContractorDesk() {
  const [selectedTrade, setSelectedTrade] = useState<string>("electrical");
  const [selectedItems, setSelectedItems] = useState<string[]>([
    "Rigid PVC Conduit Pipes (20mm / 25mm)",
    "Deep Junction Boxes & Couplers",
    "Conduit Elbows & Flexible Bends",
  ]);
  const [siteLocation, setSiteLocation] = useState(ERODE_LOCALITIES[0]);
  const [orderUrgency, setOrderUrgency] = useState("urgent");
  const [customNotes, setCustomNotes] = useState("");
  const [contractorPhone, setContractorPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const activeTrade = TRADES.find((t) => t.id === selectedTrade) || TRADES[0];

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleTradeChange = (trade: TradeOption) => {
    setSelectedTrade(trade.id);
    setSelectedItems(trade.popularItems.slice(0, 3));
  };

  const buildWhatsAppUrl = () => {
    const itemsList = selectedItems.length > 0 ? selectedItems.join(", ") : "General requirement";
    const urgencyObj = URGENCY_OPTIONS.find(u => u.id === orderUrgency);
    const urgencyLine = urgencyObj ? `\n• Urgency: ${urgencyObj.label} (${urgencyObj.desc})` : "";
    const notesLine = customNotes ? `\n• Specific Requirements / Quantity: ${customNotes}` : "";
    const text = encodeURIComponent(
      `Hello Akshara Paints & Hardware Erode,\n\nI am contacting you from the website for a Contractor Bulk Quote:\n• Trade: ${activeTrade.label}\n• Site Location: ${siteLocation}\n• Required Materials: ${itemsList}${urgencyLine}${notesLine}\n\nPlease share availability and wholesale contractor pricing.`
    );
    return `https://wa.me/919876543210?text=${text}`;
  };

  const handleSubmitCallback = (e: FormEvent) => {
    e.preventDefault();
    if (!contractorPhone) return;
    setSubmitted(true);
  };

  return (
    <section
      id="contractor-desk"
      aria-label="Akshara Paints and Hardware contractor supply desk"
      className="min-h-screen lg:h-screen lg:max-h-[960px] flex flex-col justify-between py-6 sm:py-8 lg:py-10 px-4 sm:px-7 lg:px-12 mx-auto max-w-[1400px] w-full overflow-hidden"
    >
      {/* Header matching approved gold-standard serif style */}
      <div className="text-center max-w-3xl mx-auto shrink-0 mb-3 sm:mb-5">
        <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent block mb-1">
          &mdash; CONTRACTOR &amp; BUILDER DESK &mdash;
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-primary">
          Bulk Site Supply &amp; Instant Quote
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground tracking-wide leading-relaxed">
          Direct wholesale pricing, trade credit facilities, and guaranteed same-day job-site delivery across Erode &amp; surrounding districts.
        </p>
      </div>

      {/* Main Studio Card */}
      <div className="flex-1 flex flex-col justify-between rounded-3xl border border-primary/15 bg-card/75 p-5 sm:p-7 lg:p-8 shadow-xl backdrop-blur-sm overflow-hidden">
        
        {/* Step 1: 4 Trade Selection Cards */}
        <div className="shrink-0 mb-3.5">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Step 1: Select Your Trade / Sector
            </span>
            <span className="text-[0.65rem] font-bold text-accent uppercase tracking-wider">
              Pre-fills custom WhatsApp checklist
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {TRADES.map((trade) => {
              const Icon = trade.icon;
              const isSelected = selectedTrade === trade.id;
              return (
                <button
                  key={trade.id}
                  type="button"
                  onClick={() => handleTradeChange(trade)}
                  className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-md ring-1 ring-primary/30"
                      : "border-primary/10 bg-background/60 hover:border-primary/25 hover:bg-background"
                  }`}
                >
                  <div
                    className="grid size-9 shrink-0 place-items-center rounded-xl text-white shadow-xs"
                    style={{ background: trade.color }}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-xs sm:text-sm text-primary leading-tight truncate">
                      {trade.label}
                    </p>
                    <p className="text-[0.62rem] text-muted-foreground truncate mt-0.5">
                      {trade.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Two Columns covering the entire card without dead blank space */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch pt-3.5 border-t border-primary/10 min-h-0">
          
          {/* Left Column: Fully-packed with essential contractor features */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3 min-h-0">
            
            {/* 1. Items Checklist */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Step 2: Check Required Items ({activeTrade.label})
                </span>
                <span className="text-xs font-semibold text-accent">
                  {selectedItems.length} selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeTrade.popularItems.map((item) => {
                  const isChecked = selectedItems.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleItem(item)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        isChecked
                          ? "border-accent bg-accent/10 font-semibold text-primary shadow-xs"
                          : "border-primary/10 bg-background/50 text-muted-foreground hover:border-primary/25 hover:bg-background"
                      }`}
                    >
                      <CheckCircle2
                        className={`size-4 shrink-0 ${
                          isChecked ? "text-accent fill-accent/20" : "text-primary/20"
                        }`}
                      />
                      <span className="truncate">{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Job-Site Destination & Area Pills */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Job-Site Destination in Erode:
                </label>
                <div className="hidden sm:flex items-center gap-1.5">
                  {["Perundurai Rd", "Thindal", "Solar", "Bhavani"].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setSiteLocation(loc + " (Erode)")}
                      className={`text-[0.58rem] px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                        siteLocation.includes(loc)
                          ? "bg-accent text-white border-accent font-bold"
                          : "border-primary/15 text-muted-foreground hover:bg-primary/5"
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              <select
                value={siteLocation}
                onChange={(e) => setSiteLocation(e.target.value)}
                className="w-full rounded-xl border border-primary/15 bg-background px-3 py-2 text-xs text-foreground font-medium focus:outline-none focus:ring-1 focus:ring-accent"
              >
                {ERODE_LOCALITIES.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc} (Erode) &mdash; Same-day truck delivery available
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Delivery Urgency / Scale Selector (Fills the previous empty gap) */}
            <div>
              <label className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted-foreground block mb-1.5">
                Supply Urgency &amp; Order Scale:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {URGENCY_OPTIONS.map((u) => {
                  const isSelected = orderUrgency === u.id;
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setOrderUrgency(u.id)}
                      className={`p-2 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        isSelected
                          ? "border-primary bg-primary/10 font-bold text-primary ring-1 ring-primary/20"
                          : "border-primary/10 bg-background/50 text-muted-foreground hover:bg-background"
                      }`}
                    >
                      <span className="block text-[0.72rem] leading-tight truncate font-semibold">
                        {u.label}
                      </span>
                      <span className="block text-[0.6rem] text-muted-foreground truncate mt-0.5">
                        {u.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Quick Custom Notes / Quantities Input */}
            <div className="flex items-center gap-2 rounded-xl border border-primary/15 bg-background px-3 py-2">
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground shrink-0">
                Quantity / Notes:
              </span>
              <input
                type="text"
                placeholder="e.g. 50 bundles 20mm pipe, 10 boxes M12 bolts, 20 cement bags..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>

            {/* 5. Direct Instant WhatsApp Launcher Button */}
            <div>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3.5 font-display font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-150 cursor-pointer"
              >
                <WhatsAppIcon variant="white" className="size-5 shrink-0" />
                <span>Send Material List via WhatsApp for Wholesale Quote</span>
                <ArrowRight className="size-4" />
              </a>
              <p className="mt-1 text-center text-[0.65rem] text-muted-foreground">
                Opens with {selectedItems.length} items &amp; {siteLocation.split(" ")[0]} delivery pre-filled &middot; Akshara Erode team responds in &lt; 15 mins
              </p>
            </div>
          </div>

          {/* Right Column: Direct Wholesale Helpline & Callback Desk */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-primary/15 bg-secondary/35 p-5 space-y-3.5">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="inline-flex items-center gap-1.5 text-accent font-bold text-[0.68rem] uppercase tracking-wider">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  Wholesale Desk Live (8 AM - 8 PM)
                </span>
                <span className="text-[0.62rem] text-muted-foreground font-medium">Erode Central</span>
              </div>
              <h3 className="font-display font-bold text-base text-primary">
                Contractor Direct Helpline
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                Need customized sizing, credit billing, or urgent site dispatch? Contact our warehouse supervisor.
              </p>
            </div>

            {/* Direct Call Button */}
            <a
              href="tel:+919876543210"
              className="flex items-center justify-between p-3 rounded-xl border border-primary/15 bg-background hover:border-accent hover:bg-accent/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <PhoneCall className="size-4" />
                </div>
                <div>
                  <p className="text-[0.62rem] font-bold uppercase tracking-wider text-muted-foreground">
                    Direct Wholesale Phone
                  </p>
                  <p className="font-mono font-bold text-sm text-primary">
                    +91 98765 43210
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold uppercase text-accent group-hover:translate-x-1 transition-transform">
                Call Now &rarr;
              </span>
            </a>

            {/* Quick Callback Form */}
            {submitted ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-in fade-in">
                <CheckCircle2 className="size-5 text-emerald-600 mx-auto mb-1" />
                <p className="text-xs font-bold text-emerald-800">
                  Callback Requested!
                </p>
                <p className="text-[0.65rem] text-muted-foreground mt-0.5">
                  An Akshara trade specialist will call {contractorPhone} within 15 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitCallback} className="space-y-1.5">
                <p className="text-[0.68rem] font-bold uppercase tracking-wider text-muted-foreground">
                  Or Request an Immediate Trade Callback:
                </p>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    required
                    placeholder="+91 Phone Number"
                    value={contractorPhone}
                    onChange={(e) => setContractorPhone(e.target.value)}
                    className="flex-1 rounded-xl border border-primary/15 bg-background px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <Button type="submit" size="sm" variant="hero" className="text-xs px-4 h-9">
                    Request Call
                  </Button>
                </div>
              </form>
            )}

            {/* 4 Trust Metrics */}
            <div className="pt-2 border-t border-primary/10 grid grid-cols-2 gap-2 text-[0.68rem] text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Truck className="size-3.5 text-accent shrink-0" />
                <span>Same-day Erode site drop</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="size-3.5 text-accent shrink-0" />
                <span>GST invoices &amp; credit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-accent shrink-0" />
                <span>Birla Opus &amp; ISI certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-accent shrink-0" />
                <span>1,200+ projects served</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
