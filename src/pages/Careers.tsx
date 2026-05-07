import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Leaf, 
  Sparkles, 
  BookOpen
} from 'lucide-react';
import { COMPANY_INFO } from '../constants/content';
import { useContent } from '../hooks/useContent';

export default function Careers() {
  const { settings, whyRichkiss } = useContent();
  
  const jobCategories = [
    {
      title: "Editorial",
      roles: [
        { title: "Senior Acquisitions Editor", location: "Accra", type: "Full-Time", desc: "Lead our fiction department in discovering new voices from across West Africa." },
        { title: "Copy Editor", location: "Remote", type: "Freelance", desc: "Ensuring precision and stylistic elegance across our digital and print catalogs." }
      ]
    },
    {
      title: "Design",
      roles: [
        { title: "Book Cover Designer", location: "Accra", type: "Full-Time", desc: "Crafting visual identities for our upcoming high-end literary fiction series." },
        { title: "Visual Storyteller", location: "Hybrid", type: "Contract", desc: "Creating immersive digital experiences that bring our authors' worlds to life." }
      ]
    },
    {
      title: "Operations",
      roles: [
        { title: "Logistics Coordinator", location: "Accra", type: "Full-Time", desc: "Managing sustainable shipping lanes and eco-friendly packaging initiatives." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col pt-48 lg:pt-64">
      {/* 1. Hero Section */}
      <section className="pb-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 space-y-10"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary">Careers</span>
                <h1 className="text-5xl lg:text-7xl font-serif text-brand-secondary leading-[1.1]">
                  Join the Chapter
                </h1>
              </div>
              <p className="text-lg text-gray-500 font-sans leading-relaxed max-w-lg">
                We believe in the transformative power of storytelling. At Richkiss, we are building 
                a sanctuary for literature in the digital age, merging the tactile soul of a vintage 
                bookstore with the precision of modern design.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="px-10 py-5 bg-brand-secondary text-white font-sans font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm hover:-translate-y-1 transition-all shadow-xl shadow-brand-secondary/10">
                  View Openings
                </button>
                <button className="px-10 py-5 border border-gray-200 text-brand-secondary font-sans font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm hover:border-brand-primary transition-all">
                  Our Mission
                </button>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               className="lg:col-span-7 relative"
            >
               <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-[20px_20px_60px_rgba(0,0,0,0.05)] border-white border-[1px]">
                  <img 
                    src={settings.careersHeroImageUrl || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1500"} 
                    alt="Work Atmosphere" 
                    className="w-full h-full object-cover"
                  />
                  {/* Faded overlay effect similar to image */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-40" />
               </div>
               {/* Small floating elements to mimic UI in ref */}
               <div className="absolute -bottom-8 -left-8 bg-white p-6 shadow-2xl rounded-sm border border-gray-50 hidden md:block">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Active Roles</p>
                      <p className="text-xl font-serif text-brand-secondary">12 New Positions</p>
                    </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Open Positions */}
      <section className="py-32 bg-[#fffcfb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary">Open Positions</h2>
              <p className="text-gray-500 font-sans max-w-xl">Explore our current opportunities across the globe. We look for thinkers, makers, and avid readers.</p>
            </div>
            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00bfa5] bg-[#b9f0f0]/30 px-4 py-2 rounded-full">
              <span>All Roles (12)</span>
            </div>
          </div>

          <div className="space-y-24">
            {jobCategories.map((category) => (
              <div key={category.title} className="space-y-12">
                <h3 className="text-2xl font-serif text-[#c0392b] border-b border-[#fff0ed] pb-4 italic">
                  {category.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.roles.map((role, roleIdx) => (
                    <motion.div 
                      key={role.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: roleIdx * 0.1 }}
                      className="bg-white p-12 rounded-sm border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">{role.location}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{role.type}</span>
                      </div>
                      <h4 className="text-2xl font-serif text-brand-secondary mb-4 group-hover:text-brand-primary transition-colors">
                        {role.title}
                      </h4>
                      <p className="text-sm text-gray-500 font-sans leading-relaxed mb-8">
                        {role.desc}
                      </p>
                      <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-secondary cursor-pointer hover:text-brand-primary transition-colors">
                        <span>View Details</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why Us Section */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary text-center">Why Richkiss?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {(whyRichkiss.length > 0 ? whyRichkiss : [
              {
                imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb77db21?auto=format&fit=crop&q=80&w=600",
                title: "Sustainable Practices",
                description: "From carbon-neutral shipping to 100% recycled paper stocks, we prioritize the planet as much as the prose."
              },
              {
                imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600",
                title: "Creative Freedom",
                description: "We operate like a small boutique press with the resources of a global leader, giving you space to innovate."
              },
              {
                imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600",
                title: "Literary Culture",
                description: "Enjoy a generous annual book stipend, silent reading hours, and frequent author-led workshops."
              }
            ]).map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group space-y-6"
              >
                <div className="aspect-[4/5] rounded-sm overflow-hidden bg-gray-100">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-serif text-brand-secondary">{item.title}</h4>
                  <p className="text-sm text-gray-400 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Spontaneous Application CTA */}
      <section className="py-40 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#fef9f8] p-16 lg:p-24 rounded-sm text-center space-y-12 border border-[#fff0ed]"
          >
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-serif text-brand-secondary italic">Don't see your role?</h2>
              <p className="text-gray-500 font-sans max-w-2xl mx-auto leading-relaxed">
                We are always looking for exceptional talent. Send us your portfolio or CV for 
                future consideration.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row max-w-xl mx-auto gap-0 bg-white border border-gray-100 shadow-sm">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-8 py-5 text-sm outline-none bg-transparent"
              />
              <button className="px-12 py-5 bg-[#c0392b] text-white font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-brand-secondary transition-colors">
                Get in Touch
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer establishes consistency */}
    </div>
  );
}
