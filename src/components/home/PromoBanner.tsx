import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useContent } from '../../hooks/useContent';

export default function PromoBanner() {
  const { settings } = useContent();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Mesh Filter */}
      <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none">
        <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-brand-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-[#fcfaf7] blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-white border border-gray-100 rounded-sm overflow-hidden min-h-[450px] flex flex-col md:flex-row items-center shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)]"
        >
          {/* Left Side: Subject Image */}
          <div className="w-full md:w-1/2 h-[300px] md:h-full relative overflow-hidden">
             <img 
               src={settings.featureCard1Url || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"} 
               className="w-full h-full object-cover"
               alt="Promotion"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#f0f2f5]" />
          </div>

          {/* Right Side: Content */}
          <div className="w-full md:w-1/2 p-12 md:p-24 text-center md:text-left space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Our Heritage</span>
              <h2 className="text-4xl md:text-6xl font-serif text-brand-secondary leading-tight">
                {settings.promoBannerTitle || "Our Story Continues."}
              </h2>
              <p className="text-gray-500 font-sans text-sm max-w-sm">
                {settings.promoBannerText || "Discover excellence in literary publishing and the journey of knowledge."}
              </p>
            </div>
            <div className="pt-4">
              <Link 
                to="/about" 
                className="inline-block px-10 py-4 bg-brand-secondary text-white font-sans font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-brand-primary transition-all shadow-xl shadow-black/10"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Floaters - artistic book graphics like in ref */}
          <div className="absolute right-0 top-0 h-full w-1/4 hidden lg:block pointer-events-none">
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [12, 10, 12] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 right-8 w-48 aspect-[3/4] skew-x-6 overflow-hidden border-[12px] border-white shadow-2xl"
            >
               <img src={settings.featureCard2Url || "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400"} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
