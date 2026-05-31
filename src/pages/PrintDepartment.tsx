import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play,
  ArrowRight,
  ChevronRight,
  Send,
  X,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';

export default function PrintDepartment() {
  const { settings, printWorks, printPartners: cmsPrintPartners } = useContent();
  const [selectedWork, setSelectedWork] = useState<any | null>(null);

  const staticPartners = [
    "Princlesgh", "AGAMal", "YiKroSec", 
    "GreenLac", "ASSN", "UMA"
  ];
  const partners = cmsPrintPartners && cmsPrintPartners.length > 0 ? cmsPrintPartners : staticPartners.map(name => ({ name }));

  const allProducts = [
    "Books and Magazines",
    "Brochures and Flyers",
    "Calendars and Diaries",
    "Business Cards",
    "Posters and Banners",
    "Stickers and Labels",
    "Certificates and ID Cards",
    "Branded Notepads",
    "Photobooks and Catalogues",
    "Letterheads and Envelopes",
    "Branded T-Shirts and Polo Shirts",
    "Tote Bags and Shopping Bags",
    "Pens and Office Stationery",
    "Roll-Up Banners and Signages",
    "Corporate Gift Items",
    "Mugs and Water Bottles",
    "Key Holders and Wristbands",
    "Plaques and Awards",
    "Umbrellas and Event Giveaways",
    "Vehicle, Office and ATM Booth Branding"
  ];

  const departments = [
    {
      id: "offset",
      title: "OFFSET PRINTING",
      description: "Offset printing remains one of the most reliable and cost-effective printing methods for producing premium materials with consistent quality and durability. Using modern printing technology and quality materials, we produce professional finishing for both small and large-scale print projects ensuring every product meets the highest standards of excellence and customer satisfaction.",
      bgImage: settings.printOffsetBgImageUrl || "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1000",
      products: [
        "Books and Magazines",
        "Brochures and Flyers",
        "Calendars"
      ]
    },
    {
      id: "digital",
      title: "DIGITAL PRINTING",
      description: "Our digital printing services offer fast, flexible, and high-quality printing solutions for personal and corporate needs. Ideal for short-run and on-demand printing, digital printing delivers vibrant colours, sharp details, and quick turnaround times without compromising quality. At Richkiss we combine creativity, modern technology, and precision to produce professional prints that leave lasting impressions.",
      bgImage: settings.printDigitalBgImageUrl || "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1000",
      products: [
        "Business Cards",
        "Flyers and Brochures",
        "Posters and Banners",
        "Stickers and Labels",
        "Certificates and ID Cards",
        "Branded Notepads and Diaries",
        "Photobooks and Catalogues",
        "Books and Magazines",
        "Letterheads and Envelopes"
      ]
    },
    {
      id: "branding",
      title: "BRANDING",
      description: "We offer creative and professional branding solutions that help businesses, organisations, and individuals build strong and memorable identities. Our branding services are designed to enhance visibility, promote professionalism, and create lasting impressions through quality designs and customised products. With attention to detail and a commitment to excellence, we bring brands to life in unique and impactful ways.",
      bgImage: settings.printBrandingBgImageUrl || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000",
      products: [
        "Branded T-Shirts and Polo Shirts",
        "Tote Bags",
        "Pens and Office Stationery",
        "Roll-Up Banners and Signages",
        "Stickers and Labels",
        "Corporate Gift Items",
        "ID Cards and Lanyards",
        "Vehicle Branding",
        "Office branding",
        "ATM Booth Branding"
      ]
    },
    {
      id: "souvenirs",
      title: "SOUVENIRS",
      description: "We provide quality and customised souvenir products designed to create lasting memories and strengthen brand visibility. Our souvenirs are perfect for corporate events, conferences, and special occasions. With creative designs, durable materials, and professional finishing, we help our clients turn everyday items into meaningful and memorable gifts.",
      bgImage: settings.printSouvenirsBgImageUrl || "https://images.unsplash.com/photo-1549463778-07038c824889?auto=format&fit=crop&q=80&w=1000",
      products: [
        "Mugs and Water Bottles",
        "Pens and Notebooks",
        "Key Holders and Wristbands",
        "T-Shirts, Polo Shirts, and Caps",
        "Tote Bags and Shopping Bags",
        "Diaries and Calendars",
        "ID Card Holders and Lanyards",
        "Plaques and Awards",
        "Umbrellas and Gift Sets",
        "Event Souvenirs & Corporate Giveaways"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {settings.printHeroImageUrl ? (
            <img 
              src={settings.printHeroImageUrl} 
              alt="Print Production" 
              className="w-full h-full object-cover grayscale brightness-50"
            />
          ) : (
            <div className="w-full h-full bg-brand-secondary" />
          )}
          <div className="absolute inset-0 bg-brand-secondary/60 backdrop-blur-[1px] z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[2]" />
        </div>
        
        <div className="relative text-center space-y-6 z-10 px-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-primary">Richkiss Enterprise</span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-black text-white uppercase tracking-tight"
          >
            Print Department
          </motion.h1>
          
          <nav className="flex items-center justify-center space-x-2 text-white/70 font-sans text-[10px] uppercase tracking-[0.2em]">
            <Link to="/" className="hover:text-brand-primary transition-colors">Home</Link>
            <ChevronRight size={10} className="text-brand-primary" />
            <span className="text-brand-primary">Print Department</span>
          </nav>
        </div>
      </section>

      {/* 2. Introduction Section (Who We Are) */}
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
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary">Introduction</span>
                <h2 className="text-4xl lg:text-5xl font-serif text-brand-secondary leading-tight uppercase font-bold">
                  Who <br /> We Are
                </h2>
                <div className="w-16 h-1 bg-brand-primary" />
              </div>

              <p className="text-gray-500 font-sans leading-relaxed text-lg italic border-l-4 border-brand-primary pl-6 py-2">
                Established in January 2010, Richkiss Enterprise is an indigenous Ghanaian firm that offers a portfolio of printing, graphic design, branding, and publishing services.
              </p>

              <div className="space-y-6 text-gray-500 font-sans leading-relaxed text-sm">
                <p>
                  With over a decade of experience in the industry, we cater to a diverse range of clients, from small businesses to large corporations, delivering exceptional design, printing and branding services that meet their exceptional needs.
                </p>
                <p>
                  We are committed to providing superior products and services at the highest level of quality and expertise. We painstakingly build strong relationships with our clients, getting to know their needs and preferences, and carefully follow their requirements to achieve the expected outcomes.
                </p>
                <p className="font-bold text-brand-secondary border-t border-gray-100 pt-6">
                  Our desire for excellence drives us to challenge ourselves to excel in all aspects of our business.
                </p>
              </div>

              <div className="pt-4">
                <Link 
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-white font-sans font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm hover:-translate-y-1 transition-all shadow-xl shadow-brand-primary/20"
                >
                  Work With Us
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
              {settings.printAboutImageUrl ? (
                <img 
                  src={settings.printAboutImageUrl} 
                  alt="Production Facility"
                  className="rounded-sm shadow-2xl w-full aspect-[4/5] object-cover"
                />
              ) : (
                <div className="rounded-sm shadow-2xl w-full aspect-[4/5] bg-gray-100 flex items-center justify-center text-gray-300">
                  <span className="text-xs uppercase tracking-widest font-bold">Press Machine Area</span>
                </div>
              )}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 bg-brand-primary text-white py-12 px-2 [writing-mode:vertical-lr] text-[10px] font-bold uppercase tracking-[0.4em] rotate-180 rounded-sm shadow-lg">
                WE ARE PROUD OF
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Main Catalogue Departments Showcases */}
      <section className="py-24 bg-brand-beige/20 border-y border-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          <div className="text-center space-y-4 max-w-2xl mx-auto pb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary">Our Core Offerings</span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-secondary font-bold uppercase">Departments & Products</h2>
            <p className="text-sm text-gray-500 font-sans leading-relaxed">
              Explore our full list of print solutions, tailored branding materials, and customized promotional products engineered for durability and impact.
            </p>
          </div>

          <div className="space-y-16">
            {departments.map((dept, index) => (
              <div key={dept.id}>
                {/* Visual Section Separator with Golden Detail */}
                {index > 0 && (
                  <div className="py-16 flex items-center justify-center">
                    <div className="w-full max-w-lg flex items-center justify-center gap-6">
                      <div className="h-[1px] bg-brand-secondary/10 flex-1" />
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
                      <div className="h-[1px] bg-brand-secondary/10 flex-1" />
                    </div>
                  </div>
                )}

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="max-w-4xl mx-auto space-y-8 p-8 md:p-12 hover:bg-white/40 transition-all rounded-sm hover:shadow-sm"
                >
                  <div className="flex flex-col md:flex-row items-center gap-6 justify-center text-center md:text-left">
                    <div className="relative flex items-center justify-center w-16 h-16 bg-white border border-brand-primary/30 text-brand-secondary font-serif font-black text-2xl tracking-tighter shadow-sm rounded-sm shrink-0">
                      <span className="text-brand-primary">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-modern font-semibold uppercase tracking-[0.25em] text-brand-primary block mb-1">
                        Richkiss Department
                      </span>
                      <h3 className="text-2xl md:text-3.5xl font-serif font-bold text-brand-secondary uppercase tracking-wider leading-none">
                        {dept.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-600 font-sans text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center">
                    {dept.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.5 Consolidated Products Section */}
      <section className="py-24 bg-white border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary">Full Catalog</span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-secondary font-bold uppercase tracking-wide">Our Products</h2>
            <div className="w-16 h-1 bg-brand-primary mx-auto" />
            <p className="text-sm text-gray-500 font-sans leading-relaxed">
              We provide a complete suite of high-impact offset and digital printing, exquisite branding materials, and customized promotional products of the highest standard.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
            {allProducts.map((prod, pIdx) => (
              <motion.div 
                key={pIdx} 
                className="flex items-center space-x-4 p-5 border border-gray-100 rounded-sm hover:border-brand-primary/30 hover:shadow-md transition-all duration-300 bg-white"
                whileHover={{ y: -3 }}
              >
                <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <span className="font-sans font-semibold text-sm text-brand-secondary/90 tracking-wide">{prod}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Portfolio Works Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary">Portfolio</span>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary uppercase font-bold">Our Works</h2>
            </div>
            <p className="text-gray-500 font-sans max-w-sm text-sm">
              We take pride in turning creative visuals into high-fidelity physical prints.
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
                  <div className="aspect-[4/5] bg-gray-100 rounded-sm overflow-hidden relative shadow-sm">
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

      {/* Our Partners & Clients Section */}
      <section className="py-24 bg-brand-beige/10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-center">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary font-mono">Trusted By Leaders</span>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-secondary uppercase font-bold tracking-wider">
              Some of our Clients
            </h2>
            <div className="w-12 h-[2px] bg-brand-primary mx-auto" />
          </div>

          <div className="flex flex-wrap items-stretch justify-center gap-8">
            {partners.map((partner: any, i: number) => (
              <motion.div 
                key={partner.id || partner.name || i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center space-y-3 group w-[calc(50%-1rem)] md:w-[calc(33.33%-2rem)] lg:w-[calc(16.66%-2rem)] max-w-[160px]"
              >
                <div className="w-full bg-white p-6 aspect-[1.1] flex items-center justify-center border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-lg overflow-hidden">
                  {partner.logoUrl ? (
                    <img 
                      src={partner.logoUrl} 
                      alt={partner.name} 
                      className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all" 
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-brand-beige/50 flex items-center justify-center text-xs font-serif font-black text-brand-secondary">
                      {partner.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <p className="text-xs font-serif font-bold text-brand-secondary/90 uppercase tracking-wider text-center line-clamp-2 min-h-[32px] flex items-center justify-center bg-transparent group-hover:text-brand-primary transition-colors">
                  {partner.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Detail Modal */}
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

      {/* 6. Contact CTA */}
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
                className="flex-1 lg:w-80 bg-white px-6 font-sans text-[10px] font-bold tracking-widest outline-none shadow-inner"
              />
              <button className="bg-brand-primary text-white hover:bg-brand-primary/80 px-10 transition-colors uppercase text-[10px] font-bold tracking-[0.2em] h-full">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <div className="py-6 bg-brand-secondary text-center">
        <p className="text-[9px] text-white/30 uppercase tracking-[0.4em] font-sans">Richkiss Enterprise © 2026</p>
      </div>
    </div>
  );
}
