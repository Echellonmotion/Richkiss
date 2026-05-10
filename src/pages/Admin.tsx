import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Book, 
  Calendar, 
  Layout, 
  Users,
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  LogIn, 
  LogOut, 
  BookOpen,
  Briefcase,
  Image as ImageIcon,
  Database,
  CheckCircle2,
  AlertCircle,
  Lock,
  UploadCloud,
  Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import ImageUpload from '../components/admin/ImageUpload';
import { useContent } from '../hooks/useContent';
import { 
  doc, 
  setDoc, 
  addDoc, 
  collection, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { COMPANY_INFO, BOOK_CATEGORIES } from '../constants/content';

export default function Admin() {
  const { isAuthenticated, loading: authLoading, login, logout } = useAuth();
  const { settings, categories, books, events, partners, whyRichkiss, jobs, printWorks, loading: contentLoading } = useContent();
  const [activeTab, setActiveTab] = useState<'settings' | 'categories' | 'books' | 'events' | 'partners' | 'whyRichkiss' | 'jobs' | 'printWorks'>('settings');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (authLoading) return <div className="min-h-screen flex items-center justify-center font-serif">Verifying Access...</div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-beige flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[40px] shadow-2xl max-w-md w-full text-center space-y-8"
        >
          <div className="w-20 h-20 bg-brand-primary/10 rounded-3xl flex items-center justify-center mx-auto text-brand-primary">
            <Lock size={40} />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-serif text-brand-secondary">Admin Access</h1>
            <p className="text-gray-500 font-sans">Enter the administrator password to manage website content.</p>
          </div>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const success = login(passwordInput);
              if (!success) {
                setLoginError(true);
                setTimeout(() => setLoginError(false), 2000);
              }
            }}
            className="space-y-4"
          >
            <div className="relative">
              <input 
                type="password"
                placeholder="Admin Password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className={`w-full p-5 bg-brand-beige/50 border-2 rounded-2xl outline-none transition-all ${loginError ? 'border-red-400 shake text-red-500' : 'border-transparent focus:bg-white focus:border-brand-primary'}`}
              />
            </div>
            <button 
              type="submit"
              className="w-full flex items-center justify-center space-x-3 py-4 bg-brand-secondary text-white rounded-full font-bold hover:bg-brand-primary transition-all shadow-xl"
            >
              <LogIn size={20} />
              <span>Unlock Dashboard</span>
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const handleSeed = async () => {
    try {
      // Seed Settings
      await setDoc(doc(db, 'settings', 'global'), {
        companyName: COMPANY_INFO.name,
        logoUrl: "",
        footerLogoUrl: "",
        tagline: "Inspiring Excellence in Publishing",
        phoneNumbers: COMPANY_INFO.phone,
        contactEmail: COMPANY_INFO.email,
        aboutText: COMPANY_INFO.aboutUs,
        vision: COMPANY_INFO.vision,
        mission: COMPANY_INFO.mission,
        commitment: COMPANY_INFO.commitment,
        updatedAt: serverTimestamp()
      });

      // Seed Categories
      for (const cat of BOOK_CATEGORIES) {
        await setDoc(doc(db, 'categories', cat.slug), {
          name: cat.name,
          slug: cat.slug,
          description: cat.description
        });
      }

      // Seed Books
      for (const cat of BOOK_CATEGORIES) {
        for (const book of cat.books) {
          await addDoc(collection(db, 'books'), {
            title: book.title,
            author: (book as any).author,
            price: (book as any).price,
            coverUrl: (book as any).cover,
            categorySlug: cat.slug,
            featured: true,
            year: (book as any).year || "",
            isbn: (book as any).isbn || "",
            dimensions: (book as any).dimensions || "",
            bindingPages: (book as any).bindingPages || "",
            description: (book as any).description || ""
          });
        }
      }

      // Seed Events
      for (const event of COMPANY_INFO.events) {
        await addDoc(collection(db, 'events'), event);
      }

      // Seed Why Richkiss (Value Propositions)
      const whyDefaults = [
        {
          imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb77db21?auto=format&fit=crop&q=80&w=600",
          title: "Sustainable Practices",
          description: "From carbon-neutral shipping to 100% recycled paper stocks, we prioritize the planet as much as the prose.",
          order: 0
        },
        {
          imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600",
          title: "Creative Freedom",
          description: "We operate like a small boutique press with the resources of a global leader, giving you space to innovate.",
          order: 1
        },
        {
          imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600",
          title: "Literary Culture",
          description: "Enjoy a generous annual book stipend, silent reading hours, and frequent author-led workshops.",
          order: 2
        }
      ];
      for (const item of whyDefaults) {
        await addDoc(collection(db, 'whyRichkiss'), item);
      }

      // Seed Jobs
      const jobDefaults = [
        { category: "Editorial", title: "Senior Acquisitions Editor", location: "Accra", type: "Full-Time", desc: "Lead our fiction department in discovering new voices from across West Africa.", imageUrl: "https://images.unsplash.com/photo-1554446422-d05db23719d2?auto=format&fit=crop&q=80&w=600" },
        { category: "Design", title: "Book Cover Designer", location: "Accra", type: "Full-Time", desc: "Crafting visual identities for our upcoming high-end literary fiction series.", imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600" }
      ];
      for (const job of jobDefaults) {
        await addDoc(collection(db, 'jobs'), job);
      }

      // Seed Partners
      const partnerDefaults = [
        { name: "Princlesgh" },
        { name: "AGAMal" },
        { name: "YiKroSec" },
        { name: "GreenLac" },
        { name: "ASSN" },
        { name: "UMA" }
      ];
      for (const partner of partnerDefaults) {
        await addDoc(collection(db, 'partners'), partner);
      }

      setStatus({ type: 'success', msg: 'Database seeded successfully!' });
    } catch (err: any) {
      console.error('Seed Error:', err?.message || String(err));
      setStatus({ type: 'error', msg: 'Failed to seed database.' });
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatus(null);
    try {
      // Ensure all required fields for Firestore rules are present
      const submissionData = {
        ...formData,
        companyName: formData.companyName || settings.companyName,
        logoUrl: formData.logoUrl || settings.logoUrl,
        heroImages: formData.heroImages || settings.heroImages || [],
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(db, 'settings', 'global'), submissionData, { merge: true });
      setStatus({ type: 'success', msg: 'Settings updated successfully!' });
      setIsEditing(null);
    } catch (err: any) {
      console.error('Update Settings Error:', err?.message || String(err));
      setStatus({ type: 'error', msg: `Update failed: ${err?.message || 'Check firestore permissions'}` });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (coll: string, id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteDoc(doc(db, coll, id));
      setStatus({ type: 'success', msg: 'Deleted successfully' });
    } catch (err: any) {
      console.error('Delete Error:', err?.message || String(err));
      setStatus({ type: 'error', msg: 'Delete failed' });
    }
  };

  const handleSaveItem = async (coll: string, data: any, id?: string) => {
    setIsSaving(true);
    setStatus(null);
    try {
      if (id) {
        await setDoc(doc(db, coll, id), { ...data, updatedAt: serverTimestamp() }, { merge: true });
      } else {
        await addDoc(collection(db, coll), { ...data, createdAt: serverTimestamp() });
      }
      setStatus({ type: 'success', msg: 'Saved successfully' });
      setIsEditing(null);
      setFormData({});
    } catch (err: any) {
      console.error('Save Item Error:', err?.message || String(err));
      setStatus({ type: 'error', msg: `Save failed: ${err?.message || 'Check connection'}` });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-beige pt-32">
      {/* Admin Sidebar/Topnav */}
      <div className="bg-brand-secondary text-white p-6 shadow-xl sticky top-24 lg:top-32 z-40 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center">
            <Database size={20} />
          </div>
          <h1 className="text-xl font-serif font-bold tracking-tight">Richkiss CMS</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:block text-right">
            <p className="text-xs font-bold font-sans uppercase tracking-widest text-brand-primary">Control Panel</p>
            <p className="text-sm text-gray-300">Administrator</p>
          </div>
          <button onClick={logout} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Tabs */}
        <aside className="lg:col-span-3 space-y-4">
          {[
            { id: 'settings', label: 'Site Settings', icon: Settings },
            { id: 'categories', label: 'Categories', icon: Layout },
            { id: 'books', label: 'Book Catalogue', icon: Book },
            { id: 'events', label: 'Events & Gallery', icon: Calendar },
            { id: 'partners', label: 'Partners Logos', icon: Users },
            { id: 'whyRichkiss', label: 'Why Richkiss', icon: CheckCircle2 },
            { id: 'jobs', label: 'Job Openings', icon: Briefcase },
            { id: 'printWorks', label: 'Print Works', icon: ImageIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all font-sans font-bold text-sm uppercase tracking-widest ${activeTab === tab.id ? 'bg-brand-secondary text-white shadow-xl scale-105' : 'bg-white text-gray-500 hover:bg-brand-beige/50'}`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}

          <div className="pt-8 mt-8 border-t border-gray-200">
             <button 
                onClick={handleSeed}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-brand-primary/30 text-brand-primary rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all"
             >
               <Database size={14} />
               <span>Seed Initial Data</span>
             </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9 space-y-8">
          {status && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl flex items-center space-x-3 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}
            >
              {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <span className="text-sm font-bold">{status.msg}</span>
              <button className="ml-auto" onClick={() => setStatus(null)}><X size={16} /></button>
            </motion.div>
          )}

          <div className="bg-white rounded-[40px] shadow-xl p-8 lg:p-12 min-h-[600px] border border-gray-100">
            {/* Tab: Settings */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-serif text-brand-secondary">Global Settings</h2>
                  <button 
                    onClick={() => { 
                      setIsEditing('settings'); 
                      // Ensure we only have plain data in the form
                      setFormData({ ...settings }); 
                    }}
                    className="flex items-center space-x-2 px-6 py-3 bg-brand-primary text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    <Edit2 size={14} />
                    <span>Edit Settings</span>
                  </button>
                </div>

                {isEditing === 'settings' ? (
                  <form onSubmit={handleUpdateSettings} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-4 md:col-span-2">
                        <ImageUpload 
                          onUploadComplete={(url) => setFormData(prev => ({ ...prev, logoUrl: url }))}
                          folder="logos"
                          label="Main Logo (Header)"
                        />
                        {formData.logoUrl && (
                          <div className="relative group/img">
                            <div className="flex items-center space-x-4 p-4 bg-brand-beige/30 rounded-2xl border border-brand-primary/10">
                              <div className="w-16 h-16 bg-white rounded-xl overflow-hidden flex items-center justify-center p-2 border border-gray-100 shadow-sm transition-all">
                                 <img src={formData.logoUrl} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                              </div>
                              <div className="flex-grow">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">LOGO UPDATED</p>
                              </div>
                            </div>
                            <button 
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, logoUrl: '' }))}
                              className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        )}
                        
                        <div className="pt-4 mt-4 border-t border-gray-100">
                          <ImageUpload 
                            onUploadComplete={(url) => setFormData(prev => ({ ...prev, footerLogoUrl: url }))}
                            folder="logos"
                            label="Footer Logo (Optional)"
                          />
                          {formData.footerLogoUrl && (
                            <div className="relative group/img">
                              <div className="flex items-center space-x-4 p-4 bg-brand-secondary/10 rounded-2xl border border-brand-secondary/20">
                                <div className="w-16 h-16 bg-brand-secondary rounded-xl overflow-hidden flex items-center justify-center p-2 border border-gray-100 shadow-sm transition-all">
                                   <img src={formData.footerLogoUrl} alt="Footer Logo Preview" className="max-w-full max-h-full object-contain" />
                                </div>
                                <div className="flex-grow text-brand-secondary">
                                  <p className="text-[10px] font-bold uppercase tracking-widest">FOOTER LOGO UPDATED</p>
                                </div>
                              </div>
                              <button 
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, footerLogoUrl: '' }))}
                                className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          )}
                        </div>

                         <div className="pt-8 mt-8 border-t border-gray-100">
                           <h3 className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-6">Page-Specific Hero & Section Images</h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="space-y-4">
                                <ImageUpload 
                                  onUploadComplete={(url) => setFormData(prev => ({ ...prev, aboutHeritageImageUrl: url }))}
                                  folder="site"
                                  label="About Page: Heritage Section Image"
                                />
                                 {formData.aboutHeritageImageUrl && (
                                   <div className="relative group/img">
                                     <div className="aspect-video w-full rounded-xl overflow-hidden border">
                                       <img src={formData.aboutHeritageImageUrl} alt="Heritage" className="w-full h-full object-cover" />
                                     </div>
                                     <button 
                                       type="button"
                                       onClick={() => setFormData(prev => ({ ...prev, aboutHeritageImageUrl: '' }))}
                                       className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                     >
                                       <X size={12} />
                                     </button>
                                   </div>
                                 )}
                             </div>
                             <div className="space-y-4">
                                <ImageUpload 
                                  onUploadComplete={(url) => setFormData(prev => ({ ...prev, aboutStoryImageUrl: url }))}
                                  folder="site"
                                  label="About Page: Our Story Image"
                                />
                                 {formData.aboutStoryImageUrl && (
                                   <div className="relative group/img">
                                     <div className="aspect-video w-full rounded-xl overflow-hidden border">
                                       <img src={formData.aboutStoryImageUrl} alt="Our Story" className="w-full h-full object-cover" />
                                     </div>
                                     <button 
                                       type="button"
                                       onClick={() => setFormData(prev => ({ ...prev, aboutStoryImageUrl: '' }))}
                                       className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                     >
                                       <X size={12} />
                                     </button>
                                   </div>
                                 )}
                             </div>
                             <div className="space-y-4">
                                <ImageUpload 
                                  onUploadComplete={(url) => setFormData(prev => ({ ...prev, visionImageUrl: url }))}
                                  folder="site"
                                  label="Home Vision Section Image"
                                />
                                 {formData.visionImageUrl && (
                                   <div className="relative group/img">
                                     <div className="aspect-video w-full rounded-xl overflow-hidden border">
                                       <img src={formData.visionImageUrl} alt="Vision" className="w-full h-full object-cover" />
                                     </div>
                                     <button 
                                       type="button"
                                       onClick={() => setFormData(prev => ({ ...prev, visionImageUrl: '' }))}
                                       className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                     >
                                       <X size={12} />
                                     </button>
                                   </div>
                                 )}
                             </div>
                             <div className="space-y-4">
                                <ImageUpload 
                                  onUploadComplete={(url) => setFormData(prev => ({ ...prev, careersHeroImageUrl: url }))}
                                  folder="headers"
                                  label="Careers Page Hero Image"
                                />
                                 {formData.careersHeroImageUrl && (
                                   <div className="relative group/img">
                                     <div className="aspect-video w-full rounded-xl overflow-hidden border">
                                       <img src={formData.careersHeroImageUrl} alt="Careers" className="w-full h-full object-cover" />
                                     </div>
                                     <button 
                                       type="button"
                                       onClick={() => setFormData(prev => ({ ...prev, careersHeroImageUrl: '' }))}
                                       className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                     >
                                       <X size={12} />
                                     </button>
                                   </div>
                                 )}
                             </div>
                             <div className="space-y-4">
                                <ImageUpload 
                                  onUploadComplete={(url) => setFormData(prev => ({ ...prev, clientsHeroImageUrl: url }))}
                                  folder="headers"
                                  label="Clients Page Hero Image"
                                />
                                 {formData.clientsHeroImageUrl && (
                                   <div className="relative group/img">
                                     <div className="aspect-video w-full rounded-xl overflow-hidden border">
                                       <img src={formData.clientsHeroImageUrl} alt="Clients" className="w-full h-full object-cover" />
                                     </div>
                                     <button 
                                       type="button"
                                       onClick={() => setFormData(prev => ({ ...prev, clientsHeroImageUrl: '' }))}
                                       className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                     >
                                       <X size={12} />
                                     </button>
                                   </div>
                                 )}
                             </div>
                             <div className="space-y-4">
                                <ImageUpload 
                                  onUploadComplete={(url) => setFormData(prev => ({ ...prev, printHeroImageUrl: url }))}
                                  folder="headers"
                                  label="Print & Branding Hero Image"
                                />
                                 {formData.printHeroImageUrl && (
                                   <div className="relative group/img">
                                     <div className="aspect-video w-full rounded-xl overflow-hidden border">
                                       <img src={formData.printHeroImageUrl} alt="Print Hero" className="w-full h-full object-cover" />
                                     </div>
                                     <button 
                                       type="button"
                                       onClick={() => setFormData(prev => ({ ...prev, printHeroImageUrl: '' }))}
                                       className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                     >
                                       <X size={12} />
                                     </button>
                                   </div>
                                 )}
                             </div>
                             <div className="space-y-4">
                                <ImageUpload 
                                  onUploadComplete={(url) => setFormData(prev => ({ ...prev, printAboutImageUrl: url }))}
                                  folder="site"
                                  label="Print & Branding About Image"
                                />
                                 {formData.printAboutImageUrl && (
                                   <div className="relative group/img">
                                     <div className="aspect-video w-full rounded-xl overflow-hidden border">
                                       <img src={formData.printAboutImageUrl} alt="Print About" className="w-full h-full object-cover" />
                                     </div>
                                     <button 
                                       type="button"
                                       onClick={() => setFormData(prev => ({ ...prev, printAboutImageUrl: '' }))}
                                       className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                     >
                                       <X size={12} />
                                     </button>
                                   </div>
                                 )}
                             </div>
                             <div className="space-y-4">
                                <ImageUpload 
                                  onUploadComplete={(url) => setFormData(prev => ({ ...prev, careersWhyRichkissImageUrl: url }))}
                                  folder="site"
                                  label="Careers Page: Why Richkiss? Image"
                                />
                                 {formData.careersWhyRichkissImageUrl && (
                                   <div className="relative group/img">
                                     <div className="aspect-video w-full rounded-xl overflow-hidden border">
                                       <img src={formData.careersWhyRichkissImageUrl} alt="Why Richkiss" className="w-full h-full object-cover" />
                                     </div>
                                     <button 
                                       type="button"
                                       onClick={() => setFormData(prev => ({ ...prev, careersWhyRichkissImageUrl: '' }))}
                                       className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                     >
                                       <X size={12} />
                                     </button>
                                   </div>
                                 )}
                             </div>
                           </div>
                         </div>

                         <div className="pt-8 mt-8 border-t border-gray-100">
                           <h3 className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-6">Home Feature Cards</h3>
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                             <div className="space-y-4">
                                <ImageUpload 
                                  onUploadComplete={(url) => setFormData(prev => ({ ...prev, featureCard1Url: url }))}
                                  folder="site"
                                  label="Card 1: New Arrivals"
                                />
                                 {formData.featureCard1Url && (
                                   <div className="relative group/img">
                                     <div className="aspect-video w-full rounded-xl overflow-hidden border">
                                       <img src={formData.featureCard1Url} alt="Feature 1" className="w-full h-full object-cover" />
                                     </div>
                                     <button 
                                       type="button"
                                       onClick={() => setFormData(prev => ({ ...prev, featureCard1Url: '' }))}
                                       className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                     >
                                       <X size={12} />
                                     </button>
                                   </div>
                                 )}
                             </div>
                             <div className="space-y-4">
                                <ImageUpload 
                                  onUploadComplete={(url) => setFormData(prev => ({ ...prev, featureCard2Url: url }))}
                                  folder="site"
                                  label="Card 2: Featured Works"
                                />
                                 {formData.featureCard2Url && (
                                   <div className="relative group/img">
                                     <div className="aspect-video w-full rounded-xl overflow-hidden border">
                                       <img src={formData.featureCard2Url} alt="Feature 2" className="w-full h-full object-cover" />
                                     </div>
                                     <button 
                                       type="button"
                                       onClick={() => setFormData(prev => ({ ...prev, featureCard2Url: '' }))}
                                       className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                     >
                                       <X size={12} />
                                     </button>
                                   </div>
                                 )}
                             </div>
                             <div className="space-y-4">
                                <ImageUpload 
                                  onUploadComplete={(url) => setFormData(prev => ({ ...prev, featureCard3Url: url }))}
                                  folder="site"
                                  label="Card 3: Global Editions"
                                />
                                 {formData.featureCard3Url && (
                                   <div className="relative group/img">
                                     <div className="aspect-video w-full rounded-xl overflow-hidden border">
                                       <img src={formData.featureCard3Url} alt="Feature 3" className="w-full h-full object-cover" />
                                     </div>
                                     <button 
                                       type="button"
                                       onClick={() => setFormData(prev => ({ ...prev, featureCard3Url: '' }))}
                                       className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                     >
                                       <X size={12} />
                                     </button>
                                   </div>
                                 )}
                             </div>
                           </div>
                         </div>

                        <div className="pt-4 mt-4 border-t border-gray-100 flex flex-col md:flex-row gap-6">
                           <div className="flex-grow space-y-4">
                              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Promo Banner Title</label>
                              <input 
                                type="text" 
                                value={formData.promoBannerTitle} 
                                onChange={e => setFormData({ ...formData, promoBannerTitle: e.target.value })}
                                className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary"
                                placeholder="e.g. Our Story Continues."
                              />
                           </div>
                           <div className="flex-grow space-y-4">
                              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Promo Banner Subtext</label>
                              <input 
                                type="text" 
                                value={formData.promoBannerText} 
                                onChange={e => setFormData({ ...formData, promoBannerText: e.target.value })}
                                className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary"
                                placeholder="e.g. Join our literary community..."
                              />
                           </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-gray-100 space-y-4">
                           <div className="flex justify-between items-center">
                             <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Homepage Hero Slider (Up to 5)</label>
                             <span className="text-[10px] font-bold text-brand-primary">{formData.heroImages?.length || 0}/5</span>
                           </div>
                           
                           {(!formData.heroImages || formData.heroImages.length < 5) && (
                             <ImageUpload 
                               onUploadComplete={(url) => setFormData(prev => ({ ...prev, heroImages: [...(prev.heroImages || []), url] }))}
                               folder="hero"
                               label="Add Hero Image"
                             />
                           )}

                           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                             {formData.heroImages?.map((img: string, i: number) => (
                               <div key={i} className="relative aspect-[3/4] bg-gray-200 rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
                                  <img src={img} alt={`Hero ${i+1}`} className="w-full h-full object-cover" />
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      const newImages = formData.heroImages.filter((_: any, idx: number) => idx !== i);
                                      setFormData({ ...formData, heroImages: newImages });
                                    }}
                                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-[8px] font-bold rounded uppercase">
                                    Slide {i + 1}
                                  </div>
                               </div>
                             ))}
                           </div>
                        </div>
                     </div>
                    <div className="space-y-4">
                       <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Company Name</label>
                       <input 
                         type="text" 
                         value={formData.companyName} 
                         onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                         className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary"
                       />
                    </div>
                    <div className="space-y-4">
                       <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Tagline</label>
                       <input 
                         type="text" 
                         value={formData.tagline} 
                         onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                         className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary"
                       />
                    </div>
                    <div className="space-y-4 md:col-span-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">About Text</label>
                       <textarea 
                         rows={4}
                         value={formData.aboutText} 
                         onChange={e => setFormData({ ...formData, aboutText: e.target.value })}
                         className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary"
                       />
                    </div>
                    <div className="flex space-x-4 md:col-span-2 pt-4">
                       <button 
                         type="submit" 
                         disabled={isSaving}
                         className={`flex-grow flex items-center justify-center space-x-2 py-4 rounded-full font-bold transition-all ${isSaving ? 'bg-brand-secondary/50 cursor-not-allowed' : 'bg-brand-secondary text-white hover:bg-brand-primary shadow-xl hover:-translate-y-1'}`}
                       >
                         {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                         <span>{isSaving ? 'Saving Changes...' : 'Save Changes'}</span>
                       </button>
                       <button type="button" onClick={() => setIsEditing(null)} disabled={isSaving} className="px-8 py-4 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-colors">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Main Logo</h4>
                          <div className="w-full aspect-video bg-brand-beige rounded-3xl overflow-hidden flex items-center justify-center p-8 border border-gray-100">
                             {settings.logoUrl ? (
                               <img src={settings.logoUrl} alt="Main Logo" className="max-w-full max-h-full object-contain" />
                             ) : (
                               <div className="text-brand-muted"><BookOpen size={48} /></div>
                             )}
                          </div>
                       </div>
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Footer Logo</h4>
                          <div className="w-full aspect-video bg-brand-secondary rounded-3xl overflow-hidden flex items-center justify-center p-8 border border-white/10">
                             {settings.footerLogoUrl ? (
                               <img src={settings.footerLogoUrl} alt="Footer Logo" className="max-w-full max-h-full object-contain" />
                             ) : (
                               <img src={settings.logoUrl} alt="Logo Fallback" className="max-w-full max-h-full object-contain opacity-50 grayscale" />
                             )}
                          </div>
                       </div>
                       <div className="space-y-4 md:col-span-2">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Active Hero Slider</h4>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                             {settings.heroImages && settings.heroImages.length > 0 ? settings.heroImages.map((img: string, i: number) => (
                               <div key={i} className="aspect-[3/4] bg-brand-beige rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                                  <img src={img} alt={`Slide ${i+1}`} className="w-full h-full object-cover" />
                               </div>
                             )) : (
                               <div className="col-span-full aspect-[21/9] bg-brand-beige rounded-[32px] overflow-hidden border border-gray-100 flex flex-col items-center justify-center text-brand-muted opacity-50 space-y-2">
                                  <ImageIcon size={48} />
                                  <p className="text-xs uppercase tracking-widest font-bold">No custom hero images set</p>
                                </div>
                              )}
                           </div>
                        </div>

                        <div className="space-y-4 md:col-span-2">
                           <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Homepage Feature Cards</h4>
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             <div className="space-y-2">
                               <p className="text-[9px] font-bold text-brand-muted uppercase">New Arrivals</p>
                               <div className="aspect-video bg-brand-beige rounded-2xl overflow-hidden border border-gray-100">
                                 {settings.featureCard1Url ? (
                                   <img src={settings.featureCard1Url} alt="Feature 1" className="w-full h-full object-cover" />
                                 ) : (
                                   <div className="w-full h-full flex items-center justify-center text-brand-muted opacity-30"><ImageIcon size={32} /></div>
                                 )}
                               </div>
                             </div>
                             <div className="space-y-2">
                               <p className="text-[9px] font-bold text-brand-muted uppercase">Featured Works</p>
                               <div className="aspect-video bg-brand-beige rounded-2xl overflow-hidden border border-gray-100">
                                 {settings.featureCard2Url ? (
                                   <img src={settings.featureCard2Url} alt="Feature 2" className="w-full h-full object-cover" />
                                 ) : (
                                   <div className="w-full h-full flex items-center justify-center text-brand-muted opacity-30"><ImageIcon size={32} /></div>
                                 )}
                               </div>
                             </div>
                             <div className="space-y-2">
                               <p className="text-[9px] font-bold text-brand-muted uppercase">Global Editions</p>
                               <div className="aspect-video bg-brand-beige rounded-2xl overflow-hidden border border-gray-100">
                                 {settings.featureCard3Url ? (
                                   <img src={settings.featureCard3Url} alt="Feature 3" className="w-full h-full object-cover" />
                                 ) : (
                                   <div className="w-full h-full flex items-center justify-center text-brand-muted opacity-30"><ImageIcon size={32} /></div>
                                 )}
                               </div>
                             </div>
                           </div>
                        </div>

                        <div className="space-y-4 md:col-span-2">
                           <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Page-Specific & About Section Assets</h4>
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                             <div className="space-y-2">
                               <p className="text-[9px] font-bold text-brand-muted uppercase">About: Heritage Section</p>
                               <div className="aspect-video bg-brand-beige rounded-2xl overflow-hidden border border-gray-100">
                                 {settings.aboutHeritageImageUrl ? (
                                   <img src={settings.aboutHeritageImageUrl} alt="About Heritage" className="w-full h-full object-cover" />
                                 ) : (
                                   <div className="w-full h-full flex items-center justify-center text-brand-muted opacity-30"><ImageIcon size={32} /></div>
                                 )}
                               </div>
                             </div>
                             <div className="space-y-2">
                               <p className="text-[9px] font-bold text-brand-muted uppercase">About: Our Story</p>
                               <div className="aspect-video bg-brand-beige rounded-2xl overflow-hidden border border-gray-100">
                                 {settings.aboutStoryImageUrl ? (
                                   <img src={settings.aboutStoryImageUrl} alt="About Story" className="w-full h-full object-cover" />
                                 ) : (
                                   <div className="w-full h-full flex items-center justify-center text-brand-muted opacity-30"><ImageIcon size={32} /></div>
                                 )}
                               </div>
                             </div>
                             <div className="space-y-2">
                               <p className="text-[9px] font-bold text-brand-muted uppercase">Print Hero</p>
                               <div className="aspect-video bg-brand-beige rounded-2xl overflow-hidden border border-gray-100">
                                 {settings.printHeroImageUrl ? (
                                   <img src={settings.printHeroImageUrl} alt="Print Hero" className="w-full h-full object-cover" />
                                 ) : (
                                   <div className="w-full h-full flex items-center justify-center text-brand-muted opacity-30"><ImageIcon size={32} /></div>
                                 )}
                               </div>
                             </div>
                             <div className="space-y-2">
                               <p className="text-[9px] font-bold text-brand-muted uppercase">Print About</p>
                               <div className="aspect-video bg-brand-beige rounded-2xl overflow-hidden border border-gray-100">
                                 {settings.printAboutImageUrl ? (
                                   <img src={settings.printAboutImageUrl} alt="Print About" className="w-full h-full object-cover" />
                                 ) : (
                                   <div className="w-full h-full flex items-center justify-center text-brand-muted opacity-30"><ImageIcon size={32} /></div>
                                 )}
                               </div>
                             </div>
                             <div className="space-y-2">
                               <p className="text-[9px] font-bold text-brand-muted uppercase">Careers Hero</p>
                               <div className="aspect-video bg-brand-beige rounded-2xl overflow-hidden border border-gray-100">
                                 {settings.careersHeroImageUrl ? (
                                   <img src={settings.careersHeroImageUrl} alt="Careers Hero" className="w-full h-full object-cover" />
                                 ) : (
                                   <div className="w-full h-full flex items-center justify-center text-brand-muted opacity-30"><ImageIcon size={32} /></div>
                                 )}
                               </div>
                             </div>
                             <div className="space-y-2">
                               <p className="text-[9px] font-bold text-brand-muted uppercase">Careers Why Us</p>
                               <div className="aspect-video bg-brand-beige rounded-2xl overflow-hidden border border-gray-100">
                                 {settings.careersWhyRichkissImageUrl ? (
                                   <img src={settings.careersWhyRichkissImageUrl} alt="Careers Why Us" className="w-full h-full object-cover" />
                                 ) : (
                                   <div className="w-full h-full flex items-center justify-center text-brand-muted opacity-30"><ImageIcon size={32} /></div>
                                 )}
                               </div>
                             </div>
                           </div>
                        </div>
                     </div>
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                       <h3 className="text-2xl font-serif text-brand-secondary">{settings.companyName}</h3>
                       <p className="text-brand-primary font-bold text-sm tracking-wide">{settings.tagline}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-muted">About Us Preview</h4>
                          <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">{settings.aboutText}</p>
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-muted">Contact Info</h4>
                          <p className="text-sm font-sans text-brand-secondary">{settings.contactEmail}</p>
                          <p className="text-sm font-sans text-brand-secondary">{settings.phoneNumbers?.join(', ')}</p>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Categories */}
            {activeTab === 'categories' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-serif text-brand-secondary">Categories</h2>
                  <button 
                    onClick={() => { setIsEditing('new-category'); setFormData({}); }}
                    className="flex items-center space-x-2 px-6 py-3 bg-brand-primary text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    <Plus size={14} />
                    <span>New Category</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((cat: any) => (
                    <div key={cat.id} className="p-6 bg-brand-beige/30 rounded-3xl border border-gray-100 flex items-center justify-between group">
                       <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-200">
                             {cat.imageUrl ? (
                               <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
                             ) : (
                               <div className="w-full h-full flex items-center justify-center text-brand-muted"><Layout size={20} /></div>
                             )}
                          </div>
                          <div className="space-y-1">
                             <h3 className="font-serif font-bold text-lg text-brand-secondary">{cat.name}</h3>
                             <p className="text-xs text-brand-muted uppercase tracking-widest">{cat.slug}</p>
                          </div>
                       </div>
                       <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => { setIsEditing(cat.id); setFormData({ ...cat }); }}
                            className="p-2 bg-white rounded-lg text-brand-secondary hover:text-brand-primary"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete('categories', cat.id)}
                            className="p-2 bg-white rounded-lg text-brand-secondary hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                       </div>
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {(isEditing === 'new-category' || categories.some(c => c.id === isEditing)) && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[60] bg-brand-secondary/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                      <motion.div 
                        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                        className="bg-white p-10 rounded-[40px] shadow-2xl max-w-lg w-full space-y-8"
                      >
                        <h3 className="text-2xl font-serif text-brand-secondary">{isEditing === 'new-category' ? 'New Category' : 'Edit Category'}</h3>
                        <div className="space-y-4">
                           <ImageUpload 
                             onUploadComplete={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                             folder="categories"
                             label="Category Icon/Image"
                           />
                           {formData.imageUrl && (
                             <div className="relative group/img w-16 h-16">
                               <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-primary shadow-lg">
                                 <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                               </div>
                               <button 
                                 type="button"
                                 onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                                 className="absolute -top-1 -right-1 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                               >
                                 <X size={10} />
                               </button>
                             </div>
                           )}
                           <input 
                             placeholder="Name"
                             className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                             value={formData.name}
                             onChange={e => setFormData({ ...formData, name: e.target.value })}
                           />
                           <input 
                             placeholder="Slug"
                             className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                             value={formData.slug}
                             onChange={e => setFormData({ ...formData, slug: e.target.value })}
                           />
                           <textarea 
                             placeholder="Description"
                             className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                             rows={3}
                             value={formData.description}
                             onChange={e => setFormData({ ...formData, description: e.target.value })}
                           />
                        </div>
                        <div className="flex space-x-4">
                           <button 
                             onClick={() => handleSaveItem('categories', formData, isEditing === 'new-category' ? formData.slug : isEditing)}
                             className="flex-grow py-4 bg-brand-secondary text-white rounded-full font-bold shadow-lg"
                           >
                             Save Category
                           </button>
                           <button onClick={() => setIsEditing(null)} className="px-8 py-4 border border-gray-200 rounded-full font-bold">Cancel</button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Tab: Books */}
            {activeTab === 'books' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-serif text-brand-secondary">Book Collection</h2>
                  <button 
                    onClick={() => { setIsEditing('new-book'); setFormData({ author: "NANA MANUKURE KISSIEDU", categorySlug: categories[0]?.slug }); }}
                    className="flex items-center space-x-2 px-6 py-3 bg-brand-primary text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    <Plus size={14} />
                    <span>Add New Book</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {books.map((book: any) => (
                    <div key={book.id} className="p-4 bg-brand-beige/30 rounded-3xl border border-gray-100 space-y-4 group">
                       <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200">
                          {book.coverUrl ? (
                            <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100"><Book size={48} /></div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                             <button onClick={() => { setIsEditing(book.id); setFormData({ ...book }); }} className="p-3 bg-white rounded-xl text-brand-secondary hover:text-brand-primary transition-all scale-90 group-hover:scale-100">
                                <Edit2 size={18} />
                             </button>
                             <button onClick={() => handleDelete('books', book.id)} className="p-3 bg-white rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all scale-90 group-hover:scale-100">
                                <Trash2 size={18} />
                             </button>
                          </div>
                       </div>
                       <div className="space-y-1">
                          <h3 className="font-bold font-serif text-brand-secondary line-clamp-1">{book.title}</h3>
                          <p className="text-xs text-brand-primary font-bold uppercase tracking-widest">{book.author}</p>
                          <div className="flex justify-between items-center pt-2">
                             <span className="text-xs font-bold px-2 py-1 bg-brand-primary/10 text-brand-primary rounded-full uppercase">{book.categorySlug}</span>
                             <span className="text-sm font-bold text-brand-secondary">{book.price}</span>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {(isEditing === 'new-book' || books.some(b => b.id === isEditing)) && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[60] bg-brand-secondary/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                      <motion.div 
                        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                        className="bg-white p-10 rounded-[40px] shadow-2xl max-w-2xl w-full space-y-8 max-h-[90vh] overflow-y-auto"
                      >
                        <h3 className="text-2xl font-serif text-brand-secondary">{isEditing === 'new-book' ? 'Add New Book' : 'Edit Book'}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-4 md:col-span-2">
                              <ImageUpload 
                                onUploadComplete={(url) => setFormData(prev => ({ ...prev, coverUrl: url }))}
                                folder="book-covers"
                                label="Book Cover Image"
                              />
                              {formData.coverUrl && (
                                <div className="relative group/img w-24">
                                  <div className="aspect-[3/4] w-24 rounded-xl overflow-hidden border-2 border-brand-primary/20 shadow-lg">
                                    <img src={formData.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                                  </div>
                                  <button 
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, coverUrl: '' }))}
                                    className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                  >
                                    <X size={12} />
                                  </button>
                                </div>
                              )}
                           </div>
                           <div className="space-y-4">
                              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Title</label>
                              <input 
                                className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                                value={formData.title || ''}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                              />
                           </div>
                           <div className="space-y-4">
                              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Author</label>
                              <input 
                                className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                                value={formData.author}
                                onChange={e => setFormData({ ...formData, author: e.target.value })}
                              />
                           </div>
                           <div className="space-y-4">
                              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Price</label>
                              <input 
                                className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                                placeholder="GH₵ 0.00"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                              />
                           </div>
                           <div className="space-y-4">
                              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Year of Publication</label>
                              <input 
                                className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                                placeholder="e.g. 2024"
                                value={formData.year}
                                onChange={e => setFormData({ ...formData, year: e.target.value })}
                              />
                           </div>
                           <div className="space-y-4">
                              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">ISBN</label>
                              <input 
                                className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                                placeholder="e.g. 978-..."
                                value={formData.isbn}
                                onChange={e => setFormData({ ...formData, isbn: e.target.value })}
                              />
                           </div>
                           <div className="space-y-4">
                              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Dimensions</label>
                              <input 
                                className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                                placeholder="e.g. 8.5 x 8.8 INCHES"
                                value={formData.dimensions}
                                onChange={e => setFormData({ ...formData, dimensions: e.target.value })}
                              />
                           </div>
                           <div className="space-y-4">
                              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Binding & Pages</label>
                              <input 
                                className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                                placeholder="e.g. PAPERBACK / 42 PAGES"
                                value={formData.bindingPages}
                                onChange={e => setFormData({ ...formData, bindingPages: e.target.value })}
                              />
                           </div>
                           <div className="space-y-4 md:col-span-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Synopsis / Blurb</label>
                              <textarea 
                                rows={4}
                                className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                                placeholder="Enter book description..."
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                              />
                           </div>
                           <div className="space-y-4">
                              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Category</label>
                              <select 
                                className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none appearance-none"
                                value={formData.categorySlug}
                                onChange={e => setFormData({ ...formData, categorySlug: e.target.value })}
                              >
                                {categories.map((c: any) => (
                                  <option key={c.id} value={c.slug}>{c.name}</option>
                                ))}
                              </select>
                           </div>
                           <div className="md:col-span-2 flex space-x-6 pt-2">
                              <label className="flex items-center space-x-3 cursor-pointer group/check">
                                 <input 
                                   type="checkbox" 
                                   checked={formData.isNew || false} 
                                   onChange={e => setFormData({ ...formData, isNew: e.target.checked })}
                                   className="w-5 h-5 rounded flex-shrink-0 accent-brand-primary"
                                 />
                                 <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary group-hover/check:text-brand-primary transition-colors">New Arrival</span>
                              </label>
                              <label className="flex items-center space-x-3 cursor-pointer group/check">
                                 <input 
                                   type="checkbox" 
                                   checked={formData.featured || false} 
                                   onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                                   className="w-5 h-5 rounded flex-shrink-0 accent-brand-primary"
                                 />
                                 <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary group-hover/check:text-brand-primary transition-colors">Featured</span>
                               </label>
                           </div>
                        </div>
                        <div className="flex space-x-4 pt-4">
                           <button 
                             onClick={() => handleSaveItem('books', formData, isEditing === 'new-book' ? undefined : isEditing as string)}
                             disabled={isSaving}
                             className={`flex-grow py-4 rounded-full font-bold shadow-lg flex items-center justify-center space-x-2 transition-all ${isSaving ? 'bg-brand-secondary/50 cursor-not-allowed' : 'bg-brand-secondary text-white hover:bg-brand-primary'}`}
                           >
                             {isSaving ? <Loader2 className="animate-spin" size={18} /> : null}
                             <span>{isSaving ? 'Saving Book...' : 'Save Book'}</span>
                           </button>
                           <button onClick={() => setIsEditing(null)} disabled={isSaving} className="px-8 py-4 border border-gray-200 rounded-full font-bold">Cancel</button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Tab: Events */}
            {activeTab === 'events' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-serif text-brand-secondary">Events Management</h2>
                  <button 
                    onClick={() => { setIsEditing('new-event'); setFormData({ gallery: [] }); }}
                    className="flex items-center space-x-2 px-6 py-3 bg-brand-primary text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    <Plus size={14} />
                    <span>New Event</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {events.map((event: any) => (
                    <div key={event.id} className="p-8 bg-brand-beige/30 rounded-[40px] border border-gray-100 flex flex-col md:flex-row gap-10 group">
                       <div className="flex-grow space-y-4">
                          <div className="flex items-center justify-between">
                             <h3 className="text-2xl font-serif text-brand-secondary">{event.name}</h3>
                             <span className="px-4 py-1 bg-brand-primary text-white text-[10px] font-bold rounded-full uppercase tracking-widest">{event.year}</span>
                          </div>
                          <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">{event.description}</p>
                          <div className="flex flex-wrap gap-2 pt-4">
                             {event.gallery?.map((img: string, i: number) => (
                               img ? (
                                 <div key={i} className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-gray-100">
                                    <img src={img} alt="gallery" className="w-full h-full object-cover" />
                                 </div>
                               ) : null
                             ))}
                          </div>
                       </div>
                       <div className="flex md:flex-col justify-end space-x-2 md:space-x-0 md:space-y-2">
                          <button 
                             onClick={() => { setIsEditing(event.id); setFormData({ ...event }); }}
                             className="flex-grow md:flex-grow-0 p-4 bg-white rounded-2xl text-brand-secondary hover:text-brand-primary shadow-sm"
                          >
                             <Edit2 size={20} />
                          </button>
                          <button 
                             onClick={() => handleDelete('events', event.id)}
                             className="flex-grow md:flex-grow-0 p-4 bg-white rounded-2xl text-red-500 hover:bg-red-500 hover:text-white shadow-sm"
                          >
                             <Trash2 size={20} />
                          </button>
                       </div>
                    </div>
                  ))}
                </div>

                {/* Event Form Modal */}
                <AnimatePresence>
                  {(isEditing === 'new-event' || events.some(e => e.id === isEditing)) && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[60] bg-brand-secondary/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                      <motion.div 
                        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                        className="bg-white p-10 rounded-[40px] shadow-2xl max-w-3xl w-full space-y-8 max-h-[90vh] overflow-y-auto"
                      >
                        <h3 className="text-2xl font-serif text-brand-secondary">{isEditing === 'new-event' ? 'New Event' : 'Edit Event'}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-4 md:col-span-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Event Name</label>
                              <input 
                                className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                              />
                           </div>
                           <div className="space-y-4">
                              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Location</label>
                              <input 
                                className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                              />
                           </div>
                           <div className="space-y-4">
                              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Year</label>
                              <input 
                                className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                                value={formData.year}
                                onChange={e => setFormData({ ...formData, year: e.target.value })}
                              />
                           </div>
                           <div className="space-y-4 md:col-span-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Description</label>
                              <textarea 
                                rows={3}
                                className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                              />
                           </div>
                           <div className="space-y-4 md:col-span-2">
                              <div className="flex justify-between items-center">
                                <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Event Gallery</label>
                              </div>
                              
                              <ImageUpload 
                                onUploadComplete={(url) => setFormData(prev => ({ ...prev, gallery: [...(prev.gallery || []), url] }))}
                                folder="event-gallery"
                                label=""
                              />

                              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-4">
                                {formData.gallery?.map((img: string, i: number) => (
                                  img ? (
                                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden group/img">
                                       <img src={img} alt="gallery" className="w-full h-full object-cover" />
                                       <button 
                                         onClick={() => {
                                           const newGallery = formData.gallery.filter((_: any, idx: number) => idx !== i);
                                           setFormData({ ...formData, gallery: newGallery });
                                         }}
                                         className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity"
                                       >
                                         <X size={10} />
                                       </button>
                                    </div>
                                  ) : null
                                ))}
                              </div>
                           </div>
                        </div>
                        <div className="flex space-x-4 pt-4">
                           <button 
                             onClick={() => handleSaveItem('events', formData, isEditing === 'new-event' ? undefined : isEditing as string)}
                             disabled={isSaving}
                             className={`flex-grow py-4 rounded-full font-bold shadow-lg flex items-center justify-center space-x-2 transition-all ${isSaving ? 'bg-brand-secondary/50 cursor-not-allowed' : 'bg-brand-secondary text-white hover:bg-brand-primary'}`}
                           >
                              {isSaving ? <Loader2 className="animate-spin" size={18} /> : null}
                             <span>{isSaving ? 'Saving Event...' : 'Save Event'}</span>
                           </button>
                           <button onClick={() => setIsEditing(null)} disabled={isSaving} className="px-8 py-4 border border-gray-200 rounded-full font-bold">Cancel</button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            {activeTab === 'partners' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-serif text-brand-secondary">Partner Logos</h2>
                  <button 
                    onClick={() => { setIsEditing('new-partner'); setFormData({ order: partners.length }); }}
                    className="flex items-center space-x-2 px-6 py-3 bg-brand-primary text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    <Plus size={14} />
                    <span>Add Partner</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {partners.map((partner: any) => (
                    <div key={partner.id} className="p-4 bg-brand-beige/30 rounded-3xl border border-gray-100 flex flex-col items-center space-y-4 group">
                       <div className="w-full aspect-square bg-white rounded-2xl overflow-hidden flex items-center justify-center p-4 border border-gray-100 shadow-sm transition-all group-hover:shadow-md">
                          {partner.logoUrl ? (
                            <img src={partner.logoUrl} alt={partner.name} className="max-w-full max-h-full object-contain" />
                          ) : (
                            <div className="text-xs font-bold text-gray-300">No Logo</div>
                          )}
                       </div>
                       <div className="text-center w-full">
                          <h3 className="font-serif font-bold text-sm text-brand-secondary line-clamp-1">{partner.name}</h3>
                       </div>
                       <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setIsEditing(partner.id); setFormData({ ...partner }); }} className="p-2 bg-white rounded-lg text-brand-secondary hover:text-brand-primary shadow-sm"><Edit2 size={14} /></button>
                          <button onClick={() => handleDelete('partners', partner.id)} className="p-2 bg-white rounded-lg text-red-500 hover:bg-red-500 hover:text-white shadow-sm"><Trash2 size={14} /></button>
                       </div>
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {(isEditing === 'new-partner' || partners.some(p => p.id === isEditing)) && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[60] bg-brand-secondary/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                      <motion.div 
                        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                        className="bg-white p-10 rounded-[40px] shadow-2xl max-w-lg w-full space-y-8"
                      >
                        <h3 className="text-2xl font-serif text-brand-secondary">Partner Details</h3>
                        <div className="space-y-4">
                           <ImageUpload 
                             onUploadComplete={(url) => setFormData(prev => ({ ...prev, logoUrl: url }))}
                             folder="partners"
                             label="Partner Logo"
                           />
                           {formData.logoUrl && (
                             <div className="relative group/img w-24 h-24 mx-auto">
                               <div className="w-24 h-24 bg-white rounded-2xl overflow-hidden flex items-center justify-center p-4 border-2 border-brand-primary/20 shadow-lg">
                                 <img src={formData.logoUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
                               </div>
                               <button 
                                 type="button"
                                 onClick={() => setFormData(prev => ({ ...prev, logoUrl: '' }))}
                                 className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                               >
                                 <X size={12} />
                               </button>
                             </div>
                           )}
                           <input 
                             placeholder="Partner Name"
                             className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary"
                             value={formData.name || ''}
                             onChange={e => setFormData({ ...formData, name: e.target.value })}
                           />
                           <input 
                             type="number"
                             placeholder="Display Order"
                             className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary"
                             value={formData.order || 0}
                             onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                           />
                        </div>
                        <div className="flex space-x-4">
                           <button 
                             onClick={() => handleSaveItem('partners', formData, isEditing === 'new-partner' ? undefined : isEditing as string)}
                             className="flex-grow py-4 bg-brand-secondary text-white rounded-full font-bold shadow-lg"
                           >
                             Save Partner
                           </button>
                           <button onClick={() => setIsEditing(null)} className="px-8 py-4 border border-gray-100 rounded-full font-bold">Cancel</button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {activeTab === 'whyRichkiss' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-serif text-brand-secondary">Why Richkiss? (Careers)</h2>
                  <button 
                    onClick={() => { setIsEditing('new-why'); setFormData({ order: whyRichkiss.length }); }}
                    className="flex items-center space-x-2 px-6 py-3 bg-brand-primary text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    <Plus size={14} />
                    <span>Add New Item</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {whyRichkiss.map((item: any) => (
                    <div key={item.id} className="p-6 bg-brand-beige/30 rounded-3xl border border-gray-100 flex items-center justify-between group">
                       <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm bg-white">
                             <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="space-y-1">
                             <h3 className="font-serif font-bold text-lg text-brand-secondary">{item.title}</h3>
                             <p className="text-xs text-brand-muted line-clamp-1 max-w-xs">{item.description}</p>
                          </div>
                       </div>
                       <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setIsEditing(item.id); setFormData({ ...item }); }} className="p-2 bg-white rounded-lg text-brand-secondary hover:text-brand-primary"><Edit2 size={16} /></button>
                          <button onClick={() => handleDelete('whyRichkiss', item.id)} className="p-2 bg-white rounded-lg text-red-500 hover:bg-red-500 hover:text-white"><Trash2 size={16} /></button>
                       </div>
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {(isEditing === 'new-why' || whyRichkiss.some(i => i.id === isEditing)) && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[60] bg-brand-secondary/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                      <motion.div 
                        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                        className="bg-white p-10 rounded-[40px] shadow-2xl max-w-lg w-full space-y-8"
                      >
                        <h3 className="text-2xl font-serif text-brand-secondary">Value Proposition Item</h3>
                        <div className="space-y-4">
                           <ImageUpload 
                             onUploadComplete={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                             folder="careers"
                             label="Section Image (Card)"
                           />
                           {formData.imageUrl && (
                              <div className="relative group/img">
                                <div className="aspect-video w-full rounded-2xl overflow-hidden border">
                                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                                <button 
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                           )}
                           <input 
                             placeholder="Title (e.g., Sustainable Practices)"
                             className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                             value={formData.title || ''}
                             onChange={e => setFormData({ ...formData, title: e.target.value })}
                           />
                           <textarea 
                             placeholder="Description"
                             className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                             rows={3}
                             value={formData.description || ''}
                             onChange={e => setFormData({ ...formData, description: e.target.value })}
                           />
                           <input 
                             type="number"
                             placeholder="Display Order"
                             className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                             value={formData.order || 0}
                             onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                           />
                        </div>
                        <div className="flex space-x-4">
                           <button 
                             onClick={() => handleSaveItem('whyRichkiss', formData, isEditing === 'new-why' ? undefined : isEditing as string)}
                             className="flex-grow py-4 bg-brand-secondary text-white rounded-full font-bold shadow-lg"
                           >
                             Save Item
                           </button>
                           <button onClick={() => setIsEditing(null)} className="px-8 py-4 border border-gray-100 rounded-full font-bold">Cancel</button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {activeTab === 'jobs' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-serif text-brand-secondary">Job Openings</h2>
                  <button 
                    onClick={() => { setIsEditing('new-job'); setFormData({}); }}
                    className="flex items-center space-x-2 px-6 py-3 bg-brand-primary text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    <Plus size={14} />
                    <span>Add New Job</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobs.map((item: any) => (
                    <div key={item.id} className="p-6 bg-brand-beige/30 rounded-3xl border border-gray-100 flex items-center justify-between group">
                       <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm bg-white">
                             <img src={item.imageUrl || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=200"} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="space-y-1">
                             <h3 className="font-serif font-bold text-lg text-brand-secondary">{item.title}</h3>
                             <p className="text-[10px] text-brand-primary font-bold uppercase tracking-widest">{item.category} • {item.location}</p>
                          </div>
                       </div>
                       <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setIsEditing(item.id); setFormData({ ...item }); }} className="p-2 bg-white rounded-lg text-brand-secondary hover:text-brand-primary"><Edit2 size={16} /></button>
                          <button onClick={() => handleDelete('jobs', item.id)} className="p-2 bg-white rounded-lg text-red-500 hover:bg-red-500 hover:text-white"><Trash2 size={16} /></button>
                       </div>
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {(isEditing === 'new-job' || jobs.some(i => i.id === isEditing)) && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[60] bg-brand-secondary/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                      <motion.div 
                        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                        className="bg-white p-10 rounded-[40px] shadow-2xl max-w-lg w-full space-y-8 overflow-y-auto max-h-[90vh]"
                      >
                        <h3 className="text-2xl font-serif text-brand-secondary">Job Opening Details</h3>
                        <div className="space-y-4">
                           <ImageUpload 
                             onUploadComplete={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                             folder="careers"
                             label="Job Cover Image"
                           />
                           {formData.imageUrl && (
                              <div className="relative group/img">
                                <div className="aspect-video w-full rounded-2xl overflow-hidden border">
                                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                                <button 
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                           )}
                           <input 
                             placeholder="Title (e.g., Senior Acquisitions Editor)"
                             className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                             value={formData.title || ''}
                             onChange={e => setFormData({ ...formData, title: e.target.value })}
                           />
                           <input 
                             placeholder="Category (e.g., Editorial, Design)"
                             className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                             value={formData.category || ''}
                             onChange={e => setFormData({ ...formData, category: e.target.value })}
                           />
                           <div className="grid grid-cols-2 gap-4">
                             <input 
                               placeholder="Location (e.g., Accra, Remote)"
                               className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                               value={formData.location || ''}
                               onChange={e => setFormData({ ...formData, location: e.target.value })}
                             />
                             <input 
                               placeholder="Type (e.g., Full-Time, Hybrid)"
                               className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                               value={formData.type || ''}
                               onChange={e => setFormData({ ...formData, type: e.target.value })}
                             />
                           </div>
                           <textarea 
                             placeholder="Description"
                             className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                             rows={4}
                             value={formData.desc || ''}
                             onChange={e => setFormData({ ...formData, desc: e.target.value })}
                           />
                        </div>
                        <div className="flex space-x-4 pt-4">
                           <button 
                             onClick={() => handleSaveItem('jobs', formData, isEditing === 'new-job' ? undefined : isEditing as string)}
                             className="flex-grow py-4 bg-brand-secondary text-white rounded-full font-bold shadow-lg"
                           >
                             Save Job Opening
                           </button>
                           <button onClick={() => setIsEditing(null)} className="px-8 py-4 border border-gray-100 rounded-full font-bold">Cancel</button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {activeTab === 'printWorks' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-serif text-brand-secondary">Our Works (Print Dept)</h2>
                  <button 
                    onClick={() => { setIsEditing('new-work'); setFormData({ order: printWorks.length }); }}
                    className="flex items-center space-x-2 px-6 py-3 bg-brand-primary text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    <Plus size={14} />
                    <span>Add New Work</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {printWorks.map((work: any) => (
                    <div key={work.id} className="p-4 bg-brand-beige/30 rounded-3xl border border-gray-100 space-y-4 group">
                       <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-200">
                          <img src={work.imageUrl} alt={work.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                             <button onClick={() => { setIsEditing(work.id); setFormData({ ...work }); }} className="p-3 bg-white rounded-xl text-brand-secondary hover:text-brand-primary">
                                <Edit2 size={18} />
                             </button>
                             <button onClick={() => handleDelete('printWorks', work.id)} className="p-3 bg-white rounded-xl text-red-500">
                                <Trash2 size={18} />
                             </button>
                          </div>
                       </div>
                       <div className="px-2">
                          <h3 className="font-bold font-serif text-brand-secondary line-clamp-1">{work.title}</h3>
                          <p className="text-[10px] text-brand-primary font-bold uppercase tracking-widest">{work.category || 'General'}</p>
                       </div>
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {(isEditing === 'new-work' || printWorks.some(w => w.id === isEditing)) && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[60] bg-brand-secondary/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                      <motion.div 
                        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                        className="bg-white p-10 rounded-[40px] shadow-2xl max-w-lg w-full space-y-8"
                      >
                        <h3 className="text-2xl font-serif text-brand-secondary">Portfolio Work Item</h3>
                        <div className="space-y-4">
                           <ImageUpload 
                             onUploadComplete={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                             folder="print-works"
                             label="Work Showcase Image"
                           />
                           {formData.imageUrl && (
                              <div className="relative group/img">
                                <div className="aspect-video w-full rounded-2xl overflow-hidden border">
                                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                                <button 
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                           )}
                           <input 
                             placeholder="Title"
                             className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                             value={formData.title}
                             onChange={e => setFormData({ ...formData, title: e.target.value })}
                           />
                           <input 
                             placeholder="Category (e.g. Graphic Design)"
                             className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                             value={formData.category}
                             onChange={e => setFormData({ ...formData, category: e.target.value })}
                           />
                           <input 
                             type="number"
                             placeholder="Display Order"
                             className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                             value={formData.order}
                             onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                           />
                        </div>
                        <div className="flex space-x-4">
                           <button 
                             onClick={() => handleSaveItem('printWorks', formData, isEditing === 'new-work' ? undefined : isEditing as string)}
                             className="flex-grow py-4 bg-brand-secondary text-white rounded-full font-bold shadow-lg"
                           >
                             Save Work Item
                           </button>
                           <button onClick={() => setIsEditing(null)} className="px-8 py-4 border border-gray-100 rounded-full font-bold">Cancel</button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
