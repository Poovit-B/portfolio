export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-secondary py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="text-text-secondary">
          © {currentYear} Your Name. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors">
            LinkedIn
          </a>
          <a href="mailto:your@email.com" className="text-text-secondary hover:text-accent transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

