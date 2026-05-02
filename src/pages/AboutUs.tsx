export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Section - Split Background (Beige) */}
      <section className="bg-brand-beige pt-20 pb-32 lg:pb-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual Column - Overlapping Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-20 flex justify-center lg:justify-start"
            >
              <div className="w-full max-w-sm aspect-[3/4] bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] rounded-sm border-[16px] border-white overflow-hidden transform lg:-rotate-2">
                <img 
                  src="https://images.unsplash.com/photo-1549675584-91f19337af3d?auto=format&fit=crop&q=80&w=1000" 
                  alt="Richkiss Publishers" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Navigation Arrows (Decorative like reference) */}
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col space-y-4">
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400">
                  <ArrowUp size={16} />
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400">
                  <ArrowDown size={16} />
                </div>
              </div>
            </motion.div>

            {/* Content Column */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-serif text-brand-secondary leading-tight">
                  Richkiss Publishers: <span className="block italic">The Story House</span>
                </h1>
                <p className="text-xl font-sans font-medium text-brand-primary uppercase tracking-widest">
                  Founded 2010 • Accra, Ghana
                </p>
              </div>
              
              <p className="text-gray-600 font-sans leading-relaxed text-lg italic max-w-lg">
                "Promoting literacy, quality education, and knowledge development through innovative publishing solutions for the next generation."
              </p>

              <div className="flex items-center space-x-4 pt-4">
                <button className="px-10 py-4 bg-brand-secondary text-white rounded-full font-sans font-bold text-sm tracking-widest hover:bg-brand-primary transition-all flex items-center space-x-2">
                  <span>Contact us</span>
                  <ArrowUpRight size={18} />
                </button>
                <div className="flex space-x-2">
                  <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-brand-primary transition-colors">
                    <Bookmark size={20} />
                  </button>
                  <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-brand-primary transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom Section - White Background Grid */}
      <section className="bg-white py-24 relative -mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Description Area (Left Column in reference) */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-brand-secondary">Company History</h3>
                <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed font-sans text-sm md:text-base">
                  <p>{COMPANY_INFO.aboutUs}</p>
                </div>
              </div>

              {/* Founder/Testimonial Style Block */}
              <div className="p-8 bg-brand-beige/50 rounded-lg flex items-start space-x-6 border-l-4 border-brand-primary">
                <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Founder" />
                </div>
                <div className="space-y-2">
                  <p className="font-serif font-bold text-brand-secondary">E. S. Kissiedu</p>
                  <p className="text-xs text-gray-500 font-sans italic leading-relaxed">
                    "Our commitment is to nurture reading habits in children and support literacy across Africa. Every publication we produce meets the highest standards of content and design."
                  </p>
                </div>
              </div>
            </div>

            {/* Details Area (Right Column in reference) */}
            <div className="lg:col-span-5 space-y-12">
              <div className="grid grid-cols-1 gap-10">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted">Our Vision</h4>
                  <p className="text-sm font-sans text-gray-700 leading-relaxed">{COMPANY_INFO.vision}</p>
                </div>
                <div className="space-y-3 border-t border-gray-50 pt-8">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted">Core Services</h4>
                  <ul className="space-y-2">
                    {COMPANY_INFO.services.slice(0, 4).map(service => (
                      <li key={service} className="text-sm font-sans text-gray-700 flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3 border-t border-gray-50 pt-8">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted">Key Regions</h4>
                  <p className="text-sm font-sans text-gray-700">Ghana, Nigeria, Togo, Sharjah (UAE), Cairo (Egypt), India.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

import { ArrowUp, ArrowDown, ArrowUpRight, Bookmark, Share2 } from 'lucide-react';
import { COMPANY_INFO } from '../constants/content';
import { motion } from 'motion/react';
