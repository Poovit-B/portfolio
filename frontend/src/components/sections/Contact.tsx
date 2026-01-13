import { useState } from "react";
import type { FormEvent } from "react";
import { CornerBracket, DotGrid } from "../ui/CyberElements";

const contactInfo = [
  { label: "EMAIL", value: "poovit_b@hotmail.com", href: "mailto:poovit_b@hotmail.com" },
  { label: "GITHUB", value: "github.com/poovitbanton", href: "https://github.com/poovitbanton" },
  { label: "LINKEDIN", value: "linkedin.com/in/poovitbanton", href: "https://linkedin.com/in/poovitbanton" },
  { label: "LOCATION", value: "Bangkok, Thailand", href: null },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate sending
    setTimeout(() => {
      setStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="font-cyber text-accent text-sm tracking-[0.3em]">03</div>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent max-w-[100px]" />
          <h2 className="font-cyber text-2xl tracking-wider">CONTACT</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-cyber text-lg text-accent tracking-wider">GET IN TOUCH</h3>
              <p className="text-text-secondary leading-relaxed max-w-md">
                Have a project in mind or want to collaborate? 
                Feel free to reach out. I'm always open to discussing new opportunities.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4 group">
                  <div className="w-2 h-2 mt-2 bg-accent/50 rotate-45 group-hover:bg-accent transition-colors" />
                  <div>
                    <div className="font-cyber text-[10px] text-text-muted tracking-wider">{info.label}</div>
                    {info.href ? (
                      <a
                        href={info.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-primary hover:text-accent transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-text-primary">{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Decoration */}
            <DotGrid rows={4} cols={8} className="opacity-30 mt-12" />
          </div>

          {/* Right: Contact Form */}
          <div className="relative">
            <CornerBracket position="top-left" className="absolute -top-4 -left-4 w-6 h-6" />
            <CornerBracket position="bottom-right" className="absolute -bottom-4 -right-4 w-6 h-6" />

            <form
              onSubmit={handleSubmit}
              className="p-6 border border-border/50 bg-card/30 backdrop-blur-sm space-y-6"
            >
              {/* Form Header */}
              <div className="flex items-center gap-2 pb-4 border-b border-border/50">
                <div className="w-3 h-3 rounded-full bg-cyber-red/50" />
                <div className="w-3 h-3 rounded-full bg-accent/50" />
                <div className="w-3 h-3 rounded-full bg-cyber-green/50" />
                <span className="ml-4 font-cyber text-[10px] text-text-muted">message.new</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-cyber text-[10px] text-text-muted tracking-wider">NAME</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-background border border-border/50 text-text-primary 
                             focus:outline-none focus:border-accent/50 transition-colors
                             placeholder:text-text-muted/50 font-mono text-sm"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-cyber text-[10px] text-text-muted tracking-wider">EMAIL</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-background border border-border/50 text-text-primary 
                             focus:outline-none focus:border-accent/50 transition-colors
                             placeholder:text-text-muted/50 font-mono text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-cyber text-[10px] text-text-muted tracking-wider">SUBJECT</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-background border border-border/50 text-text-primary 
                           focus:outline-none focus:border-accent/50 transition-colors
                           placeholder:text-text-muted/50 font-mono text-sm"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="space-y-2">
                <label className="font-cyber text-[10px] text-text-muted tracking-wider">MESSAGE</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-background border border-border/50 text-text-primary 
                           focus:outline-none focus:border-accent/50 transition-colors resize-none
                           placeholder:text-text-muted/50 font-mono text-sm"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 bg-accent text-background font-cyber text-xs tracking-wider
                         hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                         relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {status === "idle" && "SEND MESSAGE"}
                  {status === "sending" && "TRANSMITTING..."}
                  {status === "sent" && "MESSAGE SENT ✓"}
                  {status === "error" && "ERROR - RETRY"}
                </span>
              </button>

              {/* Status Indicator */}
              <div className="flex items-center justify-center gap-2 font-cyber text-[10px] text-text-muted">
                <span className={`w-1.5 h-1.5 ${status === "sent" ? "bg-cyber-green" : "bg-accent/50"}`} />
                <span>
                  {status === "idle" && "READY TO SEND"}
                  {status === "sending" && "ESTABLISHING CONNECTION..."}
                  {status === "sent" && "TRANSMISSION COMPLETE"}
                  {status === "error" && "CONNECTION FAILED"}
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
