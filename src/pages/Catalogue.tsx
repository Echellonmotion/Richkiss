import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useContent } from '../hooks/useContent';
import { ShoppingCart, Eye, Search, Filter, X } from 'lucide-react';

export default function Catalogue() {
  const { categories, books, loading } = useContent();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = useMemo(() => {
    return books.filter((book: any) => {
      const matchesCategory = activeCategory === 'all' || book.categorySlug === activeCategory;
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            book.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [books, activeCategory, searchQuery]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Catalogue...</div>;

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-brand-beige py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-brand-primary font-sans font-bold text-xs uppercase tracking-[0.3em]">Our Full Collection</span>
          <h1 className="text-5xl md:text-7xl font-serif text-brand-secondary leading-tight">
            Book <span className="italic text-brand-primary">Catalogue</span>
          </h1>
          <p className="text-brand-muted max-w-2xl mx-auto font-sans text-lg">
            Explore our diverse range of African stories, educational materials, and creative publishing works.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by title or author..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-beige/50 border border-transparent focus:bg-white focus:border-brand-primary/20 rounded-full py-3.5 pl-12 pr-6 text-sm outline-none transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-primary"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              <button 
                onClick={() => setActiveCategory('all')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === 'all' ? 'bg-brand-secondary text-white shadow-lg' : 'bg-brand-beige text-brand-secondary hover:bg-brand-primary/10'}`}
              >
                All
              </button>
              {categories.map((cat: any) => (
                <button 
                  key={cat.id || cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat.slug ? 'bg-brand-secondary text-white shadow-lg' : 'bg-brand-beige text-brand-secondary hover:bg-brand-primary/10'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <p className="text-xs font-bold font-sans text-brand-muted uppercase tracking-[0.2em]">
          Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
        </p>
      </div>

      {/* Books Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredBooks.map((book: any) => (
              <motion.div 
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 shadow-md hover:shadow-2xl transition-all duration-500">
                  <img 
                    src={book.coverUrl || book.cover} 
                    alt={book.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[8px] font-bold uppercase tracking-widest text-brand-primary rounded-full shadow-sm">
                      {book.categorySlug}
                    </span>
                  </div>

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-secondary hover:bg-brand-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                      <Eye size={20} />
                    </button>
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-secondary hover:bg-brand-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold font-sans text-brand-primary uppercase tracking-[0.2em]">{book.author}</p>
                  <h3 className="text-xl font-serif font-bold text-brand-secondary group-hover:text-brand-primary transition-colors line-clamp-2 min-h-[3.5rem]">{book.title}</h3>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                    <p className="text-sm font-sans font-bold text-brand-secondary">{book.price}</p>
                    <button className="text-xs font-bold uppercase tracking-widest text-brand-primary hover:text-brand-secondary transition-colors underline underline-offset-4">Add to cart</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-24 space-y-6">
            <div className="w-20 h-20 bg-brand-beige rounded-full flex items-center justify-center mx-auto text-brand-primary/40">
              <Filter size={40} />
            </div>
            <h3 className="text-2xl font-serif text-brand-secondary">No books found</h3>
            <p className="text-brand-muted max-w-sm mx-auto">
              We couldn't find any books matching your search "{searchQuery}". Try a different term or clear your filters.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="text-brand-primary font-bold uppercase tracking-widest text-xs underline underline-offset-8"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="bg-brand-secondary text-white py-24 overflow-hidden relative">
         <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
            <h2 className="text-4xl font-serif">Stay <span className="italic text-brand-primary">Updated</span></h2>
            <p className="text-gray-400 font-sans max-w-xl mx-auto">
              Subscribe to get notified about new catalogue additions and exclusive literary events.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Your email address" className="flex-grow px-6 py-4 rounded-full bg-white/10 border border-white/20 focus:border-brand-primary outline-none text-white text-sm" />
              <button className="px-8 py-4 bg-brand-primary text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-brand-primary transition-all">Join us</button>
            </form>
         </div>
      </section>
    </div>
  );
}
