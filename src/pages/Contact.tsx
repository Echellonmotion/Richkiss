import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../constants/content';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ fallback?: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();
      let result: any = {};
      try {
        result = JSON.parse(responseText);
      } catch (jsonErr) {
        throw new Error(`Server returned a non-JSON response (Status ${response.status}): ${responseText.slice(0, 300) || "Empty response body"}`);
      }

      if (response.ok) {
        setSuccessInfo({
          fallback: result.fallback,
          message: result.message || "Thank you! Your message has been sent successfully."
        });
        setIsSubmitted(true);
      } else {
        throw new Error(result.error || result.details || "Something went wrong. Please verify SMTP details.");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setSubmitError(err.message || "Failed to deliver contact form. Please try again or open standard draft instead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pt-32">
      {/* 1. Header Section */}
      <section className="pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl lg:text-7xl font-serif text-brand-secondary leading-tight mb-8">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-500 font-sans leading-relaxed">
              We believe in the beauty of conversations. Whether you're looking for a rare 
              first edition or want to host a literary event, we're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* Left: Form Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 bg-white p-12 lg:p-20 shadow-[0_40px_80px_rgba(0,0,0,0.05)] rounded-sm border border-gray-50"
            >
              <h2 className="text-3xl font-serif text-brand-secondary mb-12 italic">Send a Message</h2>
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 py-12 text-center"
                  >
                    <div className="inline-flex items-center justify-center p-4 bg-emerald-50 text-emerald-600 rounded-full mb-4">
                      <CheckCircle2 size={48} className="animate-bounce" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-brand-secondary">Thank You!</h3>
                    <p className="text-gray-500 font-sans leading-relaxed text-sm max-w-md mx-auto">
                      {successInfo?.message || "Your contact message has been dispatched successfully."}
                    </p>
                    {successInfo?.fallback && (
                      <div className="bg-amber-50/70 border border-amber-200/80 text-amber-800 rounded-sm p-5 text-xs font-sans max-w-md mx-auto text-left leading-relaxed mt-6">
                        <strong className="text-amber-950 block mb-1">Developer Notice:</strong> 
                        This submission request was successfully logged in the backend terminal console. To complete live email dispatches to <strong>info@richkissgh.com</strong>, please set the <code>SMTP_PASS</code> secret in the environment variables using your Stormerhost email password. We fall back gracefully to console logs so you aren't blocked!
                      </div>
                    )}
                    <div className="pt-2">
                      <button 
                        onClick={() => {
                          setFormData({ name: '', email: '', subject: '', message: '' });
                          setSuccessInfo(null);
                          setIsSubmitted(false);
                        }}
                        className="mt-4 px-8 py-3 bg-brand-secondary text-white text-[10px] uppercase font-bold tracking-widest rounded-sm hover:bg-[#ff5722] transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-12">
                    {submitError && (
                      <div className="p-4 bg-red-50 text-red-700 rounded-sm border border-red-100 text-xs font-sans space-y-2">
                        <p className="font-bold">Message failed to deliver via portal:</p>
                        <p>{submitError}</p>
                        <p className="pt-2 text-gray-500">
                          Alternatively, you can open a standard draft in your email application:
                        </p>
                        <a 
                          href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(formData.subject || 'Direct Inquiry')}&body=${encodeURIComponent(formData.message)}`}
                          className="inline-flex items-center gap-2 hover:underline text-[#ff5722] font-semibold"
                        >
                          <ArrowRight size={14} /> Open draft in local email application
                        </a>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-4 border-b border-gray-200 focus-within:border-brand-primary transition-colors pb-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full bg-transparent outline-none text-sm font-sans placeholder:text-gray-300"
                        />
                      </div>
                      <div className="space-y-4 border-b border-gray-200 focus-within:border-brand-primary transition-colors pb-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Email Address</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="hello@example.com"
                          className="w-full bg-transparent outline-none text-sm font-sans placeholder:text-gray-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 border-b border-gray-200 focus-within:border-brand-primary transition-colors pb-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Subject</label>
                      <input 
                        type="text" 
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="What can we help you with?"
                        className="w-full bg-transparent outline-none text-sm font-sans placeholder:text-gray-300"
                      />
                    </div>

                    <div className="space-y-4 border-b border-gray-200 focus-within:border-brand-primary transition-colors pb-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Message</label>
                      <textarea 
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Type your message here..."
                        className="w-full bg-transparent outline-none text-sm font-sans placeholder:text-gray-300 resize-none"
                      />
                    </div>

                    <div className="pt-8">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-12 py-5 bg-[#ff5722] text-white font-sans font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm transition-all shadow-xl shadow-[#ff5722]/20 ${
                          isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:-translate-y-1"
                        }`}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right: Info & Image Column */}
            <div className="lg:col-span-5 space-y-20">
              {/* Contact Details */}
              <div className="space-y-12">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff5722]">The Flagship Store</h4>
                  <p className="text-2xl font-serif text-brand-secondary leading-relaxed">
                    <span className="whitespace-pre-line">{COMPANY_INFO.headOffice}</span>
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff5722]">Contact Details</h4>
                  <div className="space-y-2 text-brand-secondary font-sans font-bold text-lg">
                    <p>{COMPANY_INFO.phone[0]}</p>
                    <p className="underline underline-offset-8 decoration-gray-200 hover:decoration-brand-primary transition-colors cursor-pointer text-base font-normal">
                      {COMPANY_INFO.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff5722]">Opening Hours</h4>
                  <div className="space-y-3 font-sans text-sm text-gray-600">
                    <div className="flex justify-between items-center max-w-[280px]">
                      <span>Mon – Fri</span>
                      <span className="font-bold text-brand-secondary">9:00 AM – 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center max-w-[280px]">
                      <span>Sat & Sun</span>
                      <span className="font-bold text-[#ff5722]">Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-[4/6] bg-gray-50 rounded-sm overflow-hidden"
              >
                <img 
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200" 
                  alt="Store Atmosphere"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[3s]"
                />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Map Section */}
      <section className="h-[600px] w-full grayscale border-y border-gray-100 opacity-60 hover:opacity-100 transition-all duration-1000">
        <iframe 
          title="Richkiss Shop Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.5284714101915!2d-0.2073!3d5.6174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a170889c17!2sRichKiss%20Publications!5e0!3m2!1sen!2sgh!4v1714512000000!5m2!1sen!2sgh" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </section>

    </div>
  );
}
