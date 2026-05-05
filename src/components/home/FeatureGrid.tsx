import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: "New Release.",
    cta: "Shop now",
    color: "bg-[#e53935]", // Red
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    link: "/catalogue"
  },
  {
    title: "Pre Order Now.",
    cta: "Shop now",
    color: "bg-[#4fc3f7]", // Blue
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
    link: "/catalogue"
  },
  {
    title: "Top Rated.",
    cta: "Shop now",
    color: "bg-[#7986cb]", // Purple
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=400",
    link: "/catalogue"
  }
];

export default function FeatureGrid() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
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
