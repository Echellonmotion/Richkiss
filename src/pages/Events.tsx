import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useContent } from '../hooks/useContent';
import { Link } from 'react-router-dom';

export default function Events() {
  const { events, loading } = useContent();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  if (loading) return <div className="min-h-screen flex items-center justify-center font-serif text-2xl">Loading Events...</div>;

  const featuredEvent = events[0] || {
    name: "An Evening with Elena Vance",
    description: "Join us for an exclusive reading and discussion of her latest masterpiece, \"The Silent Echo,\" followed by an intimate Q&A session and book signing.",
    location: "Main Atrium",
    year: "October 24, 2024"
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  return (
    <div className="bg-white min-h-screen pt-32">
      {/* 1. Featured Event Hero */}
      <section className="pb-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <span className="inline-block px-3 py-1 bg-[#fff0ed] text-[#ff5722] text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm">
                Featured Event
              </span>
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-serif text-brand-secondary leading-tight">
                  {featuredEvent.name}
                </h1>
                <p className="text-lg text-gray-500 font-sans leading-relaxed max-w-lg">
                  {featuredEvent.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-8">
                <div className="flex items-center space-x-3 text-brand-secondary font-sans font-bold text-[10px] uppercase tracking-widest">
                  <Calendar size={18} className="text-gray-400" />
                  <span>{featuredEvent.year || 'TBA'}</span>
                </div>
                <div className="flex items-center space-x-3 text-brand-secondary font-sans font-bold text-[10px] uppercase tracking-widest">
                  <MapPin size={18} className="text-gray-400" />
                  <span>{featuredEvent.location || 'Announcement Soon'}</span>
                </div>
              </div>

              <button 
                onClick={() => setSelectedEvent(featuredEvent)}
                className="px-12 py-5 bg-[#ff5722] text-white font-sans font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:-translate-y-1 transition-all shadow-xl shadow-[#ff5722]/20"
              >
                View Highlights
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div 
                className="grid grid-cols-2 gap-4 opacity-40 grayscale group cursor-pointer" 
                onClick={() => setSelectedEvent(featuredEvent)}
              >
                 <div className="space-y-4">
                    <img src={featuredEvent.gallery?.[0] || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600"} className="w-full aspect-[3/4] object-cover rounded-sm" alt="Faded event 1" />
                    <img src={featuredEvent.gallery?.[1] || "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600"} className="w-full aspect-square object-cover rounded-sm" alt="Faded event 2" />
                 </div>
                 <div className="space-y-4 pt-12">
                    <img src={featuredEvent.gallery?.[2] || "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=600"} className="w-full aspect-square object-cover rounded-sm" alt="Faded event 3" />
                    <img src={featuredEvent.gallery?.[3] || "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=600"} className="w-full aspect-[3/4] object-cover rounded-sm" alt="Faded event 4" />
                 </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-l from-white via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Archived Events */}
      <section className="py-32 bg-[#fdfdfd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary">Archived Gatherings</h2>
              <p className="text-gray-500 font-sans tracking-wide">A retrospective of our most celebrated literary moments and discussions.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
            {currentEvents.map((event, i) => (
              <motion.div 
                key={event.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div 
                  className="relative aspect-[4/3] mb-8 overflow-hidden rounded-sm cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <img 
                    src={event.gallery?.[0] || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800'} 
                    alt={event.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-[8px] font-bold uppercase tracking-widest text-brand-secondary rounded-sm">
                    {event.year || 'NOV 05'}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary">
                      {event.type || 'Workshop'}
                    </span>
                    <h3 className="text-2xl font-serif text-brand-secondary leading-tight min-h-[4rem]">
                      {event.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-sans leading-relaxed line-clamp-2">
                      {event.description || 'A deep dive into literary excellence and creative expression.'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedEvent(event)}
                    className="w-full py-4 border border-gray-200 text-brand-secondary font-sans font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm hover:border-brand-primary hover:bg-brand-primary hover:text-white transition-all"
                  >
                    Event Recap
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-20 flex justify-center items-center space-x-4">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-6 py-3 border border-gray-200 text-brand-secondary font-sans font-bold text-[10px] uppercase tracking-widest rounded-sm disabled:opacity-30 hover:border-brand-primary transition-colors"
              >
                Previous
              </button>
              <div className="flex items-center space-x-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-sm font-sans font-bold text-xs transition-colors ${
                      currentPage === i + 1 ? 'bg-brand-secondary text-white' : 'border border-gray-100 text-gray-400 hover:border-brand-primary'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-6 py-3 border border-gray-200 text-brand-secondary font-sans font-bold text-[10px] uppercase tracking-widest rounded-sm disabled:opacity-30 hover:border-brand-primary transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. Literary Wisdom Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Quote Block 1 */}
        <div className="bg-brand-secondary p-16 lg:p-32 flex flex-col justify-center space-y-12 text-white">
          <div className="space-y-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary">Our Ethos</span>
            <h2 className="text-4xl lg:text-5xl font-serif leading-tight italic">
              "Until the lions have their own historians, the history of the hunt will always glorify the hunter."
            </h2>
            <div className="pt-4 border-t border-white/10">
              <p className="font-sans font-bold text-xs uppercase tracking-widest">— Chinua Achebe</p>
              <p className="text-white/50 text-[10px] mt-1 uppercase tracking-widest font-sans">The Father of Modern African Literature</p>
            </div>
          </div>
        </div>

        {/* Brand Quote Block */}
        <div className="relative aspect-square lg:aspect-auto group overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1524311588024-d2317178412b?auto=format&fit=crop&q=80&w=1200" 
            alt="Richkiss Vision" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s] grayscale"
          />
          <div className="absolute inset-0 bg-brand-secondary/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif text-white leading-tight tracking-tight max-w-lg">
                Crafting excellence in every chapter, preserving African heritage through the art of fine publishing.
              </h2>
              <div className="w-12 h-[1px] bg-brand-primary mx-auto" />
              <p className="text-white/70 font-sans text-[10px] uppercase tracking-[0.3em]">The Richkiss Standard</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Newsletter Section */}
      <section className="py-40 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-[#fef9f8] p-16 lg:p-24 rounded-sm text-center space-y-12 border border-[#fff0ed]">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary">Never Miss a Chapter</h2>
              <p className="text-gray-500 font-sans max-w-xl mx-auto leading-relaxed">
                Join our literary circle to receive early access to event tickets, 
                exclusive author interviews, and monthly curation lists.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row max-w-xl mx-auto gap-0 bg-white border border-gray-100 shadow-sm">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-8 py-5 text-sm outline-none bg-transparent"
              />
              <button className="px-12 py-5 bg-[#c0392b] text-white font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-brand-secondary transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
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
              className="relative bg-white w-full max-w-5xl max-h-full rounded-sm shadow-3xl overflow-hidden flex flex-col lg:flex-row"
            >
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center text-brand-secondary hover:text-brand-primary transition-colors shadow-lg"
              >
                <X size={24} />
              </button>

              {/* Gallery Side */}
              <div className="w-full lg:w-1/2 bg-gray-100 h-[300px] lg:h-auto overflow-y-auto p-8 space-y-4">
                {selectedEvent.gallery?.length > 0 ? (
                  selectedEvent.gallery?.map((img: string, i: number) => (
                    <motion.img 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      src={img} 
                      alt={`${selectedEvent.name} gallery ${i}`}
                      className="w-full rounded-sm shadow-md"
                    />
                  ))
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800" 
                      className="w-full rounded-sm shadow-md" 
                      alt="Placeholder event image"
                    />
                  </div>
                )}
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center space-y-8 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-brand-primary font-sans font-bold text-xs uppercase tracking-[0.2em]">
                    <Calendar size={14} />
                    <span>{selectedEvent.year || 'Annual Event'}</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-serif text-brand-secondary leading-tight">
                    {selectedEvent.name}
                  </h2>
                </div>

                <div className="flex items-center space-x-3 p-6 bg-brand-beige rounded-sm">
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
                    className="w-full py-5 bg-[#ff5722] text-white font-sans font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:-translate-y-1 transition-all shadow-xl shadow-[#ff5722]/20"
                  >
                    Close Recap
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
