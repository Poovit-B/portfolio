import { Card } from '../common';

const projects = [
  {
    id: 1,
    title: 'Project One',
    description: 'A full-stack web application built with React and Node.js',
    image: '/placeholder-project.jpg',
    tags: ['React', 'Node.js', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'Mobile-first e-commerce platform with payment integration',
    image: '/placeholder-project.jpg',
    tags: ['Next.js', 'Stripe', 'Tailwind'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'Real-time chat application with WebSocket support',
    image: '/placeholder-project.jpg',
    tags: ['React', 'Socket.io', 'Express'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-text-primary text-center mb-12">
          My Projects
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:scale-105 transition-transform duration-300">
              <div className="aspect-video bg-background-secondary rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-text-secondary">
                  {/* Replace with actual image */}
                  <span>Project Image</span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {project.title}
              </h3>
              <p className="text-text-secondary mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4">
                <a
                  href={project.liveUrl}
                  className="text-accent hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  className="text-text-secondary hover:text-accent transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

