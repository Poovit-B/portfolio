import { useEffect, useRef } from "react";
import {
  Crosshair,
  DotGrid,
  CircleTarget,
  CornerBracket,
} from "../ui/CyberElements";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;

      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-50" />

        {/* Decorative Circle */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[600px] h-[600px] opacity-30">
          <CircleTarget className="w-full h-full animate-rotate-slow" />
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-24 left-8">
          <CornerBracket position="top-left" className="w-8 h-8" />
        </div>
        <div className="absolute top-24 right-8">
          <CornerBracket position="top-right" className="w-8 h-8" />
        </div>
        <div className="absolute bottom-8 left-8">
          <CornerBracket position="bottom-left" className="w-8 h-8" />
        </div>
        <div className="absolute bottom-8 right-8">
          <CornerBracket position="bottom-right" className="w-8 h-8" />
        </div>

        {/* Crosshairs */}
        <Crosshair className="absolute top-[20%] left-[15%] opacity-30" />
        <Crosshair className="absolute bottom-[30%] right-[20%] opacity-30" />
        <Crosshair className="absolute top-[60%] left-[10%] opacity-20" />

        {/* Dot Grids */}
        <DotGrid
          rows={6}
          cols={6}
          className="absolute top-32 left-12 opacity-40"
        />
        <DotGrid
          rows={4}
          cols={8}
          className="absolute bottom-32 right-12 opacity-40"
        />
        <DotGrid
          rows={3}
          cols={3}
          className="absolute top-1/2 left-1/4 opacity-30"
        />

        {/* Vertical Lines */}
        <div className="absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-border to-transparent opacity-30" />
        <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-border to-transparent opacity-30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            {/* Status Bar */}
            <div className="flex items-center gap-4 font-cyber text-[10px] text-text-muted">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyber-green animate-pulse" />
                ACTIVE
              </span>
              <span className="text-border">|</span>
              <span>LOCATION: BANGKOK, TH</span>
              <span className="text-border">|</span>
              <span>ID: DEV-2026</span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <div className="overflow-hidden">
                <h2 className="font-cyber text-sm text-accent tracking-[0.3em] animate-slide-up">
                  FULL STACK DEVELOPER
                </h2>
              </div>

              <div className="relative">
                <h1 className="text-6xl md:text-8xl font-black leading-none">
                  <span className="block text-text-primary">POOVIT</span>
                  <span className="block text-gradient font-cyber tracking-wider">
                    BANTON
                  </span>
                </h1>

                {/* Background Text */}
                <div className="absolute -top-4 -left-4 font-cyber text-[120px] md:text-[180px] font-black text-border/20 leading-none -z-10 select-none">
                  DEV
                </div>
              </div>

              {/* Tagline */}
              <p className="text-xl text-text-secondary max-w-md leading-relaxed">
                Crafting{" "}
                <span className="text-accent">digital experiences</span> with
                cutting-edge technology and creative innovation.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-accent text-background font-cyber text-xs tracking-wider hover:bg-accent/90 transition-colors"
              >
                <span className="relative z-10">VIEW PROJECTS</span>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-background/30" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-background/30" />
              </a>

              <a
                href="#contact"
                className="group relative px-8 py-4 border border-accent/50 text-accent font-cyber text-xs tracking-wider hover:bg-accent/10 transition-colors"
              >
                <span className="relative z-10">CONTACT ME</span>
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-accent/30" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-accent/30" />
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {[
                { value: "5+", label: "YEARS EXP" },
                { value: "50+", label: "PROJECTS" },
                { value: "30+", label: "CLIENTS" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-cyber text-3xl text-accent">
                    {stat.value}
                  </div>
                  <div className="font-cyber text-[10px] text-text-muted tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual Element */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Placeholder for 3D Model or Image */}
            <div className="relative w-[500px] h-[500px]">
              {/* Outer Ring */}
              <div className="absolute inset-0 border border-border/50 rounded-full animate-rotate-slow" />

              {/* Inner Ring */}
              <div
                className="absolute inset-8 border border-accent/30 rounded-full"
                style={{ animationDirection: "reverse" }}
              />

              {/* Center Content - Profile Image */}
              <div className="absolute inset-16 bg-gradient-to-br from-card to-background rounded-full flex items-center justify-center overflow-hidden">
                {/* Profile Image - เปลี่ยน src เป็นรูปของคุณ */}
                <img
                  src="/profile.jpg"
                  alt="Poovit Banton"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback ถ้าไม่มีรูป
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling?.classList.remove(
                      "hidden"
                    );
                  }}
                />
                {/* Fallback Icon */}
                <div className="hidden text-center">
                  <div className="font-cyber text-6xl text-accent glow-text">
                    {"</>"}
                  </div>
                  <div className="font-cyber text-xs text-text-muted mt-4 tracking-widest">
                    CODE.EXECUTE
                  </div>
                </div>

                {/* Scanline Effect */}
                <div className="absolute inset-0 scanline opacity-50" />
              </div>

              {/* Floating Elements */}
              <div className="absolute top-10 right-10 font-cyber text-[10px] text-text-muted">
                <div>POLYMATH</div>
                <div className="text-accent">▼</div>
              </div>

              <div className="absolute bottom-20 left-0 font-cyber text-[10px] text-text-muted text-right">
                <div>SYS.INIT</div>
                <div className="text-cyber-green">READY</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="font-cyber text-[10px] text-text-muted tracking-widest">
          SCROLL
        </div>
        <div className="w-px h-8 bg-gradient-to-b from-accent to-transparent animate-pulse" />
      </div>
    </section>
  );
};
