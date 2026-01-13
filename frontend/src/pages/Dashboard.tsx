import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CornerBracket, DotGrid } from "../components/ui/CyberElements";
import {
  analyticsApi,
  healthApi,
  contactApi,
  authApi,
  type DashboardStats,
} from "../services/api";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [systemHealth, setSystemHealth] = useState<{
    status: string;
    uptime: number;
  } | null>(null);
  const [activeVisitors, setActiveVisitors] = useState(0);

  // Check auth
  useEffect(() => {
    if (!authApi.isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [dashboardData, unreadData, healthData, realtimeData] =
          await Promise.all([
            analyticsApi.getDashboard(30),
            contactApi.getUnreadCount(),
            healthApi.check(),
            analyticsApi.getRealTime(),
          ]);

        setStats(dashboardData);
        setUnreadMessages(unreadData.unreadCount);
        setSystemHealth(healthData);
        setActiveVisitors(realtimeData.activeVisitors);
      } catch (err: any) {
        console.error("Dashboard error:", err);
        setError(err.message || "Failed to load dashboard data");
        if (
          err.message?.includes("401") ||
          err.message?.includes("Unauthorized")
        ) {
          authApi.logout();
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [navigate]);

  // Logout handler
  const handleLogout = () => {
    authApi.logout();
    navigate("/login");
  };

  // Format uptime
  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  // Format time ago
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-cyber text-accent text-sm animate-pulse">
            LOADING DASHBOARD...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8 border border-red-500/50 bg-red-500/10 max-w-md">
          <p className="text-red-400 font-cyber text-sm mb-4">⚠ ERROR</p>
          <p className="text-text-muted text-sm mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 border border-accent text-accent font-cyber text-xs hover:bg-accent hover:text-background transition-colors"
          >
            RETRY
          </button>
        </div>
      </div>
    );
  }

  const summaryStats = [
    {
      label: "TOTAL VISITORS",
      value: stats?.summary.uniqueVisitors || 0,
      subValue: `${stats?.summary.totalViews || 0} page views`,
      color: "text-cyber-green",
    },
    {
      label: "AVG VIEWS/DAY",
      value: stats?.summary.avgViewsPerDay || 0,
      subValue: "Last 30 days",
      color: "text-accent",
    },
    {
      label: "TOTAL CLICKS",
      value: stats?.summary.totalClicks || 0,
      subValue: "Interactions tracked",
      color: "text-cyber-blue",
    },
    {
      label: "MESSAGES",
      value: unreadMessages,
      subValue: `${unreadMessages} unread`,
      color: unreadMessages > 0 ? "text-accent" : "text-text-muted",
    },
  ];

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
                    LIVE ANALYTICS
                  </div>
                </div>
              </div>
            </div>

            {/* Status & Time */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyber-green animate-pulse" />
                <span className="font-cyber text-[10px] text-cyber-green">
                  {activeVisitors} ACTIVE NOW
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
              <button
                onClick={handleLogout}
                className="px-3 py-1 border border-border/50 font-cyber text-[10px] text-text-muted hover:border-red-500/50 hover:text-red-400 transition-colors"
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summaryStats.map((stat) => (
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
                {stat.value.toLocaleString()}
              </div>
              <div className="text-text-muted text-xs mt-2">
                {stat.subValue}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Visitors */}
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
                RECENT VISITORS
              </h2>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {stats?.recentVisitors.length === 0 ? (
                <p className="text-text-muted text-sm text-center py-8">
                  No visitors yet
                </p>
              ) : (
                stats?.recentVisitors.map((visitor) => (
                  <div
                    key={visitor.id}
                    className="flex items-center gap-4 p-3 border border-border/30 hover:border-accent/30 transition-colors"
                  >
                    <div className="w-10 h-10 flex items-center justify-center border border-border/50 bg-background">
                      <span className="text-lg">
                        {visitor.device === "mobile"
                          ? "📱"
                          : visitor.device === "tablet"
                          ? "📲"
                          : "🖥️"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-text-primary text-sm truncate">
                        {visitor.path}
                      </div>
                      <div className="font-cyber text-[10px] text-text-muted">
                        {visitor.browser} • {visitor.os} • {visitor.device}
                      </div>
                    </div>
                    <div className="font-cyber text-[10px] text-text-muted whitespace-nowrap">
                      {formatTimeAgo(visitor.createdAt)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Top Pages */}
            <div className="relative p-6 border border-border/50 bg-card/30 backdrop-blur-sm">
              <CornerBracket
                position="top-left"
                className="absolute top-2 left-2 w-4 h-4"
              />
              <CornerBracket
                position="bottom-right"
                className="absolute bottom-2 right-2 w-4 h-4"
              />

              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/50">
                <span className="w-2 h-2 bg-cyber-blue" />
                <h2 className="font-cyber text-sm text-accent tracking-wider">
                  TOP PAGES
                </h2>
              </div>

              <div className="space-y-3">
                {stats?.viewsByPage.slice(0, 5).map((page, i) => (
                  <div
                    key={page.path}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-cyber text-[10px] text-text-muted">
                        {i + 1}.
                      </span>
                      <span className="text-text-primary text-sm truncate max-w-[150px]">
                        {page.path}
                      </span>
                    </div>
                    <span className="font-cyber text-xs text-accent">
                      {page.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Clicks */}
            <div className="relative p-6 border border-border/50 bg-card/30 backdrop-blur-sm">
              <CornerBracket
                position="top-left"
                className="absolute top-2 left-2 w-4 h-4"
              />
              <CornerBracket
                position="bottom-right"
                className="absolute bottom-2 right-2 w-4 h-4"
              />

              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/50">
                <span className="w-2 h-2 bg-cyber-green" />
                <h2 className="font-cyber text-sm text-accent tracking-wider">
                  TOP CLICKS
                </h2>
              </div>

              <div className="space-y-3">
                {stats?.topClicks.length === 0 ? (
                  <p className="text-text-muted text-sm text-center py-4">
                    No clicks tracked yet
                  </p>
                ) : (
                  stats?.topClicks.slice(0, 5).map((click) => (
                    <div
                      key={click.elementId}
                      className="flex items-center justify-between"
                    >
                      <span className="text-text-primary text-sm truncate max-w-[150px]">
                        {click.elementText || click.elementId}
                      </span>
                      <span className="font-cyber text-xs text-cyber-green">
                        {click.count}
                      </span>
                    </div>
                  ))
                )}
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

              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/50">
                <span
                  className={`w-2 h-2 ${
                    systemHealth?.status === "ok"
                      ? "bg-cyber-green"
                      : "bg-red-500"
                  }`}
                />
                <h2 className="font-cyber text-sm text-accent tracking-wider">
                  SYSTEM
                </h2>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-text-muted text-sm">API Status</span>
                  <span className="font-cyber text-xs text-cyber-green uppercase">
                    {systemHealth?.status || "UNKNOWN"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted text-sm">Uptime</span>
                  <span className="font-cyber text-xs text-accent">
                    {systemHealth ? formatUptime(systemHealth.uptime) : "-"}
                  </span>
                </div>
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
