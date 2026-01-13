import { PixelBox, PixelHeart, PixelStar, PixelCoin } from "../ui/PixelElements";

const inventory = [
  { name: "React.js", icon: "⚛️", rarity: "LEGENDARY" },
  { name: "TypeScript", icon: "📘", rarity: "EPIC" },
  { name: "Node.js", icon: "🟢", rarity: "EPIC" },
  { name: "Python", icon: "🐍", rarity: "RARE" },
  { name: "PostgreSQL", icon: "🐘", rarity: "RARE" },
  { name: "Docker", icon: "🐳", rarity: "EPIC" },
  { name: "AWS", icon: "☁️", rarity: "LEGENDARY" },
  { name: "Git", icon: "📦", rarity: "COMMON" },
];

const rarityColors: Record<string, string> = {
  LEGENDARY: "text-pixel-yellow",
  EPIC: "text-accent-secondary",
  RARE: "text-pixel-blue",
  COMMON: "text-text-secondary",
};

export const About = () => {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background-secondary pixel-grid opacity-20" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Title */}
        <div className="flex items-center gap-4 mb-12">
          <div className="font-pixel text-[10px] text-pixel-yellow">{'>'}</div>
          <h2 className="font-pixel text-lg text-accent">ABOUT_ME.TXT</h2>
          <div className="flex-1 h-1 bg-border" style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--color-border) 0 8px, transparent 8px 16px)" }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Bio Terminal */}
          <div className="space-y-6">
            <PixelBox className="bg-background">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 pb-3 mb-3 border-b-2 border-border">
                <div className="w-3 h-3 bg-pixel-red" />
                <div className="w-3 h-3 bg-pixel-yellow" />
                <div className="w-3 h-3 bg-accent" />
                <span className="ml-2 font-pixel text-[8px] text-text-muted">bio.exe</span>
              </div>

              <div className="font-retro text-lg space-y-4 text-text-secondary">
                <p>
                  <span className="text-accent">$</span> Hello World! I'm{" "}
                  <span className="text-text-primary">Poovit Banton</span>, a passionate developer from Bangkok, Thailand.
                </p>
                <p>
                  <span className="text-accent">$</span> I've been coding for{" "}
                  <span className="text-pixel-yellow">5+ years</span>, turning caffeine into code and bugs into features.
                </p>
                <p>
                  <span className="text-accent">$</span> I love building{" "}
                  <span className="text-pixel-blue">interactive experiences</span> and solving complex problems.
                </p>
                <p>
                  <span className="text-accent">$</span> When not coding, I'm probably playing video games or exploring new tech.
                  <span className="blink ml-1 inline-block w-2 h-4 bg-accent" />
                </p>
              </div>
            </PixelBox>

            {/* Achievement Badges */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <PixelHeart filled />, label: "50+ PROJECTS", value: "COMPLETED" },
                { icon: <PixelStar />, label: "30+ CLIENTS", value: "SATISFIED" },
                { icon: <PixelCoin />, label: "5+ YEARS", value: "EXPERIENCE" },
              ].map((badge, i) => (
                <div key={i} className="p-3 bg-card border-4 border-border text-center">
                  <div className="flex justify-center mb-2 scale-150">{badge.icon}</div>
                  <div className="font-pixel text-[8px] text-accent">{badge.label}</div>
                  <div className="font-retro text-xs text-text-muted">{badge.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Inventory */}
          <div className="space-y-4">
            <div className="font-pixel text-[10px] text-text-muted flex items-center gap-2">
              <span className="text-pixel-yellow">{'>'}</span> SKILL INVENTORY
            </div>

            <div className="p-4 bg-card border-4 border-border">
              <div className="grid grid-cols-4 gap-3">
                {inventory.map((item) => (
                  <div
                    key={item.name}
                    className="group relative p-3 bg-background border-2 border-border hover:border-accent transition-colors cursor-pointer"
                  >
                    <div className="text-2xl text-center mb-1">{item.icon}</div>
                    <div className="font-pixel text-[6px] text-center text-text-muted truncate">
                      {item.name}
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-background border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      <div className="font-pixel text-[8px] text-text-primary">{item.name}</div>
                      <div className={`font-pixel text-[6px] ${rarityColors[item.rarity]}`}>
                        [{item.rarity}]
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inventory Stats */}
              <div className="mt-4 pt-3 border-t-2 border-border flex justify-between font-pixel text-[8px] text-text-muted">
                <span>SLOTS: 8/16</span>
                <span className="text-pixel-yellow">EQUIPPED: 8</span>
              </div>
            </div>

            {/* Quest Log Preview */}
            <div className="p-4 bg-card border-4 border-border">
              <div className="font-pixel text-[10px] text-pixel-yellow mb-3">
                {'>'} CURRENT QUESTS
              </div>
              {[
                { quest: "Build awesome portfolios", status: "IN PROGRESS", progress: 80 },
                { quest: "Learn new frameworks", status: "ONGOING", progress: 65 },
                { quest: "Help other developers", status: "ACTIVE", progress: 90 },
              ].map((q, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <div className="flex justify-between font-retro text-sm">
                    <span className="text-text-primary">{q.quest}</span>
                    <span className="text-accent text-xs">{q.status}</span>
                  </div>
                  <div className="mt-1 h-2 bg-border">
                    <div className="h-full bg-accent" style={{ width: `${q.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
