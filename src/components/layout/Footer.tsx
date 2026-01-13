import { PixelHeart, PixelStar, PixelCoin } from "../ui/PixelElements";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 bg-background-secondary border-t-4 border-border">
      <div className="container mx-auto px-4">
        {/* Game Over Style */}
        <div className="text-center mb-8">
          <div className="font-pixel text-2xl text-accent crt-glow mb-2">
            THANKS FOR PLAYING!
          </div>
          <div className="font-retro text-xl text-text-secondary">
            You've reached the end of the demo.
          </div>
        </div>

        {/* Stats Summary */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <PixelStar />
            <span className="font-pixel text-[10px] text-text-muted">REPUTATION: MAX</span>
          </div>
          <div className="flex items-center gap-2">
            <PixelCoin />
            <span className="font-pixel text-[10px] text-text-muted">GOLD: 999,999</span>
          </div>
          <div className="flex items-center gap-2">
            <PixelHeart filled />
            <span className="font-pixel text-[10px] text-text-muted">LIVES: ∞</span>
          </div>
        </div>

        {/* Credits */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t-2 border-border">
          <div className="font-pixel text-[8px] text-text-muted">
            © {currentYear} POOVIT BANTON. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4">
            {["GITHUB", "LINKEDIN", "TWITTER"].map((social) => (
              <a
                key={social}
                href="#"
                className="font-pixel text-[8px] text-text-muted hover:text-accent transition-colors"
              >
                [{social}]
              </a>
            ))}
          </div>

          <div className="font-pixel text-[8px] text-text-muted flex items-center gap-2">
            MADE WITH <PixelHeart filled className="scale-75" /> IN BANGKOK
          </div>
        </div>

        {/* Insert Coin */}
        <div className="mt-8 text-center">
          <div className="font-pixel text-[10px] text-accent animate-pulse">
            INSERT COIN TO CONTINUE...
          </div>
        </div>
      </div>
    </footer>
  );
};
