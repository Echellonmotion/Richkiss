import { motion } from 'motion/react';
import { COMPANY_INFO } from '../constants/content';
import { ShieldCheck, Star, Users, UserCheck } from 'lucide-react';

export default function OurClients() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-brand-beige py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-brand-primary font-sans font-bold text-xs uppercase tracking-[0.3em]">Our Trusted Partners</span>
          <h1 className="text-5xl md:text-7xl font-serif text-brand-secondary leading-tight">
            Valued <span className="italic text-brand-primary">Partnerships</span>
          </h1>
          <p className="text-brand-muted max-w-2xl mx-auto font-sans">
            We work with a diverse group of institutions and organizations that share our commitment to education and literacy.
          </p>
        </div>
      </section>

      {/* Clients Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {COMPANY_INFO.clients.map((client, idx) => (
            <motion.div 
              key={client}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group aspect-square bg-white border border-gray-100 rounded-3xl flex flex-col items-center justify-center space-y-4 hover:shadow-2xl transition-all duration-500 hover:border-brand-primary"
            >
              <div className="w-16 h-16 bg-brand-beige rounded-2xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-500 shadow-sm">
                <UserCheck size={32} />
              </div>
              <span className="font-serif font-bold text-brand-secondary tracking-tight group-hover:text-brand-primary transition-colors">{client}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-brand-secondary text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12 relative z-10">
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map(star => <Star key={star} size={20} className="fill-brand-primary text-brand-primary" />)}
          </div>
          <h2 className="text-3xl md:text-5xl font-serif italic leading-snug">
            "Richkiss Publishers has been instrumental in providing our school with high-quality, culturally relevant reading materials. Their dedication to excellence is truly inspiring."
          </h2>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-600 rounded-lg mb-4" />
            <p className="font-serif font-bold text-xl">Dr. Kwame Adjei</p>
            <p className="text-sm font-sans uppercase tracking-widest text-brand-primary">School Director, Accra</p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl" />
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="text-center space-y-2">
            <div className="flex justify-center text-brand-primary mb-4"><Users size={32} /></div>
            <p className="text-4xl font-serif font-bold text-brand-secondary">100+</p>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-muted">Schools Served</p>
          </div>
          <div className="text-center space-y-2">
            <div className="flex justify-center text-brand-primary mb-4"><ShieldCheck size={32} /></div>
            <p className="text-4xl font-serif font-bold text-brand-secondary">25+</p>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-muted">NGO Partners</p>
          </div>
          <div className="text-center space-y-2">
            <div className="flex justify-center text-brand-primary mb-4"><Star size={32} /></div>
            <p className="text-4xl font-serif font-bold text-brand-secondary">15+</p>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-muted">Awards Received</p>
          </div>
          <div className="text-center space-y-2">
            <div className="flex justify-center text-brand-primary mb-4"><UserCheck size={32} /></div>
            <p className="text-4xl font-serif font-bold text-brand-secondary">300+</p>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-muted">Authors Published</p>
          </div>
        </div>
      </section>
    </div>
  );
}
