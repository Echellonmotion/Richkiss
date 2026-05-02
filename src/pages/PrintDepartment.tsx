import { motion } from 'motion/react';
import { 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  PenTool, 
  Zap, 
  Monitor, 
  Maximize, 
  Gift, 
  BookOpen, 
  Shirt,
  Target,
  Eye,
  Star,
  Quote,
  Phone,
  Mail
} from 'lucide-react';

export default function PrintDepartment() {
  const services = [
    {
      title: "Design Services",
      desc: "Assistance from concept to production with our expert in-house design team.",
      icon: <Monitor size={24} />,
    },
    {
      title: "Digital Printing",
      desc: "High-quality prints for marketing materials, brochures, reports, and posters.",
      icon: <Zap size={24} />,
    },
    {
      title: "Offset Printing",
      desc: "Cost-effective large-volume solutions for magazines, catalogs, and packaging.",
      icon: <Layers size={24} />,
    },
    {
      title: "Large Format",
      desc: "Banners, signage, and displays that command attention in any space.",
      icon: <Maximize size={24} />,
    },
    {
      title: "Promotional Items",
      desc: "Corporate souvenirs and branded items tailored to your professional needs.",
      icon: <Gift size={24} />,
    },
    {
      title: "Publishing Tools",
      desc: "Typesetting, editing, proofreading, and professional page setting.",
      icon: <BookOpen size={24} />,
    },
    {
      title: "T-Shirt Printing",
      desc: "Custom apparel printing with durable finishes and vibrant colors.",
      icon: <Shirt size={24} />,
    },
    {
      title: "Quality Control",
      desc: "Uncompromising quality standards across all our products and services.",
      icon: <ShieldCheck size={24} />,
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="bg-brand-secondary py-24 lg:py-32 relative overflow-hidden text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-brand-primary font-sans font-bold text-xs uppercase tracking-[0.4em]">Established Jan 2010</span>
                <h1 className="text-5xl lg:text-7xl font-serif leading-tight">
                  Premium Printing <span className="italic text-brand-primary">& Branding</span>
                </h1>
              </div>
              <p className="text-gray-400 text-lg font-sans leading-relaxed max-w-xl">
                Richkiss Enterprise is an indigenous Ghanaian firm offering a decade of excellence in publishing, branding, and design for businesses of all sizes.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="tel:+233244374533" className="px-8 py-4 bg-brand-primary text-white rounded-full font-sans font-bold text-sm tracking-widest hover:bg-white hover:text-brand-secondary transition-all flex items-center space-x-3">
                  <Phone size={18} />
                  <span>Call Us Now</span>
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square bg-white/5 rounded-full absolute -inset-10 animate-pulse" />
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1200" 
                  alt="Richkiss Printing" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-brand-beige relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4 p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold text-brand-secondary">Our Mission</h3>
            <p className="text-sm text-gray-500 font-sans leading-relaxed">
              To transform ideas into tangible products through innovative printing techniques, exceptional service, and a commitment to sustainability.
            </p>
          </div>
          <div className="space-y-4 p-8 bg-brand-secondary text-white rounded-3xl shadow-xl lg:-mt-12 lg:mb-12">
            <div className="w-12 h-12 bg-brand-primary/20 text-brand-primary rounded-xl flex items-center justify-center">
              <Eye size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold">Our Vision</h3>
            <p className="text-sm text-gray-400 font-sans leading-relaxed">
              To be the preferred partner in the creative space by continually adapting to the ever-changing landscape of design and print technology.
            </p>
          </div>
          <div className="space-y-4 p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
              <Star size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold text-brand-secondary">Our Values</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-500 font-sans flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                <span>Uncompromising Quality</span>
              </li>
              <li className="text-sm text-gray-500 font-sans flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                <span>Customer Focus at heart</span>
              </li>
              <li className="text-sm text-gray-500 font-sans flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                <span>Cultures of Innovation</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-4xl lg:text-6xl font-serif text-brand-secondary tracking-tight">Yes! We Do</h2>
            <p className="text-gray-500 text-lg">Comprehensive solutions for all your printing and design needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="p-8 rounded-3xl border border-gray-100 bg-brand-beige/20 hover:bg-white hover:shadow-2xl transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-primary mb-6 shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-lg font-serif font-bold mb-3 text-brand-secondary">{service.title}</h3>
                <p className="text-xs text-gray-500 font-sans opacity-70 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-brand-secondary text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-4 flex flex-col space-y-6">
              <h2 className="text-4xl font-serif">Trust From Our <span className="italic text-brand-primary">Partners</span></h2>
              <p className="text-gray-400 font-sans text-sm leading-relaxed">
                We painstakingly build strong relationships with our clients, getting to know their needs and preferences to achieve expected outcomes.
              </p>
            </div>
            <div className="lg:col-span-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[40px] p-10 lg:p-16 relative">
              <Quote className="absolute top-10 right-10 text-brand-primary opacity-20" size={80} />
              <div className="space-y-8">
                <p className="text-xl lg:text-2xl font-serif leading-relaxed italic text-gray-200">
                  "The team at Richkiss demonstrated an excellent level of proficiency. Their professionalism, innovation, creativity, and attention to detail truly set them apart in the industry. We unreservedly recommend Richkiss for any printing and signage needs."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-brand-primary rounded-full flex items-center justify-center font-serif text-white text-xl font-bold">
                    JA
                  </div>
                  <div>
                    <h5 className="font-bold font-serif text-lg">Jane Abubakar</h5>
                    <p className="text-[10px] uppercase tracking-widest text-brand-primary font-bold">Programmes Coordinator, ASSN</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-primary opacity-10 rounded-full blur-3xl" />
      </section>

      {/* Contacts & Footer CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-brand-beige rounded-[60px] p-12 lg:p-20 text-center space-y-12 border border-brand-primary/5">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-serif text-brand-secondary">Let's Bring Your <span className="italic text-brand-primary">Ideas</span> To Life</h2>
              <p className="text-brand-muted font-sans font-medium tracking-wide">AVAILABLE FOR PROJECTS OF ALL SCALES</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-primary shadow-sm mb-2">
                  <Phone size={20} />
                </div>
                <p className="text-sm font-bold text-brand-secondary">024 437 4533</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Main Line</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-x border-gray-200 px-12 hidden md:flex">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-primary shadow-sm mb-2">
                  <Mail size={20} />
                </div>
                <p className="text-sm font-bold text-brand-secondary">richkiss10@gmail.com</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Email Support</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-primary shadow-sm mb-2">
                  <Phone size={20} />
                </div>
                <p className="text-sm font-bold text-brand-secondary">020 168 2254</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Secondary</p>
              </div>
            </div>

            <div className="pt-8">
              <button className="px-12 py-5 bg-brand-secondary text-white rounded-full font-serif font-bold text-lg tracking-widest hover:bg-brand-primary transition-all shadow-2xl shadow-black/10">
                Yes! Call Us Today
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
