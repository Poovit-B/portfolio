import { useState, useEffect } from "react";
import {
  PixelStar,
  PixelAvatar,
  DialogBox,
  PixelArrow,
} from "../ui/PixelElements";

export const Hero = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText =
    "Welcome to my portfolio! I'm a Full Stack Developer who loves creating awesome web experiences.";

  useEffect(() => {
    const timer = setTimeout(() => setShowDialog(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showDialog && typedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [showDialog, typedText]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden scanlines"
    >
      {/* Pixel Grid Background */}
      <div className="absolute inset-0 pixel-grid opacity-30" />

      {/* Floating Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <PixelStar
            key={i}
            className="absolute animate-pixel-float"
            style={
              {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0.3 + Math.random() * 0.4,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Character & Dialog */}
          <div className="flex flex-col items-center lg:items-start gap-8">
            {/* Character Avatar */}
            <div className="relative">
              <div className="w-48 h-48 relative animate-pixel-float">
                <PixelAvatar className="w-full h-full" />
                {/* Shadow */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/30 rounded-full blur-sm" />
              </div>

              {/* Level Badge */}
              <div className="absolute -top-2 -right-2 px-2 py-1 bg-pixel-yellow font-pixel text-[8px] text-background">
                LV.99
              </div>
            </div>

            {/* Dialog Box */}
            {showDialog && (
              <DialogBox speaker="POOVIT" className="max-w-md">
                {typedText}
                {typedText.length < fullText.length && (
                  <span className="text-accent">▌</span>
                )}
              </DialogBox>
            )}
          </div>

          {/* Right: Stats & Info */}
          <div className="space-y-8">
            {/* Title */}
            <div className="space-y-4">
              <div className="font-pixel text-[10px] text-pixel-yellow">
                {">"} PLAYER SELECT
              </div>

              <h1 className="space-y-2">
                <span className="block font-pixel text-2xl md:text-4xl text-text-primary">
                  POOVIT
                </span>
                <span className="block font-pixel text-2xl md:text-4xl text-accent crt-glow">
                  BANTON
                </span>
              </h1>

              <div className="font-retro text-2xl text-text-secondary">
                {"<<"} FULL STACK DEVELOPER {">>"}
              </div>
            </div>

            {/* Stats Box */}
            <div className="p-4 bg-card border-4 border-border space-y-3">
              <div className="font-pixel text-[10px] text-accent border-b-2 border-border pb-2">
                CHARACTER STATS
              </div>

              {[
                { stat: "FRONTEND", value: 95, color: "bg-pixel-blue" },
                { stat: "BACKEND", value: 88, color: "bg-pixel-red" },
                { stat: "DATABASE", value: 82, color: "bg-pixel-yellow" },
                { stat: "DEVOPS", value: 75, color: "bg-pixel-cyan" },
              ].map((item) => (
                <div key={item.stat} className="space-y-1">
                  <div className="flex justify-between font-pixel text-[8px]">
                    <span className="text-text-secondary">{item.stat}</span>
                    <span className="text-text-primary">{item.value}/100</span>
                  </div>
                  <div className="h-3 bg-border">
                    <div
                      className={`h-full ${item.color} transition-all duration-1000`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="pixel-btn">
                VIEW QUESTS
              </a>
              <a href="#contact" className="pixel-btn pixel-btn-secondary">
                SEND MESSAGE
              </a>
            </div>

            {/* Experience Points */}
            <div className="flex items-center gap-4 font-pixel text-[10px]">
              <div className="text-text-muted">EXP:</div>
              <div className="flex-1 h-4 bg-border border-2 border-text-muted">
                <div className="h-full bg-accent w-[85%]" />
              </div>
              <div className="text-accent">85%</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-pixel text-[8px] text-text-muted">
            SCROLL DOWN
          </span>
          <PixelArrow direction="down" className="text-accent animate-bounce" />
        </div>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-24 left-4 w-8 h-8 border-t-4 border-l-4 border-accent" />
      <div className="absolute top-24 right-4 w-8 h-8 border-t-4 border-r-4 border-accent" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-accent" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-accent" />
    </section>
  );
};
