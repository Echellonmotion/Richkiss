import Hero from '../components/home/Hero';
import FeaturedBooks from '../components/home/FeaturedBooks';
import TrendingBooks from '../components/home/TrendingBooks';
import FeatureGrid from '../components/home/FeatureGrid';
import PromoBanner from '../components/home/PromoBanner';
import TopCategories from '../components/home/TopCategories';
import { useContent } from '../hooks/useContent';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ImageIcon, ArrowRight } from 'lucide-react';

export default function Home() {
  const { settings, events, printWorks } = useContent();

  return (
    <div className="flex flex-col">
      <Hero />
      
      <FeaturedBooks />

      <FeatureGrid />

      {/* Featured Print Works Section */}
      <section className="py-24 bg-[#fffcfb]">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary">Print & Branding</span>
                <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary">Featured Works</h2>
              </div>
              <Link to="/print" className="text-xs font-bold uppercase tracking-widest text-brand-muted hover:text-brand-primary transition-colors flex items-center gap-2">
                 Explore Portfolio <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {printWorks.slice(0, 4).map((work: any, i: number) => (
                 <motion.div 
                   key={work.id || i}
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="group relative aspect-[4/5] bg-gray-100 rounded-sm overflow-hidden shadow-sm"
                 >
                    <img src={work.imageUrl} alt={work.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-brand-secondary/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center p-6 text-center">
                       <span className="text-white text-[10px] font-bold uppercase tracking-widest leading-relaxed">{work.title}</span>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      <PromoBanner />

      <TrendingBooks />

      <TopCategories />

      {/* About CTA / Vision - Retained but simplified */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 flex justify-center order-2 lg:order-1">
            <div className="relative">
              <img 
                src={settings.visionImageUrl || "https://images.unsplash.com/photo-1524311588024-d2317178412b?auto=format&fit=crop&q=80&w=800"} 
                alt="Vision" 
                className="w-full max-w-md rounded-sm border-8 border-white shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-brand-primary rounded-sm p-8 flex flex-col justify-center text-white shadow-xl">
                <span className="text-4xl font-serif font-bold">14th</span>
                <span className="text-[10px] uppercase tracking-widest font-bold">Anniversary Edition</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 space-y-8 order-1 lg:order-2">
            <span className="text-brand-primary font-sans font-bold text-xs uppercase tracking-[0.3em]">Our Vision</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary leading-tight">
              Inspiring a culture of <span className="text-brand-primary">reading for generations</span>
            </h2>
            <p className="text-gray-500 font-sans text-lg leading-relaxed italic">
              "{settings.vision || 'To be a leading publishing brand in Ghana and beyond, renowned for excellence in literary publishing.'}"
            </p>
            <div className="pt-4">
              <Link to="/about">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="px-10 py-5 border-2 border-brand-primary text-brand-primary font-sans font-bold text-sm uppercase tracking-widest rounded-full hover:bg-brand-primary hover:text-white transition-all"
                >
                  Learn More About Us
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events Participation Intro */}
      <section className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary">Global Presence</h2>
          <p className="text-brand-muted max-w-2xl mx-auto">
            Participating in major international book fairs from Ghana to Cairo, Sharjah to Chennai. Connecting readers and publishers worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            {events.slice(0, 3).map((event: any, idx: number) => (
              <div key={event.id || event.name || idx} className="px-6 py-3 bg-white rounded-full text-xs font-bold uppercase tracking-wider text-brand-secondary border border-gray-100 shadow-sm">
                {event.name} ({event.year})
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

