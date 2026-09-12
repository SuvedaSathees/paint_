export function FlyingHardware() {
  return (
    <div className="flying-hardware absolute inset-0 z-30 pointer-events-none opacity-0 will-change-transform">
      {/* 1. Wooden-Handled Paint Brush with blue paint on bristles */}
      <div className="absolute -left-[32%] -top-[18%] w-[32%] sm:w-[36%] rotate-[-24deg] float-slow">
        <img
          src="/akshara-brush-blue.png"
          alt="Wooden-handled paint brush with blue paint on bristles"
          loading="eager"
          width={800}
          height={800}
          className="w-full h-auto object-contain filter drop-shadow-[0_16px_24px_rgba(0,0,0,0.22)]"
        />
      </div>

      {/* 2. Precision Screwdriver */}
      <div className="absolute -right-[26%] bottom-[6%] w-[30%] sm:w-[34%] rotate-[35deg] float-slow">
        <img
          src="/akshara-screwdriver.png"
          alt="Modern precision screwdriver with silver steel shaft"
          loading="eager"
          width={1024}
          height={1024}
          className="w-full h-auto object-contain filter drop-shadow-[0_14px_22px_rgba(0,0,0,0.20)]"
        />
      </div>

      {/* 3. Real High-Tensile Chrome Hex Bolt & Washer */}
      <div className="absolute -left-[24%] sm:-left-[28%] bottom-[3%] w-[28%] sm:w-[32%] rotate-[-10deg] float-reverse">
        <img
          src="/akshara-real-bolt.png"
          alt="Heavy-duty chrome hex bolt and washer"
          loading="eager"
          width={1024}
          height={1024}
          className="w-full h-auto object-contain mix-blend-multiply filter drop-shadow-[0_16px_24px_rgba(0,0,0,0.22)] contrast-[1.05]"
        />
      </div>

      {/* 4. Real Chrome Vanadium Adjustable Wrench */}
      <div className="absolute -right-[28%] sm:-right-[32%] -top-[8%] w-[34%] sm:w-[38%] rotate-[18deg] float-gentle">
        <img
          src="/akshara-real-wrench.png"
          alt="Professional chrome vanadium adjustable wrench"
          loading="eager"
          width={920}
          height={976}
          className="w-full h-auto object-contain filter drop-shadow-[0_18px_28px_rgba(0,0,0,0.22)]"
        />
      </div>
    </div>
  );
}
