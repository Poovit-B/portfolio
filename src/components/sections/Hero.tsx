import { Button } from '../common';

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6">
          Hi, I'm <span className="text-accent">Your Name</span>
        </h1>
        <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto">
          Full Stack Developer passionate about creating beautiful and functional web experiences
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary">
            <a href="#projects">View My Work</a>
          </Button>
          <Button variant="outline">
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

