// Pixel Art UI Elements

export const PixelHeart = ({
  filled = true,
  className = "",
}: {
  filled?: boolean;
  className?: string;
}) => (
  <div className={`inline-block ${className}`}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="3"
        y="2"
        width="2"
        height="2"
        fill={filled ? "#ff004d" : "#4a6fa5"}
      />
      <rect
        x="5"
        y="2"
        width="2"
        height="2"
        fill={filled ? "#ff004d" : "#4a6fa5"}
      />
      <rect
        x="9"
        y="2"
        width="2"
        height="2"
        fill={filled ? "#ff004d" : "#4a6fa5"}
      />
      <rect
        x="11"
        y="2"
        width="2"
        height="2"
        fill={filled ? "#ff004d" : "#4a6fa5"}
      />
      <rect
        x="2"
        y="4"
        width="2"
        height="2"
        fill={filled ? "#ff004d" : "#4a6fa5"}
      />
      <rect
        x="4"
        y="4"
        width="2"
        height="2"
        fill={filled ? "#ff77a8" : "#7ec8e3"}
      />
      <rect
        x="6"
        y="4"
        width="2"
        height="2"
        fill={filled ? "#ff004d" : "#4a6fa5"}
      />
      <rect
        x="8"
        y="4"
        width="2"
        height="2"
        fill={filled ? "#ff004d" : "#4a6fa5"}
      />
      <rect
        x="10"
        y="4"
        width="2"
        height="2"
        fill={filled ? "#ff004d" : "#4a6fa5"}
      />
      <rect
        x="12"
        y="4"
        width="2"
        height="2"
        fill={filled ? "#ff004d" : "#4a6fa5"}
      />
      <rect
        x="2"
        y="6"
        width="12"
        height="2"
        fill={filled ? "#ff004d" : "#4a6fa5"}
      />
      <rect
        x="3"
        y="8"
        width="10"
        height="2"
        fill={filled ? "#ff004d" : "#4a6fa5"}
      />
      <rect
        x="4"
        y="10"
        width="8"
        height="2"
        fill={filled ? "#ff004d" : "#4a6fa5"}
      />
      <rect
        x="5"
        y="12"
        width="6"
        height="2"
        fill={filled ? "#ff004d" : "#4a6fa5"}
      />
      <rect
        x="7"
        y="14"
        width="2"
        height="2"
        fill={filled ? "#ff004d" : "#4a6fa5"}
      />
    </svg>
  </div>
);

export const PixelStar = ({ className = "" }: { className?: string }) => (
  <div className={`inline-block ${className}`}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="7" y="0" width="2" height="2" fill="#ffec27" />
      <rect x="7" y="2" width="2" height="2" fill="#ffec27" />
      <rect x="5" y="4" width="6" height="2" fill="#ffec27" />
      <rect x="0" y="6" width="16" height="2" fill="#ffec27" />
      <rect x="2" y="8" width="12" height="2" fill="#ffec27" />
      <rect x="3" y="10" width="4" height="2" fill="#ffec27" />
      <rect x="9" y="10" width="4" height="2" fill="#ffec27" />
      <rect x="2" y="12" width="3" height="2" fill="#ffec27" />
      <rect x="11" y="12" width="3" height="2" fill="#ffec27" />
    </svg>
  </div>
);

