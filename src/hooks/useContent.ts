import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { COMPANY_INFO, BOOK_CATEGORIES } from '../constants/content';

export function useContent() {
  const [settings, setSettings] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Settings
    const unsubSettings = onSnapshot(doc(db, 'settings', 'global'), (doc) => {
      if (doc.exists()) setSettings(doc.data());
    });

    // Categories
    const unsubCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (data.length > 0) setCategories(data);
    });

    // Books
    const unsubBooks = onSnapshot(collection(db, 'books'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (data.length > 0) setBooks(data);
    });

    // Events
    const unsubEvents = onSnapshot(collection(db, 'events'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (data.length > 0) setEvents(data);
    });

    setLoading(false);

    return () => {
      unsubSettings();
      unsubCategories();
      unsubBooks();
      unsubEvents();
    };
  }, []);

  // Merge with static defaults if dynamic data is missing
  const mergedSettings = settings || {
    companyName: COMPANY_INFO.name,
    logoUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200", // placeholder
    tagline: "Inspiring Excellence in Publishing",
    phoneNumbers: COMPANY_INFO.phone,
    contactEmail: COMPANY_INFO.email,
    aboutText: COMPANY_INFO.aboutUs,
    vision: COMPANY_INFO.vision,
    mission: COMPANY_INFO.mission,
    commitment: COMPANY_INFO.commitment
  };

  const mergedCategories = categories.length > 0 ? categories : BOOK_CATEGORIES;
  const mergedBooks = books.length > 0 ? books : BOOK_CATEGORIES.flatMap(c => c.books.map(b => ({ ...b, categorySlug: c.slug })));
  const mergedEvents = events.length > 0 ? events : COMPANY_INFO.events;

  return { 
    settings: mergedSettings, 
    categories: mergedCategories, 
    books: mergedBooks, 
    events: mergedEvents,
    loading 
  };
}
