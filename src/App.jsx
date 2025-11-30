import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Code2, 
  Database, 
  Cpu, 
  Globe, 
  Menu, 
  X, 
  ExternalLink,
  ChevronRight,
  MapPin,
  Phone
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
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 font-mono text-emerald-400 font-bold text-xl">
              &lt;Gaurav /&gt;
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
        <div className="w-full">
          <div className="font-mono text-emerald-400 mb-4">Hi, my name is</div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-6 tracking-tight">
            Gaurav Ghatol.
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-400 mb-8 h-20">
            I am a <span className="text-emerald-400">{typedText}</span>
            <span className="animate-pulse">|</span>
          </h2>
          <p className="text-slate-400 max-w-xl text-lg mb-10 leading-relaxed">
            Building digital solutions with code & creativity. Passionate about crafting intuitive UIs and optimizing backend performance.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 rounded hover:bg-emerald-500/20 transition-all duration-300 font-mono"
            >
              Check out my work
            </button>
            <a 
              href="https://github.com/gauravghatol" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://www.google.com/search?q=https://www.linkedin.com/in/gauravghatol" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-2">
            <span className="text-emerald-400 font-mono">01.</span> About Me
          </h2>
          <div className="h-px bg-slate-700 flex-grow max-w-xs"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 text-slate-400 leading-relaxed space-y-4">
            <p>
              Hello! I'm Gaurav, a passionate Full Stack Developer currently pursuing my B.E. in CSE at SSGMCE, Shegaon.
            </p>
            <p>
              I enjoy creating things that live on the internet. My interest in web development started back when I decided to try editing custom Tumblr themes — turns out hacking together HTML & CSS is pretty fun!
            </p>
            <p>
              Fast-forward to today, and I've had the privilege of working at an <span className="text-emerald-400">Electric Loco Shed</span> and <span className="text-emerald-400">CREA</span>. My main focus these days is building accessible, inclusive products and digital experiences.
            </p>
            
            <div className="mt-8">
              <h3 className="text-slate-100 font-semibold mb-4 flex items-center gap-2">
                <Terminal size={20} className="text-emerald-400" />
                Technologies I work with:
              </h3>
              <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
                {['Java & Python', 'React.js & Next.js', 'Node.js & Express', 'MongoDB & MySQL', 'Tailwind CSS', 'Git & GitHub'].map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <ChevronRight size={14} className="text-emerald-400" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-emerald-400 rounded translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
            <div className="relative bg-slate-800 rounded p-1 h-full min-h-[300px] flex items-center justify-center border border-slate-700">
               <Code2 size={64} className="text-emerald-400/50" />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-2">
            <span className="text-emerald-400 font-mono">02.</span> Experience
          </h2>
          <div className="h-px bg-slate-700 flex-grow max-w-xs"></div>
        </div>

        <div className="space-y-16">
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
            <div key={index} className="flex flex-col md:flex-row gap-8 group">
              {/* Logo Column */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full p-2 flex items-center justify-center shadow-lg shadow-emerald-500/10 group-hover:shadow-emerald-500/20 transition-all duration-300 border-2 border-slate-700 group-hover:border-emerald-400 overflow-hidden">
                  <img 
                    src={job.logo} 
                    alt={`${job.company} logo`} 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Content Column */}
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-100 mb-1">
                  {job.role}
                </h3>
                <p className="text-emerald-400 font-medium text-lg mb-2">
                  {job.company}
                </p>
                <p className="font-mono text-sm text-slate-500 mb-6 flex items-center justify-center md:justify-start gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
                  {job.period}
                </p>
                
                <ul className="space-y-3 text-slate-400 text-left">
                  {job.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 group/item">
                      <span className="mt-2 min-w-[6px] h-1.5 w-1.5 rounded-full bg-emerald-500/50 group-hover/item:bg-emerald-400 transition-colors"></span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-2">
            <span className="text-emerald-400 font-mono">03.</span> Some Things I've Built
          </h2>
          <div className="h-px bg-slate-700 flex-grow max-w-xs"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="bg-slate-900 p-6 rounded-lg border border-slate-800 hover:-translate-y-2 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 group flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="text-emerald-400 group-hover:text-emerald-300 transition-colors">
                  {project.icon}
                </div>
                <div className="flex gap-4 text-slate-400">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 cursor-pointer transition-colors"
                    title="View Code"
                  >
                    <Github size={20} />
                  </a>
                  <ExternalLink size={20} className="hover:text-emerald-400 cursor-pointer transition-colors" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-400 mb-6 text-sm">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-3 mt-auto">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-mono text-emerald-400/80">
                    {t}
                  </span>
                ))}
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
