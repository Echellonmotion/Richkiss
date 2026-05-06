import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useContent } from '../../hooks/useContent';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Hero() {
  const { settings } = useContent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = settings.heroImages && settings.heroImages.length > 0 ? settings.heroImages : [
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=2000"
  ];

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#fdfdfd] overflow-hidden pt-16">
      {/* Background patterns - subtle floral/abstract lines from ref */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <pattern id="leaf-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10 5 Q15 0 20 5 T10 20 T0 5 Q5 0 10 5" fill="currentColor" className="text-brand-secondary" />
          </pattern>
          <rect x="0" y="0" width="100" height="100" fill="url(#leaf-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Content - Left Aligned */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-serif text-brand-secondary leading-[1.1] tracking-tight">
               {settings.tagline?.split(' ').slice(0, 2).join(' ') || 'Biggest'} <span className="block text-brand-primary">{settings.tagline?.split(' ').slice(2).join(' ') || 'Bookstore In Ghana'}</span>
            </h1>
            <p className="text-xl text-gray-500 font-sans max-w-lg leading-relaxed">
              We deliver books all over the world 10,000+ books in stock
            </p>
          </div>
          
          <div className="pt-4">
            <Link 
              to="/catalogue" 
              className="inline-block px-12 py-5 bg-[#ff5722] text-white font-sans font-bold text-xs uppercase tracking-widest rounded-sm hover:translate-y-[-2px] transition-all shadow-xl shadow-orange-500/20"
            >
              Meet our bestseller →
            </Link>
          </div>

          {/* Dots as pagination placeholder like in ref */}
          <div className="flex space-x-2 pt-12">
            {[0, 1, 2].map(i => (
              <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === 0 ? 'w-8 bg-brand-secondary' : 'w-4 bg-gray-200'}`} />
            ))}
          </div>
        </motion.div>

        {/* Visual - Staggered Book Arrangement */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative h-[600px] flex items-center justify-center"
        >
          {/* Back Book */}
          <motion.div 
            animate={{ y: [0, -10, 0], rotate: [-2, -3, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-10 w-full max-w-[280px] aspect-[3/4] rounded-sm overflow-hidden shadow-[20px_20px_60px_rgba(0,0,0,0.15)] border-8 border-white bg-white -translate-x-12 -translate-y-8"
          >
             <img 
               src={images[1] || images[0]} 
               alt="Book cover" 
               className="w-full h-full object-cover grayscale-[0.2]"
             />
             <div className="absolute inset-0 bg-brand-secondary/5" />
          </motion.div>

          {/* Front Book */}
          <motion.div 
             animate={{ y: [0, -15, 0], rotate: [2, 1, 2] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
             className="relative z-20 w-full max-w-[320px] aspect-[3/4] rounded-sm overflow-hidden shadow-[30px_30px_80px_rgba(0,0,0,0.2)] border-[12px] border-white bg-white translate-x-8 translate-y-8"
          >
             <img 
               src={images[0]} 
               alt="Main Book" 
               className="w-full h-full object-cover"
             />
          </motion.div>

          {/* Floater Element (like the mini cover in ref) */}
          <motion.div 
            animate={{ y: [0, -5, 0], rotate: [8, 12, 8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute z-30 bottom-12 right-0 w-32 aspect-[3/4] rounded-sm overflow-hidden shadow-2xl border-4 border-white rotate-12"
          >
             <img 
               src={images[2] || images[0]} 
               alt="Book mini" 
               className="w-full h-full object-cover"
             />
          </motion.div>
        </motion.div>
      </div>
    </section>

  );
}
