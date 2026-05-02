import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useContent } from '../../hooks/useContent';

export default function Hero() {
  const { settings } = useContent();

  return (
    <section className="relative min-h-[85vh] flex items-center bg-brand-beige overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-white hidden lg:block" style={{ borderRadius: '0 0 0 100%' }} />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl transform -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <span className="inline-block text-brand-primary font-sans font-bold text-xs uppercase tracking-[0.3em]">
              ESTABLISHED 2010
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-brand-secondary leading-[1.1] tracking-tight">
              {settings.tagline?.split(' ').slice(0, 3).join(' ') || 'Nurturing Minds'} with <span className="italic block text-brand-primary">{settings.tagline?.split(' ').slice(3).join(' ') || 'Authentic Stories'}</span>
            </h1>
          </div>
          
          <p className="text-lg text-gray-600 font-sans leading-relaxed max-w-lg line-clamp-3">
            {settings.aboutText || 'Richkiss Publishers is a Ghanaian literary house dedicated to high-quality education and the preservation of African storytelling for the next generation.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              to="/catalogue" 
              className="w-full sm:w-auto px-10 py-5 bg-brand-primary text-white font-sans font-bold text-sm uppercase tracking-widest rounded-full hover:bg-brand-secondary transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300 text-center"
            >
              Explore our books
            </Link>
            <Link 
              to="/about" 
              className="group flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-brand-secondary"
            >
              <span>The Richkiss Legacy</span>
              <div className="w-10 h-[1px] bg-brand-secondary group-hover:w-16 transition-all duration-300" />
            </Link>
          </div>

          <div className="pt-8 grid grid-cols-3 gap-8 border-t border-brand-primary/10">
            <div>
              <p className="text-3xl font-serif font-bold text-brand-secondary">14+</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-brand-muted">Years of Legacy</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-brand-secondary">500+</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-brand-muted">Original Titles</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-brand-secondary">6+</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-brand-muted">Global Regions</p>
            </div>
          </div>
        </motion.div>

        {/* Visual - Removed floating AI-style accents */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative lg:h-[600px] flex items-center justify-center"
        >
          {/* Main Hero Image - More grounded border/shadow */}
          <div className="relative z-10 w-full max-w-md aspect-[3/4] rounded-sm overflow-hidden shadow-2xl border-[12px] border-white transform hover:rotate-1 transition-transform duration-700 group">
             <img 
               src="https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&q=80&w=1000" 
               alt="Book reading" 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
             />
          </div>

          {/* Background Decorative Lines - More architectural, less tech-blob */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <div className="w-full h-full grid grid-cols-6 gap-0">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border-r border-brand-primary h-full" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
