import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram } from 'lucide-react';
import { COMPANY_INFO } from '../constants/content';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <section className="bg-brand-beige py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-brand-primary font-sans font-bold text-xs uppercase tracking-[0.3em]">Contact Us</span>
          <h1 className="text-5xl md:text-7xl font-serif text-brand-secondary leading-tight">
            Let's <span className="italic text-brand-primary">Connect</span>
          </h1>
          <p className="text-brand-muted max-w-2xl mx-auto font-sans text-lg">
            Whether you're an author, a school administrator, or a fellow book lover, we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-4xl font-serif text-brand-secondary">Get in touch <span className="italic">directly</span></h2>
              <p className="text-gray-600 font-sans leading-relaxed">
                Visit our head office in Accra or reach out via phone or email. Our team is available Monday to Friday, 8am to 5pm.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-6 group">
                <div className="w-14 h-14 bg-brand-beige rounded-2xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-xl">Head Office</h4>
                  <p className="text-brand-muted font-sans text-sm">{COMPANY_INFO.headOffice}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="w-14 h-14 bg-brand-beige rounded-2xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-xl">Phone</h4>
                  <p className="text-brand-muted font-sans text-sm">{COMPANY_INFO.phone.join(' / ')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="w-14 h-14 bg-brand-beige rounded-2xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-xl">Email</h4>
                  <p className="text-brand-muted font-sans text-sm">{COMPANY_INFO.email}</p>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <p className="font-sans font-bold text-xs uppercase tracking-widest text-brand-muted">Follow Us</p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-brand-secondary hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-brand-beige p-12 rounded-3xl shadow-sm border border-gray-100"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">First Name</label>
                  <input type="text" className="w-full px-6 py-4 bg-white rounded-xl border border-transparent focus:border-brand-primary outline-none font-sans text-sm transition-all shadow-sm" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Last Name</label>
                  <input type="text" className="w-full px-6 py-4 bg-white rounded-xl border border-transparent focus:border-brand-primary outline-none font-sans text-sm transition-all shadow-sm" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Email Address</label>
                <input type="email" className="w-full px-6 py-4 bg-white rounded-xl border border-transparent focus:border-brand-primary outline-none font-sans text-sm transition-all shadow-sm" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Subject</label>
                <select className="w-full px-6 py-4 bg-white rounded-xl border border-transparent focus:border-brand-primary outline-none font-sans text-sm transition-all shadow-sm">
                  <option>General Inquiry</option>
                  <option>Book Supply</option>
                  <option>Submission Inquiry</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Message</label>
                <textarea rows={5} className="w-full px-6 py-4 bg-white rounded-xl border border-transparent focus:border-brand-primary outline-none font-sans text-sm transition-all shadow-sm resize-none" placeholder="Tell us more about how we can help you..."></textarea>
              </div>

              <button type="submit" className="w-full py-5 bg-brand-primary text-white font-sans font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-brand-secondary transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center space-x-3">
                <span>Send Message</span>
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map Integration */}
      <section className="h-[500px] bg-gray-100 grayscale hover:grayscale-0 transition-all duration-1000 border-t border-gray-100">
         <iframe 
           title="Richkiss Publishers Head Office"
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15881.332349320078!2d-0.2452!3d5.6417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9966b4ca2db1%3A0x88c4f0689b96eb9d!2sDome%2C%20Accra%2C%20Ghana!5e0!3m2!1sen!2sgh!4v1714512000000!5m2!1sen!2sgh" 
           width="100%" 
           height="100%" 
           style={{ border: 0 }} 
           allowFullScreen 
           loading="lazy" 
           referrerPolicy="no-referrer-when-downgrade"
           className="w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-500"
         />
      </section>
    </div>
  );
}
