import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { useContent } from '../../hooks/useContent';

export default function TrendingBooks() {
  const { books } = useContent();
  const trending = books.slice(0, 6);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-serif text-brand-secondary">Trending on Richkiss</h2>
          <Link to="/catalogue" className="text-xs font-bold uppercase tracking-widest text-brand-muted hover:text-brand-primary transition-colors">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {trending.map((book, i) => (
            <motion.div
              key={book.id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img 
                  src={book.coverUrl || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400"} 
                  alt={book.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badges like in ref */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                   {i % 2 === 0 && (
                     <span className="px-2 py-0.5 bg-[#ff5722] text-white text-[8px] font-bold uppercase tracking-widest rounded-sm">Hot</span>
                   )}
                   {i % 3 === 0 && (
                     <span className="px-2 py-0.5 bg-[#ffb300] text-white text-[8px] font-bold uppercase tracking-widest rounded-sm">-13%</span>
                   )}
                </div>

                <button className="absolute top-2 right-2 p-1.5 bg-white shadow-sm hover:bg-brand-primary hover:text-white text-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                   <Heart size={14} />
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-0.5">
                   {[...Array(5)].map((_, idx) => (
                     <Star key={idx} size={10} className={`${idx < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
                   ))}
                   <span className="text-[10px] text-gray-400 ml-1">(1)</span>
                </div>
                <p className="text-[10px] text-gray-400 font-sans italic">By: {book.author || 'Richkiss'}</p>
                <h3 className="text-sm font-bold text-brand-secondary line-clamp-1 group-hover:text-brand-primary transition-colors">{book.title}</h3>
                <div className="flex items-center space-x-2">
                   <span className="text-sm font-bold text-brand-primary font-serif">$80.00</span>
                   <span className="text-[11px] text-gray-300 line-through font-serif">$120.00</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
