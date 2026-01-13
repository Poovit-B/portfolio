import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../services/api";
import { CornerBracket } from "../components/ui/CyberElements";

export const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await authApi.login(formData.email, formData.password);
      } else {
        await authApi.register(
          formData.email,
          formData.password,
          formData.name
        );
        await authApi.login(formData.email, formData.password);
      }
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Background grid */}
      <div className="fixed inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,107,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,0,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="relative p-8 border border-border/50 bg-card/50 backdrop-blur-md">
          <CornerBracket
            position="top-left"
            className="absolute top-3 left-3 w-4 h-4"
          />
          <CornerBracket
            position="top-right"
            className="absolute top-3 right-3 w-4 h-4"
          />
          <CornerBracket
            position="bottom-left"
            className="absolute bottom-3 left-3 w-4 h-4"
          />
          <CornerBracket
            position="bottom-right"
            className="absolute bottom-3 right-3 w-4 h-4"
          />

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 border border-accent/50 rotate-45 mb-4">
              <span className="font-cyber text-2xl text-accent -rotate-45">
                A
              </span>
            </div>
            <h1 className="font-cyber text-xl text-accent tracking-wider">
              {isLogin ? "ADMIN LOGIN" : "CREATE ACCOUNT"}
            </h1>
            <p className="text-text-muted text-sm mt-2">
              {isLogin ? "Access your dashboard" : "Register new admin"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-3 border border-red-500/50 bg-red-500/10 text-red-400 text-sm">
              ⚠ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block font-cyber text-[10px] text-text-muted mb-2 tracking-wider">
                  NAME
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-background border border-border/50 text-text-primary focus:border-accent focus:outline-none transition-colors"
                  placeholder="Your name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block font-cyber text-[10px] text-text-muted mb-2 tracking-wider">
                EMAIL
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-background border border-border/50 text-text-primary focus:border-accent focus:outline-none transition-colors"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label className="block font-cyber text-[10px] text-text-muted mb-2 tracking-wider">
                PASSWORD
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 bg-background border border-border/50 text-text-primary focus:border-accent focus:outline-none transition-colors"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-accent text-background font-cyber text-sm tracking-wider hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "PROCESSING..." : isLogin ? "LOGIN" : "CREATE ACCOUNT"}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-text-muted text-sm hover:text-accent transition-colors"
            >
              {isLogin
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </button>
          </div>

          {/* Back link */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="font-cyber text-[10px] text-text-muted hover:text-accent transition-colors"
            >
              ← BACK TO SITE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
