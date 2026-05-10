import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../../constants/content';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={32} />
      
      {/* Tooltip/Label */}
      <div className="absolute right-full mr-4 bg-white text-brand-secondary px-4 py-2 rounded-lg text-sm font-bold shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-gray-100">
        Chat with us
        {/* Pointer */}
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45 border-r border-t border-gray-100" />
      </div>
    </motion.a>
  );
}
