import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play,
  ArrowRight,
  ChevronRight,
  Send,
  Target,
  Eye,
  ShieldCheck,
  Layout,
  Zap,
  Layers,
  Maximize,
  Gift,
  BookOpen,
  Shirt,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';

export default function PrintDepartment() {
  const { printWorks } = useContent();
  const [selectedWork, setSelectedWork] = useState<any | null>(null);

  const services = [
    { title: "DESIGN SERVICES", desc: "Assistance from concept to production with our in-house design team.", icon: <Layout size={24} /> },
    { title: "DIGITAL PRINTING", desc: "High-quality prints for marketing materials, brochures, reports, cards, and posters.", icon: <Zap size={24} /> },
    { title: "OFFSET PRINTING", desc: "Cost-effective large-volume printing for magazines, catalogs, and packaging.", icon: <Layers size={24} /> },
    { title: "LARGE FORMAT PRINTING", desc: "Banners, signage, and displays that command attention.", icon: <Maximize size={24} /> },
    { title: "CORPORATE & PROMO", desc: "Corporate, promotional items and branded souvenirs.", icon: <Gift size={24} /> },
    { title: "PUBLISHING", desc: "Typesetting, editing, proof reading, and page setting.", icon: <BookOpen size={24} /> },
    { title: "T-SHIRT PRINTING", desc: "Custom apparel printing and branding solutions.", icon: <Shirt size={24} /> }
  ];

  const values = [
    { title: "Quality", desc: "We prioritize uncompromising quality in all our products and services." },
    { title: "Customer Focus", desc: "Our customers are at the heart of everything we do. We listen and exceed expectations." },
    { title: "Innovation", desc: "We actively encourage a culture of innovation." }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden pt-48 lg:pt-64">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=2000" 
            alt="Print Production" 
            className="w-full h-full object-cover grayscale brightness-50"
          />
          {/* Transparent with black overlay */}
          <div className="absolute inset-0 bg-brand-secondary/60 backdrop-blur-[1px] z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[2]" />
        </div>
        
        <div className="relative text-center space-y-6 z-10 px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-white tracking-tight"
          >
            Print & Branding
          </motion.h1>
          
          <nav className="flex items-center justify-center space-x-2 text-white/70 font-sans text-[10px] uppercase tracking-[0.2em]">
            <Link to="/" className="hover:text-brand-primary transition-colors">Home</Link>
            <ChevronRight size={10} className="text-brand-primary" />
            <span className="text-brand-primary">Print Department</span>
          </nav>
        </div>
      </section>

      {/* 2. Introduction Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary">About Us</span>
                <h2 className="text-4xl lg:text-5xl font-serif text-brand-secondary leading-tight uppercase font-bold">
                  ESTABLISHED <br /> JANUARY 2010
                </h2>
                <div className="w-16 h-1 bg-brand-primary" />
              </div>

              <p className="text-gray-500 font-sans leading-relaxed text-lg italic border-l-4 border-brand-primary pl-6 py-2">
                Richkiss Enterprise is an indigenous Ghanaian firm that offers a portfolio of printing, graphic design, branding, and publishing services.
              </p>

              <div className="space-y-6 text-gray-500 font-sans leading-relaxed text-sm">
                <p>
                  With over a decade of experience in the industry, we cater to a diverse range of clients, from small businesses to large corporations, delivering exceptional design, printing and branding services that meet their exceptional needs. 
                </p>
                <p>
                  We are committed to providing superior products and services at the highest level of quality and expertise. We painstakingly build strong relationships with our clients, getting to know their needs and preferences, and carefully follow their requirements to achieve the expected outcomes.
                </p>
                <p className="font-bold text-brand-secondary">
                  Our desire for excellence drives us to challenge ourselves to excel in all aspects of our business.
                </p>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <Link 
                  to="/contact"
                  className="px-8 py-4 bg-brand-primary text-white font-sans font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm hover:-translate-y-1 transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-2"
                >
                  Contact Us
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1562654501-a0ccc0af3fb1?auto=format&fit=crop&q=80&w=1200" 
                alt="Production"
                className="rounded-sm shadow-2xl w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 bg-brand-primary text-white py-12 px-2 [writing-mode:vertical-lr] text-[10px] font-bold uppercase tracking-[0.4em] rotate-180 rounded-sm">
                WE ARE PROUD OF
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-24 bg-brand-beige/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-12 rounded-sm border border-gray-100 space-y-6 shadow-sm">
            <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary flex items-center justify-center">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold uppercase tracking-widest text-brand-secondary">Mission Statement</h3>
            <p className="text-gray-500 font-sans leading-relaxed text-sm">
              At Richkiss, we strive to transform ideas into tangible products through innovative printing techniques, exceptional service, and a commitment to sustainability.
            </p>
          </div>
          <div className="bg-brand-secondary text-white p-12 rounded-sm space-y-6 shadow-xl">
            <div className="w-12 h-12 bg-brand-primary/20 text-brand-primary flex items-center justify-center">
              <Eye size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold uppercase tracking-widest">Vision Statement</h3>
            <p className="text-gray-400 font-sans leading-relaxed text-sm italic">
              "To be the preferred partner in the creative space for businesses and individuals by continually improving and adapting to the ever-changing landscape of design, print technology and publishing."
            </p>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary">Foundation</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary uppercase font-bold">Core Values</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="p-10 bg-[#fafafa] border border-gray-100 text-left space-y-4 rounded-sm">
                <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs font-bold">{i + 1}</div>
                <h3 className="text-lg font-serif font-bold text-brand-secondary uppercase tracking-wider">{v.title}</h3>
                <p className="text-gray-500 font-sans text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Services Grid - Yes! We Do */}
      <section className="py-24 lg:py-32 bg-[#fdfdfd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary">Our Expertise</span>
                <h2 className="text-5xl lg:text-7xl font-serif text-brand-secondary font-bold uppercase">Yes!<br/>We Do</h2>
                <div className="w-16 h-1 bg-brand-primary" />
              </div>
              <p className="text-gray-500 font-sans leading-relaxed">
                Comprehensive solutions for all your printing, design, and publishing needs. We leverage state-of-the-art technology to bring your ideas to life.
              </p>
              <button className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center group hover:bg-brand-primary hover:border-brand-primary transition-all">
                <Play size={20} className="fill-current text-brand-secondary group-hover:text-white pl-1" />
              </button>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 border border-gray-100 overflow-hidden">
               {services.map((s, i) => (
                 <div key={i} className="bg-white p-10 space-y-4 hover:bg-brand-beige/20 transition-colors group">
                    <div className="w-10 h-10 text-brand-primary group-hover:scale-110 transition-transform">
                      {s.icon}
                    </div>
                    <h3 className="font-serif font-bold text-brand-secondary uppercase tracking-widest">{s.title}</h3>
                    <p className="text-[11px] text-gray-400 font-sans leading-relaxed uppercase tracking-widest">{s.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Works Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary">Portfolio</span>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary uppercase font-bold">Our Works</h2>
            </div>
            <p className="text-gray-500 font-sans max-w-sm text-sm">
              A curated selection of our recent projects showcasing design excellence and print quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {printWorks?.length > 0 ? (
              printWorks.slice(0, 4).map((work: any) => (
                <motion.div 
                  key={work.id}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedWork(work)}
                  className="space-y-4 group cursor-pointer"
                >
                  <div className="aspect-[4/5] bg-gray-100 rounded-sm overflow-hidden relative">
                    <img 
                      src={work.imageUrl} 
                      alt={work.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-brand-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-8 text-center">
                       <span className="text-white text-[10px] font-bold uppercase tracking-[0.4em] translate-y-4 group-hover:translate-y-0 transition-transform">View Details</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-brand-secondary uppercase tracking-widest">{work.title}</h3>
                    <p className="text-[9px] text-brand-primary font-bold uppercase tracking-[0.2em]">{work.category || 'Graphic Design'}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[4/5] bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-gray-300 text-[10px] uppercase font-bold tracking-widest">
                  Work Sample {i}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 7. Newsletter CTA */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWork(null)}
            className="fixed inset-0 z-[100] bg-brand-secondary/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
          >
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <X size={32} />
            </motion.button>

            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full flex flex-col md:flex-row gap-8 items-center bg-white rounded-sm overflow-hidden shadow-2xl"
            >
              <div className="w-full md:w-2/3 aspect-[4/3] bg-gray-100">
                <img 
                  src={selectedWork.imageUrl} 
                  alt={selectedWork.title} 
                  className="w-full h-full object-contain bg-white"
                />
              </div>
              <div className="w-full md:w-1/3 p-12 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary">Project Showcase</span>
                  <h3 className="text-3xl font-serif text-brand-secondary leading-tight">{selectedWork.title}</h3>
                  <div className="w-12 h-[1px] bg-brand-primary" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
                  Category: <span className="text-brand-secondary">{selectedWork.category || 'Graphic Design'}</span>
                </p>
                <div className="pt-8">
                  <button 
                    onClick={() => setSelectedWork(null)}
                    className="px-8 py-4 bg-brand-secondary text-white font-sans font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-brand-primary transition-all shadow-xl shadow-black/10"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="bg-brand-secondary py-12 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-4 text-white">
              <div className="w-10 h-10 border border-white/20 rounded-sm flex items-center justify-center">
                <Send size={18} className="text-brand-primary" />
              </div>
              <h3 className="text-xl font-serif uppercase tracking-widest">Sign Up To Get Latest Updates</h3>
            </div>
            
            <div className="flex w-full lg:w-auto h-14">
              <input 
                type="email" 
                placeholder="YOUR EMAIL HERE" 
                className="flex-1 lg:w-80 bg-white px-6 font-sans text-[10px] font-bold tracking-widest outline-none"
              />
              <button className="bg-brand-primary text-white hover:bg-[#e64a19] px-10 transition-colors uppercase text-[10px] font-bold tracking-[0.2em] h-full">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <div className="py-6 bg-brand-secondary text-center">
        <p className="text-[9px] text-white/30 uppercase tracking-[0.4em] font-sans">Richkiss Enterprise © 2024</p>
      </div>
    </div>
  );
}

