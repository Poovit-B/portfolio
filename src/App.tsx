import { Header, Footer } from './components/layout';
import { Hero, About, Projects, Contact } from './components/sections';

function App() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
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
}

export default App;
