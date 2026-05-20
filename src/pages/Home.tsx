import Hero from '../components/home/Hero';
import { useContent } from '../hooks/useContent';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Home() {
  const { settings } = useContent();

  return (
    <div className="flex flex-col relative">
      {/* Global Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.015] mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="globalNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#globalNoise)" />
        </svg>
      </div>

      <Hero />

      {/* About CTA / Vision - Enhanced with background image */}
      <section className="py-32 relative overflow-hidden">
        {/* Background Image with Parallax-like effect */}
        <div className="absolute inset-0 z-0">
          <img 
            src={settings.heroImageUrl || "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000"} 
            alt="" 
            className="w-full h-full object-cover transform scale-105"
          />
          <div className="absolute inset-0 bg-brand-secondary/80 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="lg:w-1/2 flex justify-center order-2 lg:order-1">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, rotate: -3 }}
                whileInView={{ opacity: 1, rotate: -2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img 
                  src={settings.visionImageUrl || "https://images.unsplash.com/photo-1524311588024-d2317178412b?auto=format&fit=crop&q=80&w=800"} 
                  alt="Vision" 
                  className="w-full max-w-md rounded-sm border-[12px] border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-brand-primary rounded-sm p-8 flex flex-col justify-center text-white shadow-xl">
                  <span className="text-4xl font-serif font-bold">14th</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Anniversary Edition</span>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="lg:w-1/2 space-y-8 order-1 lg:order-2 text-white">
            <span className="text-brand-primary font-sans font-bold text-xs uppercase tracking-[0.3em]">Our Vision</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Inspiring a culture of <span className="text-brand-primary italic">reading for generations</span>
            </h2>
            <p className="text-brand-beige/80 font-sans text-lg leading-relaxed italic border-l-2 border-brand-primary pl-6">
              "{settings.vision || 'To be a leading publishing brand in Ghana and beyond, renowned for excellence in literary publishing.'}"
            </p>
            <div className="pt-4">
              <Link to="/about">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="px-10 py-5 border-2 border-brand-primary text-brand-primary font-sans font-bold text-sm uppercase tracking-widest rounded-full hover:bg-brand-primary hover:text-white transition-all shadow-lg shadow-brand-primary/20"
                >
                  Learn More About Us
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

