import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { COMPANY_INFO, BOOK_CATEGORIES } from '../constants/content';

export function useContent() {
  const [settings, setSettings] = useState<any>(() => {
    const cached = localStorage.getItem('site_settings');
    return cached ? JSON.parse(cached) : null;
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let settingsLoaded = false;
    let categoriesLoaded = false;
    let booksLoaded = false;
    let eventsLoaded = false;

    const checkLoading = () => {
      if (settingsLoaded && categoriesLoaded && booksLoaded && eventsLoaded) {
        setLoading(false);
      }
    };
    
    // Settings
    const unsubSettings = onSnapshot(doc(db, 'settings', 'global'), 
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setSettings(data);
          try {
            // Only cache if it's stringifiable (avoid circular refs if any exist)
            const stringified = JSON.stringify(data);
            localStorage.setItem('site_settings', stringified);
          } catch (e) {
            console.warn('Failed to cache settings due to non-serializable data:', e);
          }
        }
        settingsLoaded = true;
        checkLoading();
      },
      (err) => {
        console.error('Settings Snapshot Error:', err.message);
        settingsLoaded = true;
        checkLoading();
      }
    );

    // Categories
    const unsubCategories = onSnapshot(collection(db, 'categories'), 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (data.length > 0) setCategories(data);
        categoriesLoaded = true;
        checkLoading();
      },
      (err) => {
        console.error('Categories Snapshot Error:', err.message);
        categoriesLoaded = true;
        checkLoading();
      }
    );

    // Books
    const unsubBooks = onSnapshot(collection(db, 'books'), 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (data.length > 0) setBooks(data);
        booksLoaded = true;
        checkLoading();
      },
      (err) => {
        console.error('Books Snapshot Error:', err.message);
        booksLoaded = true;
        checkLoading();
      }
    );

    // Events
    const unsubEvents = onSnapshot(collection(db, 'events'), 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (data.length > 0) setEvents(data);
        eventsLoaded = true;
        checkLoading();
      },
      (err) => {
        console.error('Events Snapshot Error:', err.message);
        eventsLoaded = true;
        checkLoading();
      }
    );

    return () => {
      unsubSettings();
      unsubCategories();
      unsubBooks();
      unsubEvents();
    };
  }, []);

  // Merge with static defaults if dynamic data is missing
  const mergedSettings = {
    companyName: settings?.companyName || COMPANY_INFO.name,
    logoUrl: settings?.logoUrl || "", 
    footerLogoUrl: settings?.footerLogoUrl || "",
    heroImageUrl: settings?.heroImageUrl || "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000",
    heroImages: settings?.heroImages && settings.heroImages.length > 0 ? settings.heroImages : [
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&q=80&w=2000"
    ],
    tagline: settings?.tagline || "Inspiring Excellence in Publishing",
    phoneNumbers: settings?.phoneNumbers || COMPANY_INFO.phone,
    contactEmail: settings?.contactEmail || COMPANY_INFO.email,
    aboutText: settings?.aboutText || COMPANY_INFO.aboutUs,
    vision: settings?.vision || COMPANY_INFO.vision,
    mission: settings?.mission || COMPANY_INFO.mission,
    commitment: settings?.commitment || COMPANY_INFO.commitment
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
