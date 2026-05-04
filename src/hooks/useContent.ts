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
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setSettings(data);
          localStorage.setItem('site_settings', JSON.stringify(data));
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
  const mergedSettings = settings || {
    companyName: COMPANY_INFO.name,
    logoUrl: "", // No placeholder image
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
