import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <p className="text-sm md:text-base font-medium tracking-widest uppercase text-orange-400 mb-6">
            Software Engineer — Web & Native Applications
          </p>
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-8xl font-black leading-tight mb-8 animate-fade-up silver-chars"
          style={{ animationDelay: '0.3s', opacity: 0 }}
        >
          <span>H</span><span>i</span><span>,</span><span>{'\u00A0'}</span><span>I</span><span>'</span><span>m</span><span>{'\u00A0'}</span>
          {'Christos'.split('').map((char, i) => (
            <span key={i} className="gradient-text" style={{ display: 'inline-block' }}>{char}</span>
          ))}
        </h1>

        <p
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up"
          style={{ animationDelay: '0.5s', opacity: 0 }}
        >
          Software Engineer dedicated to creating immersive, user-friendly digital experiences.
          From captivating web interfaces to seamless native applications — I bring ideas to life.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up"
          style={{ animationDelay: '0.7s', opacity: 0 }}
        >
          <a
            href="#projects"
            className="px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full font-semibold border border-gray-700 hover:border-gray-500 hover:bg-gray-800/50 transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>

        {/* Socials */}
        <div
          className="flex items-center justify-center gap-6 animate-fade-up"
          style={{ animationDelay: '0.9s', opacity: 0 }}
        >
          <a
            href="https://github.com/chris-diam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors duration-200"
          >
            <Github size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/christos-diamantakis"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors duration-200"
          >
            <Linkedin size={22} />
          </a>
          <a
            href="mailto:ch.diamantakis@gmail.com"
            className="text-gray-500 hover:text-white transition-colors duration-200"
          >
            <Mail size={22} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600 hover:text-gray-400 transition-colors animate-float"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
}
