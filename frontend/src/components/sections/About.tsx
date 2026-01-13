import { CornerBracket, DotGrid } from "../ui/CyberElements";

const techStack = [
  { category: "FRONTEND", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "BACKEND", items: ["Node.js", "Python", "PostgreSQL", "MongoDB"] },
  { category: "TOOLS", items: ["Docker", "AWS", "Git", "Figma"] },
];

export const About = () => {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
      
      {/* Grid Lines */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="font-cyber text-accent text-sm tracking-[0.3em]">01</div>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent max-w-[100px]" />
          <h2 className="font-cyber text-2xl tracking-wider">ABOUT ME</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <div className="relative">
            {/* Decorations */}
            <CornerBracket position="top-left" className="absolute -top-4 -left-4 w-6 h-6" />
            <CornerBracket position="bottom-right" className="absolute -bottom-4 -right-4 w-6 h-6" />
            
            <div className="space-y-6 p-6 border border-border/50 bg-card/30 backdrop-blur-sm">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 pb-4 border-b border-border/50">
                <div className="w-3 h-3 rounded-full bg-cyber-red/50" />
                <div className="w-3 h-3 rounded-full bg-accent/50" />
                <div className="w-3 h-3 rounded-full bg-cyber-green/50" />
                <span className="ml-4 font-cyber text-[10px] text-text-muted">profile.sys</span>
              </div>

              <div className="space-y-4 text-text-secondary">
                <p className="leading-relaxed">
                  <span className="text-accent font-cyber text-sm">{'>'}</span> Hello! I'm a passionate 
                  <span className="text-text-primary"> Full Stack Developer </span> 
                  based in Bangkok, Thailand.
                </p>
                
                <p className="leading-relaxed">
                  <span className="text-accent font-cyber text-sm">{'>'}</span> With over 5 years of experience, 
                  I specialize in building modern web applications that combine 
                  <span className="text-accent"> elegant design </span> with 
                  <span className="text-accent"> robust functionality</span>.
                </p>

                <p className="leading-relaxed">
                  <span className="text-accent font-cyber text-sm">{'>'}</span> I believe in writing clean, 
                  maintainable code and staying updated with the latest technologies 
                  to deliver cutting-edge solutions.
                </p>

                <div className="pt-4 font-cyber text-[10px] text-text-muted">
                  <span className="text-cyber-green">█</span> CURSOR BLINKING...
                </div>
              </div>
            </div>
          </div>

          {/* Right: Tech Stack */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <DotGrid rows={2} cols={4} className="opacity-50" />
              <h3 className="font-cyber text-sm text-accent tracking-wider">TECH STACK</h3>
            </div>

            <div className="space-y-6">
              {techStack.map((stack) => (
                <div key={stack.category} className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-1 h-1 bg-accent" />
                    <span className="font-cyber text-xs text-text-muted tracking-wider">
                      {stack.category}
                    </span>
                    <div className="h-px flex-1 bg-border/50" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item) => (
                      <span
                        key={item}
                        className="px-4 py-2 border border-border/50 bg-card/50 text-sm text-text-secondary 
                                   hover:border-accent/50 hover:text-text-primary transition-colors cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Experience Timeline */}
            <div className="mt-12 pt-8 border-t border-border/30">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-1 bg-accent" />
                <span className="font-cyber text-xs text-text-muted tracking-wider">EXPERIENCE</span>
              </div>
              
              <div className="space-y-4">
                {[
                  { year: "2024-NOW", role: "Senior Developer", company: "Tech Corp" },
                  { year: "2021-2024", role: "Full Stack Dev", company: "Startup Inc" },
                  { year: "2019-2021", role: "Frontend Dev", company: "Agency Co" },
                ].map((exp, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="font-cyber text-[10px] text-accent w-24">{exp.year}</div>
                    <div className="w-px h-12 bg-border group-hover:bg-accent/50 transition-colors" />
                    <div>
                      <div className="text-text-primary">{exp.role}</div>
                      <div className="text-sm text-text-muted">{exp.company}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
