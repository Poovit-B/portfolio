import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CornerBracket, DotGrid } from "../components/ui/CyberElements";

// Fake stats data
const stats = [
  {
    label: "TOTAL VISITORS",
    value: 12847,
    change: "+12.5%",
    color: "text-cyber-green",
  },
  {
    label: "PROJECTS VIEWED",
    value: 8432,
    change: "+8.2%",
    color: "text-accent",
  },
  {
    label: "CONTACT REQUESTS",
    value: 156,
    change: "+24.1%",
    color: "text-cyber-blue",
  },
  {
    label: "GITHUB CLICKS",
    value: 2341,
    change: "+5.7%",
    color: "text-accent",
  },
];

const recentActivity = [
  {
    time: "2 min ago",
    action: "New visitor from Bangkok, TH",
    type: "visitor",
  },
  { time: "15 min ago", action: "Project 'NEXUS' was viewed", type: "view" },
  { time: "1 hour ago", action: "Contact form submitted", type: "contact" },
  { time: "2 hours ago", action: "GitHub profile clicked", type: "click" },
  {
    time: "3 hours ago",
    action: "New visitor from Tokyo, JP",
    type: "visitor",
  },
  { time: "5 hours ago", action: "Resume downloaded", type: "download" },
];

const systemStatus = [
  { name: "Web Server", status: "ONLINE", uptime: "99.9%" },
  { name: "Database", status: "ONLINE", uptime: "99.8%" },
  { name: "CDN", status: "ONLINE", uptime: "100%" },
  { name: "API Gateway", status: "ONLINE", uptime: "99.7%" },
];

export const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Animate stats on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setAnimatedStats(
        stats.map((stat) => Math.floor((stat.value * step) / steps))
      );
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Header */}
      <header className="border-b border-border/50 bg-background-secondary/50 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Back */}
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors"
              >
                <span className="font-cyber text-xs">←</span>
                <span className="font-cyber text-xs tracking-wider">
                  BACK TO SITE
                </span>
              </Link>
              <div className="w-px h-6 bg-border" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-accent/50 rotate-45 flex items-center justify-center">
                  <span className="font-cyber text-accent text-xs -rotate-45">
                    D
                  </span>
                </div>
                <div>
                  <div className="font-cyber text-xs text-accent tracking-[0.2em]">
                    DASHBOARD
                  </div>
                  <div className="text-[10px] text-text-muted">
                    CONTROL.PANEL
                  </div>
                </div>
              </div>
            </div>

            {/* Status & Time */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyber-green animate-pulse" />
                <span className="font-cyber text-[10px] text-cyber-green">
                  ALL SYSTEMS OPERATIONAL
                </span>
              </div>
              <div className="w-px h-6 bg-border" />
              <div className="text-right">
                <div className="font-cyber text-xs text-accent">
                  {currentTime.toLocaleTimeString("en-US", { hour12: false })}
                </div>
                <div className="font-cyber text-[10px] text-text-muted">
                  {currentTime.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative p-6 border border-border/50 bg-card/30 backdrop-blur-sm group hover:border-accent/50 transition-colors"
            >
              <CornerBracket
                position="top-left"
                className="absolute top-2 left-2 w-3 h-3 opacity-30 group-hover:opacity-100"
              />
              <CornerBracket
                position="bottom-right"
                className="absolute bottom-2 right-2 w-3 h-3 opacity-30 group-hover:opacity-100"
              />

              <div className="font-cyber text-[10px] text-text-muted tracking-wider mb-2">
                {stat.label}
              </div>
              <div className={`font-cyber text-3xl ${stat.color}`}>
                {animatedStats[i].toLocaleString()}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-cyber-green text-sm">↑</span>
                <span className="text-cyber-green text-xs">{stat.change}</span>
                <span className="text-text-muted text-xs">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Activity Feed */}
          <div className="lg:col-span-2 relative p-6 border border-border/50 bg-card/30 backdrop-blur-sm">
            <CornerBracket
              position="top-left"
              className="absolute top-2 left-2 w-4 h-4"
            />
            <CornerBracket
              position="bottom-right"
              className="absolute bottom-2 right-2 w-4 h-4"
            />

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
              <span className="w-2 h-2 bg-accent animate-pulse" />
              <h2 className="font-cyber text-sm text-accent tracking-wider">
                RECENT ACTIVITY
              </h2>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-3 border border-border/30 hover:border-accent/30 transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center border border-border/50 bg-background">
                    <span className="text-accent text-sm">
                      {activity.type === "visitor" && "👤"}
                      {activity.type === "view" && "👁"}
                      {activity.type === "contact" && "✉"}
                      {activity.type === "click" && "🔗"}
                      {activity.type === "download" && "📥"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="text-text-primary text-sm">
                      {activity.action}
                    </div>
                    <div className="font-cyber text-[10px] text-text-muted">
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="relative p-6 border border-border/50 bg-card/30 backdrop-blur-sm">
            <CornerBracket
              position="top-left"
              className="absolute top-2 left-2 w-4 h-4"
            />
            <CornerBracket
              position="bottom-right"
              className="absolute bottom-2 right-2 w-4 h-4"
            />

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
              <span className="w-2 h-2 bg-cyber-green" />
              <h2 className="font-cyber text-sm text-accent tracking-wider">
                SYSTEM STATUS
              </h2>
            </div>

            <div className="space-y-4">
              {systemStatus.map((system) => (
                <div
                  key={system.name}
                  className="flex items-center justify-between p-3 border border-border/30"
                >
                  <div>
                    <div className="text-text-primary text-sm">
                      {system.name}
                    </div>
                    <div className="font-cyber text-[10px] text-text-muted">
                      Uptime: {system.uptime}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyber-green animate-pulse" />
                    <span className="font-cyber text-[10px] text-cyber-green">
                      {system.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-border/50">
              <div className="font-cyber text-[10px] text-text-muted mb-4">
                QUICK ACTIONS
              </div>
              <div className="grid grid-cols-2 gap-2">
                {["ANALYTICS", "SETTINGS", "LOGS", "EXPORT"].map((action) => (
                  <button
                    key={action}
                    className="p-3 border border-border/50 font-cyber text-[10px] text-text-muted hover:border-accent/50 hover:text-accent transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer decoration */}
        <div className="flex justify-center mt-12">
          <DotGrid rows={2} cols={12} className="opacity-30" />
        </div>
      </main>
    </div>
  );
};
