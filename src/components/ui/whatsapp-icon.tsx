import React from "react";

interface WhatsAppIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  variant?: "color" | "white" | "inverted";
}

/**
 * Official WhatsApp Brand Icon
 *
 * Variants:
 * - "color": Iconic WhatsApp green (#25D366) speech bubble with crisp white handset
 * - "white": Pure white silhouette for use on dark/colored buttons
 * - "inverted": Solid white speech bubble with WhatsApp green handset
 */
export function WhatsAppIcon({
  className = "size-5",
  variant = "color",
  ...props
}: WhatsAppIconProps) {
  const bubbleFill =
    variant === "color" ? "#25D366" : variant === "white" ? "#FFFFFF" : "#FFFFFF";
  const phoneFill =
    variant === "color" ? "#FFFFFF" : variant === "white" ? "currentColor" : "#25D366";

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* WhatsApp Speech Bubble with Tail */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.83.498 3.55 1.365 5.034L2.062 21.65a.502.502 0 0 0 .618.618l4.614-1.306A9.95 9.95 0 0 0 12.004 22c5.523 0 10.003-4.48 10.003-9.996C22.007 6.48 17.527 2 12.004 2z"
        fill={bubbleFill}
      />
      {/* Handset Receiver */}
      <path
        d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.301-.776.978-.952 1.179-.175.2-.35.226-.651.075s-1.272-.469-2.423-1.496c-.896-.799-1.501-1.787-1.677-2.088-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.629-.927-2.23-.244-.587-.493-.507-.677-.517-.175-.008-.376-.01-.576-.01s-.526.075-.802.376c-.276.301-1.053 1.028-1.053 2.508s1.078 2.909 1.228 3.109c.15.201 2.122 3.24 5.141 4.544 3.019 1.304 3.019.869 3.57.819.551-.05 1.78-.727 2.03-1.429.25-.702.25-1.304.175-1.429-.075-.125-.276-.201-.577-.351z"
        fill={phoneFill}
      />
    </svg>
  );
}

/**
 * Premium WhatsApp App Badge
 * Recreates the official iOS/Android squircle badge with subtle depth,
 * realistic emerald gradient, white speech bubble and green handset.
 */
export function WhatsAppBadge({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "size-8 rounded-xl p-1.5",
    md: "size-10 rounded-2xl p-2",
    lg: "size-12 rounded-2xl p-2.5",
  }[size];

  const iconSizes = {
    sm: "size-full",
    md: "size-full",
    lg: "size-full",
  }[size];

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center bg-gradient-to-br from-[#25D366] via-[#20BD5A] to-[#128C7E] shadow-[0_4px_14px_rgba(37,211,102,0.35)] ring-1 ring-white/25 ${sizeClasses} ${className}`}
    >
      {/* Subtle glass reflection highlight */}
      <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-t from-transparent via-white/10 to-white/20 pointer-events-none" />
      <WhatsAppIcon variant="inverted" className={`${iconSizes} drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]`} />
    </div>
  );
}
