import { Card } from '../common';

const skills = [
  { name: 'React', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Tailwind CSS', level: 95 },
];

export const About = () => {
  return (
    <section id="about" className="py-20 bg-background-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-text-primary text-center mb-12">
          About Me
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              I'm a passionate developer with experience in building modern web applications. 
              I love turning ideas into reality through clean code and intuitive design.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, 
              contributing to open source, or enjoying a good cup of coffee.
            </p>
          </div>
          
          <Card>
            <h3 className="text-xl font-semibold text-text-primary mb-6">Skills</h3>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-text-primary">{skill.name}</span>
                    <span className="text-text-secondary">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

