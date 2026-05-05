import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Quote,
  ArrowRight
} from 'lucide-react';

export default function OurClients() {
  const partners = [
    "The Oxford Collective", "Marlowe Press", "National Archive", 
    "Serpent's Tail", "Vintage House", "Borough Libraries", 
    "The Royal Guild", "Curzon Literary", "Ivory Tower", "Pioneer Arts"
  ];

  const testimonials = [
    {
      quote: "Richkiss doesn't just sell books; they cultivate a community that values the weight of a word and the texture of a page. Partnering with them was the best decision for my latest anthology.",
      author: "Elias Thorne",
      role: "Award-Winning Novelist"
    },
    {
      quote: "As a library, we seek partners who respect the sanctity of archiving. Richkiss's digital-to-physical integration has allowed us to reach a global audience without losing our heritage.",
      author: "Clara Beaumont",
      role: "Director, St. Jude's Library"
    }
  ];

  const stats = [
    { label: "Publishing Partners", value: "450+" },
    { label: "Cultural Events", value: "12k" },
    { label: "Countries Reached", value: "85" },
    { label: "Curated Titles", value: "1.2m" }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col pt-32">
      {/* 1. Hero Section */}
      <section className="pb-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary">Curating Excellence</span>
                <h1 className="text-5xl lg:text-7xl font-serif text-brand-secondary leading-tight">
                  Our Literary <br /> Partners
                </h1>
              </div>
              <p className="text-lg text-gray-500 font-sans leading-relaxed max-w-lg">
                We believe literature thrives through collaboration. Richkiss partners with the world's most 
                prestigious publishers, historic libraries, and dynamic cultural institutions to bring 
                exceptional stories to light.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-10 py-5 bg-[#1d5c5e] text-white font-sans font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm hover:-translate-y-1 transition-all">
                  Collaborate With Us
                </button>
                <button className="px-10 py-5 border border-gray-200 text-brand-secondary font-sans font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm hover:border-brand-primary transition-all">
                  Our Mission
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[4/5] bg-gray-50 rounded-sm overflow-hidden shadow-2xl relative group">
                <img 
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1500" 
                  alt="Partner Atmosphere" 
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[3s]" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-60" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Global Institutions Grid */}
      <section className="py-32 bg-[#fffcfb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-20">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary">Global Institutions</h2>
            <div className="w-12 h-[2px] bg-brand-primary mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {partners.map((partner, i) => (
              <motion.div 
                key={partner}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-10 aspect-square flex items-center justify-center border border-gray-50 shadow-sm hover:shadow-md transition-shadow group"
              >
                <p className="text-base font-serif text-brand-secondary/60 group-hover:text-brand-primary transition-colors leading-tight">
                  {partner}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Shared Visions (Testimonials) */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4 space-y-6">
              <h2 className="text-4xl font-serif text-brand-secondary">Shared Visions</h2>
              <p className="text-xs text-brand-muted font-sans uppercase tracking-[0.2em] leading-relaxed">
                How our collaborators experience the Richkiss ecosystem.
              </p>
              <div className="flex items-center space-x-2 text-brand-primary">
                <Quote size={16} fill="currentColor" />
                <span className="text-[10px] font-bold uppercase tracking-widest">From Our Authors</span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-20">
              {testimonials.map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8 pl-8 border-l-2 border-brand-primary/20"
                >
                  <p className="text-2xl font-serif text-brand-secondary leading-relaxed italic">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#fff0ed] rounded-sm" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-secondary">{t.author}</h4>
                      <p className="text-[10px] text-brand-muted uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Stats Banner */}
      <section className="py-24 bg-[#c0392b] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <p className="text-5xl font-serif font-bold">{stat.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-40 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#fef9f8] p-16 lg:p-24 rounded-sm text-center space-y-12 border border-[#fff0ed]"
          >
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-serif text-brand-secondary">Ready to write the next chapter together?</h2>
              <p className="text-gray-500 font-sans max-w-2xl mx-auto leading-relaxed">
                We are always looking for visionary publishers and institutions to join our 
                curated network. Reach out to our partnerships team today.
              </p>
            </div>
            <button className="px-12 py-5 bg-[#c0392b] text-white font-sans font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-brand-secondary transition-colors">
              Inquire Now
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
