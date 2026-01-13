import { Header, Footer } from "../components/layout";
import { Hero, About, Projects, Contact } from "../components/sections";
import { ParticleField } from "../components/three";
import { useScrollProgress } from "../hooks";

export const Home = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* 3D Particle Background */}
      <ParticleField scrollProgress={scrollProgress} />

      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};
