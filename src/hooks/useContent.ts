import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { COMPANY_INFO, BOOK_CATEGORIES } from '../constants/content';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export function useContent() {
  const [settings, setSettings] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [whyRichkiss, setWhyRichkiss] = useState<any[]>([]);
  const [printWorks, setPrintWorks] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let settingsLoaded = false;
    let categoriesLoaded = false;
    let booksLoaded = false;
    let eventsLoaded = false;
    let whyRichkissLoaded = false;
    let printWorksLoaded = false;
    let partnersLoaded = false;
    let jobsLoaded = false;

    const sanitizeData = (data: any, seen = new WeakSet()): any => {
      if (data === null || data === undefined) return data;
      
      // Handle Firebase Timestamps specifically
      if (data && typeof data.toDate === 'function') {
        return data.toDate().toISOString();
      }

      // Handle simple types
      const type = typeof data;
      if (type !== 'object' && type !== 'function') return data;
      
      // If it's a function, return it as a string to avoid circularity issues
      if (type === 'function') return '[Function]';

      // Check for circularity
      if (seen.has(data)) return '[Circular]';
      seen.add(data);

      // Handle arrays
      if (Array.isArray(data)) {
        return data.map(item => sanitizeData(item, seen));
      }

      // Handle Firestore References or other non-plain objects
      // If it has a 'firestore' property or doesn't look like a plain object, stringify it
      const isPlainObject = Object.prototype.toString.call(data) === '[object Object]' && 
                           (Object.getPrototypeOf(data) === null || Object.getPrototypeOf(data) === Object.prototype);
      
      if (!isPlainObject || (data.firestore && data.path)) {
        // This is a Firestore Reference or other complex object
        return data.path || String(data);
      }
      
      const sanitized: any = {};
      try {
        // Use for...in to catch properties, but double check with hasOwnProperty
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            // Skip internal-looking properties
            if (key.startsWith('_')) continue;
            sanitized[key] = sanitizeData(data[key], seen);
          }
        }
      } catch (e) {
        return `[Error sanitizing: ${String(e)}]`;
      }
      return sanitized;
    };

    const checkLoading = () => {
      if (settingsLoaded && categoriesLoaded && booksLoaded && eventsLoaded && whyRichkissLoaded && printWorksLoaded && partnersLoaded && jobsLoaded) {
        setLoading(false);
      }
    };
    
    // Settings
    const unsubSettings = onSnapshot(doc(db, 'settings', 'global'), 
      (snapshot) => {
        if (snapshot.exists()) {
          setSettings(sanitizeData(snapshot.data()));
        } else {
          setSettings({}); // Ensure state updates even if doc is missing
        }
        settingsLoaded = true;
        checkLoading();
      },
      (err) => {
        settingsLoaded = true;
        checkLoading();
        handleFirestoreError(err, OperationType.GET, 'settings/global');
      }
    );

    // Categories
    const unsubCategories = onSnapshot(collection(db, 'categories'), 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...sanitizeData(doc.data()) }));
        setCategories(data); // Set even if empty
        categoriesLoaded = true;
        checkLoading();
      },
      (err) => {
        categoriesLoaded = true;
        checkLoading();
        handleFirestoreError(err, OperationType.LIST, 'categories');
      }
    );

    // Books
    const unsubBooks = onSnapshot(collection(db, 'books'), 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...sanitizeData(doc.data()) }));
        setBooks(data); // Set even if empty
        booksLoaded = true;
        checkLoading();
      },
      (err) => {
        booksLoaded = true;
        checkLoading();
        handleFirestoreError(err, OperationType.LIST, 'books');
      }
    );

    // Events
    const unsubEvents = onSnapshot(collection(db, 'events'), 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...sanitizeData(doc.data()) }));
        setEvents(data); // Set even if empty
        eventsLoaded = true;
        checkLoading();
      },
      (err) => {
        eventsLoaded = true;
        checkLoading();
        handleFirestoreError(err, OperationType.LIST, 'events');
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
        whyRichkissLoaded = true;
        checkLoading();
        handleFirestoreError(err, OperationType.LIST, 'whyRichkiss');
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
        printWorksLoaded = true;
        checkLoading();
        handleFirestoreError(err, OperationType.LIST, 'printWorks');
      }
    );

    // Partners
    const unsubPartners = onSnapshot(collection(db, 'partners'), 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...sanitizeData(doc.data()) }));
        setPartners(data);
        partnersLoaded = true;
        checkLoading();
      }, (err) => {
        partnersLoaded = true;
        checkLoading();
        handleFirestoreError(err, OperationType.LIST, 'partners');
      });

    // Jobs
    const unsubJobs = onSnapshot(collection(db, 'jobs'), 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...sanitizeData(doc.data()) }));
        setJobs(data);
        jobsLoaded = true;
        checkLoading();
      },
      (err) => {
        jobsLoaded = true;
        checkLoading();
        handleFirestoreError(err, OperationType.LIST, 'jobs');
      }
    );

    return () => {
      unsubSettings();
      unsubCategories();
      unsubBooks();
      unsubEvents();
      unsubWhy();
      unsubPrint();
      unsubPartners();
      unsubJobs();
    };
  }, []);

  // Merge with static defaults if dynamic data is missing
  const mergedSettings = {
    companyName: settings?.companyName || COMPANY_INFO.name,
    logoUrl: settings?.logoUrl || null, 
    footerLogoUrl: settings?.footerLogoUrl || null,
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
    printHeroImageUrl: settings?.printHeroImageUrl || "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=2000",
    printAboutImageUrl: settings?.printAboutImageUrl || "https://images.unsplash.com/photo-1562654501-a0ccc0af3fb1?auto=format&fit=crop&q=80&w=1200",
    aboutHeritageImageUrl: settings?.aboutHeritageImageUrl || null,
    aboutStoryImageUrl: settings?.aboutStoryImageUrl || null,
    careersWhyRichkissImageUrl: settings?.careersWhyRichkissImageUrl || null,
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
    jobs,
    printWorks,
    loading 
  };
}
