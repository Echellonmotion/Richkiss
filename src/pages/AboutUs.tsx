import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Leaf, 
  Users, 
  Quote, 
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO } from '../constants/content';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white flex flex-col pt-32">
      {/* 1. Heritage Hero Section */}
      <section className="pb-24 bg-[#fdfdfd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-brand-primary">Our Heritage</span>
                <h1 className="text-5xl lg:text-7xl font-serif text-brand-secondary leading-[1.1]">
                  Curating African <br className="hidden lg:block" /> Literature Since 2010
                </h1>
              </div>
              <p className="text-lg text-gray-500 font-sans leading-relaxed max-w-lg">
                From a small dedicated publishing house in Accra to a leading voice in West African 
                literature, Richkiss has remained committed to the timeless power of the written word 
                and the preservation of our cultural narratives.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] bg-brand-beige rounded-sm overflow-hidden shadow-2xl border-white border-[12px]"
            >
              <img 
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=1000" 
                alt="Heritage" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-secondary/5" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-16">
              <div className="space-y-8">
                <h2 className="text-5xl font-serif text-brand-secondary tracking-tight">Our Story</h2>
                <div className="space-y-6 text-gray-600 font-sans leading-relaxed text-lg">
                  <p>
                    What began as a passion project centered in the heart of Accra has evolved into a 
                    multi-generational sanctuary for readers and thinkers across the continent. 
                    Our journey was built on a singular belief: storytelling is the heartbeat of education.
                  </p>
                  <p>
                    Over the years, we have curated a diverse catalogue that challenges conventions 
                    while honoring the rich traditions of African literature and the pursuit of global 
                    educational standards.
                  </p>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-12 bg-brand-primary/5 rounded-sm border-l-4 border-brand-primary space-y-6 relative"
              >
                <p className="text-2xl font-serif text-brand-primary italic leading-relaxed">
                  "A book is more than paper and ink; it is a bridge between minds, a legacy for the future, and a mirror for the soul."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-[1px] bg-brand-primary/30" />
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-secondary">
                    E. S. Kissiedu, Founder
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="relative aspect-[3/4] lg:aspect-square group overflow-hidden shadow-[40px_40px_80px_rgba(0,0,0,0.1)]"
            >
              <img 
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000" 
                alt="Library Sanctuary" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]"
              />
              <div className="absolute inset-0 bg-black/5" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Commitment Section */}
      <section className="py-32 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-brand-secondary mb-20"
          >
            Commitment to the Craft
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <BookOpen size={36} />,
                title: "Quality Selection",
                desc: "We hand-select every title, prioritizing literary merit and enduring significance over fleeting industry trends.",
                theme: "light"
              },
              {
                icon: <Leaf size={36} />,
                title: "Sustainable Print",
                desc: "Using FSC-certified paper and eco-friendly inks, we ensure our love for stories doesn't cost the Earth.",
                theme: "dark"
              },
              {
                icon: <Users size={36} />,
                title: "Community Focused",
                desc: "From reading clubs to literary workshops, we build spaces for readers to connect and share ideas.",
                theme: "light"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className={`p-16 space-y-10 text-left transition-all duration-500 rounded-sm ${
                  item.theme === 'dark' 
                  ? 'bg-brand-primary text-white shadow-2xl scale-105 z-10' 
                  : 'bg-white border border-gray-100 shadow-sm'
                }`}
              >
                <div className="w-16 h-16 bg-brand-primary text-white flex items-center justify-center rounded-full mb-6 font-serif text-2xl font-bold">
                  {i + 1}
                </div>
                <div className="space-y-5">
                  <h3 className={`text-2xl font-serif ${item.theme === 'dark' ? 'text-white' : 'text-brand-secondary'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-base leading-relaxed font-sans ${item.theme === 'dark' ? 'text-white/90' : 'text-gray-500'}`}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Global Presence Section */}
      <section className="py-32 bg-brand-secondary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <h2 className="text-5xl font-serif text-white tracking-tight">Our Reach</h2>
                <p className="text-xl text-gray-400 font-sans leading-relaxed max-w-lg">
                  While our roots are firmly planted in Ghana, our literary footprint spans across borders, 
                  bridging African stories with global readers.
                </p>
              </div>
              <button className="inline-flex items-center space-x-4 px-12 py-5 bg-brand-primary text-white font-sans font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:-translate-y-1 transition-all shadow-xl shadow-brand-primary/20">
                <span>Find the distributors</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="relative aspect-video rounded-sm overflow-hidden grayscale contrast-125 opacity-20"
            >
               <img 
                 src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
                 alt="Global Map Map" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-brand-secondary/40" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Mission Statement Section */}
      <section className="py-40 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center text-brand-primary opacity-10"
          >
            <Quote size={120} />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="text-4xl md:text-6xl font-serif text-brand-secondary italic leading-tight tracking-tight">
              "Our mission is simple: To ensure that <br className="hidden lg:block" /> every voice worth hearing finds <br className="hidden lg:block" /> a reader worth listening."
            </h2>
            <div className="w-24 h-1 bg-brand-primary mx-auto opacity-30" />
            <p className="text-gray-400 font-sans text-sm tracking-[0.3em] font-bold uppercase">
              {COMPANY_INFO.vision.split(' ').slice(0, 10).join(' ')}...
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
