// Cyberpunk UI decorative elements

export const Crosshair = ({ className = "" }: { className?: string }) => (
  <svg
    className={`text-text-muted ${className}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
  >
    <line x1="12" y1="0" x2="12" y2="8" />
    <line x1="12" y1="16" x2="12" y2="24" />
    <line x1="0" y1="12" x2="8" y2="12" />
    <line x1="16" y1="12" x2="24" y2="12" />
  </svg>
);

export const DotGrid = ({
  rows = 5,
  cols = 5,
  className = "",
}: {
  rows?: number;
  cols?: number;
  className?: string;
}) => (
  <div
    className={`grid gap-2 ${className}`}
    style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
  >
    {Array.from({ length: rows * cols }).map((_, i) => (
      <div
        key={i}
        className="w-1 h-1 rounded-full bg-text-muted/50"
        style={{ animationDelay: `${i * 0.05}s` }}
      />
    ))}
  </div>
);

export const CornerBracket = ({
  position,
  className = "",
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}) => {
  const rotations = {
    "top-left": "rotate-0",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "-rotate-90",
  };

  return (
    <svg
      className={`text-accent/30 ${rotations[position]} ${className}`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M0 20 L0 0 L20 0" />
    </svg>
  );
};

export const HexagonFrame = ({ className = "" }: { className?: string }) => (
  <svg
    className={`text-accent/20 ${className}`}
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.5"
  >
    <polygon points="50,2 95,27 95,73 50,98 5,73 5,27" />
    <polygon
      points="50,10 85,30 85,70 50,90 15,70 15,30"
      strokeDasharray="5,5"
    />
  </svg>
);

export const CircleTarget = ({ className = "" }: { className?: string }) => (
  <svg className={`${className}`} viewBox="0 0 200 200" fill="none">
    <circle
      cx="100"
      cy="100"
      r="95"
      stroke="currentColor"
      strokeWidth="0.5"
      className="text-border"
    />
    <circle
      cx="100"
      cy="100"
      r="80"
      stroke="currentColor"
      strokeWidth="0.5"
      className="text-accent/30"
      strokeDasharray="10,5"
    />
    <circle
      cx="100"
      cy="100"
      r="60"
      stroke="currentColor"
      strokeWidth="0.5"
      className="text-accent/20"
    />
    {/* Tick marks */}
    {Array.from({ length: 36 }).map((_, i) => {
      const angle = (i * 10 * Math.PI) / 180;
      const x1 = 100 + 90 * Math.cos(angle);
      const y1 = 100 + 90 * Math.sin(angle);
      const x2 = 100 + (i % 3 === 0 ? 82 : 86) * Math.cos(angle);
      const y2 = 100 + (i % 3 === 0 ? 82 : 86) * Math.sin(angle);
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-text-muted/50"
        />
      );
    })}
  </svg>
);

export const DataLine = ({ className = "" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent/50 rotate-45" />
  </div>
);

export const StatusIndicator = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) => (
  <div className={`font-cyber text-[10px] ${className}`}>
    <span className="text-text-muted">{label}</span>
    <span className="text-accent ml-2">{value}</span>
  </div>
);

export const GlitchText = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span className={`relative inline-block ${className}`}>
    <span className="relative z-10">{children}</span>
    <span
      className="absolute top-0 left-0 -translate-x-[2px] text-cyber-red/50 z-0"
      aria-hidden="true"
    >
      {children}
    </span>
    <span
      className="absolute top-0 left-0 translate-x-[2px] text-cyber-blue/50 z-0"
      aria-hidden="true"
    >
      {children}
    </span>
  </span>
);
