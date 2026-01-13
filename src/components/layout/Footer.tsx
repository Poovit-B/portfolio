export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 border-t border-border/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-accent/50 rotate-45 flex items-center justify-center">
              <span className="font-cyber text-accent text-xs -rotate-45">P</span>
            </div>
            <span className="font-cyber text-xs text-text-muted tracking-wider">
              PORTFOLIO.SYS
            </span>
          </div>

          {/* Copyright */}
          <div className="font-cyber text-[10px] text-text-muted tracking-wider">
            © {currentYear} YOUR NAME. ALL RIGHTS RESERVED.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {["GITHUB", "LINKEDIN", "TWITTER"].map((social) => (
              <a
                key={social}
                href="#"
                className="font-cyber text-[10px] text-text-muted hover:text-accent transition-colors tracking-wider"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="mt-8 pt-4 border-t border-border/20 flex items-center justify-center gap-8 font-cyber text-[10px] text-text-muted/50">
          <span>BUILD: v2.0.{currentYear}</span>
          <span>|</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cyber-green/50 animate-pulse" />
            SYSTEM OPERATIONAL
          </span>
          <span>|</span>
          <span>MADE WITH {'<'}3</span>
        </div>
      </div>
    </footer>
  );
};
