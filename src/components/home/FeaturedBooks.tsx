import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, BookOpen } from 'lucide-react';
import { useContent } from '../../hooks/useContent';

export default function FeaturedBooks() {
  const { books } = useContent();
  const newArrivals = books.filter((b: any) => b.isNew).slice(0, 3);
  const featured = newArrivals.length > 0 ? newArrivals : books.filter((b: any) => b.featured).slice(0, 3);

  return (
    <section className="relative overflow-hidden border-t border-brand-primary/5">
      {/* 1. Header Area (White) */}
      <div className="bg-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end space-y-6 md:space-y-0">
            <div className="space-y-4 max-w-2xl">
              <span className="text-brand-primary font-sans font-bold text-xs uppercase tracking-[0.3em]">Curated Collection</span>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary leading-tight">
                Discover Our <span>New Arrivals</span>
              </h2>
              <p className="text-brand-muted font-sans leading-relaxed">
                Explore our hand-picked selection of top-selling books across our various labels. From enchanting children's tales to comprehensive educational resources.
              </p>
            </div>
            <Link to="/catalogue" className="group flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-brand-primary hover:text-brand-secondary transition-colors">
              <span>View Catalogue</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Grid Area (Grey) */}
      <div className="bg-gray-100 py-24 relative overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-[0.02]">
          <h2 className="text-[40vw] font-serif font-black text-brand-secondary whitespace-nowrap leading-none">
            LITERACY
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((book: any, idx) => (
              <motion.div 
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 shadow-md hover:shadow-2xl transition-all duration-500">
                  {(book.coverUrl || book.cover) ? (
                    <img 
                      src={book.coverUrl || book.cover} 
                      alt={book.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      <BookOpen size={48} />
                    </div>
                  )}
                  
                  {/* Overlay Tags */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {book.isNew ? 'New' : 'Featured'}
                    </span>
                  </div>

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                     <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-secondary hover:bg-brand-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                       <Eye size={20} />
                     </button>
                  </div>
                </div>

                <div className="space-y-2 text-center md:text-left">
                  <p className="text-xs font-bold font-sans text-brand-primary uppercase tracking-[0.2em]">{book.author}</p>
                  <h3 className="text-xl font-serif font-bold text-brand-secondary group-hover:text-brand-primary transition-colors line-clamp-1">{book.title}</h3>
                </div>
              </motion.div>
            ))}
            
            {/* See More Card */}
            <Link 
              to="/catalogue"
              className="flex flex-col items-center justify-center aspect-[3/4] bg-white rounded-2xl border-2 border-dashed border-brand-primary/20 hover:border-brand-primary hover:shadow-xl transition-all duration-500 text-center px-8"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-primary shadow-sm mb-4">
                <ArrowRight size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-secondary">Explore More</h3>
              <p className="text-xs text-brand-muted mt-2">Discover 500+ more titles in our library</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
