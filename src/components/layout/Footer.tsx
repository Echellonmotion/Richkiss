import { Link } from 'react-router-dom';
import { BookOpen, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Settings } from 'lucide-react';
import { COMPANY_INFO, BOOK_CATEGORIES } from '../../constants/content';
import { useContent } from '../../hooks/useContent';

export default function Footer() {
  const { settings } = useContent();

  return (
    <footer className="bg-brand-secondary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand and About */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              {settings.footerLogoUrl || settings.logoUrl ? (
                <img 
                  src={settings.footerLogoUrl || settings.logoUrl} 
                  alt={settings.companyName || "Logo"} 
                  className="h-20 w-auto object-contain" 
                />
              ) : (
                <>
                  <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-white">
                    <BookOpen size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-xl font-bold tracking-tight leading-none text-white uppercase">
                      {settings.companyName?.split(' ')[0] || 'RICHKISS'}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans font-semibold mt-1">
                      {settings.companyName?.split(' ').slice(1).join(' ') || 'Publishers'}
                    </span>
                  </div>
                </>
              )}
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Promoting literacy, quality education, and knowledge development through innovative publishing solutions since 2010.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand-primary hover:text-white transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand-primary hover:text-white transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand-primary hover:text-white transition-all duration-300">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Categories Links */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-semibold">Our Offerings</h4>
            <ul className="space-y-3">
              <li><Link to="/catalogue" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Full Book Catalogue</Link></li>
              <li><Link to="/about/print" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Printing Services</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Upcoming Events</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Work with Us</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-semibold">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">About Us</Link></li>
              <li><Link to="/about/print" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Print Department</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Careers</Link></li>
              <li><Link to="/clients" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Our Clients</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-semibold">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <MapPin size={20} className="text-brand-primary flex-shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.headOffice}</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Phone size={20} className="text-brand-primary flex-shrink-0" />
                <span>{COMPANY_INFO.phone[0]}</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Mail size={20} className="text-brand-primary flex-shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-gray-500 font-sans">
            © {new Date().getFullYear()} Richkiss Publishers. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link to="/admin" className="text-gray-400 hover:text-brand-primary transition-colors">
              <Settings size={14} />
            </Link>
            <div className="flex space-x-6 text-xs text-gray-500 font-sans">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
