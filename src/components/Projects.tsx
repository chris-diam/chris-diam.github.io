import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  image?: string;
  github?: string;
  live?: string;
  category: 'professional' | 'personal';
}

const projects: Project[] = [
  // ── Professional ──
  {
    title: 'FEVER',
    description:
      'Built GUIs with React.js and React Native for user registration, Keycloak SSO authorization, transaction management, and member administration for an EU research consortium.',
    tags: ['React', 'React Native', 'Keycloak', 'Node.js'],
    gradient: 'from-orange-500 to-pink-600',
    image: 'https://fever-h2020.eu/data/screenshot_2024-01-12_095510_1110px.png',
    live: 'https://fever-h2020.eu/',
    category: 'professional',
  },
  {
    title: 'IDEA4RC',
    description:
      'Full-stack platform for rare cancer patients to register, securely log in via Keycloak SSO, complete medical questionnaires, and consent to data donation. Built both the React UI and Node.js backend.',
    tags: ['React', 'Node.js', 'Keycloak', 'TypeScript'],
    gradient: 'from-violet-600 to-indigo-600',
    image: 'https://www.idea4rc.eu/wp-content/uploads/2023/03/LogoIDEA4RC-1024x683.jpg',
    live: 'https://www.idea4rc.eu/',
    category: 'professional',
  },
  {
    title: 'ODIN',
    description:
      'Administration platform for monitoring and managing hospital IoT resources, with real-time patient data visualization powered by D3.js.',
    tags: ['React', 'D3.js', 'IoT', 'Dashboard'],
    gradient: 'from-cyan-500 to-blue-600',
    image: 'https://odin-smarthospitals.eu/wp-content/uploads/2022/01/the-future-of-health.png',
    live: 'https://odin-smarthospitals.eu/',
    category: 'professional',
  },
  {
    title: 'ENACT',
    description:
      'Set up Sovity EDC connectors (provider/consumer) and built a unified UI for managing assets, policies & contracts. Integrated MinIO object storage for data exchange across the cognitive computing continuum.',
    tags: ['React', 'EDC Connectors', 'MinIO', 'Data Spaces'],
    gradient: 'from-sky-500 to-indigo-600',
    image: 'https://enact-horizon.eu/wp-content/uploads/2024/02/Foto-Header.jpg',
    live: 'https://enact-horizon.eu/',
    category: 'professional',
  },
  // ── Personal ──
  {
    title: 'Sidirou Erga',
    description:
      'Full e-commerce website for a metalwork business, featuring product catalog, responsive design, and modern UI built with React and Tailwind CSS.',
    tags: ['React', 'Tailwind CSS', 'E-commerce'],
    gradient: 'from-amber-500 to-orange-600',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=400&fit=crop',
    github: 'https://github.com/chris-diam/sidirou-erga',
    live: 'https://sidirou-erga.vercel.app',
    category: 'personal',
  },
  {
    title: 'Tresse',
    description:
      'Full-stack application with a React frontend and Node.js/Express backend, featuring user authentication, data management, and a clean modern interface.',
    tags: ['React', 'Node.js', 'Express', 'Full Stack'],
    gradient: 'from-rose-500 to-pink-600',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    github: 'https://github.com/chris-diam/tresse-ui',
    category: 'personal',
  },
  {
    title: 'Ear Trainer',
    description:
      'Cross-platform ear training app with a 2-octave piano keyboard, random note generation, chord mode, and dynamic audio synthesis.',
    tags: ['React Native', 'Expo', 'TypeScript', 'Audio API'],
    gradient: 'from-emerald-500 to-teal-600',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=400&fit=crop',
    github: 'https://github.com/chris-diam/EarTrainer',
    category: 'personal',
  },
  {
    title: 'SafeLogic',
    description:
      'Mobile safety inspection app for technical advisors in Greece. Features company management, checklist inspections, PDF report generation, and scheduling with notifications.',
    tags: ['React Native', 'Expo', 'AsyncStorage', 'PDF'],
    gradient: 'from-teal-500 to-cyan-600',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=400&fit=crop',
    github: 'https://github.com/chris-diam/levity-checklist',
    category: 'personal',
  },
  {
    title: 'Chat App',
    description:
      'Real-time chat application built with Node.js, Express, and Socket.io. Features instant messaging, room-based conversations, and live user presence.',
    tags: ['Node.js', 'Socket.io', 'Express', 'Real-time'],
    gradient: 'from-blue-500 to-violet-600',
    image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&h=400&fit=crop',
    github: 'https://github.com/chris-diam/Chat-App',
    category: 'personal',
  },
  {
    title: 'Weather App',
    description:
      'Clean weather application that fetches real-time data from a weather API, displaying current conditions, forecasts, and location-based results.',
    tags: ['JavaScript', 'API', 'CSS', 'Responsive'],
    gradient: 'from-sky-400 to-blue-500',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=400&fit=crop',
    github: 'https://github.com/chris-diam/Weather-App',
    category: 'personal',
  },
  {
    title: 'Connector API',
    description:
      'Backend API service for managing and orchestrating data connectors, built with Node.js and designed for integration with external data sources.',
    tags: ['Node.js', 'REST API', 'Connectors'],
    gradient: 'from-purple-500 to-fuchsia-600',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    github: 'https://github.com/chris-diam/connector-api',
    category: 'personal',
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
        {/* Card header with image or gradient */}
        <div className={`h-52 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
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
                <ExternalLink size={16} /> Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type Filter = 'all' | 'professional' | 'personal';

export default function Projects() {
  const { ref, visible } = useInView();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  const tabs: { label: string; value: Filter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Professional', value: 'professional' },
    { label: 'Personal', value: 'personal' },
  ];

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-sm font-medium tracking-widest uppercase text-orange-400 mb-4">Projects</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Things I've{' '}
            <span className="gradient-text">built</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mb-10">
            A selection of projects that showcase my skills and passion for building great software.
          </p>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === tab.value
                    ? 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-gray-800/60 text-gray-400 border border-gray-700/50 hover:border-gray-600 hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
