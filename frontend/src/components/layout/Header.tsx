import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "HOME", href: "#home" },
  { name: "ABOUT", href: "#about" },
  { name: "PROJECTS", href: "#projects" },
  { name: "SKILLS", href: "#skills" },
  { name: "CONTACT", href: "#contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 border border-accent/50 rotate-45 group-hover:border-accent transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-cyber text-accent text-sm font-bold">P</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="font-cyber text-xs text-accent tracking-[0.3em]">PORTFOLIO</div>
              <div className="text-[10px] text-text-muted tracking-widest">DEVELOPER.SYS</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`relative px-4 py-2 font-cyber text-xs tracking-wider transition-colors ${
                    activeSection === link.href.slice(1)
                      ? "text-accent"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                  onClick={() => setActiveSection(link.href.slice(1))}
                >
                  {activeSection === link.href.slice(1) && (
                    <>
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent" />
                      <span className="absolute -bottom-1 left-4 right-4 h-px bg-accent/50" />
                    </>
                  )}
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Status Display & Dashboard Link */}
          <div className="hidden md:flex items-center gap-4">
            <div className="font-cyber text-[10px] text-text-muted">
              <span className="text-cyber-green">●</span> SYSTEM ONLINE
            </div>
            <div className="w-px h-4 bg-border" />
            <Link
              to="/dashboard"
              className="px-3 py-1.5 border border-accent/50 font-cyber text-[10px] text-accent hover:bg-accent/10 transition-colors tracking-wider"
            >
              DASHBOARD
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="space-y-1.5">
              <span
                className={`block w-6 h-0.5 bg-accent transition-transform ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-accent transition-opacity ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-accent transition-transform ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-border">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="block px-4 py-2 font-cyber text-xs tracking-wider text-text-secondary hover:text-accent transition-colors"
                    onClick={() => {
                      setActiveSection(link.href.slice(1));
                      setIsMenuOpen(false);
                    }}
                  >
                    <span className="text-accent mr-2">▸</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};
