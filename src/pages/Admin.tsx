import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Book, 
  Calendar, 
  Layout, 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  LogIn, 
  LogOut, 
  Image as ImageIcon,
  Database,
  CheckCircle2,
  AlertCircle,
  Lock,
  UploadCloud
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
  const { settings, categories, books, events, loading: contentLoading } = useContent();
  const [activeTab, setActiveTab] = useState<'settings' | 'categories' | 'books' | 'events'>('settings');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

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
                className={`w-full p-5 bg-brand-beige/50 border-2 rounded-2xl outline-none transition-all ${loginError ? 'border-red-400 shake italic text-red-500' : 'border-transparent focus:bg-white focus:border-brand-primary'}`}
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
        logoUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200",
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
            author: book.author,
            price: book.price,
            coverUrl: book.cover,
            categorySlug: cat.slug,
            featured: true
          });
        }
      }

      // Seed Events
      for (const event of COMPANY_INFO.events) {
        await addDoc(collection(db, 'events'), event);
      }

      setStatus({ type: 'success', msg: 'Database seeded successfully!' });
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to seed database.' });
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'settings', 'global'), { ...formData, updatedAt: serverTimestamp() }, { merge: true });
      setStatus({ type: 'success', msg: 'Settings updated!' });
      setIsEditing(null);
    } catch (err) {
      setStatus({ type: 'error', msg: 'Update failed.' });
    }
  };

  const handleDelete = async (coll: string, id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteDoc(doc(db, coll, id));
      setStatus({ type: 'success', msg: 'Deleted successfully' });
    } catch (err) {
      setStatus({ type: 'error', msg: 'Delete failed' });
    }
  };

  const handleSaveItem = async (coll: string, data: any, id?: string) => {
    try {
      if (id) {
        await setDoc(doc(db, coll, id), data);
      } else {
        await addDoc(collection(db, coll), data);
      }
      setStatus({ type: 'success', msg: 'Saved successfully' });
      setIsEditing(null);
      setFormData({});
    } catch (err) {
      setStatus({ type: 'error', msg: 'Save failed' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-beige">
      {/* Admin Sidebar/Topnav */}
      <div className="bg-brand-secondary text-white p-6 shadow-xl sticky top-0 z-50 flex items-center justify-between">
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
                    onClick={() => { setIsEditing('settings'); setFormData(settings); }}
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
                         onUploadComplete={(url) => setFormData({ ...formData, logoUrl: url })}
                         folder="logos"
                         label="Company Logo"
                       />
                       {formData.logoUrl && (
                         <div className="flex items-center space-x-4 p-4 bg-brand-beige/30 rounded-2xl">
                           <div className="w-16 h-16 bg-white rounded-xl overflow-hidden flex items-center justify-center p-2 border border-gray-100">
                              <img src={formData.logoUrl} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                           </div>
                           <div>
                             <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Current URL</p>
                             <p className="text-xs text-brand-primary truncate max-w-xs">{formData.logoUrl}</p>
                           </div>
                         </div>
                       )}
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
                       <button type="submit" className="flex-grow flex items-center justify-center space-x-2 py-4 bg-brand-secondary text-white rounded-full font-bold">
                         <Save size={18} />
                         <span>Save Changes</span>
                       </button>
                       <button type="button" onClick={() => setIsEditing(null)} className="px-8 py-4 border border-gray-200 rounded-full font-bold">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-12">
                    <div className="flex items-center space-x-8">
                       <div className="w-32 h-32 bg-brand-beige rounded-3xl overflow-hidden flex items-center justify-center p-4">
                          <img src={settings.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                       </div>
                       <div>
                          <h3 className="text-2xl font-serif text-brand-secondary">{settings.companyName}</h3>
                          <p className="text-brand-primary font-bold text-sm tracking-wide">{settings.tagline}</p>
                       </div>
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
                       <div className="space-y-1">
                          <h3 className="font-serif font-bold text-lg text-brand-secondary">{cat.name}</h3>
                          <p className="text-xs text-brand-muted uppercase tracking-widest">{cat.slug}</p>
                       </div>
                       <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => { setIsEditing(cat.id); setFormData(cat); }}
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
                    onClick={() => { setIsEditing('new-book'); setFormData({ categorySlug: categories[0]?.slug }); }}
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
                          <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                             <button onClick={() => { setIsEditing(book.id); setFormData(book); }} className="p-3 bg-white rounded-xl text-brand-secondary hover:text-brand-primary transition-all scale-90 group-hover:scale-100">
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
                                onUploadComplete={(url) => setFormData({ ...formData, coverUrl: url })}
                                folder="book-covers"
                                label="Book Cover Image"
                              />
                              {formData.coverUrl && (
                                <div className="aspect-[3/4] w-24 rounded-xl overflow-hidden border-2 border-brand-primary/20 shadow-lg">
                                  <img src={formData.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                                </div>
                              )}
                           </div>
                           <div className="space-y-4">
                              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Title</label>
                              <input 
                                className="w-full p-4 bg-brand-beige/50 border-0 rounded-2xl outline-none"
                                value={formData.title}
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
                        </div>
                        <div className="flex space-x-4 pt-4">
                           <button 
                             onClick={() => handleSaveItem('books', formData, isEditing === 'new-book' ? undefined : isEditing as string)}
                             className="flex-grow py-4 bg-brand-secondary text-white rounded-full font-bold shadow-lg"
                           >
                             Save Book
                           </button>
                           <button onClick={() => setIsEditing(null)} className="px-8 py-4 border border-gray-200 rounded-full font-bold">Cancel</button>
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
                               <div key={i} className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-gray-100">
                                  <img src={img} alt="gallery" className="w-full h-full object-cover" />
                               </div>
                             ))}
                          </div>
                       </div>
                       <div className="flex md:flex-col justify-end space-x-2 md:space-x-0 md:space-y-2">
                          <button 
                             onClick={() => { setIsEditing(event.id); setFormData(event); }}
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
                                onUploadComplete={(url) => setFormData({ ...formData, gallery: [...(formData.gallery || []), url] })}
                                folder="event-gallery"
                                label=""
                              />

                              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-4">
                                {formData.gallery?.map((img: string, i: number) => (
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
                                ))}
                              </div>
                           </div>
                        </div>
                        <div className="flex space-x-4 pt-4">
                           <button 
                             onClick={() => handleSaveItem('events', formData, isEditing === 'new-event' ? undefined : isEditing as string)}
                             className="flex-grow py-4 bg-brand-secondary text-white rounded-full font-bold shadow-lg"
                           >
                             Save Event
                           </button>
                           <button onClick={() => setIsEditing(null)} className="px-8 py-4 border border-gray-200 rounded-full font-bold">Cancel</button>
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
