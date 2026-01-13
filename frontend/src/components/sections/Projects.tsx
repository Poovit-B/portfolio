import { useState } from "react";
import { CornerBracket } from "../ui/CyberElements";

const projects = [
  {
    id: 1,
    title: "NEXUS PLATFORM",
    category: "WEB APP",
    description: "A comprehensive dashboard for data visualization and analytics with real-time updates.",
    tech: ["React", "Node.js", "PostgreSQL", "WebSocket"],
    image: "/project-1.jpg",
    liveUrl: "#",
    githubUrl: "#",
    status: "DEPLOYED",
  },
  {
    id: 2,
    title: "CIPHER WALLET",
    category: "MOBILE APP",
    description: "Secure cryptocurrency wallet with biometric authentication and multi-chain support.",
    tech: ["React Native", "TypeScript", "Web3.js"],
    image: "/project-2.jpg",
    liveUrl: "#",
    githubUrl: "#",
    status: "LIVE",
  },
  {
    id: 3,
    title: "ECHO COMMERCE",
    category: "E-COMMERCE",
    description: "Full-featured e-commerce platform with AI-powered recommendations and inventory management.",
    tech: ["Next.js", "Stripe", "MongoDB", "Redis"],
    image: "/project-3.jpg",
    liveUrl: "#",
    githubUrl: "#",
    status: "DEPLOYED",
  },
  {
    id: 4,
    title: "QUANTUM API",
    category: "BACKEND",
    description: "High-performance REST API with GraphQL support, serving 1M+ requests daily.",
    tech: ["Python", "FastAPI", "Docker", "AWS"],
    image: "/project-4.jpg",
    liveUrl: "#",
    githubUrl: "#",
    status: "ACTIVE",
  },
];

export const Projects = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="font-cyber text-accent text-sm tracking-[0.3em]">02</div>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent max-w-[100px]" />
          <h2 className="font-cyber text-2xl tracking-wider">PROJECTS</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-accent/50">
                {/* Corner Decorations */}
                <CornerBracket position="top-left" className="absolute top-2 left-2 w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                <CornerBracket position="top-right" className="absolute top-2 right-2 w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                <CornerBracket position="bottom-left" className="absolute bottom-2 left-2 w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                <CornerBracket position="bottom-right" className="absolute bottom-2 right-2 w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />

                {/* Project Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-background-secondary to-card overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="font-cyber text-4xl text-border/50">0{index + 1}</div>
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className={`absolute inset-0 bg-accent/10 transition-opacity duration-300 ${hoveredId === project.id ? 'opacity-100' : 'opacity-0'}`} />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyber-green animate-pulse" />
                    <span className="font-cyber text-[10px] text-cyber-green">{project.status}</span>
                  </div>

                  {/* Category */}
                  <div className="absolute bottom-4 left-4">
                    <span className="font-cyber text-[10px] text-text-muted tracking-wider">{project.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="font-cyber text-lg text-text-primary tracking-wider group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 text-[10px] font-cyber text-accent/70 border border-accent/20 bg-accent/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border/30">
                    <a
                      href={project.liveUrl}
                      className="flex items-center gap-2 font-cyber text-[10px] text-text-muted hover:text-accent transition-colors"
                    >
                      <span className="w-1 h-1 bg-current" />
                      LIVE DEMO
                    </a>
                    <a
                      href={project.githubUrl}
                      className="flex items-center gap-2 font-cyber text-[10px] text-text-muted hover:text-accent transition-colors"
                    >
                      <span className="w-1 h-1 bg-current" />
                      SOURCE CODE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <a
            href="#"
            className="group relative px-8 py-4 border border-accent/50 font-cyber text-xs tracking-wider text-accent hover:bg-accent/10 transition-colors"
          >
            <span>VIEW ALL PROJECTS</span>
            <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
