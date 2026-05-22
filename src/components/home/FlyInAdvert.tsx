import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, BookOpen, Sparkles } from 'lucide-react';
import { useContent } from '../../hooks/useContent';

export default function FlyInAdvert() {
  const { settings } = useContent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If fly-in advert is disabled in CMS settings, don't show it
    if (settings.enableFlyInAdvert === false) return;

    // Check if user has already dismissed the advert in the current session
    const isDismissed = sessionStorage.getItem('richkiss_advert_dismissed');
    if (isDismissed) return;

    // Show after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [settings.enableFlyInAdvert]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('richkiss_advert_dismissed', 'true');
  };

  // Render the pre-rendered detailed mockup of the flyer if no custom image URL is uploaded
  const renderMockup = () => (
    <div className="relative bg-[#fcfcfd] border border-gray-100 rounded-lg overflow-hidden flex flex-col shadow-2xl w-[320px] sm:w-[380px] text-gray-800">
      
      {/* 1. Header with Logo & Out Soon Ribbon */}
      <div className="pt-6 px-5 flex justify-between items-start relative pb-4 bg-gradient-to-b from-[#fbfbf9] to-white">
        <div className="flex flex-col">
          <div className="flex items-center space-x-1">
            {/* Minimal Crown/Logo */}
            <svg className="w-6 h-6 text-brand-secondary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 4l3 6h14l3-6-4 3-5-5-5 5-4-3zM5 12h14v2H5zm1 4h12v1H6zm2 3h8v1H8z" />
            </svg>
            <span className="font-serif font-black text-sm tracking-widest text-[#1a1c24]">RICHKISS</span>
          </div>
          <span className="text-[7px] uppercase tracking-[0.2em] font-bold text-gray-400">Publishers & Enterprise</span>
        </div>

        {/* Beautiful folded Ribbon OUT SOON */}
        <div className="absolute top-0 right-12 z-10">
          <div className="bg-[#ff3b30] text-white font-sans font-extrabold text-[9px] uppercase tracking-wider py-4 px-3 rounded-b-md shadow-lg flex flex-col items-center leading-none text-center">
            <span>OUT</span>
            <span className="mt-0.5">SOON</span>
          </div>
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-t-[4px] border-t-[#bf1a10] border-r-[4px] border-r-transparent absolute top-0 -left-1"></div>
        </div>
      </div>

      {/* 2. Visual Overlap of book covers */}
      <div className="px-5 py-4 bg-white/50 backdrop-blur-sm relative flex justify-center items-center gap-2 overflow-hidden min-h-[170px]">
        {/* Book 1: Tapa's Book Club (Green) */}
        <motion.div 
          whileHover={{ y: -8, scale: 1.05 }}
          className="relative w-[85px] sm:w-[100px] aspect-[1/1.4] bg-[#2e7d32] rounded-r-md shadow-md hover:shadow-xl border-l-[3px] border-l-black/30 flex flex-col justify-between p-2 overflow-hidden text-white"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
          <div className="text-center relative">
            <h4 className="font-sans font-black text-[9px] leading-tight bg-white/20 px-1 py-0.5 rounded-sm uppercase tracking-wide">TAPA'S</h4>
            <span className="text-[7px] block font-serif tracking-wide mt-1 italic">Book Club</span>
          </div>
          {/* Cover Art Miniature */}
          <div className="my-1 flex-1 flex items-center justify-center opacity-85">
            <svg className="w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-[5px] text-center uppercase tracking-wide opacity-75 font-sans leading-none">N. M. Kissiedu</span>
        </motion.div>

        {/* Book 2: Tapa's Heart of Gold (Yellow/Gold) - Elevated center */}
        <motion.div 
          whileHover={{ y: -8, scale: 1.05 }}
          className="relative w-[95px] sm:w-[110px] aspect-[1/1.4] bg-[#fbc02d] rounded-r-md shadow-lg hover:shadow-2xl border-l-[3px] border-l-black/30 flex flex-col justify-between p-2.5 overflow-hidden text-gray-950 z-10 -mt-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-transparent pointer-events-none" />
          <div className="text-center relative">
            <h4 className="font-sans font-black text-[10px] leading-tight bg-black/10 px-1 py-0.5 rounded-sm uppercase tracking-wide">TAPA'S</h4>
            <span className="text-[8px] block font-serif tracking-wide mt-1 font-bold italic">Heart of Gold</span>
          </div>
          {/* Cover Art Miniature */}
          <div className="my-1 flex-1 flex items-center justify-center">
            <svg className="w-10 h-10 text-amber-950/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="text-[6px] text-center uppercase tracking-wide font-sans font-extrabold leading-none opacity-80">N. M. Kissiedu</span>
        </motion.div>

        {/* Book 3: Tapa's Clean-Up Adventures (Blue) */}
        <motion.div 
          whileHover={{ y: -8, scale: 1.05 }}
          className="relative w-[85px] sm:w-[100px] aspect-[1/1.4] bg-[#0288d1] rounded-r-md shadow-md hover:shadow-xl border-l-[3px] border-l-black/30 flex flex-col justify-between p-2 overflow-hidden text-white"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
          <div className="text-center relative">
            <h4 className="font-sans font-black text-[9px] leading-tight bg-white/20 px-1 py-0.5 rounded-sm uppercase tracking-wide">TAPA'S</h4>
            <span className="text-[7px] block font-serif tracking-wide mt-1 italic">Clean-Up</span>
          </div>
          {/* Cover Art Miniature */}
          <div className="my-1 flex-1 flex items-center justify-center opacity-85">
            <svg className="w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <span className="text-[5px] text-center uppercase tracking-wide opacity-75 font-sans leading-none">N. M. Kissiedu</span>
        </motion.div>
      </div>

      {/* 3. Description container exactly mirroring matching the poster content */}
      <div className="bg-[#121c33] text-white p-5 space-y-3 relative z-0">
        <div className="absolute top-2 left-2 opacity-5">
          <BookOpen size={48} className="text-white" />
        </div>
        <p className="text-[10px] sm:text-xs font-sans leading-relaxed text-slate-200">
          Tapa is a bright, kind-hearted, and imaginative young boy whose courage, compassion, and love for learning inspire everyone around him. Through these three inspiring stories, Tapa teaches children the values of kindness, teamwork, creativity, and the power of believing in themselves while showing that even small acts can create meaningful change in the world.
        </p>
      </div>

      {/* 4. Core CTA Pre-order Banner */}
      <a 
        href={`tel:${settings.flyInAdvertPhone.replace(/[^0-9+]/g, '')}`}
        className="bg-[#ff5722] hover:bg-[#ff3d00] text-white text-center py-4 px-4 font-sans font-black tracking-wider block transition-colors shadow-inner"
      >
        <span className="text-xs uppercase flex items-center justify-center gap-2">
          <Phone size={14} className="animate-pulse" />
          PRE-ORDER: {settings.flyInAdvertPhone}
        </span>
      </a>

    </div>
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 100, x: 0 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
          className="fixed bottom-6 right-6 z-[90] max-w-full px-4 sm:px-0 drop-shadow-2xl"
        >
          {/* Close Action button custom built for visual overlap */}
          <button
            onClick={handleClose}
            className="absolute -top-3 -right-3 sm:-right-2 z-[95] p-2 bg-brand-secondary text-white rounded-full hover:bg-[#ff5722] transition-colors shadow-md border-2 border-white flex items-center justify-center cursor-pointer"
            aria-label="Dismiss Advert"
          >
            <X size={14} />
          </button>

          {settings.flyInAdvertImageUrl ? (
            /* If they upload an actual graphic image, render that image nicely with container borders */
            <div className="bg-white p-2 border border-brand-beige rounded-lg shadow-2xl max-w-[320px] sm:max-w-[360px] overflow-hidden flex flex-col">
              <img 
                src={settings.flyInAdvertImageUrl} 
                alt="Latest Advert" 
                className="w-full h-auto rounded-sm object-cover"
                referrerPolicy="no-referrer"
              />
              <a 
                href={`tel:${settings.flyInAdvertPhone.replace(/[^0-9+]/g, '')}`}
                className="mt-2 bg-[#ff5722] hover:bg-[#ff3d00] text-white text-center py-3 px-3 font-sans font-black tracking-wider block transition-colors rounded-sm text-[10px] uppercase flex items-center justify-center gap-1.5"
              >
                <Phone size={12} className="animate-pulse" />
                PRE-ORDER: {settings.flyInAdvertPhone}
              </a>
            </div>
          ) : (
            /* Otherwise show the beautiful high-fidelity custom css-rendered flyer */
            renderMockup()
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
