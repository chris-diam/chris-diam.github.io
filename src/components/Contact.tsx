import { useEffect, useRef, useState, FormEvent } from 'react';
import { Send, Mail, MapPin, Github, Linkedin } from 'lucide-react';

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

export default function Contact() {
  const { ref, visible } = useInView();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formsubmit.co/ajax/ch.diamantakis@gmail.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data,
      });

      if (res.ok) {
        setStatus('sent');
        form.reset();
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 relative">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-sm font-medium tracking-widest uppercase text-orange-400 mb-4">Contact</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's work{' '}
            <span className="gradient-text">together</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mb-16">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Contact info */}
          <div>
            <div className="space-y-6 mb-12">
              <a href="mailto:ch.diamantakis@gmail.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-gray-800/60 border border-gray-700/50 flex items-center justify-center group-hover:border-purple-500/40 transition-colors">
                  <Mail size={20} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-300 group-hover:text-white transition-colors">ch.diamantakis@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-800/60 border border-gray-700/50 flex items-center justify-center">
                  <MapPin size={20} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-300">Thessaloniki, Greece</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-4">Find me on</p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/chris-diam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-gray-800/60 border border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/40 transition-all"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/christos-diamantakis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-gray-800/60 border border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/40 transition-all"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="_subject" value="New message from portfolio" />
            <input type="hidden" name="_template" value="table" />
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {status === 'sending' ? (
                'Sending...'
              ) : status === 'sent' ? (
                'Message Sent!'
              ) : status === 'error' ? (
                'Failed — try again'
              ) : (
                <>
                  Send Message <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
