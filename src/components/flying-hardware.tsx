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
    </div>
  );
}
