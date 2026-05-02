import { motion } from 'motion/react';
import { Briefcase, Heart, PenTool, Users, ArrowRight } from 'lucide-react';

export default function Careers() {
  const benefits = [
    { title: "Creative Storytelling", icon: <PenTool size={24} />, desc: "We believe in original ideas and provide a space where your creativity can flourish." },
    { title: "Community Impact", icon: <Heart size={24} />, desc: "Your work directly contributes to literacy and education across Africa." },
    { title: "Career Growth", icon: <Briefcase size={24} />, desc: "Continuous learning and professional development are at the core of our culture." },
    { title: "Unified Team", icon: <Users size={24} />, desc: "Join a passionate, Ghanaian-owned company with a global vision." }
  ];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-brand-secondary py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <span className="text-brand-primary font-sans font-bold text-xs uppercase tracking-[0.3em]">Join Our Mission</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
            Build Your Future <span className="italic text-brand-primary">With Us</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-sans text-lg">
            Are you passionate about books, literacy, and African storytelling? We're looking for creative minds to help us shape the future of publishing in Ghana and beyond.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/4 h-full bg-brand-primary opacity-5 transform skew-x-12" />
      </section>

      {/* Why Join Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Team collaboration" 
                  className="rounded-3xl shadow-2xl" 
                />
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-beige rounded-3xl -z-10" />
              </div>
              <div className="space-y-10">
                 <h2 className="text-4xl font-serif text-brand-secondary">Why Work At <span className="italic">Richkiss?</span></h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {benefits.map(benefit => (
                      <div key={benefit.title} className="space-y-3">
                         <div className="text-brand-primary">{benefit.icon}</div>
                         <h4 className="font-serif font-bold text-xl">{benefit.title}</h4>
                         <p className="text-sm text-brand-muted leading-relaxed">{benefit.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Vacancies */}
      <section className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-serif text-brand-secondary">Open Positions</h2>
            <p className="text-brand-muted">Come make an impact with us.</p>
          </div>

          <div className="space-y-4">
             {['Editorial Assistant', 'Graphic Designer', 'Educational Consultant'].map((job, idx) => (
                <motion.div 
                  key={job}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-white p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between hover:shadow-xl transition-all duration-300 border border-transparent hover:border-brand-primary"
                >
                   <div className="space-y-2 mb-6 md:mb-0">
                      <h3 className="text-2xl font-serif font-bold text-brand-secondary group-hover:text-brand-primary transition-colors">{job}</h3>
                      <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-widest text-brand-muted">
                        <span>Full Time</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span>Accra, Ghana</span>
                      </div>
                   </div>
                   <button className="flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-brand-secondary hover:text-brand-primary transition-colors group-hover:translate-x-2 transition-all">
                      <span>Apply Now</span>
                      <ArrowRight size={18} />
                   </button>
                </motion.div>
             ))}
          </div>

          {/* Spontaneous Application */}
          <div className="mt-20 p-12 bg-brand-primary rounded-3xl text-white text-center space-y-6">
             <h3 className="text-3xl font-serif font-bold">Don't see the right role?</h3>
             <p className="text-white/80 max-w-xl mx-auto font-sans leading-relaxed">
               We're always looking for talents. Send us your CV and a cover letter telling us why you'd be a great fit for Richkiss Publishers.
             </p>
             <button className="px-10 py-5 bg-white text-brand-primary font-sans font-bold text-sm uppercase tracking-widest rounded-full hover:bg-brand-secondary hover:text-white transition-all shadow-xl">
               Send Your CV
             </button>
          </div>
        </div>
      </section>
    </div>
  );
}
