import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_INFO } from '../constants/content';
import { Calendar, MapPin, X, ArrowRight, Camera, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useContent } from '../hooks/useContent';

export default function Events() {
  const { events, loading } = useContent();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  if (loading) return <div className="min-h-screen flex items-center justify-center font-serif">Loading Events...</div>;

  const totalPages = Math.ceil(events.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-brand-secondary py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-brand-primary font-sans font-bold text-xs uppercase tracking-[0.3em]">Our Global Footprint</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
            Events & <span className="italic text-brand-primary">Fairs</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-sans">
            Richkiss Publishers actively participates in major international book fairs and conferences across the globe to bring African storytelling to the world.
          </p>
        </div>
      </section>

      {/* Events Timeline/Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentEvents.map((event, idx) => (
            <motion.div 
              key={event.id || event.name || idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedEvent(event)}
              className="group bg-brand-beige rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col"
            >
              {/* Image Grid (Up to 3) */}
              <div className="h-64 relative bg-gray-200 overflow-hidden">
                <div className={`grid h-full ${event.gallery && event.gallery.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {event.gallery && event.gallery.length > 0 ? event.gallery.slice(0, 2).map((img: string, i: number) => (
                    <div key={i} className="relative h-full overflow-hidden">
                      <img 
                        src={img} 
                        alt={`${event.name} ${i}`} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {i === 1 && event.gallery.length > 2 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                          <span className="text-xl font-bold">+{event.gallery.length - 2}</span>
                        </div>
                      )}
                    </div>
                  )) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-muted">
                      <Camera size={48} className="opacity-20" />
                    </div>
                  )}
                </div>
                {/* Year Badge */}
                <div className="absolute top-4 right-4 px-4 py-1.5 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                  {event.year || (event.years ? event.years.join(' & ') : 'Annual')}
                </div>
              </div>

              {/* Details Beneath */}
              <div className="p-8 space-y-4 flex-grow flex flex-col">
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-brand-secondary group-hover:text-brand-primary transition-colors leading-tight">
                    {event.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-brand-muted font-sans font-medium text-sm">
                    <MapPin size={16} className="text-brand-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {event.description || `Showcasing sessions and networking at ${event.name}.`}
                </p>

                <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-100 italic font-serif text-brand-primary text-sm">
                  <span>View full gallery</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center space-x-2">
            <button 
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-brand-primary hover:text-white hover:border-brand-primary text-brand-secondary'}`}
            >
              <ArrowLeft size={18} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-12 h-12 rounded-full font-sans font-bold text-sm transition-all ${currentPage === pageNum ? 'bg-brand-primary text-white' : 'text-brand-muted hover:text-brand-primary hover:bg-brand-beige'}`}
              >
                {pageNum}
              </button>
            ))}

            <button 
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-brand-primary hover:text-white hover:border-brand-primary text-brand-secondary'}`}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </section>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-brand-secondary/95 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-5xl max-h-full rounded-[40px] shadow-3xl overflow-hidden flex flex-col lg:flex-row"
            >
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center text-brand-secondary hover:text-brand-primary transition-colors shadow-lg"
              >
                <X size={24} />
              </button>

              {/* Gallery Side */}
              <div className="w-full lg:w-1/2 bg-gray-100 h-[300px] lg:h-auto overflow-y-auto p-8 space-y-4">
                {selectedEvent.gallery?.map((img: string, i: number) => (
                  <motion.img 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    src={img} 
                    alt={`${selectedEvent.name} gallery ${i}`}
                    className="w-full rounded-2xl shadow-md"
                  />
                ))}
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center space-y-8 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-brand-primary font-sans font-bold text-xs uppercase tracking-[0.2em]">
                    <Calendar size={14} />
                    <span>{selectedEvent.year || (selectedEvent.years ? selectedEvent.years.join(' & ') : 'Annual Event')}</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-serif text-brand-secondary leading-tight">
                    {selectedEvent.name}
                  </h2>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-brand-beige border border-brand-primary/10 rounded-2xl">
                  <MapPin className="text-brand-primary" size={24} />
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-brand-muted">Location</p>
                    <p className="text-brand-secondary font-serif font-bold">{selectedEvent.location}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-brand-secondary border-b border-gray-100 pb-2">About the Event</h4>
                  <p className="text-gray-600 font-sans leading-relaxed">
                    {selectedEvent.description || `Richkiss Publishers participated in ${selectedEvent.name}, engaging with readers, authors, and industry partners to share our vision of African literacy.`}
                  </p>
                </div>

                <div className="pt-8">
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="w-full py-4 bg-brand-secondary text-white font-sans font-bold text-sm uppercase tracking-widest rounded-full hover:bg-brand-primary transition-all shadow-xl"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Featured Event Promo */}
      <section className="bg-brand-beige py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="order-2 lg:order-1 space-y-8">
              <span className="text-brand-primary font-sans font-bold text-xs uppercase tracking-[0.3em]">Coming Up Next</span>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary">Chennai International Book Fair <span className="italic text-brand-primary">2026</span></h2>
              <p className="text-gray-600 font-sans leading-relaxed text-lg">
                We are thrilled to represent Ghana at the Chennai International Book Fair in India. Join us as we showcase our diverse range of children's literature and educational resources to a global audience.
              </p>
              <button className="px-10 py-5 bg-brand-secondary text-white font-sans font-bold text-sm uppercase tracking-widest rounded-full hover:bg-brand-primary transition-all shadow-xl hover:shadow-2xl">
                Get more details
              </button>
           </div>
           <div className="order-1 lg:order-2">
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1000" 
                  alt="Book Fair" 
                  className="rounded-3xl shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-primary/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-primary/20 rounded-full blur-3xl" />
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
