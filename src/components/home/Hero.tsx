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
    <section className="relative min-h-[95vh] flex items-center bg-white overflow-hidden pt-48 lg:pt-64">
      {/* Background Layer 1: Mesh Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-primary/5 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-brand-beige rounded-full blur-[80px]" />
      </div>

      {/* Background Layer 2: Grainy Texture */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Background Layer 3: Decorative Patterns */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="leaf-pattern" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
            <path d="M7.5 2 Q10 0 12.5 2 T7.5 10 T2.5 2 Q5 0 7.5 2" fill="currentColor" className="text-brand-primary" />
          </pattern>
          <rect x="0" y="0" width="100" height="100" fill="url(#leaf-pattern)" />
        </svg>
      </div>

      {/* Large Decorative Text (Branded Watermark) */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 rotate-90 select-none pointer-events-none overflow-hidden hidden xl:block">
        <span className="text-[180px] font-serif font-black text-brand-secondary/[0.02] leading-none whitespace-nowrap">
          RICHKISS PUBLISHERS
        </span>
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
