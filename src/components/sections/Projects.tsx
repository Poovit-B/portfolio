import { useState } from "react";
import { PixelStar, PixelCoin, PixelArrow } from "../ui/PixelElements";

const projects = [
  {
    id: 1,
    title: "NEXUS QUEST",
    type: "WEB APP",
    description: "An epic dashboard for data visualization. Real-time updates included!",
    tech: ["React", "Node.js", "WebSocket"],
    difficulty: "★★★★☆",
    reward: "5000 XP",
    status: "COMPLETED",
  },
  {
    id: 2,
    title: "CRYPTO DUNGEON",
    type: "MOBILE APP",
    description: "Secure crypto wallet with biometric auth. Guard your treasures!",
    tech: ["React Native", "Web3.js"],
    difficulty: "★★★★★",
    reward: "8000 XP",
    status: "COMPLETED",
  },
  {
    id: 3,
    title: "SHOP KINGDOM",
    type: "E-COMMERCE",
    description: "Full-featured marketplace with AI recommendations. Buy & sell!",
    tech: ["Next.js", "Stripe", "MongoDB"],
    difficulty: "★★★☆☆",
    reward: "4000 XP",
    status: "COMPLETED",
  },
  {
    id: 4,
    title: "API FORTRESS",
    type: "BACKEND",
    description: "High-performance REST API serving 1M+ requests daily. Indestructible!",
    tech: ["Python", "FastAPI", "Docker"],
    difficulty: "★★★★☆",
    reward: "6000 XP",
    status: "COMPLETED",
  },
];

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pixel-grid opacity-10" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Title */}
        <div className="flex items-center gap-4 mb-12">
          <div className="font-pixel text-[10px] text-pixel-yellow">{'>'}</div>
          <h2 className="font-pixel text-lg text-accent">QUEST_LOG.DAT</h2>
          <div className="flex-1 h-1 bg-border" style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--color-border) 0 8px, transparent 8px 16px)" }} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quest List */}
          <div className="lg:col-span-1 space-y-3">
            <div className="font-pixel text-[8px] text-text-muted mb-4">
              SELECT A QUEST TO VIEW DETAILS
            </div>

            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`w-full p-3 text-left border-4 transition-all ${
                  selectedProject.id === project.id
                    ? "bg-accent/20 border-accent"
                    : "bg-card border-border hover:border-accent/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-pixel text-[10px] text-text-primary">
                      {project.title}
                    </div>
                    <div className="font-retro text-sm text-text-muted">
                      {project.type}
                    </div>
                  </div>
                  {selectedProject.id === project.id && (
                    <PixelArrow direction="right" className="text-accent" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Quest Details */}
          <div className="lg:col-span-2">
            <div className="p-6 bg-card border-4 border-accent">
              {/* Quest Header */}
              <div className="flex items-start justify-between mb-6 pb-4 border-b-4 border-border">
                <div>
                  <div className="font-pixel text-[8px] text-accent mb-1">
                    QUEST #{selectedProject.id.toString().padStart(3, "0")}
                  </div>
                  <h3 className="font-pixel text-xl text-text-primary">
                    {selectedProject.title}
                  </h3>
                  <div className="font-retro text-lg text-text-muted">
                    {selectedProject.type}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-pixel text-[8px] text-pixel-yellow">
                    {selectedProject.difficulty}
                  </div>
                  <div className="font-pixel text-[10px] text-accent mt-1 flex items-center gap-1">
                    <PixelCoin className="scale-75" />
                    {selectedProject.reward}
                  </div>
                </div>
              </div>

              {/* Quest Description */}
              <div className="mb-6">
                <div className="font-pixel text-[8px] text-text-muted mb-2">
                  {'>'} MISSION BRIEFING
                </div>
                <p className="font-retro text-xl text-text-secondary leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Tech Used */}
              <div className="mb-6">
                <div className="font-pixel text-[8px] text-text-muted mb-2">
                  {'>'} REQUIRED SKILLS
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-background border-2 border-accent font-pixel text-[8px] text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between pt-4 border-t-4 border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent animate-pulse" />
                  <span className="font-pixel text-[10px] text-accent">
                    {selectedProject.status}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button className="pixel-btn pixel-btn-secondary text-[8px]">
                    VIEW DEMO
                  </button>
                  <button className="pixel-btn text-[8px]">
                    VIEW CODE
                  </button>
                </div>
              </div>

              {/* Rewards Preview */}
              <div className="mt-6 p-4 bg-background border-2 border-border">
                <div className="font-pixel text-[8px] text-pixel-yellow mb-2">
                  REWARDS EARNED:
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <PixelStar />
                    <span className="font-retro text-text-secondary">+500 REP</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <PixelCoin />
                    <span className="font-retro text-text-secondary">+{selectedProject.reward}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <button className="pixel-btn">
            VIEW ALL QUESTS
          </button>
        </div>
      </div>
    </section>
  );
};