export const PixelArrow = ({
  direction = "right",
  className = "",
}: {
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) => {
  const rotations = {
    up: "rotate-[-90deg]",
    down: "rotate-90",
    left: "rotate-180",
    right: "",
  };

  return (
    <div className={`inline-block ${rotations[direction]} ${className}`}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <rect x="2" y="7" width="8" height="2" />
        <rect x="8" y="5" width="2" height="6" />
        <rect x="10" y="6" width="2" height="4" />
        <rect x="12" y="7" width="2" height="2" />
      </svg>
    </div>
  );
};

export const PixelCoin = ({ className = "" }: { className?: string }) => (
  <div className={`inline-block animate-pixel-float ${className}`}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="4" y="1" width="8" height="2" fill="#ffa300" />
      <rect x="2" y="3" width="2" height="2" fill="#ffa300" />
      <rect x="4" y="3" width="8" height="2" fill="#ffec27" />
      <rect x="12" y="3" width="2" height="2" fill="#ffa300" />
      <rect x="2" y="5" width="2" height="6" fill="#ffa300" />
      <rect x="4" y="5" width="8" height="6" fill="#ffec27" />
      <rect x="6" y="5" width="2" height="6" fill="#ffa300" />
      <rect x="12" y="5" width="2" height="6" fill="#ffa300" />
      <rect x="2" y="11" width="2" height="2" fill="#ffa300" />
      <rect x="4" y="11" width="8" height="2" fill="#ffec27" />
      <rect x="12" y="11" width="2" height="2" fill="#ffa300" />
      <rect x="4" y="13" width="8" height="2" fill="#ffa300" />
    </svg>
  </div>
);

export const PixelBox = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`relative p-4 bg-card pixel-border ${className}`}>
    {/* Corner pixels */}
    <div className="absolute -top-1 -left-1 w-2 h-2 bg-accent" />
    <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent" />
    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-accent" />
    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-accent" />
    {children}
  </div>
);

export const PixelProgress = ({
  value,
  max = 100,
  className = "",
}: {
  value: number;
  max?: number;
  className?: string;
}) => {
  const percentage = (value / max) * 100;
  const blocks = Math.floor(percentage / 10);

  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className={`w-4 h-6 ${i < blocks ? "bg-accent" : "bg-border"}`}
          style={{
            boxShadow:
              i < blocks
                ? "inset -2px -2px 0 #008f11"
                : "inset -2px -2px 0 #1a1a2e",
          }}
        />
      ))}
    </div>
  );
};

export const PixelAvatar = ({ className = "" }: { className?: string }) => (
  <div className={`${className}`}>
    <svg
      width="64"
      height="64"
      viewBox="0 0 16 16"
      fill="none"
      className="w-full h-full"
    >
      {/* Hair */}
      <rect x="4" y="1" width="8" height="2" fill="#4a3728" />
      <rect x="3" y="2" width="10" height="2" fill="#4a3728" />
      {/* Face */}
      <rect x="4" y="4" width="8" height="2" fill="#ffcc99" />
      <rect x="3" y="6" width="10" height="4" fill="#ffcc99" />
      {/* Eyes */}
      <rect x="5" y="6" width="2" height="2" fill="#000" />
      <rect x="9" y="6" width="2" height="2" fill="#000" />
      {/* Mouth */}
      <rect x="6" y="9" width="4" height="1" fill="#ff6666" />
      {/* Body */}
      <rect x="4" y="10" width="8" height="2" fill="#29adff" />
      <rect x="2" y="12" width="12" height="4" fill="#29adff" />
    </svg>
  </div>
);

export const DialogBox = ({
  children,
  speaker,
  className = "",
}: {
  children: React.ReactNode;
  speaker?: string;
  className?: string;
}) => (
  <div className={`relative ${className}`}>
    {speaker && (
      <div className="absolute -top-3 left-4 px-2 bg-background font-pixel text-[10px] text-accent">
        {speaker}
      </div>
    )}
    <div className="p-4 bg-background border-4 border-text-primary">
      <div className="font-retro text-lg leading-relaxed">
        {children}
        <span className="inline-block w-3 h-4 bg-text-primary ml-1 blink" />
      </div>
    </div>
    {/* Dialog arrow */}
    <div className="absolute -bottom-2 left-8 w-4 h-4 bg-background border-r-4 border-b-4 border-text-primary transform rotate-45" />
  </div>
);

export const HealthBar = ({
  current,
  max,
  label,
  className = "",
}: {
  current: number;
  max: number;
  label: string;
  className?: string;
}) => (
  <div className={`space-y-1 ${className}`}>
    <div className="flex justify-between font-pixel text-[8px]">
      <span className="text-accent">{label}</span>
      <span className="text-text-secondary">
        {current}/{max}
      </span>
    </div>
    <div className="h-4 bg-border border-2 border-text-muted">
      <div
        className="h-full bg-pixel-red transition-all duration-300"
        style={{ width: `${(current / max) * 100}%` }}
      />
    </div>
  </div>
);
