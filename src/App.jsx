import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Code2, 
  Database, 
  Globe, 
  Menu, 
  X, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

// Import logos
import indianRailwaysLogo from './assets/rail.png';
import creaLogo from './assets/crea-logo.png';

class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * 1.5; // Increased speed
    this.vy = (Math.random() - 0.5) * 1.5; // Increased speed
    this.size = Math.random() * 3 + 1; // Increased size (1-4px)
  }

  update(canvasWidth, canvasHeight) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
    if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
  }

  draw(ctx) {
    ctx.fillStyle = 'rgba(52, 211, 153, 0.5)'; // Increased opacity
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100); // More particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      particles.forEach((a, index) => {
        for (let b of particles.slice(index + 1)) {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) { // Increased connection distance
            ctx.beginPath();
            ctx.strokeStyle = `rgba(52, 211, 153, ${0.4 - distance/400})`; // Increased line opacity
            ctx.lineWidth = 1;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => {
      resizeCanvas();
      init();
    });
    
    resizeCanvas();
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const fullText = "Full Stack Developer";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30 relative overflow-hidden">
      <BackgroundAnimation />
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 z-50 shadow-lg">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 text-emerald-400 font-bold text-xl sm:text-2xl tracking-tight">
              <span style={{ fontFamily: "'Fira Code', 'JetBrains Mono', 'Courier New', monospace" }}>&lt;Gaurav /&gt;</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                      activeSection === item.id
                        ? 'text-emerald-400 bg-slate-900'
                        : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-300 hover:text-white p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-emerald-400 hover:bg-slate-800"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 w-full min-h-screen flex items-center">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block mb-4">
                <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full backdrop-blur-sm">
                  <span className="font-mono text-emerald-400 text-sm">👋 Hi, I'm Gaurav</span>
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-slate-100">Gaurav Ghatol</span>
                <span className="text-emerald-400">.</span>
              </h1>
              
              <div className="mb-6 sm:mb-8">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold flex flex-wrap items-center gap-2">
                  <span className="text-slate-300">I am a</span>
                  <span className="text-emerald-400 inline-flex items-center">
                    {typedText}
                    <span className="animate-pulse ml-1">|</span>
                  </span>
                </div>
              </div>
              
              <p className="text-slate-400 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed max-w-xl">
                <span className="text-emerald-400 font-semibold">Building digital solutions</span> with code & creativity. Passionate about crafting intuitive UIs and optimizing backend performance.
              </p>
              
              <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="group px-6 sm:px-8 py-3 sm:py-4 bg-emerald-500 text-slate-900 rounded-lg hover:bg-emerald-400 transition-all duration-300 font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 text-sm sm:text-base"
                >
                  <span className="flex items-center gap-2">
                    <span className="whitespace-nowrap">Check out my work</span>
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <div className="flex gap-2 sm:gap-3">
                  <a 
                    href="https://github.com/gauravghatol" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 sm:p-4 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400 hover:text-emerald-400 hover:border-emerald-400/50 transition-all duration-300 hover:scale-110"
                  >
                    <Github size={20} className="sm:w-6 sm:h-6" />
                  </a>
                  <a 
                    href="https://www.google.com/search?q=https://www.linkedin.com/in/gauravghatol" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 sm:p-4 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400 hover:text-emerald-400 hover:border-emerald-400/50 transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin size={20} className="sm:w-6 sm:h-6" />
                  </a>
                  <a 
                    href="mailto:gauravghatol49@gmail.com"
                    className="p-3 sm:p-4 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400 hover:text-emerald-400 hover:border-emerald-400/50 transition-all duration-300 hover:scale-110"
                  >
                    <Mail size={20} className="sm:w-6 sm:h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Animated gradient orb */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                
                {/* Main card */}
                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    {/* Code snippet */}
                    <div className="font-mono text-sm space-y-2">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-slate-500 ml-2">developer.js</span>
                      </div>
                      
                      <div className="text-slate-500">
                        <span className="text-purple-400">class</span> <span className="text-yellow-400">Developer</span> {'{'}
                      </div>
                      <div className="text-slate-500 pl-4">
                        <span className="text-blue-300">constructor</span>() {'{'}
                      </div>
                      <div className="text-slate-500 pl-8">
                        <span className="text-pink-400">this</span>.name = <span className="text-emerald-400">"Gaurav"</span>;
                      </div>
                      <div className="text-slate-500 pl-8">
                        <span className="text-pink-400">this</span>.role = <span className="text-emerald-400">"Full Stack"</span>;
                      </div>
                      <div className="text-slate-500 pl-8">
                        <span className="text-pink-400">this</span>.passion = <span className="text-emerald-400">"Building"</span>;
                      </div>
                      <div className="text-slate-500 pl-4">{'}'}</div>
                      <div className="text-slate-500">{'}'}</div>
                    </div>

                    {/* Skills badges */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700">
                      {['React', 'Node.js', 'MongoDB', 'Python', 'Java', 'Tailwind'].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-mono">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Status indicator */}
                    <div className="flex items-center gap-2 pt-4 border-t border-slate-700">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-slate-400 text-sm">Available for opportunities</span>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
        {/* Section Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-16">
          <span className="text-emerald-400 font-mono text-lg sm:text-xl">01.</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100">About Me</h2>
          <div className="h-px bg-gradient-to-r from-slate-700 to-transparent flex-grow"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Terminal-style About Card */}
          <div className="mb-8 sm:mb-10 md:mb-12 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-slate-900/80 border-b border-slate-700/50 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
                </div>
                <span className="text-slate-400 text-xs sm:text-sm font-mono ml-2 sm:ml-3 hidden xs:inline">gaurav@portfolio:~$</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 text-xs font-mono">Active</span>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-4 sm:p-6 md:p-8 font-mono text-xs sm:text-sm space-y-3 sm:space-y-4">
              <div className="flex gap-2">
                <span className="text-emerald-400">$</span>
                <span className="text-slate-300">cat about.txt</span>
              </div>
              
              <div className="pl-4 space-y-4 text-slate-300 leading-relaxed border-l-2 border-emerald-400/30">
                <p>
                  <span className="text-emerald-400">&gt;</span> Hello! I'm <span className="text-emerald-400 font-bold">Gaurav Ghatol</span>, a passionate 
                  <span className="text-blue-400"> Full Stack Developer</span> currently pursuing B.E. in CSE at SSGMCE, Shegaon.
                </p>
                
                <p>
                  <span className="text-emerald-400">&gt;</span> Passionate Full Stack Developer with experience in both 
                  <span className="text-purple-400"> frontend</span> and <span className="text-purple-400">backend</span> technologies, 
                  skilled in crafting intuitive user interfaces and optimizing backend performance.
                </p>
                
                <p>
                  <span className="text-emerald-400">&gt;</span> I've had the privilege of working at 
                  <span className="text-orange-400"> Indian Railways</span> and <span className="text-orange-400">CREA</span>. 
                  Always excited to explore new technologies, solve problems, and enhance application efficiency.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <span className="text-emerald-400">$</span>
                <span className="text-slate-400 animate-pulse">|</span>
              </div>
            </div>
          </div>

          {/* Interactive Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12">
            {/* Quick Action Cards */}
            <a href="#contact" className="group relative bg-gradient-to-br from-emerald-500/10 via-emerald-600/5 to-transparent border border-emerald-500/30 rounded-xl p-6 hover:border-emerald-400/60 hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <Mail className="text-emerald-400 mb-3" size={32} />
                <div className="text-2xl font-bold text-emerald-400 mb-1">Let's Talk</div>
                <div className="text-sm text-slate-400">Get In Touch →</div>
              </div>
            </a>

            <a href="#projects" className="group relative bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-transparent border border-blue-500/30 rounded-xl p-6 hover:border-blue-400/60 hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <Code2 className="text-blue-400 mb-3" size={32} />
                <div className="text-2xl font-bold text-blue-400 mb-1">Projects</div>
                <div className="text-sm text-slate-400">View My Work →</div>
              </div>
            </a>

            <div className="group relative bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-transparent border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/60 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <Database className="text-purple-400 mb-3" size={32} />
                <div className="text-2xl font-bold text-purple-400 mb-1">6+</div>
                <div className="text-sm text-slate-400">Technologies</div>
              </div>
            </div>

            <a href="#experience" className="group relative bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-transparent border border-orange-500/30 rounded-xl p-6 hover:border-orange-400/60 hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <Terminal className="text-orange-400 mb-3" size={32} />
                <div className="text-2xl font-bold text-orange-400 mb-1">Experience</div>
                <div className="text-sm text-slate-400">My Journey →</div>
              </div>
            </a>
          </div>

          {/* Tech Stack Showcase */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-purple-500/5 rounded-2xl blur-xl"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Terminal className="text-emerald-400" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-100">Tech Stack</h3>
                <div className="h-px bg-gradient-to-r from-slate-700 to-transparent flex-grow ml-4"></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {[
                  { 
                    name: 'Java', 
                    logo: (
                      <svg viewBox="0 0 128 128" className="w-12 h-12">
                        <path fill="#E76F00" d="M52.581 67.817s-3.284 1.911 2.341 2.557c6.814.778 10.297.666 17.805-.753 0 0 1.979 1.237 4.735 2.309-16.836 7.213-38.104-.418-24.881-4.113zM50.522 58.402s-3.684 2.729 1.945 3.311c7.28.751 13.027.813 22.979-1.103 0 0 1.373 1.396 3.536 2.157-20.352 5.954-43.021.469-28.46-4.365z"/>
                        <path fill="#5382A1" d="M67.865 42.431c4.151 4.778-1.088 9.074-1.088 9.074s10.533-5.437 5.696-12.248c-4.519-6.349-7.982-9.502 10.771-20.378.001 0-29.438 7.35-15.379 23.552z"/>
                        <path fill="#E76F00" d="M90.132 74.781s2.432 2.005-2.678 3.555c-9.716 2.943-40.444 3.831-48.979.117-3.066-1.335 2.687-3.187 4.496-3.576 1.887-.409 2.965-.334 2.965-.334-3.412-2.403-22.055 4.719-9.469 6.762 34.324 5.563 62.567-2.506 53.665-6.524zM54.162 48.555s-15.629 3.713-5.534 5.063c4.264.57 12.758.439 20.676-.225 6.469-.543 12.961-1.704 12.961-1.704s-2.279.978-3.93 2.104c-15.874 4.175-46.533 2.23-37.706-2.038 7.463-3.611 13.533-3.2 13.533-3.2zM82.439 64.497c16.124-8.373 8.666-16.428 3.464-15.34-1.273.266-1.843.496-1.843.496s.475-.744 1.378-1.063c10.302-3.62 18.223 10.681-3.322 16.345 0 0 .247-.224.323-.438z"/>
                        <path fill="#5382A1" d="M72.089 1.826s8.935 8.939-8.476 22.682c-13.962 11.027-3.184 17.313-.006 24.498-8.157-7.355-14.132-13.826-10.118-19.852 5.889-8.842 22.204-13.131 18.6-27.328z"/>
                        <path fill="#E76F00" d="M55.997 87.069c15.502.984 39.298-.548 39.86-7.836 0 0-1.083 2.777-12.799 4.981-13.218 2.488-29.523 2.199-39.216.603 0-.001 1.98 1.64 12.155 2.252z"/>
                      </svg>
                    )
                  },
                  { 
                    name: 'Python', 
                    logo: (
                      <svg viewBox="0 0 128 128" className="w-12 h-12">
                        <linearGradient id="python-a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
                          <stop offset="0" stopColor="#5A9FD4"/>
                          <stop offset="1" stopColor="#306998"/>
                        </linearGradient>
                        <path fill="url(#python-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" transform="translate(0 10.26)"/>
                        <linearGradient id="python-b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
                          <stop offset="0" stopColor="#FFD43B"/>
                          <stop offset="1" stopColor="#FFE873"/>
                        </linearGradient>
                        <path fill="url(#python-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521H91.682zm-13.632 64.181c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" transform="translate(0 10.26)"/>
                      </svg>
                    )
                  },
                  { 
                    name: 'React', 
                    logo: (
                      <svg viewBox="0 0 128 128" className="w-12 h-12">
                        <g fill="#61DAFB">
                          <circle cx="64" cy="64" r="11.4"/>
                          <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21.1c-1.2-2-2.3-4.1-3.4-6.2-1.2-2.1-2.4-4.1-3.6-6-1.1-2-2.2-3.9-3.3-5.7 3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3.3.4.7 1.2 1.4 2.3.7 1.1 1.3 2.1 1.9 3.4zM36.4 14.7c1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6-1.8-10.5-.4-17.9 3.8-20.3zM25.8 62.2c-4.7-1.7-8.3-4.1-10.6-7.1-2.3-3-3.4-6-3.4-8.7 0-4.6 4.3-9.1 11.7-12.1 2-1 4.2-1.8 6.5-2.5 1.3 4.4 3.1 9.1 5.3 14.1-2.2 5-4 9.7-5.3 14.1-2.3-.7-4.5-1.5-6.5-2.5zm12.4 35.6c-1.7-10.5-.4-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zm48 20.3c-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6 1.7 10.5.4 17.9-3.8 20.3zm9.8-14.1c-.7-2.3-1.5-4.7-2.5-7.2 1-2.5 1.8-5 2.5-7.2 2.3.7 4.5 1.5 6.5 2.5 7.4 3 11.7 7.5 11.7 12.1 0 4.6-4.3 9.1-11.7 12.1-2 .9-4.2 1.7-6.5 2.4z"/>
                        </g>
                      </svg>
                    )
                  },
                  { 
                    name: 'Node.js', 
                    logo: (
                      <svg viewBox="0 0 128 128" className="w-12 h-12">
                        <path fill="#83CD29" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 41 42.061 41 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-43.88 25.561c-.41.233-1.025.233-1.439 0l-11.233-6.612c-.693-.414-1.182-.271-1.615-.062-3.583 2.086-4.291 2.086-7.703 3.176-.783.248-1.979.799 0 1.554l14.643 8.685c1.383.793 2.979 1.212 4.595 1.212 1.616 0 3.217-.419 4.595-1.212l43.882-25.562c2.87-1.65 4.631-4.754 4.631-8.083V38.407c0-3.319-1.76-6.423-4.631-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.453 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.991 1.24.991h5.754c.354 0 .692-.143.94-.396.24-.272.371-.645.334-1.08-.62-10.42-7.177-15.271-22.111-15.271-12.519 0-19.98 5.428-19.98 14.526 0 9.692 7.485 12.345 19.626 13.439 14.505 1.313 15.616 3.295 15.616 6.459 0 5.013-4.054 7.768-11.524 7.768z"/>
                      </svg>
                    )
                  },
                  { 
                    name: 'MongoDB', 
                    logo: (
                      <svg viewBox="0 0 128 128" className="w-12 h-12">
                        <path fill="#599636" d="M88.038 42.812c1.605 4.643 2.761 9.383 3.141 14.296.472 6.095.256 12.147-1.029 18.142-.035.165-.109.32-.164.48-.403.001-.814-.049-1.208.012-3.329.523-6.655 1.065-9.981 1.604-3.438.557-6.881 1.092-10.313 1.687-1.216.21-2.721-.041-3.212 1.641-.014.046-.154.054-.235.08l.166-10.051c-.057-8.084-.113-16.168-.169-24.252l1.602-.275c2.62-.429 5.24-.864 7.862-1.281 3.129-.497 6.261-.98 9.392-1.465 1.381-.215 2.764-.412 4.148-.618z"/>
                        <path fill="#6CAC48" d="M61.729 110.054c-1.69-1.453-3.439-2.842-5.059-4.37-8.717-8.222-15.093-17.899-18.233-29.566-.865-3.211-1.442-6.474-1.627-9.792-.13-2.322-.318-4.665-.154-6.975.437-6.144 1.325-12.229 3.127-18.147l.099-.138c.175.233.427.439.516.702 1.759 5.18 3.505 10.364 5.242 15.551 5.458 16.3 10.909 32.604 16.376 48.9.107.318.384.579.583.866l-.87 2.969z"/>
                        <path fill="#C2BFBF" d="M88.038 42.812c-1.384.206-2.768.403-4.149.616-3.131.485-6.263.968-9.392 1.465-2.622.417-5.242.852-7.862 1.281l-1.602.275-.012-1.045c-.053-4.605-.105-9.211-.159-13.816l.003-.244c.695-.288 1.399-.507 2.059-.867 2.865-1.56 5.936-2.693 8.917-4.027.716-.321 1.458-.584 2.205-.829.473-.155.981-.258 1.454-.371-.419 3.163-.871 6.314-1.258 9.479-.089.719-.215 1.434-.103 2.195.466 3.15.765 6.318.884 9.501.052 1.415-.014 2.831-.016 4.246 0 .161.021.322.031.484zM61.729 110.054l.87-2.969c-.199-.287-.476-.548-.583-.866-5.467-16.296-10.918-32.6-16.376-48.9-1.737-5.187-3.483-10.371-5.242-15.551-.089-.263-.34-.469-.516-.702l-.099.138c-1.802 5.918-2.69 12.003-3.127 18.147-.184 2.31.024 4.653.154 6.975.185 3.318.762 6.581 1.627 9.792 3.14 11.667 9.516 21.344 18.233 29.566 1.62 1.528 3.369 2.917 5.059 4.37z"/>
                      </svg>
                    )
                  },
                  { 
                    name: 'Git', 
                    logo: (
                      <svg viewBox="0 0 128 128" className="w-12 h-12">
                        <path fill="#F34F29" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z"/>
                      </svg>
                    )
                  }
                ].map((tech, index) => (
                  <div
                    key={tech.name}
                    className="group relative bg-slate-900/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 rounded-xl p-5 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-xl transition-all"></div>
                    <div className="relative flex flex-col items-center gap-3">
                      <div className="flex items-center justify-center">
                        {tech.logo}
                      </div>
                      <span className="text-slate-300 text-sm font-semibold text-center">{tech.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Command Line Style Footer */}
              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <div className="font-mono text-sm text-slate-400 flex items-center gap-2">
                  <span className="text-emerald-400">$</span>
                  <span>echo "Always learning, always building"</span>
                  <span className="animate-pulse">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-16">
          <span className="text-emerald-400 font-mono text-lg sm:text-xl">02.</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100">Experience</h2>
          <div className="h-px bg-gradient-to-r from-slate-700 to-transparent flex-grow"></div>
        </div>

        <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12 md:space-y-16">
          {[
            {
              role: 'App Developer Intern',
              company: 'Electric Loco Shed, Bhusawal – Central Railway (Ministry of Railways)',
              period: 'July 2025 – Aug 2025',
              logo: indianRailwaysLogo,
              points: [
                'Contributed to the development of LOCO-INFO, a railway shed management system, by designing and implementing key features for locomotive maintenance scheduling',
                'Leveraged a real-time database for synchronization and built the front-end UI with Flutter, using Firebase Firestore (Realtime DB) for live synchronization of locomotive data across platforms',
                'Implemented secure authentication and role-based access control to ensure data integrity and user accountability'
              ]
            },
            {
              role: 'Full Stack Developer Intern',
              company: 'Central Railway Engineers Association (CREA), Bhusawal (Remote)',
              period: 'Aug 2025 – Present',
              logo: creaLogo,
              points: [
                'Contributed to developing the first official web portal for CREA, Bhusawal, transitioning the organization from manual Google Suite processes to a centralized MERN-stack application featuring a secure RESTful API, JWT authentication, and role-based access control (RBAC)',
                'Engineered the Razorpay payment gateway integration for the multi-step membership application, enabling secure online processing of registration fees and renewals',
                'Assisted in the development of other core modules, including the admin panel for content management, the community discussion forum, and the mutual transfer system'
              ]
            }
          ].map((job, index) => (
            <div key={index} className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
              
              <div className="relative flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
                {/* Logo Column */}
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white rounded-2xl p-3 sm:p-4 flex items-center justify-center shadow-lg shadow-emerald-500/10 border-2 border-slate-700 group-hover:border-emerald-400/50 overflow-hidden transition-all duration-300 group-hover:scale-105">
                    <img
                      src={job.logo}
                      alt={`${job.company} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex-1 text-left">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {job.role}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs sm:text-sm font-mono text-emerald-400 whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>
                  
                  <p className="text-sm sm:text-base text-slate-300 mb-6 flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">📍</span>
                    <span className="italic">{job.company}</span>
                  </p>

                  <ul className="space-y-3 text-slate-300 leading-relaxed text-sm sm:text-base">
                    {job.points.map((point, i) => (
                      <li key={i} className="flex gap-3 group/item">
                        <span className="text-emerald-400 mt-1 flex-shrink-0 group-hover/item:scale-125 transition-transform">▹</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-16">
          <span className="text-emerald-400 font-mono text-lg sm:text-xl">03.</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100">Some Things I've Built</h2>
          <div className="h-px bg-gradient-to-r from-slate-700 to-transparent flex-grow"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {[
            {
              title: 'CodeStash',
              desc: 'Full-Stack Snippet Manager with syntax highlighting and cloud storage.',
              tech: ['React', 'Node', 'Mongo', 'JWT'],
              icon: <Code2 size={40} />,
              github: 'https://github.com/gauravghatol/CodeStash'
            },
            {
              title: 'Restaurant Management',
              desc: 'Operations platform with Role-Based Access Control (Admin, Chef, Waiter, Customer).',
              tech: ['React', 'Express', 'MongoDB'],
              icon: <Database size={40} />,
              github: 'https://github.com/gauravghatol/RestaurantManagementSystem'
            },
            {
              title: 'Vihang Drone Club',
              desc: 'Official portal for SSGMCE drone club with event galleries.',
              tech: ['React', 'Tailwind', 'Framer'],
              icon: <Globe size={40} />,
              github: 'https://github.com/gauravghatol/Vihang'
            }
          ].map((project, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-slate-700/50 hover:-translate-y-2 hover:border-emerald-500/60 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Animated corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-5">
                  <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 group-hover:border-emerald-400/50 group-hover:bg-emerald-500/10 transition-all duration-300">
                    <div className="text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                      {project.icon}
                    </div>
                  </div>
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 text-slate-400 hover:text-emerald-400 hover:border-emerald-400/50 hover:bg-emerald-500/10 cursor-pointer transition-all duration-300 hover:scale-110"
                    title="View Code"
                  >
                    <Github size={20} />
                  </a>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-3 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 mb-6 text-sm sm:text-base leading-relaxed">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-700/50">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full hover:bg-emerald-500/20 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-emerald-400 font-mono mb-4">04. What's Next?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">Get In Touch</h2>
          <p className="text-slate-400 text-lg mb-12">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <a 
              href="mailto:gauravghatol49@gmail.com"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-emerald-400 border border-emerald-500/50 rounded hover:bg-emerald-500/10 transition-all duration-300"
            >
              <Mail size={20} />
              Say Hello
            </a>
          </div>

          <div className="text-slate-500 text-sm font-mono">
            <p>Designed & Built by Gaurav Ghatol</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
