import { useEffect, useRef, useState } from 'react';
import { Code2, Palette, Zap, Globe } from 'lucide-react';

const skills = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript', 'HTML', 'CSS', 'Bash'] },
  { category: 'Frameworks', items: ['React', 'React Native', 'Angular', 'Tailwind CSS', 'Node.js'] },
  { category: 'Tools & Databases', items: ['Git', 'Docker', 'MongoDB', 'PostgreSQL', 'Keycloak'] },
];

const highlights = [
  { icon: Code2, title: 'Clean Code', desc: 'Writing maintainable, scalable code that teams love working with' },
  { icon: Palette, title: 'Design Sense', desc: 'Bridging design and engineering for pixel-perfect interfaces' },
  { icon: Zap, title: 'Performance', desc: 'Obsessed with fast load times and smooth interactions' },
  { icon: Globe, title: 'Full Stack', desc: 'Comfortable across the entire stack, from UI to database' },
];

function useInView(threshold = 0.2) {
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

export default function About() {
  const { ref, visible } = useInView();

  return (
    <section id="about" className="py-32 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-sm font-medium tracking-widest uppercase text-orange-400 mb-4">About Me</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Building the web,{' '}
            <span className="gradient-text">one pixel at a time</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed mb-16">
            Software Engineer at the Centre for Research and Technology Hellas (CERTH/ITI) with a
            Bachelor's in Applied Informatics from the University of Macedonia. I specialize in building
            web and native applications for EU research projects — from patient data platforms to IoT
            administration dashboards. Detail-oriented, always learning, and passionate about delivering
            user-centric solutions.
          </p>
        </div>

        {/* Highlights */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {highlights.map((h) => (
            <div
              key={h.title}
              className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-purple-500/30 hover:bg-gray-900/80 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <h.icon size={22} className="text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{h.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className={`transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold mb-8">Tech Stack</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((group) => (
              <div key={group.category}>
                <p className="text-sm font-medium text-purple-400 uppercase tracking-wider mb-4">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800/60 text-gray-300 border border-gray-700/50 hover:border-purple-500/40 hover:text-white transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
