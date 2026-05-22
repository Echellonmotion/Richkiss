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
    { name: 'About Us', path: '/about' },
    { name: 'Shop', path: '/shop' },
    { name: 'Events', path: '/events' },
    { name: 'Retail Partners', path: '/clients' },
    { name: 'Print Department', path: '/print' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-32 lg:h-44">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group animate-fadeIn">
            {settings.logoUrl ? (
              <img 
                src={settings.logoUrl} 
                alt={settings.companyName || "Logo"} 
                className="h-28 lg:h-40 w-auto object-contain transition-transform duration-200" 
              />
            ) : (
              <div className="flex items-center space-x-2">
                 <div className="w-16 h-16 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">
                    <BookOpen size={36} />
                 </div>
                 <div className="flex flex-col">
                    <span className="font-serif text-3xl font-bold tracking-tight text-brand-secondary leading-none uppercase">
                       {settings.companyName?.split(' ')[0] || 'RICHKISS'}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-brand-muted font-sans font-semibold mt-1">
                       {settings.companyName?.split(' ').slice(1).join(' ') || 'Publishers'}
                    </span>
                 </div>
              </div>
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path} 
                className={({ isActive }) => `text-[15px] xl:text-[17px] font-bold transition-colors hover:text-brand-primary whitespace-nowrap ${isActive ? 'text-brand-primary underline underline-offset-8 decoration-2' : 'text-gray-600'}`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
              {isOpen ? <X size={36} /> : <Menu size={36} />}
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
            <div className="px-6 py-8 space-y-4">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-5 text-xl font-bold text-gray-700 border-b border-gray-50"
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
