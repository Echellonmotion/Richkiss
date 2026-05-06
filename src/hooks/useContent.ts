import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { COMPANY_INFO, BOOK_CATEGORIES } from '../constants/content';

export function useContent() {
  const [settings, setSettings] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [whyRichkiss, setWhyRichkiss] = useState<any[]>([]);
  const [printWorks, setPrintWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let settingsLoaded = false;
    let categoriesLoaded = false;
    let booksLoaded = false;
    let eventsLoaded = false;
    let whyRichkissLoaded = false;
    let printWorksLoaded = false;

    const sanitizeData = (data: any): any => {
      if (!data || typeof data !== 'object') return data;
      
      // Handle Firebase Timestamps (they have a toDate function)
      if (typeof data.toDate === 'function') {
        return data.toDate().toISOString();
      }

      // Handle arrays
      if (Array.isArray(data)) {
        return data.map(sanitizeData);
      }

      // ONLY recurse into plain objects. 
      // If it has a constructor other than Object, it's a complex type (like a ref)
      if (data.constructor !== Object) {
        // If it's a special type we know how to stringify, do it.
        // Otherwise, skip or return a placeholder to avoid circularity.
        return String(data);
      }
      
      const sanitized: any = {};
      for (const [key, value] of Object.entries(data)) {
        // Skip private firebase props
        if (key.startsWith('_')) continue;
        sanitized[key] = sanitizeData(value);
      }
      return sanitized;
    };

    const checkLoading = () => {
      if (settingsLoaded && categoriesLoaded && booksLoaded && eventsLoaded && whyRichkissLoaded && printWorksLoaded) {
        setLoading(false);
      }
    };
    
    // Settings
    const unsubSettings = onSnapshot(doc(db, 'settings', 'global'), 
      (snapshot) => {
        if (snapshot.exists()) {
          setSettings(sanitizeData(snapshot.data()));
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
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...sanitizeData(doc.data()) }));
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
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...sanitizeData(doc.data()) }));
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
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...sanitizeData(doc.data()) }));
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

    // Why Richkiss
    const unsubWhy = onSnapshot(collection(db, 'whyRichkiss'), 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...sanitizeData(doc.data()) }));
        // Sort by order if available
        data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
        setWhyRichkiss(data);
        whyRichkissLoaded = true;
        checkLoading();
      },
      (err) => {
        console.error('WhyRichkiss Snapshot Error:', err.message);
        whyRichkissLoaded = true;
        checkLoading();
      }
    );

    // Print Works
    const unsubPrint = onSnapshot(collection(db, 'printWorks'), 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...sanitizeData(doc.data()) }));
        data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
        setPrintWorks(data);
        printWorksLoaded = true;
        checkLoading();
      },
      (err) => {
        console.error('PrintWorks Snapshot Error:', err.message);
        printWorksLoaded = true;
        checkLoading();
      }
    );

    // Partners
    const unsubPartners = onSnapshot(collection(db, 'partners'), 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...sanitizeData(doc.data()) }));
        setPartners(data);
      }, (err) => {
        console.error('Partners Snapshot Error:', err.message);
      });

    return () => {
      unsubSettings();
      unsubCategories();
      unsubBooks();
      unsubEvents();
      unsubWhy();
      unsubPrint();
      unsubPartners();
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
    visionImageUrl: settings?.visionImageUrl || "https://images.unsplash.com/photo-1524311588024-d2317178412b?auto=format&fit=crop&q=80&w=800",
    featureCard1Url: settings?.featureCard1Url || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    featureCard2Url: settings?.featureCard2Url || "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
    featureCard3Url: settings?.featureCard3Url || "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=400",
    promoBannerTitle: settings?.promoBannerTitle || "Our Story Continues.",
    promoBannerText: settings?.promoBannerText || "Join our literary community for exclusive updates and events.",
    careersHeroImageUrl: settings?.careersHeroImageUrl || "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000",
    clientsHeroImageUrl: settings?.clientsHeroImageUrl || "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2000",
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
    partners,
    whyRichkiss,
    printWorks,
    loading 
  };
}
