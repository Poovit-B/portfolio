import { useState, useEffect } from "react";
import { PixelHeart, PixelCoin } from "../ui/PixelElements";

const navLinks = [
  { name: "HOME", href: "#home", key: "H" },
  { name: "ABOUT", href: "#about", key: "A" },
  { name: "SKILLS", href: "#skills", key: "S" },
  { name: "WORKS", href: "#projects", key: "W" },
  { name: "CONTACT", href: "#contact", key: "C" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [score, setScore] = useState(99999);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fun score counter
  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prev) => prev + Math.floor(Math.random() * 10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95" : "bg-transparent"
      }`}
    >
      {/* Top Stats Bar */}
      <div className="bg-background-secondary border-b-4 border-border py-2 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <PixelHeart filled />
              <PixelHeart filled />
              <PixelHeart filled />
            </div>
            <span className="font-pixel text-[10px] text-pixel-red">x3</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] text-text-muted">SCORE:</span>
            <span className="font-pixel text-[10px] text-pixel-yellow">{score.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <PixelCoin />
            <span className="font-pixel text-[10px] text-pixel-orange">x999</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent flex items-center justify-center pixel-border-accent">
              <span className="font-pixel text-background text-sm">PB</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-pixel text-[10px] text-accent">POOVIT.DEV</div>
              <div className="font-retro text-sm text-text-muted">LEVEL 99 DEVELOPER</div>
            </div>
          </a>

          {/* Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="group px-3 py-2 font-pixel text-[10px] text-text-secondary hover:text-accent transition-colors flex items-center gap-2"
                >
                  <span className="text-text-muted group-hover:text-pixel-yellow">[{link.key}]</span>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Status */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent animate-pulse" />
              <span className="font-pixel text-[8px] text-accent">ONLINE</span>
            </div>
          </div>

          {/* Mobile Menu */}
          <button className="md:hidden font-pixel text-[10px] text-accent px-3 py-2 pixel-border-accent">
            MENU
          </button>
        </div>
      </nav>
    </header>
  );
};
