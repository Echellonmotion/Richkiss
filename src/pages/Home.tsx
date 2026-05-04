import Hero from '../components/home/Hero';
import FeaturedBooks from '../components/home/FeaturedBooks';
import { useContent } from '../hooks/useContent';
import { BookOpen, Award, Users, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const { settings, events } = useContent();

  return (
    <div className="flex flex-col">
      <Hero />
      
      {/* Services Quick Look */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Book Publishing', 'Educational Resources', 'Author Support', 'Distribution'].map((service, idx) => (
              <motion.div 
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-brand-beige rounded-2xl hover:bg-brand-primary hover:text-white transition-all duration-500 group"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
                  {idx === 0 && <BookOpen size={24} />}
                  {idx === 1 && <Award size={24} />}
                  {idx === 2 && <Users size={24} />}
                  {idx === 3 && <Globe size={24} />}
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">{service}</h3>
                <p className="text-sm font-sans opacity-70 leading-relaxed">Providing world-class publishing and printing services to meet global standards.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedBooks />

      {/* About CTA / Vision */}
      <section className="py-24 bg-brand-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
            <path d="M0 0 L100 0 L100 100 Z" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1524311588024-d2317178412b?auto=format&fit=crop&q=80&w=800" 
                alt="Vision" 
                className="w-full max-w-md rounded-sm border-8 border-white shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-brand-primary rounded-sm p-8 flex flex-col justify-center text-white shadow-xl">
                <span className="text-4xl font-serif font-bold">14th</span>
                <span className="text-[10px] uppercase tracking-widest font-bold">Anniversary Edition</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 space-y-8 text-white">
            <span className="text-brand-primary font-sans font-bold text-xs uppercase tracking-[0.3em]">Our Vision</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Inspiring a culture of <span className="italic text-brand-primary">reading for generations</span>
            </h2>
            <p className="text-gray-400 font-sans text-lg leading-relaxed italic">
              "{settings.vision || 'To be a leading publishing brand in Ghana and beyond, renowned for excellence in literary publishing.'}"
            </p>
            <div className="pt-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="px-10 py-5 border-2 border-brand-primary text-brand-primary font-sans font-bold text-sm uppercase tracking-widest rounded-full hover:bg-brand-primary hover:text-white transition-all"
              >
                Learn More About Us
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Participation Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary">Global Presence</h2>
          <p className="text-brand-muted max-w-2xl mx-auto">
            Participating in major international book fairs from Ghana to Cairo, Sharjah to Chennai. Connecting readers and publishers worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            {events.slice(0, 3).map((event: any, idx: number) => (
              <div key={event.id || event.name || idx} className="px-6 py-3 bg-brand-beige rounded-full text-xs font-bold uppercase tracking-wider text-brand-secondary border border-gray-100">
                {event.name} ({event.year})
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
