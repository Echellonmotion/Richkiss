import { motion } from 'motion/react';
import { useContent } from '../../hooks/useContent';

export default function TopCategories() {
  const { categories } = useContent();

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <h2 className="text-2xl font-serif text-brand-secondary">Top Categories</h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer flex flex-col items-center space-y-4"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm group-hover:shadow-lg group-hover:border-brand-primary transition-all duration-500">
                <img 
                  src={cat.image || `https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&q=80&w=200`} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-sm font-sans font-bold text-brand-secondary opacity-80 group-hover:opacity-100 group-hover:text-brand-primary transition-colors">
                {cat.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
