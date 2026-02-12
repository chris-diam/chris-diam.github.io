import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    title: 'FEVER',
    description:
      'Built GUIs with React.js and React Native for user registration, Keycloak SSO authorization, transaction management, and member administration for an EU research consortium.',
    tags: ['React', 'React Native', 'Keycloak', 'Node.js'],
    gradient: 'from-orange-500 to-pink-600',
  },
  {
    title: 'IDEA4RC',
    description:
      'Full-stack platform for rare cancer patients to register, securely log in via Keycloak SSO, complete medical questionnaires, and consent to data donation. Built both the React UI and Node.js backend.',
    tags: ['React', 'Node.js', 'Keycloak', 'TypeScript'],
    gradient: 'from-violet-600 to-indigo-600',
  },
  {
    title: 'ODIN',
    description:
      'Administration platform for monitoring and managing hospital IoT resources, with real-time patient data visualization powered by D3.js.',
    tags: ['React', 'D3.js', 'IoT', 'Dashboard'],
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Ear Trainer',
    description:
      'Cross-platform ear training app with a 2-octave piano keyboard, random note generation, chord mode, and dynamic audio synthesis.',
    tags: ['React Native', 'Expo', 'TypeScript', 'Audio API'],
    gradient: 'from-emerald-500 to-teal-600',
    github: 'https://github.com/chris-diam/EarTrainer',
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, visible } = useInView();

  return (
    <div
      ref={ref}
      className={`group transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="h-full rounded-2xl bg-gray-900/50 border border-gray-800/50 overflow-hidden hover:border-gray-700/80 hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-300">
        {/* Gradient header */}
        <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="absolute bottom-4 left-6 right-6">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">{project.title}</h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-400 text-sm leading-relaxed mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-400 border border-gray-700/50"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Github size={16} /> Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref, visible } = useInView();

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-sm font-medium tracking-widest uppercase text-orange-400 mb-4">Projects</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Things I've{' '}
            <span className="gradient-text">built</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mb-16">
            A selection of projects that showcase my skills and passion for building great software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
