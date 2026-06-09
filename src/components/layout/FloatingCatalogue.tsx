import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, BookOpen, FileText, X, ChevronUp } from 'lucide-react';

export default function FloatingCatalogue() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed bottom-8 right-8 z-[55] flex flex-col items-end">
      {/* Popover Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="mb-3 bg-white border border-gray-100 rounded-lg p-3.5 shadow-2xl w-64 flex flex-col gap-2 relative z-10"
          >
            <div className="px-1 py-1 flex items-center justify-between border-b border-gray-100 pb-2.5">
              <span className="text-[10px] font-sans font-extrabold text-[#ffb300] uppercase tracking-wider">
                Select Catalogue
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-650 transition-colors p-1 rounded-full hover:bg-gray-50"
              >
                <X size={14} />
              </button>
            </div>

            <a
              href="https://drive.google.com/file/d/164ifXpyPI_-RSH-b3zoucVTRXnYk6M3R/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 p-3 rounded-md hover:bg-brand-primary/5 border border-transparent hover:border-brand-primary/10 transition-all duration-200 group/item"
            >
              <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0 group-hover/item:bg-brand-primary group-hover/item:text-white transition-all duration-200">
                <BookOpen size={14} />
              </div>
              <div className="text-left">
                <p className="font-sans font-bold text-xs text-brand-secondary">Product Catalogue</p>
                <p className="font-sans text-[10px] text-gray-450">Books, media & prints</p>
              </div>
            </a>

            <a
              href="https://drive.google.com/file/d/1CdFukvoF8Q9Q-YFDn_lMcySCs_WQk2di/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 p-3 rounded-md hover:bg-brand-primary/5 border border-transparent hover:border-brand-primary/10 transition-all duration-200 group/item"
            >
              <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0 group-hover/item:bg-brand-primary group-hover/item:text-white transition-all duration-200">
                <FileText size={14} />
              </div>
              <div className="text-left">
                <p className="font-sans font-bold text-xs text-brand-secondary">Publishers Catalogue</p>
                <p className="font-sans text-[10px] text-gray-450">Latest publisher roster</p>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center space-x-2 bg-brand-primary hover:bg-brand-primary/95 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-brand-primary/20 transition-all duration-300 group font-sans font-bold tracking-wider text-xs uppercase cursor-pointer"
        initial={{ scale: 0, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle download options"
        aria-expanded={isOpen}
      >
        <Download size={18} className="animate-pulse" />
        <span>Download Catalogue</span>
        <ChevronUp size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>
    </div>
  );
}
