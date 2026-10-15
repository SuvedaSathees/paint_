import type { LucideIcon } from "lucide-react";
import { MessageSquareText, Phone } from "lucide-react";
import { STORE_PHONE, whatsappLink } from "@/lib/store-info";

interface HelpStripProps {
  title: string;
  text: string;
  /** Pre-filled WhatsApp message */
  whatsappText: string;
  icon?: LucideIcon;
  className?: string;
}

/** Shared compact "need help?" card with Call and WhatsApp buttons, used at the end of pages. */
export function HelpStrip({ title, text, whatsappText, icon: Icon = MessageSquareText, className = "" }: HelpStripProps) {
  return (
    <div
      className={`rounded-2xl border border-[#F05323]/15 bg-gradient-to-br from-[#FFF5EE] to-white p-4 shadow-[0_4px_16px_rgba(240,83,35,0.06)] sm:px-6 sm:py-4 ${className}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#F05323] text-white shadow-[0_4px_10px_rgba(240,83,35,0.25)]">
            <Icon className="size-[18px]" />
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-snug text-stone-900 sm:font-serif sm:text-lg sm:font-normal">
              {title}
            </p>
            <p className="text-[12.5px] leading-snug text-stone-500 sm:text-sm">{text}</p>
          </div>
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex">
          <a
            href={`tel:${STORE_PHONE.tel}`}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-stone-300 bg-white px-4 text-[13px] font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-50 sm:text-sm"
          >
            <Phone className="size-3.5 text-[#F05323]" />
            <span className="sm:hidden">Call us</span>
            <span className="hidden sm:inline">{STORE_PHONE.display}</span>
          </a>
          <a
            href={whatsappLink(whatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#1DAA61] px-4 text-[13px] font-semibold text-white transition hover:bg-[#178F51] sm:px-5 sm:text-sm"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    </div>
  );
}
