import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useContent } from '../../hooks/useContent';

export default function FeatureGrid() {
  const { settings } = useContent();

  const features = [
    {
      title: "New Arrivals.",
      cta: "View all",
      color: "bg-[#e53935]", // Red
      image: settings.featureCard1Url || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
      link: "/catalogue"
    },
    {
      title: "Featured Works.",
      cta: "Explore",
      color: "bg-[#4fc3f7]", // Blue
      image: settings.featureCard2Url || "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
      link: "/print"
    },
    {
      title: "Global Editions.",
      cta: "Discover",
      color: "bg-[#7986cb]", // Purple
      image: settings.featureCard3Url || "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=400",
      link: "/catalogue"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="dot-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" className="text-brand-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${feature.color} rounded-sm overflow-hidden h-64 relative group cursor-pointer`}
            >
              <div className="absolute inset-0 p-8 flex flex-col justify-center z-10 text-white">
                <h3 className="text-3xl font-serif mb-4">{feature.title}</h3>
                <Link to={feature.link} className="text-xs font-bold uppercase tracking-widest bg-black/20 self-start px-6 py-3 rounded-sm hover:bg-black/40 transition-colors">
                  {feature.cta}
                </Link>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-full object-cover transform translate-x-1/4 group-hover:translate-x-0 transition-transform duration-700"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
