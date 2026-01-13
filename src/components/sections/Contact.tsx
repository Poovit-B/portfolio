import { useState, FormEvent } from "react";
import { PixelBox, PixelHeart, PixelArrow } from "../ui/PixelElements";

const contactOptions = [
  { label: "EMAIL", value: "hello@poovit.dev", action: "mailto:hello@poovit.dev" },
  { label: "GITHUB", value: "github.com/poovit", action: "https://github.com" },
  { label: "LINKEDIN", value: "linkedin.com/in/poovit", action: "https://linkedin.com" },
  { label: "DISCORD", value: "poovit#1234", action: null },
];

export const Contact = () => {
  const [message, setMessage] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerEmail, setPlayerEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setMessage("");
      setPlayerName("");
      setPlayerEmail("");
      setSent(false);
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-background-secondary pixel-grid opacity-20" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Title */}
        <div className="flex items-center gap-4 mb-12">
          <div className="font-pixel text-[10px] text-pixel-yellow">{'>'}</div>
          <h2 className="font-pixel text-lg text-accent">SEND_MESSAGE.EXE</h2>
          <div className="flex-1 h-1 bg-border" style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--color-border) 0 8px, transparent 8px 16px)" }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Message Form */}
          <div>
            <PixelBox className="bg-background">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b-2 border-border">
                <div className="w-3 h-3 bg-pixel-red" />
                <div className="w-3 h-3 bg-pixel-yellow" />
                <div className="w-3 h-3 bg-accent" />
                <span className="ml-2 font-pixel text-[8px] text-text-muted">new_message.txt</span>
              </div>

              {sent ? (
                <div className="text-center py-12">
                  <div className="flex justify-center gap-2 mb-4">
                    <PixelHeart filled />
                    <PixelHeart filled />
                    <PixelHeart filled />
                  </div>
                  <div className="font-pixel text-lg text-accent mb-2">
                    MESSAGE SENT!
                  </div>
                  <div className="font-retro text-xl text-text-secondary">
                    +100 XP earned for making contact!
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-pixel text-[8px] text-text-muted mb-2">
                      {'>'} YOUR NAME
                    </label>
                    <input
                      type="text"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      required
                      className="w-full p-3 bg-card border-4 border-border font-retro text-lg text-text-primary 
                               focus:outline-none focus:border-accent placeholder:text-text-muted"
                      placeholder="Enter your name..."
                    />
                  </div>

                  <div>
                    <label className="block font-pixel text-[8px] text-text-muted mb-2">
                      {'>'} YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      value={playerEmail}
                      onChange={(e) => setPlayerEmail(e.target.value)}
                      required
                      className="w-full p-3 bg-card border-4 border-border font-retro text-lg text-text-primary 
                               focus:outline-none focus:border-accent placeholder:text-text-muted"
                      placeholder="Enter your email..."
                    />
                  </div>

                  <div>
                    <label className="block font-pixel text-[8px] text-text-muted mb-2">
                      {'>'} YOUR MESSAGE
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      className="w-full p-3 bg-card border-4 border-border font-retro text-lg text-text-primary 
                               focus:outline-none focus:border-accent placeholder:text-text-muted resize-none"
                      placeholder="Type your message here..."
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="font-pixel text-[8px] text-text-muted">
                      CHARS: {message.length}/500
                    </div>
                    <button type="submit" className="pixel-btn">
                      SEND MESSAGE
                    </button>
                  </div>
                </form>
              )}
            </PixelBox>
          </div>

          {/* Right: Contact Options */}
          <div className="space-y-6">
            <div className="font-pixel text-[10px] text-text-muted">
              {'>'} OR FIND ME AT:
            </div>

            <div className="space-y-3">
              {contactOptions.map((option) => (
                <a
                  key={option.label}
                  href={option.action || "#"}
                  target={option.action?.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center p-4 bg-card border-4 border-border hover:border-accent transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-pixel text-[8px] text-accent">{option.label}</div>
                    <div className="font-retro text-xl text-text-primary group-hover:text-accent transition-colors">
                      {option.value}
                    </div>
                  </div>
                  <PixelArrow direction="right" className="text-text-muted group-hover:text-accent transition-colors" />
                </a>
              ))}
            </div>

            {/* Fun Stats */}
            <div className="p-4 bg-card border-4 border-pixel-yellow">
              <div className="font-pixel text-[10px] text-pixel-yellow mb-3">
                {'>'} COMMUNICATION STATS
              </div>
              <div className="space-y-2 font-retro text-lg">
                <div className="flex justify-between">
                  <span className="text-text-muted">Response Time:</span>
                  <span className="text-accent">{'<'} 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Messages Answered:</span>
                  <span className="text-pixel-blue">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Friendship Level:</span>
                  <span className="text-pixel-pink">MAX ♥</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
