// Version commentée automatiquement — commentaires explicatifs ajoutés avant les lignes importantes
// Attention : j'ai inséré des commentaires explicatifs avant de nombreux éléments JSX sous forme de {/* ... */}

// Importation des modules/éléments nécessaires
import { useState, useEffect } from 'react';
// Importation des modules/éléments nécessaires
import { Menu, X, Globe, Instagram, Github, Linkedin, ArrowUpRight } from 'lucide-react';

// Définition de l'interface TypeScript pour typer un projet
interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  tags: string[];
}

// Composant principal de l'application
function App() {
  // État : est-ce que le menu latéral est ouvert ? (bool)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // État : écran de chargement (true tant que loading)
  const [isLoading, setIsLoading] = useState(true);
  // État : id du projet survolé avec la souris (ou null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  // État : projet actuellement sélectionné/détaillé (ou null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // État : flag pour gérer les transitions/animations
  const [isTransitioning, setIsTransitioning] = useState(false);
  // État : position du curseur pour le curseur personnalisé (x,y)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Effet : simulation d'un écran de chargement au montage
  useEffect(() => {
    // Après 2s on cache le loader
    const timer = setTimeout(() => setIsLoading(false), 2000);
    // Rendu principal de l'application (layout, sections, footer)
    return () => clearTimeout(timer);
  }, []);

  // Effet : simulation d'un écran de chargement au montage
  useEffect(() => {
    // Handler : met à jour cursorPos quand la souris bouge
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    // Ajout de l'écouteur global mousemove
    window.addEventListener('mousemove', handleMouseMove);
    // Rendu principal de l'application (layout, sections, footer)
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Données : tableau statique des projets affichés
  const projects: Project[] = [
    {
      id: 1,
      title: 'Sharlee',
      category: 'Branding & Web Design',
      year: '2024',
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Création d\'une identité visuelle moderne et d\'un site web portfolio pour un designer créatif.',
      tags: ['Branding', 'Web Design', 'Development']
    },
    {
      id: 2,
      title: 'Act Responsable',
      category: 'Développement Web',
      year: '2024',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Plateforme web responsive pour promouvoir les actions éco-responsables en entreprise.',
      tags: ['Web Development', 'UX/UI', 'Responsive']
    },
    {
      id: 3,
      title: 'Dua Lipa',
      category: 'Portrait & Direction Artistique',
      year: '2023',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Série de portraits artistiques avec direction créative pour campagne promotionnelle.',
      tags: ['Photography', 'Art Direction', 'Portrait']
    },
    {
      id: 4,
      title: 'Cocolyze',
      category: 'Design UX/UI',
      year: '2024',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Interface utilisateur intuitive pour une plateforme d\'analyse SEO et marketing digital.',
      tags: ['UX/UI', 'SaaS', 'Dashboard']
    },
    {
      id: 5,
      title: 'Les Indécis',
      category: 'Branding',
      year: '2023',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Identité visuelle complète pour un collectif artistique parisien émergent.',
      tags: ['Branding', 'Logo Design', 'Print']
    },
    {
      id: 6,
      title: 'Le Jeu de l\'Oie',
      category: 'Game Design',
      year: '2023',
      image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Réinvention digitale du jeu classique avec design moderne et animations interactives.',
      tags: ['Game Design', 'Animation', 'Interactive']
    },
    {
      id: 7,
      title: 'L\'Équipe Explore',
      category: 'Illustration',
      year: '2024',
      image: 'https://images.pexels.com/photos/1226398/pexels-photo-1226398.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Série d\'illustrations pour le magazine sportif, alliant sport et aventure.',
      tags: ['Illustration', 'Editorial', 'Digital Art']
    },
    {
      id: 8,
      title: 'Silhouette',
      category: 'Portrait Photography',
      year: '2023',
      image: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Projet photographique explorant les contrastes et les formes à travers le noir et blanc.',
      tags: ['Photography', 'Black & White', 'Art']
    },
    {
      id: 9,
      title: 'Cosmetic Brand',
      category: 'Branding & Packaging',
      year: '2024',
      image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Création d\'une marque de cosmétiques naturels avec packaging éco-responsable.',
      tags: ['Branding', 'Packaging', 'Sustainability']
    }
  ];

  // Fonction : ouvre la vue détaillée d'un projet avec transition
  const handleProjectClick = (project: Project) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProject(project);
      setIsTransitioning(false);
    }, 800);
  };

  // Fonction : ferme la vue détaillée du projet
  const handleCloseProject = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsTransitioning(false);
    }, 800);
  };

  // Si l'application est en mode 'loading', on affiche un écran de chargement
  if (isLoading) {
    // Rendu de l'écran de chargement (JSX)
    return (
      {/* /* Conteneur <div> */ */}
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        {/* /* Conteneur <div> */ */}
        <div className="text-center">
          {/* /* Conteneur <div> */ */}
          <div className="pixel-font text-white text-4xl md:text-6xl mb-8 animate-pulse">
            LOADING...
          </div>
          {/* /* Conteneur <div> */ */}
          <div className="flex justify-center gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              {/* /* Conteneur <div> */ */}
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

 
  // Si un projet est sélectionné, on affiche la page détail du projet
  if (selectedProject) {
    // Rendu de la page détaillée du projet
    return (
      {/* /* Conteneur <div> */ */}
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* /* Conteneur <div> */ */}
        <div
          className={`fixed inset-0 bg-black z-50 transition-opacity duration-800 ${
            isTransitioning ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* /* Conteneur <div> */ */}
        <div className="fixed top-8 right-8 z-40">
          {/* /* Bouton interactif */ */}
          <button
            onClick={handleCloseProject}
            className="w-12 h-12 border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* /* Conteneur <div> */ */}
        <div className="min-h-screen px-8 md:px-16 py-20 md:py-32">
          {/* /* Conteneur <div> */ */}
          <div className="max-w-6xl mx-auto">
            {/* /* Conteneur <div> */ */}
            <div className="mb-12">
              {/* /* Petit élément inline */ */}
              <span className="pixel-font text-sm text-gray-400 mb-4 block">
                {selectedProject.year} — {selectedProject.category}
              </span>
              {/* /* Titre principal */ */}
              <h1 className="pixel-font text-5xl md:text-7xl lg:text-9xl mb-8">
                {selectedProject.title}
              </h1>
            </div>

            {/* /* Conteneur <div> */ */}
            <div className="aspect-video w-full mb-12 overflow-hidden">
              {/* /* Image (media) */ */}
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* /* Conteneur <div> */ */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* /* Élément JSX */ */}
              <div>
                {/* /* Titre de niveau 3 */ */}
                <h3 className="pixel-font text-xl mb-4">DESCRIPTION</h3>
                {/* /* Paragraphe */ */}
                <p className="text-gray-300 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>
              {/* /* Élément JSX */ */}
              <div>
                {/* /* Titre de niveau 3 */ */}
                <h3 className="pixel-font text-xl mb-4">TAGS</h3>
                {/* /* Conteneur <div> */ */}
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, index) => (
                    {/* /* Petit élément inline */ */}
                    <span
                      key={index}
                      className="border border-white/30 px-4 py-2 text-sm pixel-font"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* /* Conteneur <div> */ */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* /* Conteneur <div> */ */}
              <div className="aspect-square bg-gray-900">
                {/* /* Image (media) */ */}
                <img
                  src={selectedProject.image}
                  alt="Detail 1"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* /* Conteneur <div> */ */}
              <div className="aspect-square bg-gray-900">
                {/* /* Image (media) */ */}
                <img
                  src={selectedProject.image}
                  alt="Detail 2"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    {/* /* Conteneur <div> */ */}
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* /* Conteneur <div> */ */}
      <div
        className="custom-cursor pointer-events-none fixed w-4 h-4 bg-white mix-blend-difference rounded-full z-50 transition-transform duration-100"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: `translate(-50%, -50%) scale(${hoveredProject ? 2 : 1})`
        }}
      />

      {/* /* Barre de navigation latérale */ */}
      <nav className="fixed left-0 top-0 h-full w-16 md:w-20 border-r border-white/10 flex flex-col items-center py-6 md:py-8 z-40 bg-black/50 backdrop-blur-sm">
        {/* /* Bouton interactif */ */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="mb-8 md:mb-12 hover:scale-110 transition-transform"
        >
          {isMenuOpen ? <X size={20} className="md:w-6 md:h-6" /> : <Menu size={20} className="md:w-6 md:h-6" />}
        </button>

        {/* /* Conteneur <div> */ */}
        <div className="flex-1 hidden md:flex flex-col justify-center gap-8">
          {/* /* Lien */ */}
          <a href="#work" className="hover:scale-110 transition-transform pixel-font text-xs writing-vertical">
            WORK
          </a>
          {/* /* Lien */ */}
          <a href="#about" className="hover:scale-110 transition-transform pixel-font text-xs writing-vertical">
            ABOUT
          </a>
          {/* /* Lien */ */}
          <a href="#contact" className="hover:scale-110 transition-transform pixel-font text-xs writing-vertical">
            CONTACT
          </a>
        </div>

        {/* /* Conteneur <div> */ */}
        <div className="flex flex-col gap-4 md:gap-6 mt-auto">
          {/* /* Lien */ */}
          <a href="#" className="hover:scale-110 transition-transform">
            <Instagram size={16} className="md:w-5 md:h-5" />
          </a>
          {/* /* Lien */ */}
          <a href="#" className="hover:scale-110 transition-transform">
            <Github size={16} className="md:w-5 md:h-5" />
          </a>
          {/* /* Lien */ */}
          <a href="#" className="hover:scale-110 transition-transform">
            <Linkedin size={16} className="md:w-5 md:h-5" />
          </a>
          {/* /* Lien */ */}
          <a href="#" className="hover:scale-110 transition-transform">
            <Globe size={16} className="md:w-5 md:h-5" />
          </a>
        </div>
      </nav>

      {/* /* Conteneur <div> */ */}
      <div
        className={`fixed inset-0 bg-black z-30 transition-opacity duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* /* Conteneur <div> */ */}
        <div className="h-full flex items-center justify-center">
          {/* /* Conteneur <div> */ */}
          <div className="text-center space-y-8">
            {[
              { label: 'Projets', href: '#work' },
              { label: 'ABOUT', href: '#about' },
              { label: 'CONTACT', href: '#contact' }
            ].map((item, i) => (
              {/* /* Lien */ */}
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

      {/* /* Contenu principal */ */}
      <main className="ml-16 md:ml-20">
        {/* /* Section de la page */ */}
        <section className="min-h-screen flex items-center justify-center px-4 md:px-8 relative overflow-hidden">
          {/* /* Conteneur <div> */ */}
          <div className="absolute inset-0 grid-pattern opacity-20" />

          {/* /* Conteneur <div> */ */}
          <div className="text-center relative z-10">
            {/* /* Titre principal */ */}
            <h1 className="pixel-font text-5xl sm:text-7xl md:text-9xl mb-6 animate-glitch">
              CREASLO
            </h1>
            {/* /* Paragraphe */ */}
            <p className="pixel-font text-lg sm:text-xl md:text-3xl text-gray-400 mb-8 md:mb-12 tracking-widest">
              AGENCE CREATIVE
            </p>
            {/* /* Conteneur <div> */ */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 pixel-font text-xs sm:text-sm">
              {/* /* Petit élément inline */ */}
              <span className="border border-white px-4 sm:px-6 py-2 sm:py-3 hover:bg-white hover:text-black transition-colors cursor-pointer">
                VISIBILITÉ
              </span>
              {/* /* Petit élément inline */ */}
              <span className="border border-white px-4 sm:px-6 py-2 sm:py-3 hover:bg-white hover:text-black transition-colors cursor-pointer">
                CRÉDIBILITÉ
              </span>
              {/* /* Petit élément inline */ */}
              <span className="border border-white px-4 sm:px-6 py-2 sm:py-3 hover:bg-white hover:text-black transition-colors cursor-pointer">
                SIMPLICITÉ
              </span>
            </div>
          </div>

          {/* /* Conteneur <div> */ */}
          <div className="hidden lg:block absolute top-20 right-20 w-64 h-64 border-2 border-white/20 rounded-full animate-spin-slow" />
          {/* /* Conteneur <div> */ */}
          <div className="hidden lg:block absolute bottom-20 left-40 w-32 h-32 border-2 border-white/20 animate-pulse" />
        </section>

        {/* /* Section de la page */ */}
        <section id="work" className="min-h-screen flex flex-col lg:flex-row">
          {/* /* Conteneur <div> */ */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen flex items-center justify-center p-8 lg:p-16 relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
            {/* /* Conteneur <div> */ */}
            <div className="absolute inset-0 transition-opacity duration-700">
              {projects.map((project) => (
                {/* /* Conteneur <div> */ */}
                <div
                  key={project.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {/* /* Image (media) */ */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {/* /* Conteneur <div> */ */}
                  <div className="absolute inset-0 bg-black/30" />
                </div>
              ))}
            </div>

            {!hoveredProject && (
              {/* /* Conteneur <div> */ */}
              <div className="relative z-10 text-center">
                {/* /* Titre secondaire */ */}
                <h2 className="text-6xl lg:text-8xl font-bold text-white mb-4 tracking-tight pixel-font">
                  PROJETS
                </h2>
                {/* /* Paragraphe */ */}
                <p className="text-3xl text-white/80 pixel-font">9</p>
              </div>
            )}
          </div>

          {/* /* Conteneur <div> */ */}
          <div className="w-full lg:w-1/2 bg-white text-black px-8 lg:px-16 py-20 overflow-y-auto lg:h-screen">
            {/* /* Conteneur <div> */ */}
            <div className="max-w-2xl mx-auto">
              {/* /* Conteneur <div> */ */}
              <div className="mb-16">
                {/* /* Titre secondaire */ */}
                <h2 className="text-5xl lg:text-6xl font-bold mb-4 tracking-tight pixel-font text-black">
                  PROJETS
                </h2>
                {/* /* Paragraphe */ */}
                <p className="text-2xl text-gray-600 pixel-font">SÉLECTION — 9</p>
              </div>

              {/* /* Conteneur <div> */ */}
              <div className="space-y-0">
                {projects.map((project, index) => (
                  {/* /* Conteneur <div> */ */}
                  <div
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    className="group cursor-pointer py-8 border-b border-gray-300 hover:border-black transition-all duration-300"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
                    }}
                  >
                    {/* /* Conteneur <div> */ */}
                    <div className="flex items-start justify-between gap-8">
                      {/* /* Conteneur <div> */ */}
                      <div className="flex-1">
                        {/* /* Conteneur <div> */ */}
                        <div className="flex items-center gap-4 mb-3">
                          {/* /* Petit élément inline */ */}
                          <span className="text-sm text-gray-500 pixel-font min-w-[60px]">
                            {project.year}
                          </span>
                          {/* /* Titre de niveau 3 */ */}
                          <h3 className="text-3xl lg:text-4xl font-normal group-hover:translate-x-2 transition-transform duration-300">
                            {project.title}
                          </h3>
                        </div>
                        {/* /* Paragraphe */ */}
                        <p className="text-base text-gray-600 group-hover:text-black transition-colors pl-[76px]">
                          {project.category}
                        </p>
                      </div>
                      {/* /* Conteneur <div> */ */}
                      <div className="flex-shrink-0 w-8 h-8 border border-gray-400 group-hover:border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* /* Conteneur <div> */ */}
              <div className="mt-16 pt-8 border-t border-gray-300">
                {/* /* Paragraphe */ */}
                <p className="text-gray-600 text-sm">
                  © 2025 CREASLO — Tous droits réservés
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* /* Section de la page */ */}
        <section id="about" className="min-h-screen px-4 md:px-8 py-20 flex items-center">
          {/* /* Conteneur <div> */ */}
          <div className="max-w-4xl mx-auto">
            {/* /* Titre secondaire */ */}
            <h2 className="pixel-font text-4xl md:text-5xl lg:text-7xl mb-8 md:mb-12">
              ABOUT
            </h2>
            {/* /* Conteneur <div> */ */}
            <div className="space-y-4 md:space-y-6 text-base md:text-xl leading-relaxed text-gray-300">
              {/* /* Élément JSX */ */}
              <p>
                Nous sommes une agence créative digitale spécialisée dans la création d'expériences visuelles uniques et mémorables.
              </p>
              {/* /* Élément JSX */ */}
              <p>
                Notre approche combine design moderne, développement technique de pointe et stratégie créative pour transformer vos idées en réalité digitale.
              </p>
              {/* /* Paragraphe */ */}
              <p className="pixel-font text-xl md:text-2xl text-white mt-8 md:mt-12">
                VISIBILITÉ × CRÉDIBILITÉ × SIMPLICITÉ
              </p>
            </div>
          </div>
        </section>

        {/* /* Section de la page */ */}
        <section id="contact" className="min-h-screen px-4 md:px-8 py-20 flex items-center">
          {/* /* Conteneur <div> */ */}
          <div className="max-w-4xl mx-auto w-full">
            {/* /* Titre secondaire */ */}
            <h2 className="pixel-font text-4xl md:text-5xl lg:text-7xl mb-8 md:mb-12">
              GET IN TOUCH
            </h2>
            {/* /* Conteneur <div> */ */}
            <div className="space-y-6 md:space-y-8">
              {/* /* Lien */ */}
              <a
                href="mailto:hello@creaslo.com"
                className="block pixel-font text-2xl md:text-3xl lg:text-5xl hover:text-gray-400 transition-colors break-all"
              >
                HELLO@CREASLO.COM
              </a>
              {/* /* Conteneur <div> */ */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-8 pixel-font text-base md:text-xl">
                {/* /* Lien */ */}
                <a href="#" className="hover:text-gray-400 transition-colors">
                  INSTAGRAM →
                </a>
                {/* /* Lien */ */}
                <a href="#" className="hover:text-gray-400 transition-colors">
                  LINKEDIN →
                </a>
                {/* /* Lien */ */}
                <a href="#" className="hover:text-gray-400 transition-colors">
                  GITHUB →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* /* Pied de page */ */}
        <footer className="border-t border-white/10 px-4 md:px-8 py-8 md:py-12">
          {/* /* Conteneur <div> */ */}
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pixel-font text-xs md:text-sm text-gray-500">
            {/* /* Élément JSX */ */}
            <p>© 2025 CREASLO - AGENCE CREATIVE</p>
            {/* /* Élément JSX */ */}
            <p>MADE WITH ♥</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;