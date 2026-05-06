import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useContent } from '../hooks/useContent';
import { 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import BookPreviewModal from '../components/BookPreviewModal';

export default function Catalogue() {
  const { categories, books, loading } = useContent();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const itemsPerPage = 6;

  const filteredBooks = useMemo(() => {
    return books.filter((book: any) => {
      const matchesCategory = activeCategory === 'all' || book.categorySlug === activeCategory;
      const title = book.title?.toString() || '';
      const author = book.author?.toString() || '';
      const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [books, activeCategory, searchQuery]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  
  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBooks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBooks, currentPage, itemsPerPage]);

  return (
    <div className="bg-white min-h-screen flex flex-col pt-32">
      {/* 1. Header Section */}
      <section className="pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl lg:text-7xl font-serif text-brand-secondary leading-tight mb-8">
              Curated Editions
            </h1>
            <p className="text-lg text-gray-500 font-sans leading-relaxed">
              A collection of essential reading material, hand-selected by our editors. From 
              contemporary masterpieces to timeless classics, explore stories that shape our world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0 space-y-16">
              {/* Category Filter */}
              <div className="space-y-8">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Category</h4>
                <div className="flex flex-col space-y-4">
                  <button 
                    onClick={() => setActiveCategory('all')}
                    className={`text-left text-sm font-bold transition-colors hover:text-brand-primary ${activeCategory === 'all' ? 'text-brand-primary' : 'text-brand-secondary'}`}
                  >
                    All Titles
                  </button>
                  {categories.map((cat: any) => (
                    <button 
                      key={cat.id || cat.slug}
                      onClick={() => setActiveCategory(cat.slug)}
                      className={`text-left text-sm font-medium transition-colors hover:text-brand-primary ${activeCategory === cat.slug ? 'text-brand-primary font-bold' : 'text-gray-600'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Sort By</h4>
                <div className="relative group">
                   <div className="border-b-2 border-gray-100 flex items-center justify-between py-2 cursor-pointer group-hover:border-brand-primary transition-colors">
                      <span className="text-sm font-bold text-brand-secondary">Newest Arrivals</span>
                      <ChevronRight size={14} className="rotate-90 text-gray-300" />
                   </div>
                </div>
              </div>

              {/* Member Picks Ad */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-[#b9f0f0] p-10 space-y-6 rounded-sm shadow-sm"
              >
                 <h5 className="text-2xl font-serif text-brand-secondary leading-tight italic">Member Picks</h5>
                 <p className="text-xs font-medium text-brand-secondary/70 leading-relaxed">
                   Join our society for early access to signed first editions and exclusive events.
                 </p>
                 <Link 
                   to="/contact" 
                   className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand-secondary underline underline-offset-8"
                 >
                   Learn More
                 </Link>
              </motion.div>
            </aside>

            {/* Main Grid */}
            <div className="flex-grow">
               {loading && paginatedBooks.length === 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-20">
                    {[1,2,3,4,5,6].map(i => (
                      <div key={i} className="animate-pulse space-y-4">
                        <div className="aspect-[3/4] bg-gray-100 rounded-sm" />
                        <div className="h-4 bg-gray-100 w-1/4 rounded" />
                        <div className="h-6 bg-gray-100 w-3/4 rounded" />
                        <div className="h-4 bg-gray-100 w-1/2 rounded" />
                      </div>
                    ))}
                 </div>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-20">
                    <AnimatePresence mode="popLayout">
                    {paginatedBooks.map((book: any, i) => (
                      <motion.div 
                        key={book.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: (i % 3) * 0.1 }}
                        className="group flex flex-col"
                      >
                        <div 
                          className="relative aspect-[3/4] mb-8 overflow-hidden rounded-sm bg-gray-50 flex items-center justify-center p-6 lg:p-12 cursor-pointer group/card"
                          onClick={() => setSelectedBook(book)}
                        >
                          <img 
                            src={book.coverUrl || book.cover} 
                            alt={book.title} 
                            className="w-full h-full object-contain shadow-[20px_20px_40px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-700" 
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                          
                          {/* Quick Preview Hover */}
                          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover/card:translate-y-0 transition-transform duration-500">
                             <div className="bg-white/95 backdrop-blur-md py-3 text-center rounded-sm shadow-xl">
                               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-secondary flex items-center justify-center gap-2">
                                 <BookOpen size={12} />
                                 <span>Quick Preview</span>
                               </p>
                             </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex">
                            <span className="px-3 py-1 bg-brand-primary/10 text-[8px] font-bold uppercase tracking-[0.2em] text-brand-primary rounded-sm">
                              {book.categorySlug}
                            </span>
                          </div>
                          <div className="space-y-1">
                             <h3 
                               className="text-2xl font-serif text-brand-secondary leading-tight group-hover:text-brand-primary transition-colors cursor-pointer"
                               onClick={() => setSelectedBook(book)}
                             >
                               {book.title}
                             </h3>
                             <p className="text-sm font-medium text-gray-500">{book.author}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
               </div>
               )}

               {/* Pagination */}
               {totalPages > 1 && (
                  <div className="mt-32 pt-8 border-t border-gray-100 flex items-center justify-center gap-12">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-secondary disabled:opacity-20 hover:text-brand-primary transition-colors"
                    >
                      <ChevronLeft size={16} />
                      <span>Previous</span>
                    </button>
                    
                    <div className="flex items-center space-x-6">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${
                            currentPage === page ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-gray-400 hover:text-brand-secondary'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-secondary disabled:opacity-20 hover:text-brand-primary transition-colors"
                    >
                      <span>Next</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
               )}

               {filteredBooks.length === 0 && (
                 <div className="text-center py-32 space-y-8">
                   <div className="w-24 h-24 bg-brand-beige rounded-full flex items-center justify-center mx-auto text-brand-primary/20">
                     <Filter size={48} />
                   </div>
                   <h3 className="text-3xl font-serif text-brand-secondary">No Curated Editions Found</h3>
                   <p className="text-gray-500 max-w-sm mx-auto font-sans leading-relaxed">
                     We couldn't find any books matching your criteria. Try adjusting your filters.
                   </p>
                   <button 
                     onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                     className="text-brand-primary font-bold uppercase tracking-[0.2em] text-[10px] underline underline-offset-8"
                   >
                     Clear all selections
                   </button>
                 </div>
               )}
            </div>
          </div>
        </div>
      </section>

      <BookPreviewModal 
        selectedBook={selectedBook} 
        onClose={() => setSelectedBook(null)} 
      />
    </div>
  );
}
