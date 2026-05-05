import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useContent } from '../../hooks/useContent';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { settings } = useContent();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalogue', path: '/catalogue' },
    { name: 'Careers', path: '/careers' },
    { name: 'Events', path: '/events' },
    { name: 'Our Clients', path: '/clients' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 lg:h-32">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            {settings.logoUrl ? (
              <img 
                src={settings.logoUrl} 
                alt={settings.companyName || "Logo"} 
                className="h-16 lg:h-24 w-auto object-contain transition-transform duration-200" 
              />
            ) : (
              <div className="flex items-center space-x-2">
                 <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">
                    <BookOpen size={24} />
                 </div>
                 <div className="flex flex-col">
                    <span className="font-serif text-xl font-bold tracking-tight text-brand-secondary leading-none uppercase">
                      {settings.companyName?.split(' ')[0] || 'RICHKISS'}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-brand-muted font-sans font-semibold">
                      {settings.companyName?.split(' ').slice(1).join(' ') || 'Publishers'}
                    </span>
                 </div>
              </div>
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-brand-primary ${isActive ? 'text-brand-primary underline underline-offset-8 decoration-2' : 'text-gray-600'}`}>Home</NavLink>
            
            {/* About Submenu */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <button className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-brand-primary ${isAboutOpen ? 'text-brand-primary' : 'text-gray-600'}`}>
                <span>About</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isAboutOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isAboutOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-xl py-2"
                  >
                    <Link 
                      to="/about"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-brand-beige hover:text-brand-primary transition-colors border-b border-gray-50 last:border-0"
                    >
                      <div className="font-bold">Our Company</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">Learn about our mission & history</div>
                    </Link>
                    <Link 
                      to="/about/print"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-brand-beige hover:text-brand-primary transition-colors border-b border-gray-50 last:border-0"
                    >
                      <div className="font-bold">Print Department</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">Technical capabilities & production</div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(1).map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path} 
                className={({ isActive }) => `text-sm font-medium transition-colors hover:text-brand-primary ${isActive ? 'text-brand-primary underline underline-offset-8 decoration-2' : 'text-gray-600'}`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              <NavLink to="/" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-gray-700 border-b border-gray-50">Home</NavLink>
              
              <div className="py-2 border-b border-gray-50">
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">About Us</p>
                <Link to="/about" onClick={() => setIsOpen(false)} className="block px-6 py-2 text-sm text-gray-600">Our Company</Link>
                <Link to="/about/print" onClick={() => setIsOpen(false)} className="block px-6 py-2 text-sm text-gray-600">Print Department</Link>
              </div>

              {navLinks.slice(1).map((link) => (
                <NavLink 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-gray-700 border-b border-gray-50"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
