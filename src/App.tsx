import { useState, useEffect } from 'react';
import { Menu, X, Globe, Instagram, Github, Linkedin } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  color: string;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: 'sharlee',
      category: 'Branding',
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Modern digital branding',
      color: 'from-blue-400 to-green-300'
    },
    {
      id: 2,
      title: 'act responsable',
      category: 'Développement Web',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Interface design system',
      color: 'from-red-500 to-pink-300'
    },
    {
      id: 3,
      title: 'dua lipa',
      category: 'Portrait',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Full-stack application',
      color: 'from-purple-400 to-blue-300'
    },
    {
      id: 4,
      title: 'cocolyze',
      category: 'Design UX/UI',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Brand refresh project',
      color: 'from-teal-400 to-cyan-300'
    },
    {
      id: 5,
      title: 'les indécis',
      category: 'Branding',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Online shopping experience',
      color: 'from-orange-400 to-yellow-300'
    },
    {
      id: 6,
      title: 'le jeu de l\'oie',
      category: 'Game Design',
      image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'iOS & Android application',
      color: 'from-green-400 to-emerald-300'
    },
    {
      id: 7,
      title: 'l\'équipe explore',
      category: 'Illustration',
      image: 'https://images.pexels.com/photos/1226398/pexels-photo-1226398.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Magazine layout design',
      color: 'from-blue-500 to-indigo-300'
    },
    {
      id: 8,
      title: 'silhouette',
      category: 'Portrait',
      image: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: '3D animated content',
      color: 'from-slate-500 to-gray-300'
    },
    {
      id: 9,
      title: 'cosmetic brand',
      category: 'Branding',
      image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Personal portfolio website',
      color: 'from-pink-400 to-rose-300'
    }
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="pixel-font text-white text-4xl md:text-6xl mb-8 animate-pulse">
            LOADING...
          </div>
          <div className="flex justify-center gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-white"
                style={{
                  animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div
        className="custom-cursor pointer-events-none fixed w-4 h-4 bg-white mix-blend-difference rounded-full z-50 transition-transform duration-100"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: `translate(-50%, -50%) scale(${hoveredProject ? 2 : 1})`
        }}
      />

      <nav className="fixed left-0 top-0 h-full w-16 md:w-20 border-r border-white/10 flex flex-col items-center py-6 md:py-8 z-40 bg-black/50 backdrop-blur-sm">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="mb-8 md:mb-12 hover:scale-110 transition-transform"
        >
          {isMenuOpen ? <X size={20} className="md:w-6 md:h-6" /> : <Menu size={20} className="md:w-6 md:h-6" />}
        </button>

        <div className="flex-1 hidden md:flex flex-col justify-center gap-8">
          <a href="#work" className="hover:scale-110 transition-transform pixel-font text-xs writing-vertical">
            WORK
          </a>
          <a href="#about" className="hover:scale-110 transition-transform pixel-font text-xs writing-vertical">
            ABOUT
          </a>
          <a href="#contact" className="hover:scale-110 transition-transform pixel-font text-xs writing-vertical">
            CONTACT
          </a>
        </div>

        <div className="flex flex-col gap-4 md:gap-6 mt-auto">
          <a href="#" className="hover:scale-110 transition-transform">
            <Instagram size={16} className="md:w-5 md:h-5" />
          </a>
          <a href="#" className="hover:scale-110 transition-transform">
            <Github size={16} className="md:w-5 md:h-5" />
          </a>
          <a href="#" className="hover:scale-110 transition-transform">
            <Linkedin size={16} className="md:w-5 md:h-5" />
          </a>
          <a href="#" className="hover:scale-110 transition-transform">
            <Globe size={16} className="md:w-5 md:h-5" />
          </a>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black z-30 transition-opacity duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-8">
            {[
              { label: 'WORK', href: '#work' },
              { label: 'ABOUT', href: '#about' },
              { label: 'SERVICES', href: '#services' },
              { label: 'CONTACT', href: '#contact' }
            ].map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block pixel-font text-4xl sm:text-6xl md:text-8xl hover:text-gray-400 transition-colors cursor-pointer"
                style={{
                  animation: isMenuOpen ? `slideIn 0.6s ease-out ${i * 0.1}s both` : 'none'
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <main className="ml-16 md:ml-20">
        <section className="min-h-screen flex items-center justify-center px-4 md:px-8 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />

          <div className="text-center relative z-10">
            <h1 className="pixel-font text-5xl sm:text-7xl md:text-9xl mb-6 animate-glitch">
              CREASLO
            </h1>
            <p className="pixel-font text-lg sm:text-xl md:text-3xl text-gray-400 mb-8 md:mb-12 tracking-widest">
              AGENCE CREATIVE
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 pixel-font text-xs sm:text-sm">
              <span className="border border-white px-4 sm:px-6 py-2 sm:py-3 hover:bg-white hover:text-black transition-colors cursor-pointer">
                VISIBILITÉ
              </span>
              <span className="border border-white px-4 sm:px-6 py-2 sm:py-3 hover:bg-white hover:text-black transition-colors cursor-pointer">
                CRÉDIBILITÉ
              </span>
              <span className="border border-white px-4 sm:px-6 py-2 sm:py-3 hover:bg-white hover:text-black transition-colors cursor-pointer">
                SIMPLICITÉ
              </span>
            </div>
          </div>

          <div className="hidden lg:block absolute top-20 right-20 w-64 h-64 border-2 border-white/20 rounded-full animate-spin-slow" />
          <div className="hidden lg:block absolute bottom-20 left-40 w-32 h-32 border-2 border-white/20 animate-pulse" />
        </section>

        <section id="work" className="min-h-screen flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen flex items-center justify-center p-8 lg:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br opacity-60 transition-all duration-700"
              style={{
                background: hoveredProject
                  ? `linear-gradient(135deg, ${projects.find(p => p.id === hoveredProject)?.color.split(' ')[0].replace('from-', '')} 0%, ${projects.find(p => p.id === hoveredProject)?.color.split(' ')[1].replace('to-', '')} 100%)`
                  : 'linear-gradient(135deg, rgb(100, 116, 139) 0%, rgb(71, 85, 105) 100%)'
              }}
            />
            {projects.map((project) => (
              <div
                key={project.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {!hoveredProject && (
              <div className="relative z-10 text-center">
                <h2 className="text-6xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
                  PROJETS
                </h2>
                <p className="text-2xl text-white/80">9</p>
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 bg-gradient-to-br from-slate-50 to-blue-50 px-8 lg:px-16 py-20">
            <div className="max-w-2xl">
              <div className="mb-12">
                <h2 className="text-5xl lg:text-7xl font-bold text-slate-700 mb-4 tracking-tight">
                  PROJETS
                </h2>
                <p className="text-2xl text-slate-500">9</p>
              </div>

              <div className="space-y-0">
                {projects.map((project, index) => (
                  <a
                    key={project.id}
                    href="#"
                    className="group block py-6 border-b border-slate-300 hover:border-slate-500 transition-all duration-300"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    style={{
                      animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">
                            →
                          </span>
                          <h3 className="text-2xl lg:text-3xl font-normal text-slate-800 group-hover:text-slate-900 transition-colors">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                      <div className="text-right ml-8">
                        <p className="text-base lg:text-lg text-slate-500 group-hover:text-slate-700 transition-colors">
                          {project.category}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="min-h-screen px-4 md:px-8 py-20 flex items-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="pixel-font text-4xl md:text-5xl lg:text-7xl mb-8 md:mb-12">
              ABOUT
            </h2>
            <div className="space-y-4 md:space-y-6 text-base md:text-xl leading-relaxed text-gray-300">
              <p>
                Nous sommes une agence créative digitale spécialisée dans la création d'expériences visuelles uniques et mémorables.
              </p>
              <p>
                Notre approche combine design moderne, développement technique de pointe et stratégie créative pour transformer vos idées en réalité digitale.
              </p>
              <p className="pixel-font text-xl md:text-2xl text-white mt-8 md:mt-12">
                VISIBILITÉ × CRÉDIBILITÉ × SIMPLICITÉ
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="min-h-screen px-4 md:px-8 py-20 flex items-center">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="pixel-font text-4xl md:text-5xl lg:text-7xl mb-8 md:mb-12">
              GET IN TOUCH
            </h2>
            <div className="space-y-6 md:space-y-8">
              <a
                href="mailto:hello@creaslo.com"
                className="block pixel-font text-2xl md:text-3xl lg:text-5xl hover:text-gray-400 transition-colors break-all"
              >
                HELLO@CREASLO.COM
              </a>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-8 pixel-font text-base md:text-xl">
                <a href="#" className="hover:text-gray-400 transition-colors">
                  INSTAGRAM →
                </a>
                <a href="#" className="hover:text-gray-400 transition-colors">
                  LINKEDIN →
                </a>
                <a href="#" className="hover:text-gray-400 transition-colors">
                  GITHUB →
                </a>
              </div>
            </div>

            <div className="mt-12 md:mt-20 border-2 border-white p-6 md:p-8 inline-block">
              <div className="grid grid-cols-8 gap-1 w-32 h-32 md:w-40 md:h-40">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${
                      Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
              <p className="pixel-font text-xs mt-4 text-center">SCAN HERE !</p>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 px-4 md:px-8 py-8 md:py-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pixel-font text-xs md:text-sm text-gray-500">
            <p>© 2025 CREASLO - AGENCE CREATIVE</p>
            <p>MADE WITH ♥ IN FRANCE</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
