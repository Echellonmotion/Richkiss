import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useContent } from '../../hooks/useContent';
import { useState, useEffect } from 'react';

export default function Hero() {
  const { settings } = useContent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = settings.heroImages && settings.heroImages.length > 0 ? settings.heroImages : [
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=1500",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1500",
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=1500",
    "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=1500",
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=1500",
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1500"
  ];

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative w-full bg-white overflow-hidden min-h-[650px] lg:h-[750px] xl:h-[800px] flex flex-col lg:block pt-16 lg:pt-0">
      
      {/* Absolute Right-Bleeding Visual Background Slider Panel (lg+ screens) */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[55%] pointer-events-auto overflow-hidden z-0">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentIndex}
            src={images[currentIndex]} 
            alt="Hero Background Slider" 
            className="w-full h-full object-cover select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-brand-secondary/5 mix-blend-multiply pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full items-stretch">
          
          {/* Left Side Content Block */}
          <div className="lg:col-span-5 flex flex-col justify-between py-12 lg:py-24 space-y-16 lg:space-y-0 h-full">
            
            {/* Tagline Heading & Button with Clean Drop-down Fade-In effect */}
            <div className="space-y-8 lg:mt-16 text-left">
              <div className="min-h-[140px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[220px] flex items-center">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.h1
                    key={currentIndex}
                    initial={{ opacity: 0, y: -70 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 25 }}
                    transition={{ 
                      type: "tween",
                      ease: "easeOut",
                      duration: 1.5
                    }}
                    className="text-[40px] sm:text-[48px] lg:text-[54px] xl:text-[62px] font-serif text-brand-secondary leading-[1.15] tracking-tight font-medium max-w-sm sm:max-w-md md:max-w-lg"
                  >
                    {settings.tagline || "Inspire Young Minds with Everyday Science"}
                  </motion.h1>
                </AnimatePresence>
              </div>
              
              <div className="pt-2">
                <Link 
                  to="/shop" 
                  className="inline-block px-10 py-4.5 bg-[#e5593f] hover:bg-[#cf4d33] text-white font-sans font-bold text-xs uppercase tracking-widest rounded transition-all shadow-lg active:scale-[0.98] duration-200"
                >
                  VISIT OUR SHOP
                </Link>
              </div>
            </div>

            {/* Bottom Slide Index Counter Layout (Matches image: 3 —— 3 style) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-center space-x-6 select-none pb-4"
            >
              <span className="text-7xl sm:text-8xl font-serif text-brand-secondary/35 leading-none font-light">
                {currentIndex + 1}
              </span>
              <div className="w-16 sm:w-20 h-[1.5px] bg-brand-secondary/35" />
              <span className="text-7xl sm:text-8xl font-serif text-brand-secondary/35 leading-none font-light">
                {images.length}
              </span>
            </motion.div>
          </div>

          {/* Right Side Visual Banner Block with Animated Image Slider background */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:pl-12 py-16 lg:py-0 min-h-[450px] sm:min-h-[550px] lg:min-h-0 overflow-hidden rounded-2xl lg:rounded-none">
            
            {/* Fallback Ambient Backdrop Slider for Mobile/Tablet screens */}
            <div className="lg:hidden absolute inset-0 -mx-4 sm:-mx-6 bg-brand-beige overflow-hidden z-0">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentIndex}
                  src={images[currentIndex]} 
                  alt="Background Slider Mobile" 
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-brand-secondary/15 mix-blend-multiply pointer-events-none" />
            </div>

            {/* Empty space filler for desktop alignment constraint layout */}
            <div className="relative z-10 w-full h-full" />
          </div>

        </div>
      </div>
    </section>
  );
}

