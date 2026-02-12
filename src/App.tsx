import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800/50">
        <p>&copy; {new Date().getFullYear()} Christos Diamantakis. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
