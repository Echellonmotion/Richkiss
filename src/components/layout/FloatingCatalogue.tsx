import { motion } from 'motion/react';
import { Download } from 'lucide-react';

export default function FloatingCatalogue() {
  return (
    <motion.a
      href="https://drive.google.com/file/d/164ifXpyPI_-RSH-b3zoucVTRXnYk6M3R/view?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-55 flex items-center space-x-2 bg-brand-primary hover:bg-brand-primary/95 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-brand-primary/20 transition-all duration-300 group font-sans font-bold tracking-wider text-xs uppercase"
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Download catalogue"
    >
      <Download size={18} className="animate-pulse" />
      <span>Download Catalogue</span>
    </motion.a>
  );
}
