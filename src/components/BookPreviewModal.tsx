import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Info } from 'lucide-react';

interface BookPreviewModalProps {
  selectedBook: any;
  onClose: () => void;
}

export default function BookPreviewModal({ selectedBook, onClose }: BookPreviewModalProps) {
  return (
    <AnimatePresence>
      {selectedBook && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-secondary/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl bg-white rounded-sm shadow-[0_50px_100px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-brand-secondary hover:text-brand-primary transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left Side: Large Image */}
            <div className="w-full md:w-1/2 bg-[#f8f8f8] p-12 lg:p-20 flex items-center justify-center">
              <motion.img 
                layoutId={`book-${selectedBook.id}`}
                src={selectedBook.coverUrl || selectedBook.cover} 
                alt={selectedBook.title}
                className="max-h-full max-w-full object-contain shadow-[30px_30px_60px_rgba(0,0,0,0.15)]"
              />
            </div>

            {/* Right Side: Content */}
            <div className="w-full md:w-1/2 p-12 lg:p-20 overflow-y-auto space-y-12">
              <div className="space-y-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary">Curated Edition</span>
                <h2 className="text-4xl lg:text-5xl font-serif text-brand-secondary leading-tight">
                  {selectedBook.title}
                </h2>
                <div className="flex items-center space-x-4 border-b border-gray-100 pb-6">
                  <div className="w-8 h-8 rounded-full bg-brand-beige flex items-center justify-center">
                    <BookOpen size={14} className="text-brand-primary" />
                  </div>
                  <p className="text-lg font-medium text-gray-600">By {selectedBook.author}</p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Synopsis</h4>
                <p className="text-gray-500 font-sans leading-relaxed text-sm md:text-base">
                  {selectedBook.description || "A masterfully crafted narrative that explores the depths of the human experience. This edition features original commentary and restoration, bringing the author's vision to life with unprecedented clarity."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Category</p>
                  <p className="text-xs font-bold text-brand-secondary uppercase tracking-[0.1em] text-blue-600">{selectedBook.categorySlug}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Format</p>
                  <p className="text-xs font-bold text-brand-secondary uppercase tracking-[0.1em]">Hardcover / Digital</p>
                </div>
              </div>

              <div className="pt-8">
                <button className="w-full py-5 bg-brand-secondary text-white font-sans font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                  <Info size={14} />
                  <span>Inquire for Availability</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
