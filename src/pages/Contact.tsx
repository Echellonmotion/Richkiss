import { motion } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../constants/content';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-white pt-32">
      {/* 1. Header Section */}
      <section className="pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl lg:text-7xl font-serif text-brand-secondary leading-tight mb-8">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-500 font-sans leading-relaxed">
              We believe in the beauty of conversations. Whether you're looking for a rare 
              first edition or want to host a literary event, we're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* Left: Form Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 bg-white p-12 lg:p-20 shadow-[0_40px_80px_rgba(0,0,0,0.05)] rounded-sm border border-gray-50"
            >
              <h2 className="text-3xl font-serif text-brand-secondary mb-12 italic">Send a Message</h2>
              <form className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4 border-b border-gray-200 focus-within:border-brand-primary transition-colors pb-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Name</label>
                    <input 
                      type="text" 
                      placeholder="Your full name"
                      className="w-full bg-transparent outline-none text-sm font-sans placeholder:text-gray-300"
                    />
                  </div>
                  <div className="space-y-4 border-b border-gray-200 focus-within:border-brand-primary transition-colors pb-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="hello@example.com"
                      className="w-full bg-transparent outline-none text-sm font-sans placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <div className="space-y-4 border-b border-gray-200 focus-within:border-brand-primary transition-colors pb-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Subject</label>
                  <input 
                    type="text" 
                    placeholder="What can we help you with?"
                    className="w-full bg-transparent outline-none text-sm font-sans placeholder:text-gray-300"
                  />
                </div>

                <div className="space-y-4 border-b border-gray-200 focus-within:border-brand-primary transition-colors pb-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Type your message here..."
                    className="w-full bg-transparent outline-none text-sm font-sans placeholder:text-gray-300 resize-none"
                  />
                </div>

                <div className="pt-8">
                  <button className="px-12 py-5 bg-[#ff5722] text-white font-sans font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm hover:-translate-y-1 transition-all shadow-xl shadow-[#ff5722]/20">
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Right: Info & Image Column */}
            <div className="lg:col-span-5 space-y-20">
              {/* Contact Details */}
              <div className="space-y-12">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff5722]">The Flagship Store</h4>
                  <p className="text-2xl font-serif text-brand-secondary leading-relaxed">
                    {COMPANY_INFO.headOffice.split(',').map((part, i) => (
                      <span key={i} className="block">{part.trim()}</span>
                    ))}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff5722]">Contact Details</h4>
                  <div className="space-y-2 text-brand-secondary font-sans font-bold text-lg">
                    <p>{COMPANY_INFO.phone[0]}</p>
                    <p className="underline underline-offset-8 decoration-gray-200 hover:decoration-brand-primary transition-colors cursor-pointer text-base font-normal">
                      {COMPANY_INFO.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff5722]">Opening Hours</h4>
                  <div className="space-y-3 font-sans text-sm text-gray-600">
                    <div className="flex justify-between items-center max-w-[280px]">
                      <span>Mon – Fri</span>
                      <span className="font-bold text-brand-secondary">9:00 – 19:00</span>
                    </div>
                    <div className="flex justify-between items-center max-w-[280px]">
                      <span>Saturday</span>
                      <span className="font-bold text-brand-secondary">10:00 – 18:00</span>
                    </div>
                    <div className="flex justify-between items-center max-w-[280px]">
                      <span>Sunday</span>
                      <span className="font-bold text-brand-secondary">11:00 – 17:00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-[4/6] bg-gray-50 rounded-sm overflow-hidden"
              >
                <img 
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200" 
                  alt="Store Atmosphere"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[3s]"
                />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Map Section */}
      <section className="h-[600px] w-full grayscale border-y border-gray-100 opacity-60 hover:opacity-100 transition-all duration-1000">
        <iframe 
          title="Richkiss Shop Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.5284714101915!2d-0.2073!3d5.6174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a170889c17!2sRichKiss%20Publications!5e0!3m2!1sen!2sgh!4v1714512000000!5m2!1sen!2sgh" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </section>

    </div>
  );
}
